// hooks/useErrorCorrection.js - HOOK UNIFIÉ SIMPLE
import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🎯 Hook unifié pour Error Correction Exercise
 * Remplace useErrorCorrectionExerciseState + useErrorCorrectionProgress
 * Simple, efficace, maintenable - pattern identique à useVocabulary
 */
const useErrorCorrection = (errorCorrectionData = null, level = "A1") => {
  
  // =================== CORE STATE ===================
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctionMode, setCorrectionMode] = useState('full'); // 'full', 'identify', 'multiple_choice'
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [completedExercises, setCompletedExercises] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // =================== MODE-SPECIFIC STATE ===================
  const [userCorrection, setUserCorrection] = useState('');
  const [selectedErrorIndices, setSelectedErrorIndices] = useState([]);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // =================== REFS ===================
  const isInitialized = useRef(false);

  // =================== COMPUTED VALUES ===================
  const categories = errorCorrectionData?.categories || [];
  const exercises = errorCorrectionData?.exercises?.filter(
    ex => ex.categoryId === selectedCategory
  ) || [];
  const currentCategory = categories.find(cat => cat.id === selectedCategory) || { name: "", id: null };
  const currentExercise = exercises[currentExerciseIndex] || { text: "", correctedText: "", errorPositions: [], choices: [] };
  const totalCategories = categories.length;
  const totalExercisesInCategory = exercises.length;
  
  // =================== PERSISTENCE ===================
  const progressKey = `${level}`;
  const STORAGE_KEY = `error_correction_${progressKey}`;

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const { completedExercises: savedCompleted, lastPosition } = JSON.parse(saved);
          setCompletedExercises(savedCompleted || {});
          if (lastPosition) {
            setSelectedCategory(lastPosition.categoryId || null);
            setCurrentExerciseIndex(lastPosition.exerciseIndex || 0);
          }
        }
      } catch (error) {
        console.log('Error loading error correction data:', error);
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
        completedExercises,
        lastPosition: {
          categoryId: selectedCategory,
          exerciseIndex: currentExerciseIndex
        }
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.log('Error saving error correction data:', error);
    }
  }, [completedExercises, selectedCategory, currentExerciseIndex, STORAGE_KEY]);

  // Auto-save when data changes
  useEffect(() => {
    if (loaded) saveData();
  }, [saveData, loaded]);

  // Initialize progress for new categories
  useEffect(() => {
    if (loaded && errorCorrectionData && !isInitialized.current) {
      const newCompletedExercises = { ...completedExercises };
      categories.forEach((category) => {
        if (!newCompletedExercises[category.id]) {
          newCompletedExercises[category.id] = [];
        }
      });
      setCompletedExercises(newCompletedExercises);
      isInitialized.current = true;
    }
  }, [loaded, errorCorrectionData, categories, completedExercises]);

  // Initialize first category
  useEffect(() => {
    if (loaded && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [loaded, categories, selectedCategory]);

  // =================== NAVIGATION ACTIONS ===================
  const changeCategory = useCallback((newCategoryId) => {
    setSelectedCategory(newCategoryId);
    setCurrentExerciseIndex(0);
    resetExerciseState();
  }, []);

  const resetExerciseState = useCallback(() => {
    setUserCorrection('');
    setSelectedErrorIndices([]);
    setSelectedChoiceIndex(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setShowHint(false);
  }, []);

  const startExercise = useCallback((mode = 'full') => {
    setCorrectionMode(mode);
    resetExerciseState();
    setShowResults(false);
    setScore(0);

    // Initialize based on mode
    if (exercises.length > 0) {
      const firstExercise = exercises[0];
      switch(mode) {
        case 'full':
          setUserCorrection(firstExercise.text || '');
          break;
        case 'identify':
          setSelectedErrorIndices([]);
          break;
        case 'multiple_choice':
          setSelectedChoiceIndex(null);
          break;
      }
    }
  }, [exercises, resetExerciseState]);

  const toggleDetailedProgress = useCallback(() => {
    setShowDetailedProgress(prev => !prev);
  }, []);

  // =================== MODE-SPECIFIC ACTIONS ===================
  const handleWordPress = useCallback((wordIndex) => {
    if (showFeedback || correctionMode !== 'identify') return;

    setSelectedErrorIndices(prev => 
      prev.includes(wordIndex) 
        ? prev.filter(i => i !== wordIndex)
        : [...prev, wordIndex]
    );
  }, [showFeedback, correctionMode]);

  const handleChoiceSelect = useCallback((choiceIndex) => {
    if (showFeedback) return;
    setSelectedChoiceIndex(choiceIndex);
  }, [showFeedback]);

  // =================== COMPLETION LOGIC ===================
  const markExerciseAsCompleted = useCallback((catId, exIndex) => {
    setCompletedExercises(prev => {
      const categoryCompleted = prev[catId] || [];
      if (!categoryCompleted.includes(exIndex)) {
        return {
          ...prev,
          [catId]: [...categoryCompleted, exIndex]
        };
      }
      return prev;
    });
  }, []);

  // Find next uncompleted category
  const findNextUncompletedCategory = useCallback(() => {
    const totalCategories = categories.length;
    for (let i = 1; i <= totalCategories; i++) {
      const nextIndex = (categories.findIndex(cat => cat.id === selectedCategory) + i) % totalCategories;
      const nextCategory = categories[nextIndex];
      const exercisesInCategory = errorCorrectionData?.exercises?.filter(
        ex => ex.categoryId === nextCategory.id
      )?.length || 0;
      const completedInCategory = completedExercises[nextCategory.id]?.length || 0;
      
      if (completedInCategory < exercisesInCategory) {
        return nextCategory.id;
      }
    }
    return null;
  }, [categories, selectedCategory, completedExercises, errorCorrectionData]);

  // =================== ANSWER CHECKING ===================
  const checkAnswer = useCallback(() => {
    if (showFeedback) return false;

    let answerCorrect = false;

    switch(correctionMode) {
      case 'full':
        if (!userCorrection.trim()) return false;
        answerCorrect = userCorrection.trim().toLowerCase() === 
                       (currentExercise.correctedText || '').trim().toLowerCase();
        break;

      case 'identify':
        const errorPositions = currentExercise.errorPositions || [];
        answerCorrect = selectedErrorIndices.length === errorPositions.length &&
          selectedErrorIndices.every(index => errorPositions.includes(index));
        break;

      case 'multiple_choice':
        answerCorrect = selectedChoiceIndex === currentExercise.correctChoiceIndex;
        break;

      default:
        return false;
    }

    setIsCorrect(answerCorrect);
    setShowFeedback(true);

    if (answerCorrect) {
      setScore(prev => prev + 1);
    }

    return answerCorrect;
  }, [showFeedback, correctionMode, userCorrection, selectedErrorIndices, selectedChoiceIndex, currentExercise]);

  // =================== MAIN NAVIGATION ===================
  const handleNext = useCallback(() => {
    // Mark current exercise as completed
    markExerciseAsCompleted(selectedCategory, currentExerciseIndex);

    // Check if there are more exercises in current category
    if (currentExerciseIndex < totalExercisesInCategory - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      resetExerciseState();

      // Initialize next exercise based on mode
      const nextExercise = exercises[nextIndex];
      switch(correctionMode) {
        case 'full':
          setUserCorrection(nextExercise.text || '');
          break;
        case 'identify':
          setSelectedErrorIndices([]);
          break;
        case 'multiple_choice':
          setSelectedChoiceIndex(null);
          break;
      }
    } else {
      // End of category - find next uncompleted category
      const nextCategoryId = findNextUncompletedCategory();
      if (nextCategoryId === null) {
        // All done!
        const completionMessage = `Félicitations ! Vous avez terminé tous les exercices de correction d'erreurs ${level} !`;
        Alert.alert("Félicitations", completionMessage);
        return { completed: true };
      } else {
        changeCategory(nextCategoryId);
      }
    }
    return { completed: false };
  }, [selectedCategory, currentExerciseIndex, totalExercisesInCategory, markExerciseAsCompleted, 
      resetExerciseState, exercises, correctionMode, findNextUncompletedCategory, changeCategory, level]);

  const handlePrevious = useCallback(() => {
    // Case 1: Not first exercise in category
    if (currentExerciseIndex > 0) {
      const prevIndex = currentExerciseIndex - 1;
      setCurrentExerciseIndex(prevIndex);
      resetExerciseState();

      // Initialize previous exercise based on mode
      const prevExercise = exercises[prevIndex];
      switch(correctionMode) {
        case 'full':
          setUserCorrection(prevExercise.text || '');
          break;
        case 'identify':
          setSelectedErrorIndices([]);
          break;
        case 'multiple_choice':
          setSelectedChoiceIndex(null);
          break;
      }
      return;
    }
    
    // Case 2: First exercise in category - go to previous category
    const currentCategoryIndex = categories.findIndex(cat => cat.id === selectedCategory);
    if (currentCategoryIndex > 0) {
      const previousCategory = categories[currentCategoryIndex - 1];
      const exercisesInPreviousCategory = errorCorrectionData?.exercises?.filter(
        ex => ex.categoryId === previousCategory.id
      ) || [];
      const lastExerciseIndex = exercisesInPreviousCategory.length - 1;
      
      changeCategory(previousCategory.id);
      setCurrentExerciseIndex(lastExerciseIndex);
    }
  }, [currentExerciseIndex, exercises, correctionMode, resetExerciseState, 
      categories, selectedCategory, errorCorrectionData, changeCategory]);

  // =================== COMPUTED STATS ===================
  const getStats = useCallback(() => {
    const totalExercises = categories.reduce((sum, cat) => {
      const exercisesInCat = errorCorrectionData?.exercises?.filter(
        ex => ex.categoryId === cat.id
      )?.length || 0;
      return sum + exercisesInCat;
    }, 0);
    
    const completedExercisesCount = Object.values(completedExercises).reduce(
      (sum, completed) => sum + (completed?.length || 0), 0
    );
    
    const totalProgress = totalExercises > 0 ? Math.round((completedExercisesCount / totalExercises) * 100) : 0;

    return {
      totalExercises,
      completedExercisesCount,
      totalProgress,
      completedInCurrentCategory: completedExercises[selectedCategory]?.length || 0,
      totalInCurrentCategory: totalExercisesInCategory,
      completedExercises,
      score
    };
  }, [categories, errorCorrectionData, completedExercises, selectedCategory, totalExercisesInCategory, score]);

  // =================== COMPUTED DISPLAY ===================
  const getDisplayData = useCallback(() => {
    const exerciseCounter = `${currentExerciseIndex + 1} / ${totalExercisesInCategory}`;
    const categoryNames = categories.map(cat => cat.name);
    
    return {
      exerciseCounter,
      categories: categoryNames,
      currentExercise,
      currentCategory
    };
  }, [currentExerciseIndex, totalExercisesInCategory, categories, currentExercise, currentCategory]);

  // =================== VALIDATION ===================
  const canGoToPrevious = useCallback(() => {
    if (currentExerciseIndex > 0) return true;
    const currentCategoryIndex = categories.findIndex(cat => cat.id === selectedCategory);
    if (currentCategoryIndex > 0) {
      const previousCategory = categories[currentCategoryIndex - 1];
      const exercisesInPreviousCategory = errorCorrectionData?.exercises?.filter(
        ex => ex.categoryId === previousCategory.id
      ) || [];
      return exercisesInPreviousCategory.length > 0;
    }
    return false;
  }, [currentExerciseIndex, categories, selectedCategory, errorCorrectionData]);

  const isLastExerciseInCategory = useCallback(() => {
    return currentExerciseIndex === totalExercisesInCategory - 1;
  }, [currentExerciseIndex, totalExercisesInCategory]);

  const hasValidData = errorCorrectionData?.categories && 
                      Array.isArray(errorCorrectionData.categories) && 
                      errorCorrectionData.categories.length > 0;

  return {
    // State
    selectedCategory,
    currentExerciseIndex,
    correctionMode,
    showFeedback,
    isCorrect,
    showResults,
    completedExercises,
    loaded,
    showDetailedProgress,
    
    // Mode-specific state
    userCorrection,
    selectedErrorIndices,
    selectedChoiceIndex,
    score,
    showHint,
    
    // Data
    currentExercise,
    currentCategory,
    totalCategories,
    totalExercisesInCategory,
    exercises,
    
    // Actions
    changeCategory,
    startExercise,
    resetExerciseState,
    toggleDetailedProgress,
    handleNext,
    handlePrevious,
    checkAnswer,
    handleWordPress,
    handleChoiceSelect,
    setUserCorrection,
    setShowHint,
    setShowResults,
    
    // Computed
    canGoToPrevious: canGoToPrevious(),
    isLastExerciseInCategory: isLastExerciseInCategory(),
    hasValidData,
    stats: getStats(),
    display: getDisplayData(),
  };
};

export default useErrorCorrection;