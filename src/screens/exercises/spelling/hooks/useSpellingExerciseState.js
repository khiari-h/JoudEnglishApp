// src/screens/exercises/spelling/hooks/useSpellingExerciseState.js
import { useState, useEffect, useCallback } from 'react';
import { getSpellingData } from '../../../../utils/spelling/spellingDataHelper';

/**
 * Hook personnalisé pour gérer l'état des exercices d'orthographe
 * 
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 * @param {string} exerciseType - Type d'exercice (correction, rules)
 */
const useSpellingExerciseState = (level, exerciseType) => {
  // États pour gérer l'exercice
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState(0);

  // Charger les données d'exercice
  useEffect(() => {
    const data = getSpellingData(level, exerciseType);
    if (data && data.exercises) {
      setExercises(data.exercises);
    }
  }, [level, exerciseType]);

  // Mettre à jour la progression
  useEffect(() => {
    if (exercises.length > 0) {
      const newProgress = ((currentExerciseIndex) / exercises.length) * 100;
      setProgress(newProgress);
    }
  }, [currentExerciseIndex, exercises.length]);

  // Obtenir l'exercice actuel
  const getCurrentExercise = useCallback(() => {
    return exercises[currentExerciseIndex] || null;
  }, [exercises, currentExerciseIndex]);

  // Basculer l'affichage de l'indice
  const toggleHint = useCallback(() => {
    setShowHint(!showHint);
  }, [showHint]);

  // Vérifier la réponse
  const checkAnswer = useCallback(() => {
    const currentExercise = getCurrentExercise();
    if (!currentExercise || !userInput.trim()) return false;

    // Comparer la réponse de l'utilisateur avec la réponse correcte
    const userAnswer = userInput.trim().toLowerCase();
    const correctAnswer = currentExercise.correctAnswer.toLowerCase();
    const correct = userAnswer === correctAnswer;

    setIsCorrect(correct);
    setShowFeedback(true);
    
    return correct;
  }, [userInput, getCurrentExercise]);

  // Passer à l'exercice suivant
  const nextExercise = useCallback(() => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      resetExerciseState();
    } else {
      // Tous les exercices sont terminés
      console.log('All exercises completed!');
    }
  }, [currentExerciseIndex, exercises.length]);

  // Réessayer l'exercice actuel
  const retryExercise = useCallback(() => {
    resetExerciseState();
  }, []);

  // Réinitialiser l'état pour un nouvel exercice
  const resetExerciseState = useCallback(() => {
    setUserInput('');
    setShowHint(false);
    setShowFeedback(false);
    setIsCorrect(false);
  }, []);

  return {
    exercises,
    currentExerciseIndex,
    setCurrentExerciseIndex,
    currentExercise: getCurrentExercise(),
    totalExercises: exercises.length,
    progress,
    userInput,
    showHint,
    showFeedback,
    isCorrect,
    setUserInput,
    toggleHint,
    checkAnswer,
    nextExercise,
    retryExercise,
    resetExerciseState
  };
};

export default useSpellingExerciseState;