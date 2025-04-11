// hooks/useVocabularyProgress.js - Version sécurisée
import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../../../utils/constants';

/**
 * Hook personnalisé pour gérer la progression des exercices de vocabulaire
 * Version sécurisée contre les boucles infinies
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useVocabularyProgress = (level) => {
  // Clé de stockage unique pour ce niveau
  const storageKey = `${STORAGE_KEYS.COMPLETED_EXERCISES}_vocabulary_${level}`;
  const positionKey = `${STORAGE_KEYS.LAST_POSITION}_vocabulary_${level}`;
  
  // États locaux
  const [completedWords, setCompletedWords] = useState({});
  const [lastPosition, setLastPosition] = useState({
    categoryIndex: 0,
    wordIndex: 0,
  });
  const [loaded, setLoaded] = useState(false);
  
  // Flag pour éviter les sauvegardes excessives
  const lastSavedPosition = useRef({ categoryIndex: 0, wordIndex: 0 });
  const hasInitialized = useRef(false);
  
  // Chargement initial - UNE SEULE FOIS
  useEffect(() => {
    const loadProgress = async () => {
      try {
        // Éviter les initializations multiples
        if (hasInitialized.current) return;
        
        console.log("Chargement des données de progression...");
        
        // Charger les mots complétés
        const savedData = await AsyncStorage.getItem(storageKey);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setCompletedWords(parsed.completedWords || {});
          
          // Charger la dernière position
          const savedPosition = parsed.lastPosition;
          if (savedPosition) {
            setLastPosition(savedPosition);
            lastSavedPosition.current = { ...savedPosition };
          }
        }
        
        // Marquer comme chargé
        setLoaded(true);
        hasInitialized.current = true;
      } catch (error) {
        console.error("Error loading vocabulary progress:", error);
        setLoaded(true); // Marquer comme chargé même en cas d'erreur
        hasInitialized.current = true;
      }
    };
    
    loadProgress();
  }, []); // S'exécute une seule fois au montage
  
  // Sauvegarder les données manuellement
  const saveProgress = useCallback(async () => {
    try {
      const dataToSave = {
        completedWords,
        lastPosition,
        timestamp: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem(storageKey, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Error saving vocabulary progress:", error);
    }
  }, [completedWords, lastPosition, storageKey]);
  
  // Marquer un mot comme complété
  const markWordAsCompleted = useCallback((categoryIndex, wordIndex) => {
    setCompletedWords(prev => {
      const categoryId = categoryIndex.toString();
      const updated = { ...prev };
      
      if (!updated[categoryId]) {
        updated[categoryId] = [];
      }
      
      if (!updated[categoryId].includes(wordIndex)) {
        updated[categoryId] = [...updated[categoryId], wordIndex];
      }
      
      return updated;
    });
    
    // Sauvegarder les changements manuellement
    setTimeout(() => saveProgress(), 0);
  }, [saveProgress]);
  
  // Sauvegarder la dernière position (avec vérification pour éviter les sauvegardes inutiles)
  const saveLastPosition = useCallback((categoryIndex, wordIndex) => {
    // Vérifier si la position a changé pour éviter les sauvegardes inutiles
    if (
      lastSavedPosition.current.categoryIndex === categoryIndex &&
      lastSavedPosition.current.wordIndex === wordIndex
    ) {
      return; // Ne pas sauvegarder si la position n'a pas changé
    }
    
    // Mettre à jour la référence
    lastSavedPosition.current = { categoryIndex, wordIndex };
    
    // Mettre à jour l'état
    setLastPosition({
      categoryIndex,
      wordIndex,
    });
    
    // Sauvegarder les changements manuellement
    setTimeout(() => saveProgress(), 0);
  }, [saveProgress]);
  
  // Vérifier si un mot est complété
  const isWordCompleted = useCallback((categoryIndex, wordIndex) => {
    const categoryId = categoryIndex.toString();
    return completedWords[categoryId]?.includes(wordIndex) || false;
  }, [completedWords]);
  
  // Calculer le pourcentage de progression pour une catégorie
  const calculateCategoryProgress = useCallback((categoryIndex, totalWords) => {
    const categoryId = categoryIndex.toString();
    const completed = completedWords[categoryId]?.length || 0;
    
    if (!completed || totalWords === 0) {
      return 0;
    }
    
    return Math.min(100, (completed / totalWords) * 100);
  }, [completedWords]);
  
  // Calculer le pourcentage de progression global
  const calculateTotalProgress = useCallback((categories) => {
    if (!categories || categories.length === 0) {
      return 0;
    }
    
    let totalCompleted = 0;
    let totalWords = 0;
    
    categories.forEach((category, index) => {
      const categoryId = index.toString();
      totalCompleted += completedWords[categoryId]?.length || 0;
      totalWords += category.words?.length || 0;
    });
    
    return totalWords > 0
      ? Math.min(100, (totalCompleted / totalWords) * 100)
      : 0;
  }, [completedWords]);
  
  // Initialiser la progression
  const initializeProgress = useCallback((vocabularyData) => {
    if (!vocabularyData || !vocabularyData.exercises) return;
    
    // Vérifier si l'initialisation est nécessaire (si aucun mot n'est complété)
    if (Object.keys(completedWords).length === 0) {
      const initialCompletedWords = {};
      vocabularyData.exercises.forEach((_, index) => {
        initialCompletedWords[index.toString()] = [];
      });
      
      setCompletedWords(initialCompletedWords);
    }
  }, [completedWords]);
  
  // Réinitialiser la progression
  const resetProgress = useCallback(() => {
    setCompletedWords({});
    setLastPosition({ categoryIndex: 0, wordIndex: 0 });
    lastSavedPosition.current = { categoryIndex: 0, wordIndex: 0 };
    
    // Sauvegarder les changements manuellement
    setTimeout(() => saveProgress(), 0);
  }, [saveProgress]);
  
  return {
    // État
    completedWords,
    lastPosition,
    loaded,
    
    // Actions
    markWordAsCompleted,
    saveLastPosition,
    isWordCompleted,
    resetProgress,
    initializeProgress,
    
    // Calculs
    calculateCategoryProgress,
    calculateTotalProgress,
  };
};

export default useVocabularyProgress;