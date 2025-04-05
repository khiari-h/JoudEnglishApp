// src/hooks/useExerciseState.js
import { useState, useRef, useCallback } from 'react';

/**
 * Hook pour gérer l'état d'un exercice (questions, réponses, navigation)
 */
const useExerciseState = (initialExercises = [], options = {}) => {
  // Options par défaut
  const {
    randomize = false,
    limitCount = null,
    autoSubmit = false,
    showResults = true,
    trackTime = true,
  } = options;

  // États
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exercises, setExercises] = useState(
    randomize ? shuffleArray(initialExercises) : initialExercises
  );
  const [answers, setAnswers] = useState(Array(exercises.length).fill(null));
  const [results, setResults] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(new Date());
  const [endTime, setEndTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const timerRef = useRef(null);

  // Calcul du nombre d'exercices selon la limite éventuelle
  const effectiveExercises = limitCount 
    ? exercises.slice(0, limitCount) 
    : exercises;

  // Démarrer le timer pour suivre le temps passé
  useState(() => {
    if (trackTime) {
      timerRef.current = setInterval(() => {
        setTimeSpent(Math.floor((new Date() - startTime) / 1000));
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Navigation vers l'exercice suivant
  const nextExercise = useCallback(() => {
    if (currentIndex < effectiveExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return true;
    } else if (!isCompleted) {
      completeExercise();
      return false;
    }
    return false;
  }, [currentIndex, effectiveExercises, isCompleted]);

  // Navigation vers l'exercice précédent
  const previousExercise = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      return true;
    }
    return false;
  }, [currentIndex]);

  // Aller à un exercice spécifique
  const goToExercise = useCallback((index) => {
    if (index >= 0 && index < effectiveExercises.length) {
      setCurrentIndex(index);
      return true;
    }
    return false;
  }, [effectiveExercises]);

  // Enregistrer une réponse
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
  }, [currentIndex, effectiveExercises, autoSubmit]);

  // Calculer les résultats
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

    return {
      total: effectiveExercises.length,
      correct,
      incorrect,
      skipped,
      score: Math.round((correct / effectiveExercises.length) * 100),
      detailedResults,
      timeSpent: trackTime ? Math.floor((endTime - startTime) / 1000) : null,
    };
  }, [effectiveExercises, answers, startTime, endTime, trackTime]);

  // Fonction pour vérifier une réponse
  const checkAnswer = (exercise, userAnswer) => {
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
  };

  // Compléter l'exercice
  const completeExercise = useCallback(() => {
    // Arrêter le timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setEndTime(new Date());
    setIsCompleted(true);

    // Calculer les résultats
    if (showResults) {
      const calculatedResults = calculateResults();
      setResults(calculatedResults);
      return calculatedResults;
    }

    return null;
  }, [showResults, calculateResults]);

  // Réinitialiser l'exercice
  const resetExercise = useCallback(() => {
    setCurrentIndex(0);
    setAnswers(Array(exercises.length).fill(null));
    setResults(null);
    setIsCompleted(false);
    setEndTime(null);
    setTimeSpent(0);
    
    // Redémarrer le timer
    if (trackTime) {
      const newStartTime = new Date();
      // Mettre à jour startTime (en créant un nouvel objet Date)
      startTime.setTime(newStartTime.getTime());
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      timerRef.current = setInterval(() => {
        setTimeSpent(Math.floor((new Date() - newStartTime) / 1000));
      }, 1000);
    }
  }, [exercises, trackTime]);

  // Fonction utilitaire pour mélanger un tableau
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  return {
    // État actuel
    currentExercise: effectiveExercises[currentIndex],
    currentIndex,
    exercises: effectiveExercises,
    answers,
    isCompleted,
    results,
    timeSpent,
    progress: {
      current: currentIndex + 1,
      total: effectiveExercises.length,
      percentage: Math.round(((currentIndex + 1) / effectiveExercises.length) * 100),
    },
    
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