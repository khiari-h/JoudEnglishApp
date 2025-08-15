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
}) {
  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, fallback = null) => {
    console.warn(`Vocabulary storage error in ${operation}:`, error);
    return fallback;
  };

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const { completedWords: savedCompleted, lastPosition } = JSON.parse(saved);
          setCompletedWords(savedCompleted || {});
          if (lastPosition) {
            setCategoryIndex(lastPosition.categoryIndex || 0);
            setWordIndex(lastPosition.wordIndex || 0);
          }
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
  }, [progressKey, STORAGE_KEY, setCompletedWords, setCategoryIndex, setWordIndex, setLoaded]);

  // Save data to storage
  const saveData = useCallback(async () => {
    try {
      const dataToSave = {
        completedWords,
        lastPosition: { categoryIndex: 0, wordIndex: 0 },
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      handleStorageError(error, 'saveData');
      // Fallback: continuer sans sauvegarde
    }
  }, [completedWords, STORAGE_KEY]);

  // Auto-save when data changes
  useEffect(() => {
    if (loaded) saveData();
  }, [saveData, loaded]);

  // Initialize progress for new categories
  useEffect(() => {
    if (loaded && exercises && !isInitialized.current) {
      const newCompletedWords = { ...completedWords };
      exercises.forEach((_, index) => {
        if (!newCompletedWords[index]) newCompletedWords[index] = [];
      });
      setCompletedWords(newCompletedWords);
      isInitialized.current = true;
    }
  }, [loaded, exercises, completedWords, setCompletedWords, isInitialized]);

  return { saveData };
}


