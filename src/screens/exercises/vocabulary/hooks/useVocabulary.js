// hooks/useVocabulary.js - HOOK UNIFIÉ SIMPLE
import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🎯 Hook unifié pour Vocabulary Exercise
 * Remplace 6 hooks (useVocabularyProgress + useVocabularyExerciseState + useVocabularyNavigation + useVocabularyStats + useVocabularyDisplay + useVocabularyLoader)
 * Simple, efficace, maintenable - pattern identique à useReading et useGrammar
 */
const useVocabulary = (vocabularyData = null, level = "1", mode = "classic") => {
  
  // =================== CORE STATE ===================
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedWords, setCompletedWords] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // =================== REFS ===================
  const isInitialized = useRef(false);

  // =================== COMPUTED VALUES ===================
  const exercises = vocabularyData?.exercises || [];
  const currentCategory = exercises[categoryIndex] || { title: "", words: [] };
  const currentWord = currentCategory.words?.[wordIndex] || { word: "", translation: "", definition: "", example: "" };
  const totalCategories = exercises.length;
  const totalWordsInCategory = currentCategory.words?.length || 0;
  
  // =================== PERSISTENCE ===================
  const progressKey = `${level}_${mode}`;
  const STORAGE_KEY = `vocabulary_${progressKey}`;

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
        console.log('Error loading vocabulary data:', error);
      } finally {
        setLoaded(true);
      }
    };
    loadData();
  }, [progressKey]);

  // Save data to storage
  const saveData = useCallback(async () => {
    try {
      const dataToSave = {
        completedWords,
        lastPosition: {
          categoryIndex,
          wordIndex
        }
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.log('Error saving vocabulary data:', error);
    }
  }, [completedWords, categoryIndex, wordIndex, STORAGE_KEY]);

  // Auto-save when data changes
  useEffect(() => {
    if (loaded) saveData();
  }, [saveData, loaded]);

  // Initialize progress for new categories
  useEffect(() => {
    if (loaded && vocabularyData && !isInitialized.current) {
      const newCompletedWords = { ...completedWords };
      exercises.forEach((_, index) => {
        if (!newCompletedWords[index]) {
          newCompletedWords[index] = [];
        }
      });
      setCompletedWords(newCompletedWords);
      isInitialized.current = true;
    }
  }, [loaded, vocabularyData, exercises, completedWords]);

  // =================== NAVIGATION ACTIONS ===================
  const changeCategory = useCallback((newCategoryIndex) => {
    setCategoryIndex(newCategoryIndex);
    setWordIndex(0);
    setShowTranslation(false);
  }, []);

  const goToNextWord = useCallback(() => {
    setWordIndex(prev => prev + 1);
    setShowTranslation(false);
  }, []);

  const goToPreviousWord = useCallback(() => {
    if (wordIndex > 0) {
      setWordIndex(prev => prev - 1);
      setShowTranslation(false);
      return true;
    }
    return false;
  }, [wordIndex]);

  const toggleTranslation = useCallback(() => {
    setShowTranslation(prev => !prev);
  }, []);

  const toggleDetailedProgress = useCallback(() => {
    setShowDetailedProgress(prev => !prev);
  }, []);

  // =================== COMPLETION LOGIC ===================
  const markWordAsCompleted = useCallback((catIndex, wIndex) => {
    setCompletedWords(prev => {
      const categoryCompleted = prev[catIndex] || [];
      if (!categoryCompleted.includes(wIndex)) {
        return {
          ...prev,
          [catIndex]: [...categoryCompleted, wIndex]
        };
      }
      return prev;
    });
  }, []);

  // Find next uncompleted category
  const findNextUncompletedCategory = useCallback(() => {
    const totalCategories = exercises.length;
    for (let i = 1; i <= totalCategories; i++) {
      const nextIndex = (categoryIndex + i) % totalCategories;
      const category = exercises[nextIndex];
      const completedInCategory = completedWords[nextIndex]?.length || 0;
      const totalInCategory = category.words?.length || 0;
      
      if (completedInCategory < totalInCategory) {
        return nextIndex;
      }
    }
    return -1;
  }, [exercises, categoryIndex, completedWords]);

  // =================== MAIN NAVIGATION ===================
  const handleNext = useCallback(() => {
    // Mark current word as completed
    markWordAsCompleted(categoryIndex, wordIndex);

    // Check if there are more words in current category
    if (wordIndex < totalWordsInCategory - 1) {
      goToNextWord();
    } else {
      // End of category - find next uncompleted category
      const nextCategoryIndex = findNextUncompletedCategory();
      if (nextCategoryIndex === -1) {
        // All done!
        const completionMessage = mode === "fast"
          ? `Félicitations ! Vous avez terminé le Fast Vocabulary ${level} !`
          : `Félicitations ! Vous avez terminé le vocabulaire ${level} !`;
        
        Alert.alert("Félicitations", completionMessage);
        return { completed: true };
      } else {
        changeCategory(nextCategoryIndex);
      }
    }
    return { completed: false };
  }, [categoryIndex, wordIndex, totalWordsInCategory, markWordAsCompleted, goToNextWord, findNextUncompletedCategory, changeCategory, mode, level]);

  const handlePrevious = useCallback(() => {
    // Case 1: Not first word in category
    if (wordIndex > 0) {
      goToPreviousWord();
      return;
    }
    
    // Case 2: First word in category - go to previous category
    if (categoryIndex > 0) {
      const previousCategoryIndex = categoryIndex - 1;
      const previousCategory = exercises[previousCategoryIndex];
      const lastWordIndex = (previousCategory.words?.length || 1) - 1;
      
      setCategoryIndex(previousCategoryIndex);
      setWordIndex(lastWordIndex);
      setShowTranslation(false);
    }
  }, [wordIndex, categoryIndex, exercises, goToPreviousWord]);

  // =================== COMPUTED STATS ===================
  const getStats = useCallback(() => {
    const totalWords = exercises.reduce((sum, cat) => sum + (cat.words?.length || 0), 0);
    const completedWordsCount = Object.values(completedWords).reduce((sum, completed) => sum + (completed?.length || 0), 0);
    const totalProgress = totalWords > 0 ? Math.round((completedWordsCount / totalWords) * 100) : 0;

    return {
      totalWords,
      completedWordsCount,
      totalProgress,
      completedInCurrentCategory: completedWords[categoryIndex]?.length || 0,
      totalInCurrentCategory: totalWordsInCategory
    };
  }, [exercises, completedWords, categoryIndex, totalWordsInCategory]);

  // =================== COMPUTED DISPLAY ===================
  const getDisplayData = useCallback(() => {
    const wordCounter = `${wordIndex + 1} / ${totalWordsInCategory}`;
    const categories = exercises.map(cat => cat.title);
    
    return {
      wordCounter,
      categories,
      currentWord,
      currentCategory
    };
  }, [wordIndex, totalWordsInCategory, exercises, currentWord, currentCategory]);

  // =================== VALIDATION ===================
  const canGoToPrevious = useCallback(() => {
    if (wordIndex > 0) return true;
    if (categoryIndex > 0) {
      const previousCategory = exercises[categoryIndex - 1];
      return previousCategory?.words && previousCategory.words.length > 0;
    }
    return false;
  }, [wordIndex, categoryIndex, exercises]);

  const isLastWordInExercise = useCallback(() => {
    return wordIndex === totalWordsInCategory - 1;
  }, [wordIndex, totalWordsInCategory]);

  return {
    // State
    categoryIndex,
    wordIndex,
    showTranslation,
    completedWords,
    loaded,
    showDetailedProgress,
    
    // Data
    currentWord,
    currentCategory,
    totalCategories,
    totalWordsInCategory,
    
    // Actions
    changeCategory,
    toggleTranslation,
    toggleDetailedProgress,
    handleNext,
    handlePrevious,
    
    // Computed
    canGoToPrevious: canGoToPrevious(),
    isLastWordInExercise: isLastWordInExercise(),
    stats: getStats(),
    display: getDisplayData(),
  };
};

export default useVocabulary;