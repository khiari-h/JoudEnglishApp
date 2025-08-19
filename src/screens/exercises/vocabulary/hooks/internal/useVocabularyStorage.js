// src/screens/exercises/vocabulary/hooks/internal/useVocabularyStorage.js - VERSION CORRIGÉE

import { useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useVocabularyStorage({
  STORAGE_KEY,
  progressKey,
  loaded,
  setLoaded,
  completedWords,
  setCompletedWords,
  setCategoryIndex,
  setWordIndex,
  exercises,
  isInitialized,
  categoryIndex, // ✅ NOUVELLE PROP
  wordIndex,     // ✅ NOUVELLE PROP
}) {
  // 🔍 DEBUG TEMPORAIRE - Vérifier que le hook est exécuté
  console.log(`🔍 DEBUG useVocabularyStorage - HOOK EXÉCUTÉ avec:`, { STORAGE_KEY, progressKey });
  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, fallback = null) => {
    console.warn(`Vocabulary storage error in ${operation}:`, error);
    return fallback;
  };

  // Load data from storage
  console.log(`🔍 DEBUG useVocabularyStorage - AVANT useEffect pour: ${STORAGE_KEY}`);
  
  useEffect(() => {
    console.log(`🔍 DEBUG useVocabularyStorage - useEffect DÉCLENCHÉ pour: ${STORAGE_KEY}`);
    
    const loadData = async () => {
      try {
        // 🔍 DEBUG TEMPORAIRE - Vérifier le chargement
        console.log(`🔍 DEBUG useVocabularyStorage - Chargement depuis: ${STORAGE_KEY}`);
        
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        console.log(`   - Données trouvées:`, saved ? 'OUI' : 'NON');
        
        if (saved) {
          const { completedWords: savedCompleted, lastPosition } = JSON.parse(saved);
          console.log(`   - Mots complétés chargés:`, savedCompleted);
          console.log(`   - Position chargée:`, lastPosition);
          
          setCompletedWords(savedCompleted || {});
          if (lastPosition) {
            setCategoryIndex(lastPosition.categoryIndex || 0);
            setWordIndex(lastPosition.wordIndex || 0);
          }
        } else {
          console.log(`   - Aucune donnée trouvée, utilisation des valeurs par défaut`);
        }
      } catch (error) {
        // ✅ Gestion d'erreur appropriée
        handleStorageError(error, 'loadData');
        // Fallback: utiliser les valeurs par défaut
      } finally {
        setLoaded(true);
      }
    };
    loadData();
  }, [STORAGE_KEY, setCompletedWords, setCategoryIndex, setWordIndex, setLoaded]); // ✅ AJOUTÉ TOUTES LES DÉPENDANCES

  // Save data to storage
  const saveData = useCallback(async () => {
    try {
      const dataToSave = {
        completedWords,
        lastPosition: { categoryIndex, wordIndex }, // ✅ UTILISE LES VRAIES POSITIONS
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      handleStorageError(error, 'saveData');
      // Fallback: continuer sans sauvegarde
    }
  }, [completedWords, STORAGE_KEY, categoryIndex, wordIndex]); // ✅ AJOUTÉ LES DÉPENDANCES

  // Auto-save when data changes
  useEffect(() => {
    // ✅ CORRIGÉ : Ne sauvegarder que si on a des données valides et qu'on est initialisé
    if (loaded && isInitialized.current && Object.keys(completedWords).length > 0) {
      console.log(`🔍 DEBUG useVocabularyStorage - Auto-save déclenché pour: ${STORAGE_KEY}`);
      saveData();
    }
  }, [saveData, loaded, completedWords, isInitialized.current]);

  // ✅ SUPPRIMÉ : Ce useEffect écrase les données chargées !

  return { saveData };
}


