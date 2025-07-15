// hooks/useSpelling.js - BOUCLES INFINIES CORRIGÉES

import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSpelling = (spellingData = null, level = "1", exerciseType = "correction") => {

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const isInitialized = useRef(false);

  const exercises = spellingData?.exercises || [];
  const totalExercises = exercises.length;
  
  const hasValidData = !!(
    spellingData?.exercises && 
    Array.isArray(spellingData.exercises) && 
    spellingData.exercises.length > 0
  );

  const currentExercise = exercises[currentExerciseIndex] || null;
  
  // ✅ STORAGE_KEY STABLE
  const STORAGE_KEY = `spelling_${level}_${exerciseType}`;

  // ✅ FONCTION STABLE avec useCallback et dépendances fixes
  const loadStoredData = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        
        setCompletedExercises(data.completedExercises || []);
        setUserAnswers(data.userAnswers || []);
        
        if (data.lastPosition?.exerciseIndex !== undefined && 
            data.lastPosition.exerciseIndex >= 0 && 
            data.lastPosition.exerciseIndex < totalExercises) {
          setCurrentExerciseIndex(data.lastPosition.exerciseIndex);
        }
      }
    } catch (error) {
      // Silently fail
    } finally {
      setLoaded(true);
    }
  }, [STORAGE_KEY]); // ✅ SEULEMENT STORAGE_KEY

  // ✅ EFFET SIMPLIFIÉ - une seule fois
  useEffect(() => {
    if (!isInitialized.current) {
      loadStoredData();
      isInitialized.current = true;
    }
  }, [loadStoredData]);

  // ✅ SAVE FONCTION STABLE
  const saveToStorage = useCallback(async (dataToSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      // Silently fail
    }
  }, [STORAGE_KEY]);

  const resetExerciseState = useCallback(() => {
    setUserInput('');
    setShowHint(false);
    setShowFeedback(false);
    setIsCorrect(false);
  }, []);

  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev);
  }, []);

  const checkAnswer = useCallback(() => {
    if (!currentExercise?.correctAnswer) {
      Alert.alert('Erreur', 'Réponse correcte non définie');
      return false;
    }

    try {
      let correct = false;

      switch (currentExercise.type) {
        case 'homophones':
          correct = userInput === currentExercise.correctAnswer;
          break;
        case 'correction':
        case 'spelling_rule':
        default:
          const userAnswer = String(userInput).trim().toLowerCase();
          const correctAnswer = String(currentExercise.correctAnswer).trim().toLowerCase();
          correct = userAnswer === correctAnswer;
          break;
      }

      setIsCorrect(correct);
      setShowFeedback(true);
      return correct;

    } catch (error) {
      setIsCorrect(false);
      setShowFeedback(true);
      return false;
    }
  }, [userInput, currentExercise]);

  const handleNext = useCallback(() => {
    // Marquer comme complété
    const newCompleted = completedExercises.includes(currentExerciseIndex) 
      ? completedExercises 
      : [...completedExercises, currentExerciseIndex];

    const newAnswer = {
      exerciseIndex: currentExerciseIndex,
      isCorrect: isCorrect,
      userAnswer: userInput,
      correctAnswer: currentExercise?.correctAnswer || '',
      exerciseType: currentExercise?.type || 'correction',
      timestamp: Date.now()
    };

    const newAnswers = [...userAnswers, newAnswer];

    // Sauvegarder immédiatement
    const dataToSave = {
      completedExercises: newCompleted,
      userAnswers: newAnswers,
      lastPosition: {
        exerciseIndex: currentExerciseIndex < totalExercises - 1 ? currentExerciseIndex + 1 : currentExerciseIndex,
        exerciseType,
        timestamp: Date.now()
      }
    };

    saveToStorage(dataToSave);

    // Mettre à jour les states
    setCompletedExercises(newCompleted);
    setUserAnswers(newAnswers);

    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      resetExerciseState();
    } else {
      Alert.alert(
        "Félicitations", 
        `Vous avez terminé tous les exercices d'orthographe ${exerciseType} du niveau ${level} !`
      );
      return { completed: true };
    }
    
    return { completed: false };
  }, [
    currentExerciseIndex, 
    totalExercises, 
    isCorrect, 
    userInput, 
    currentExercise, 
    completedExercises, 
    userAnswers, 
    saveToStorage, 
    resetExerciseState, 
    exerciseType, 
    level
  ]);

  const retryExercise = useCallback(() => {
    resetExerciseState();
  }, [resetExerciseState]);

  const stats = {
    totalExercises,
    completedExercisesCount: completedExercises.length,
    totalProgress: totalExercises > 0 ? Math.round((completedExercises.length / totalExercises) * 100) : 0,
    remainingExercises: totalExercises - completedExercises.length,
    performance: {
      total: userAnswers.length,
      correct: userAnswers.filter(answer => answer.isCorrect).length,
      incorrect: userAnswers.filter(answer => !answer.isCorrect).length,
      accuracy: userAnswers.length > 0 ? Math.round((userAnswers.filter(answer => answer.isCorrect).length / userAnswers.length) * 100) : 0
    },
    completedExercises,
    userAnswers
  };

  const isLastExercise = currentExerciseIndex === totalExercises - 1;

  return {
    currentExerciseIndex,
    userInput,
    showHint,
    showFeedback,
    isCorrect,
    completedExercises,
    userAnswers,
    loaded,
    currentExercise,
    totalExercises,
    exercises,
    setUserInput,
    toggleHint,
    checkAnswer,
    handleNext,
    retryExercise,
    resetExerciseState,
    isLastExercise,
    hasValidData,
    stats,
  };
};

export default useSpelling;