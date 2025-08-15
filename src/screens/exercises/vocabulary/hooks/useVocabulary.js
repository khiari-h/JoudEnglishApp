// hooks/useVocabulary.js - AVEC TIMESTAMPS POUR COMPTAGE QUOTIDIEN

import { useState, useRef } from 'react';
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

  const exercises = vocabularyData?.exercises || [];
  const currentCategory = exercises[categoryIndex] || { title: "", words: [] };
  const currentWord = currentCategory.words?.[wordIndex] || { word: "", translation: "", definition: "", example: "" };
  const totalCategories = exercises.length;
  const totalWordsInCategory = currentCategory.words?.length || 0;
  
  const progressKey = `${level}_${mode}`;
  const STORAGE_KEY = `vocabulary_${progressKey}`;

  // Storage lifecycle
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
  });

  // Navigation & actions
  const {
    changeCategory,
    goToNextWord,
    goToPreviousWord,
    markWordAsCompleted,
    findNextUncompletedCategory,
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