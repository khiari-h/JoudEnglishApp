// hooks/useVocabulary.js - CORRIGÉ : Reset completedWords au changement de mode

import { useState, useRef, useEffect } from 'react';
import useVocabularySelectors from './internal/useVocabularySelectors';
import useVocabularyNavigation from './internal/useVocabularyNavigation';
import useVocabularyStorage from './internal/useVocabularyStorage';

const useVocabulary = (vocabularyData = null, level = "1", mode = "classic") => {
  
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedWords, setCompletedWords] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  const isInitialized = useRef(false);
  const previousMode = useRef(mode); // ✅ AJOUTÉ : Track du mode précédent

  // ✅ GESTION SÉPARÉE CLASSIC vs FAST
  const exercises = vocabularyData?.exercises || vocabularyData?.fastExercises || [];
  const currentCategory = exercises[categoryIndex] || { title: "", words: [] };
  const currentWord = currentCategory.words?.[wordIndex] || { word: "", translation: "", definition: "", example: "" };
  const totalCategories = exercises.length;
  const totalWordsInCategory = currentCategory.words?.length || 0;
  
  const progressKey = `${level}_${mode}`;
  const STORAGE_KEY = `vocabulary_${progressKey}`;
  
  // 🔍 DEBUG TEMPORAIRE - Vérifier les clés
  console.log(`🔍 DEBUG useVocabulary - Mode: ${mode}, Level: ${level}`);
  console.log(`   - ProgressKey: ${progressKey}`);
  console.log(`   - StorageKey: ${STORAGE_KEY}`);
  console.log(`   - Data structure:`, vocabularyData ? Object.keys(vocabularyData) : 'null');
  
  // ✅ AJOUTÉ : Reset quand mode change
  useEffect(() => {
    if (previousMode.current !== mode) {
      console.log(`🔄 DEBUG useVocabulary - Mode changed: ${previousMode.current} → ${mode}`);
      console.log(`   - Resetting completedWords and positions`);
      
      // Reset de l'état
      setCompletedWords({});
      setCategoryIndex(0);
      setWordIndex(0);
      setLoaded(false);
      isInitialized.current = false;
      
      previousMode.current = mode;
    }
  }, [mode]);

  // ✅ AJOUTÉ : Reset quand niveau change
  useEffect(() => {
    console.log(`🔄 DEBUG useVocabulary - Level changed to: ${level}`);
    console.log(`   - Resetting completedWords and positions for new level`);
    
    // Reset de l'état au changement de niveau
    setCompletedWords({});
    setCategoryIndex(0);
    setWordIndex(0);
    setLoaded(false);
    isInitialized.current = false;
  }, [level]);

  const { saveData } = useVocabularyStorage({
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
    categoryIndex, // ✅ AJOUTÉ : position actuelle
    wordIndex,     // ✅ AJOUTÉ : position actuelle
  });

  // Navigation & actions
  const {
    changeCategory,
    handleNext,
    handlePrevious,
  } = useVocabularyNavigation({
    exercises,
    level,
    mode,
    categoryIndex,
    wordIndex,
    totalWordsInCategory,
    setCategoryIndex,
    setWordIndex,
    setShowTranslation,
    completedWords,
    setCompletedWords,
  });

  // Sélecteurs/mémo
  const { getStats, getDisplayData, canGoToPrevious, isLastWordInExercise } = useVocabularySelectors({
    exercises,
    completedWords,
    categoryIndex,
    wordIndex,
    totalWordsInCategory,
    currentWord,
    currentCategory,
  });

  return {
    categoryIndex,
    wordIndex,
    showTranslation,
    completedWords,
    loaded,
    showDetailedProgress,
    currentWord,
    currentCategory,
    totalCategories,
    totalWordsInCategory,
    changeCategory,
    toggleTranslation: () => setShowTranslation(prev => !prev),
    toggleDetailedProgress: () => setShowDetailedProgress(prev => !prev),
    handleNext,
    handlePrevious,
    canGoToPrevious: canGoToPrevious(),
    isLastWordInExercise: isLastWordInExercise(),
    stats: getStats(),
    display: getDisplayData(),
    saveData,
  };
};

export default useVocabulary;