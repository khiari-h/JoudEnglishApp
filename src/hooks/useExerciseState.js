// src/hooks/useExerciseState.js - OPTIMISÉ
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

/**
 * Hook pour gérer l'état d'un exercice (questions, réponses, navigation)
 * OPTIMISÉ - Timer corrigé, calculs mémorisés
 */
const useExerciseState = (initialExercises = [], options = {}) => {
  // Options par défaut - MÉMORISÉES
  const {
    randomize = false,
    limitCount = null,
    autoSubmit = false,
    showResults = true,
    trackTime = true,
  } = useMemo(() => options, [options]);

  // Fonction utilitaire pour mélanger un tableau - MÉMORISÉE
  const shuffleArray = useCallback((array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }, []);

  // Exercices traités - MÉMORISÉS
  const exercises = useMemo(() => {
    return randomize ? shuffleArray(initialExercises) : initialExercises;
  }, [initialExercises, randomize, shuffleArray]);

  // Calcul du nombre d'exercices selon la limite éventuelle - MÉMORISÉ
  const effectiveExercises = useMemo(() => {
    return limitCount ? exercises.slice(0, limitCount) : exercises;
  }, [exercises, limitCount]);

  // États
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => Array(effectiveExercises.length).fill(null));
  const [results, setResults] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Références pour le timer
  const timerRef = useRef(null);
  const startTimeRef = useRef(new Date());
  const endTimeRef = useRef(null);

  // ✅ FIX : Timer géré par useEffect au lieu de useState
  useEffect(() => {
    if (trackTime && !isCompleted) {
      startTimeRef.current = new Date();

      timerRef.current = setInterval(() => {
        setTimeSpent(Math.floor((new Date() - startTimeRef.current) / 1000));
      }, 1000);

      // Cleanup function
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [trackTime, isCompleted]);

  // Mettre à jour answers quand effectiveExercises change
  useEffect(() => {
    setAnswers(Array(effectiveExercises.length).fill(null));
  }, [effectiveExercises.length]);

  // Fonction pour vérifier une réponse - MÉMORISÉE
  const checkAnswer = useCallback((exercise, userAnswer) => {
    if (!userAnswer) return false;

    // Si l'exercice a une fonction personnalisée pour vérifier la réponse
    if (exercise.checkAnswer) {
      return exercise.checkAnswer(userAnswer);
    }

    const correctAnswer = exercise.answer || exercise.correctAnswer;

    // Gestion des réponses à choix multiples
    if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
      return (
        userAnswer.length === correctAnswer.length &&
        userAnswer.every(answer => correctAnswer.includes(answer))
      );
    }

    // Réponse simple
    return userAnswer === correctAnswer;
  }, []);

  // Calculer les résultats - MÉMORISÉ avec bonnes dépendances
  const calculateResults = useCallback(() => {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    const detailedResults = effectiveExercises.map((exercise, index) => {
      const userAnswer = answers[index];
      const isCorrect = checkAnswer(exercise, userAnswer);
      const isSkipped = userAnswer === null || userAnswer === undefined;

      if (isCorrect) correct++;
      else if (isSkipped) skipped++;
      else incorrect++;

      return {
        question: exercise.question || `Question ${index + 1}`,
        correctAnswer: exercise.answer || exercise.correctAnswer,
        userAnswer,
        isCorrect,
        isSkipped,
      };
    });

    const finalTimeSpent = trackTime && endTimeRef.current 
      ? Math.floor((endTimeRef.current - startTimeRef.current) / 1000)
      : timeSpent;

    return {
      total: effectiveExercises.length,
      correct,
      incorrect,
      skipped,
      score: Math.round((correct / effectiveExercises.length) * 100),
      detailedResults,
      timeSpent: trackTime ? finalTimeSpent : null,
    };
  }, [effectiveExercises, answers, checkAnswer, trackTime, timeSpent]);

  // Compléter l'exercice - OPTIMISÉ
  const completeExercise = useCallback(() => {
    // Arrêter le timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    endTimeRef.current = new Date();
    setIsCompleted(true);

    // Calculer les résultats
    if (showResults) {
      const calculatedResults = calculateResults();
      setResults(calculatedResults);
      return calculatedResults;
    }

    return null;
  }, [showResults, calculateResults]);

  // Navigation vers l'exercice suivant - OPTIMISÉ
  const nextExercise = useCallback(() => {
    if (currentIndex < effectiveExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return true;
    } else if (!isCompleted) {
      completeExercise();
      return false;
    }
    return false;
  }, [currentIndex, effectiveExercises.length, isCompleted, completeExercise]);

  // Navigation vers l'exercice précédent - OPTIMISÉ
  const previousExercise = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      return true;
    }
    return false;
  }, [currentIndex]);

  // Aller à un exercice spécifique - OPTIMISÉ
  const goToExercise = useCallback((index) => {
    if (index >= 0 && index < effectiveExercises.length) {
      setCurrentIndex(index);
      return true;
    }
    return false;
  }, [effectiveExercises.length]);

  // Enregistrer une réponse - OPTIMISÉ
  const saveAnswer = useCallback((answer, index = currentIndex) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = answer;
      return newAnswers;
    });

    // Si autoSubmit est activé et c'est la dernière question
    if (autoSubmit && index === effectiveExercises.length - 1) {
      completeExercise();
    }
  }, [currentIndex, effectiveExercises.length, autoSubmit, completeExercise]);

  // Réinitialiser l'exercice - OPTIMISÉ
  const resetExercise = useCallback(() => {
    setCurrentIndex(0);
    setAnswers(Array(effectiveExercises.length).fill(null));
    setResults(null);
    setIsCompleted(false);
    setTimeSpent(0);

    // Réinitialiser les refs
    endTimeRef.current = null;

    // Le timer sera redémarré automatiquement par useEffect
    // grâce au changement d'isCompleted
  }, [effectiveExercises.length]);

  // Progression calculée - MÉMORISÉE
  const progress = useMemo(() => ({
    current: currentIndex + 1,
    total: effectiveExercises.length,
    percentage: Math.round(((currentIndex + 1) / effectiveExercises.length) * 100),
  }), [currentIndex, effectiveExercises.length]);

  // Exercice actuel - MÉMORISÉ
  const currentExercise = useMemo(() => {
    return effectiveExercises[currentIndex];
  }, [effectiveExercises, currentIndex]);

  return {
    // État actuel
    currentExercise,
    currentIndex,
    exercises: effectiveExercises,
    answers,
    isCompleted,
    results,
    timeSpent,
    progress,

    // Actions
    nextExercise,
    previousExercise,
    goToExercise,
    saveAnswer,
    completeExercise,
    resetExercise,
  };
};

export default useExerciseState;
