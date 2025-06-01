// src/screens/exercises/spelling/hooks/useSpellingExerciseState.js
import { useState, useEffect, useCallback } from 'react';
import { getSpellingData } from '../../../../utils/spelling/spellingDataHelper';

/**
 * Hook personnalisé pour gérer l'état des exercices d'orthographe
 * Version nettoyée : suppression de la logique de progression (comme ErrorCorrection)
 * 
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 * @param {string} exerciseType - Type d'exercice (correction, rules, homophones)
 */
const useSpellingExerciseState = (level, exerciseType) => {
  // États pour gérer l'exercice
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // ❌ SUPPRIMÉ : const [progress, setProgress] = useState(0);

  // Charger les données d'exercice
  useEffect(() => {
    const data = getSpellingData(level, exerciseType);
    if (data && data.exercises) {
      setExercises(data.exercises);
      console.log(`📚 ${data.exercises.length} exercices chargés pour ${exerciseType} niveau ${level}`);
    }
  }, [level, exerciseType]);

  // ❌ SUPPRIMÉ : useEffect pour calculer progress basé sur position

  // Obtenir l'exercice actuel
  const getCurrentExercise = useCallback(() => {
    return exercises[currentExerciseIndex] || null;
  }, [exercises, currentExerciseIndex]);

  // Basculer l'affichage de l'indice
  const toggleHint = useCallback(() => {
    setShowHint(!showHint);
  }, [showHint]);

  // Vérifier la réponse selon le type d'exercice
  const checkAnswer = useCallback(() => {
    const currentExercise = getCurrentExercise();
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
    
    console.log(`${correct ? '✅' : '❌'} Exercice ${currentExerciseIndex}: ${correct ? 'correct' : 'incorrect'}`);
    return correct;
  }, [userInput, getCurrentExercise, currentExerciseIndex]);

  // Passer à l'exercice suivant
  const nextExercise = useCallback(() => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      resetExerciseState();
      console.log(`➡️ Passage exercice ${currentExerciseIndex + 2}/${exercises.length}`);
    } else {
      console.log('🎉 Tous les exercices terminés !');
    }
  }, [currentExerciseIndex, exercises.length]);

  // Réessayer l'exercice actuel
  const retryExercise = useCallback(() => {
    console.log(`🔄 Retry exercice ${currentExerciseIndex + 1}`);
    resetExerciseState();
  }, [currentExerciseIndex]);

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
    // ❌ SUPPRIMÉ : progress,
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