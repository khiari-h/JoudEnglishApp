// hooks/usePhrases.js - HOOK UNIFIÉ SIMPLE
import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🎯 Hook unifié pour Phrases Exercise
 * Remplace usePhrasesExerciseState + usePhrasesProgress + usePhrasesDisplay
 * Simple, efficace, maintenable - pattern identique à useReading, useGrammar et useVocabulary
 */
const usePhrases = (phrasesData = null, level = "A1") => {
  
  // =================== CORE STATE ===================
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedPhrases, setCompletedPhrases] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // =================== REFS ===================
  const isInitialized = useRef(false);

  // =================== COMPUTED VALUES ===================
  const categories = phrasesData?.categories || [];
  const allPhrases = phrasesData?.phrases || [];
  const currentCategory = categories[categoryIndex] || { id: null, name: "Loading...", phrases: [] };
  const currentPhrases = currentCategory.id 
    ? allPhrases.filter(phrase => phrase.categoryId === currentCategory.id)
    : [];
  const currentPhrase = currentPhrases[phraseIndex] || { id: "", phrase: "", translation: "", context: "" };
  const totalCategories = categories.length;
  const totalPhrasesInCategory = currentPhrases.length;
  
  // =================== PERSISTENCE ===================
  const STORAGE_KEY = `phrases_${level}`;

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const { completedPhrases: savedCompleted, lastPosition } = JSON.parse(saved);
          setCompletedPhrases(savedCompleted || {});
          if (lastPosition) {
            setCategoryIndex(lastPosition.categoryIndex || 0);
            setPhraseIndex(lastPosition.phraseIndex || 0);
          }
        }
      } catch (error) {
        // Ignored on purpose
      } finally {
        setLoaded(true);
      }
    };
    loadData();
  }, [level]);

  // Save data to storage
  const saveData = useCallback(async () => {
    try {
      const dataToSave = {
        completedPhrases,
        lastPosition: {
          categoryIndex,
          phraseIndex
        }
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      // Ignored on purpose
    }
  }, [completedPhrases, categoryIndex, phraseIndex, STORAGE_KEY]);

  // Auto-save when data changes
  useEffect(() => {
    if (loaded) saveData();
  }, [saveData, loaded]);

  // Initialize progress for new categories
  useEffect(() => {
    if (loaded && phrasesData && !isInitialized.current) {
      const newCompletedPhrases = { ...completedPhrases };
      categories.forEach((_, index) => {
        if (!newCompletedPhrases[index]) {
          newCompletedPhrases[index] = [];
        }
      });
      setCompletedPhrases(newCompletedPhrases);
      isInitialized.current = true;
    }
  }, [loaded, phrasesData, categories, completedPhrases]);

  // =================== NAVIGATION ACTIONS ===================
  const changeCategory = useCallback((newCategoryIndex) => {
    if (newCategoryIndex !== categoryIndex && newCategoryIndex >= 0 && newCategoryIndex < categories.length) {
      setCategoryIndex(newCategoryIndex);
      setPhraseIndex(0);
      setShowTranslation(false);
    }
  }, [categoryIndex, categories.length]);

  const goToNextPhrase = useCallback(() => {
    if (phraseIndex < totalPhrasesInCategory - 1) {
      setPhraseIndex(prev => prev + 1);
      setShowTranslation(false);
    }
  }, [phraseIndex, totalPhrasesInCategory]);

  const goToPreviousPhrase = useCallback(() => {
    if (phraseIndex > 0) {
      setPhraseIndex(prev => prev - 1);
      setShowTranslation(false);
      return true;
    }
    return false;
  }, [phraseIndex]);

  const toggleTranslation = useCallback(() => {
    setShowTranslation(prev => !prev);
  }, []);

  const toggleDetailedProgress = useCallback(() => {
    setShowDetailedProgress(prev => !prev);
  }, []);

  // =================== COMPLETION LOGIC ===================
  const markPhraseAsCompleted = useCallback((catIndex, pIndex) => {
    setCompletedPhrases(prev => {
      const categoryCompleted = prev[catIndex] || [];
      if (!categoryCompleted.includes(pIndex)) {
        return {
          ...prev,
          [catIndex]: [...categoryCompleted, pIndex]
        };
      }
      return prev;
    });
  }, []);

  // Find next uncompleted category
  const findNextUncompletedCategory = useCallback(() => {
    const totalCategories = categories.length;
    for (let i = 1; i <= totalCategories; i++) {
      const nextIndex = (categoryIndex + i) % totalCategories;
      const category = categories[nextIndex];
      const categoryPhrases = allPhrases.filter(p => p.categoryId === category.id);
      const completedInCategory = completedPhrases[nextIndex]?.length || 0;
      
      if (completedInCategory < categoryPhrases.length) {
        return nextIndex;
      }
    }
    return -1;
  }, [categories, categoryIndex, allPhrases, completedPhrases]);

  // =================== MAIN NAVIGATION ===================
  const handleNext = useCallback(() => {
    // Mark current phrase as completed
    markPhraseAsCompleted(categoryIndex, phraseIndex);

    // Check if there are more phrases in current category
    if (phraseIndex < totalPhrasesInCategory - 1) {
      goToNextPhrase();
    } else {
      // End of category - find next uncompleted category
      const nextCategoryIndex = findNextUncompletedCategory();
      if (nextCategoryIndex === -1) {
        // All done!
        Alert.alert(
          "Félicitations",
          "Vous avez terminé tous les exercices de phrases !"
        );
        return { completed: true };
      } else {
        changeCategory(nextCategoryIndex);
      }
    }
    return { completed: false };
  }, [categoryIndex, phraseIndex, totalPhrasesInCategory, markPhraseAsCompleted, goToNextPhrase, findNextUncompletedCategory, changeCategory]);

  const handlePrevious = useCallback(() => {
    goToPreviousPhrase();
  }, [goToPreviousPhrase]);

  // =================== COMPUTED STATS ===================
  const getStats = useCallback(() => {
    const totalPhrases = allPhrases.length;
    const completedPhrasesCount = Object.values(completedPhrases).reduce((sum, completed) => sum + (completed?.length || 0), 0);
    const totalProgress = totalPhrases > 0 ? Math.round((completedPhrasesCount / totalPhrases) * 100) : 0;
    const completionProgress = totalPhrasesInCategory > 0 ? ((phraseIndex + 1) / totalPhrasesInCategory) * 100 : 0;

    return {
      totalPhrases,
      completedPhrasesCount,
      totalProgress,
      completionProgress,
      completedInCurrentCategory: completedPhrases[categoryIndex]?.length || 0,
      totalInCurrentCategory: totalPhrasesInCategory
    };
  }, [allPhrases, completedPhrases, totalPhrasesInCategory, phraseIndex, categoryIndex]);

  // =================== COMPUTED DISPLAY ===================
  const getDisplayData = useCallback(() => {
    const phraseCounter = `${phraseIndex + 1} / ${totalPhrasesInCategory || 0}`;
    const categoriesNames = categories.map(cat => cat.name);
    
    return {
      phraseCounter,
      categories: categoriesNames,
      currentPhrase,
      currentCategory,
      currentPhrases
    };
  }, [phraseIndex, totalPhrasesInCategory, categories, currentPhrase, currentCategory, currentPhrases]);

  // =================== VALIDATION ===================
  const hasValidData = phrasesData?.categories && Array.isArray(phrasesData.categories) && phrasesData.categories.length > 0;

  const canGoToPrevious = phraseIndex > 0;
  const isLastPhraseInCategory = phraseIndex === totalPhrasesInCategory - 1;

  return {
    // State
    categoryIndex,
    phraseIndex,
    showTranslation,
    completedPhrases,
    loaded,
    showDetailedProgress,
    
    // Data
    currentPhrase,
    currentCategory,
    currentPhrases,
    totalCategories,
    totalPhrasesInCategory,
    hasValidData,
    
    // Actions
    changeCategory,
    toggleTranslation,
    toggleDetailedProgress,
    handleNext,
    handlePrevious,
    
    // Computed
    canGoToPrevious,
    isLastPhraseInCategory,
    stats: getStats(),
    display: getDisplayData(),
  };
};

export default usePhrases;