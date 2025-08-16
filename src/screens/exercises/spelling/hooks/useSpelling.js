// src/screens/exercises/spelling/hooks/useSpelling.js - VERSION CORRIGÉE

import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSpelling = (spellingData, level, exerciseType) => {
  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, fallback = null) => {
    console.warn(`Spelling storage error in ${operation}:`, error);
    return fallback;
  };

  // =================== STORAGE KEY ===================
  const STORAGE_KEY = `spelling_${level}_${exerciseType}`;

  // =================== STATE ===================
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const isInitialized = useRef(false);

  // =================== COMPUTED VALUES ===================
  const exercises = spellingData?.exercises || [];
  const totalExercises = exercises.length;
  const currentExercise = exercises[currentExerciseIndex];
  const hasValidData = exercises.length > 0;

  // ✅ AJOUTÉ : Debug pour comprendre pourquoi hasValidData est false
  console.log('🔍 DEBUG useSpelling:', {
    spellingData: !!spellingData,
    exercisesLength: exercises.length,
    totalExercises,
    currentExercise: !!currentExercise,
    hasValidData,
    level,
    exerciseType
  });

  // =================== DATA LOADING ===================
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
      // ✅ Gestion d'erreur appropriée
      handleStorageError(error, 'loadStoredData');
      // Fallback: utiliser les valeurs par défaut
    } finally {
      setLoaded(true);
    }
  }, [STORAGE_KEY, totalExercises]);

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
      // ✅ Gestion d'erreur appropriée
      handleStorageError(error, 'saveToStorage');
      // Fallback: continuer sans sauvegarde
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
        default: {
          const userAnswer = String(userInput).trim().toLowerCase();
          const correctAnswer = String(currentExercise.correctAnswer).trim().toLowerCase();
          correct = userAnswer === correctAnswer;
          break;
        }
      }

      setIsCorrect(correct);
      setShowFeedback(true);
      return correct;

    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      console.warn('Error checking spelling answer:', error);
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
      isCorrect,
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