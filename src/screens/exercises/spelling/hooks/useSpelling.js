// hooks/useSpelling.js - HOOK UNIFIÉ SIMPLE
import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🎯 Hook unifié pour Spelling Exercise
 * Remplace useSpellingExerciseState + useSpellingProgress
 * Simple, efficace, maintenable - pattern identique à useVocabulary et useErrorCorrection
 */
const useSpelling = (spellingData = null, level = "A1", exerciseType = "correction") => {
  
  // =================== CORE STATE ===================
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // =================== REFS ===================
  const isInitialized = useRef(false);

  // =================== COMPUTED VALUES ===================
  const exercises = spellingData?.exercises || [];
  const currentExercise = exercises[currentExerciseIndex] || { 
    type: 'correction', 
    instruction: '', 
    correctAnswer: '', 
    wordToCorrect: '',
    rule: '',
    sentence: '',
    choices: [],
    hint: '',
    explanation: ''
  };
  const totalExercises = exercises.length;
  
  // =================== PERSISTENCE ===================
  const progressKey = `${level}_${exerciseType}`;
  const STORAGE_KEY = `spelling_${progressKey}`;

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const { 
            completedExercises: savedCompleted, 
            userAnswers: savedAnswers,
            lastPosition 
          } = JSON.parse(saved);
          
          setCompletedExercises(savedCompleted || []);
          setUserAnswers(savedAnswers || []);
          
          if (lastPosition && lastPosition.exerciseIndex !== undefined) {
            setCurrentExerciseIndex(lastPosition.exerciseIndex || 0);
          }
        }
      } catch (error) {
        console.log('Error loading spelling data:', error);
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
        userAnswers,
        lastPosition: {
          exerciseIndex: currentExerciseIndex,
          exerciseType,
          timestamp: Date.now()
        }
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.log('Error saving spelling data:', error);
    }
  }, [completedExercises, userAnswers, currentExerciseIndex, exerciseType, STORAGE_KEY]);

  // Auto-save when data changes
  useEffect(() => {
    if (loaded) saveData();
  }, [saveData, loaded]);

  // Initialize progress for new exercises
  useEffect(() => {
    if (loaded && spellingData && !isInitialized.current) {
      // Initialization can happen here if needed
      isInitialized.current = true;
    }
  }, [loaded, spellingData]);

  // =================== EXERCISE ACTIONS ===================
  const resetExerciseState = useCallback(() => {
    setUserInput('');
    setShowHint(false);
    setShowFeedback(false);
    setIsCorrect(false);
  }, []);

  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev);
  }, []);

  const toggleDetailedProgress = useCallback(() => {
    setShowDetailedProgress(prev => !prev);
  }, []);

  // =================== ANSWER CHECKING ===================
  const checkAnswer = useCallback(() => {
    if (!currentExercise) return false;

    let correct = false;

    switch (currentExercise.type) {
      case 'homophones':
        // Pour les homophones, vérifier le choix sélectionné
        if (!userInput) return false;
        correct = userInput === currentExercise.correctAnswer;
        break;

      case 'correction':
      case 'spelling_rule':
      default:
        // Pour les autres types, vérifier le texte saisi
        if (!userInput.trim()) return false;
        const userAnswer = userInput.trim().toLowerCase();
        const correctAnswer = currentExercise.correctAnswer.toLowerCase();
        correct = userAnswer === correctAnswer;
        break;
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    return correct;
  }, [userInput, currentExercise]);

  // =================== COMPLETION LOGIC ===================
  const markExerciseAsCompleted = useCallback((exerciseIndex, isCorrect, userAnswer, additionalData = {}) => {
    // Marquer comme complété
    setCompletedExercises(prev => {
      if (!prev.includes(exerciseIndex)) {
        return [...prev, exerciseIndex];
      }
      return prev;
    });

    // Sauvegarder la réponse
    const newAnswer = {
      exerciseIndex,
      isCorrect,
      userAnswer,
      correctAnswer: currentExercise.correctAnswer,
      exerciseType: currentExercise.type,
      timestamp: Date.now(),
      ...additionalData
    };

    setUserAnswers(prev => [...prev, newAnswer]);
  }, [currentExercise]);

  // Find next uncompleted exercise
  const findNextUncompletedExercise = useCallback(() => {
    const totalExercises = exercises.length;
    
    // Chercher à partir de l'index suivant
    for (let i = currentExerciseIndex + 1; i < totalExercises; i++) {
      if (!completedExercises.includes(i)) {
        return i;
      }
    }
    
    // Chercher depuis le début si rien trouvé
    for (let i = 0; i <= currentExerciseIndex; i++) {
      if (!completedExercises.includes(i)) {
        return i;
      }
    }
    
    return -1; // Tous complétés
  }, [exercises, currentExerciseIndex, completedExercises]);

  // =================== MAIN NAVIGATION ===================
  const handleNext = useCallback(() => {
    // Mark current exercise as completed
    markExerciseAsCompleted(currentExerciseIndex, isCorrect, userInput);

    // Check if there are more exercises
    if (currentExerciseIndex < totalExercises - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      resetExerciseState();
    } else {
      // End of exercises
      const nextUncompletedIndex = findNextUncompletedExercise();
      if (nextUncompletedIndex === -1) {
        // All done!
        const completionMessage = `Félicitations ! Vous avez terminé tous les exercices d'orthographe ${exerciseType} du niveau ${level} !`;
        Alert.alert("Félicitations", completionMessage);
        return { completed: true };
      } else {
        setCurrentExerciseIndex(nextUncompletedIndex);
        resetExerciseState();
      }
    }
    return { completed: false };
  }, [currentExerciseIndex, totalExercises, markExerciseAsCompleted, isCorrect, userInput, 
      resetExerciseState, findNextUncompletedExercise, exerciseType, level]);

  const handlePrevious = useCallback(() => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      resetExerciseState();
    }
  }, [currentExerciseIndex, resetExerciseState]);

  const retryExercise = useCallback(() => {
    resetExerciseState();
  }, [resetExerciseState]);

  // =================== COMPUTED STATS ===================
  const getStats = useCallback(() => {
    const totalExercises = exercises.length;
    const completedExercisesCount = completedExercises.length;
    const totalProgress = totalExercises > 0 ? Math.round((completedExercisesCount / totalExercises) * 100) : 0;

    // Performance stats
    const total = userAnswers.length;
    const correct = userAnswers.filter(answer => answer.isCorrect).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    return {
      totalExercises,
      completedExercisesCount,
      totalProgress,
      remainingExercises: totalExercises - completedExercisesCount,
      performance: {
        total,
        correct,
        incorrect: total - correct,
        accuracy
      },
      completedExercises,
      userAnswers
    };
  }, [exercises, completedExercises, userAnswers]);

  // =================== COMPUTED DISPLAY ===================
  const getDisplayData = useCallback(() => {
    const exerciseCounter = `${currentExerciseIndex + 1} / ${totalExercises}`;
    
    return {
      exerciseCounter,
      currentExercise,
      exerciseType: currentExercise.type
    };
  }, [currentExerciseIndex, totalExercises, currentExercise]);

  // =================== VALIDATION ===================
  const canGoToPrevious = useCallback(() => {
    return currentExerciseIndex > 0;
  }, [currentExerciseIndex]);

  const isLastExercise = useCallback(() => {
    return currentExerciseIndex === totalExercises - 1;
  }, [currentExerciseIndex, totalExercises]);

  const isExerciseCompleted = useCallback((exerciseIndex) => {
    return completedExercises.includes(exerciseIndex);
  }, [completedExercises]);

  const hasValidData = spellingData?.exercises && 
                      Array.isArray(spellingData.exercises) && 
                      spellingData.exercises.length > 0;

  return {
    // State
    currentExerciseIndex,
    userInput,
    showHint,
    showFeedback,
    isCorrect,
    completedExercises,
    userAnswers,
    loaded,
    showDetailedProgress,
    
    // Data
    currentExercise,
    totalExercises,
    exercises,
    
    // Actions
    setCurrentExerciseIndex,
    setUserInput,
    toggleHint,
    toggleDetailedProgress,
    checkAnswer,
    handleNext,
    handlePrevious,
    retryExercise,
    resetExerciseState,
    
    // Computed
    canGoToPrevious: canGoToPrevious(),
    isLastExercise: isLastExercise(),
    isExerciseCompleted,
    hasValidData,
    stats: getStats(),
    display: getDisplayData(),
  };
};

export default useSpelling;