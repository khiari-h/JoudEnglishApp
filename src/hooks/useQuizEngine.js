// src/hooks/useQuizEngine.js
import { useState, useMemo, useCallback } from 'react';

const useQuizEngine = (questions) => {
  // États internes
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // Calcul du nombre total de questions
  const totalQuestions = useMemo(() => {
    return Array.isArray(questions) ? questions.length : 0;
  }, [questions]);

  // Récupération de la question actuelle
  const currentQuestion = useMemo(() => {
    if (!Array.isArray(questions) || questions.length === 0 || currentQuestionIndex >= totalQuestions) {
      return null;
    }
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex, totalQuestions]);

  // Calcul de la progression en pourcentage
  const progress = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return (currentQuestionIndex / totalQuestions) * 100;
  }, [currentQuestionIndex, totalQuestions]);

  // Gestion des réponses
  const handleAnswer = useCallback((choice) => {
    // Bloque les réponses si le résultat est déjà affiché ou s'il n'y a pas de question
    if (showResult || !currentQuestion) {
      return false;
    }

    const isCorrect = choice === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Met à jour les états uniquement si la réponse est autorisée
    setSelectedChoice(choice);
    setUserAnswers(prev => [...prev, {
      question: currentQuestion.word,
      choice,
      isCorrect
    }]);
    setShowResult(true);

    return isCorrect;
  }, [currentQuestion, showResult]);

  // Passage à la question suivante
const goToNextQuestion = useCallback(() => {
  const nextIndex = currentQuestionIndex + 1;
  if (nextIndex < totalQuestions) {
    setCurrentQuestionIndex(nextIndex);
    setSelectedChoice(null);
    setShowResult(false);
  } else {
    // Le quiz est terminé
    setIsFinished(true);
    // met à jour currentQuestionIndex pour que currentQuestion devienne null
    setCurrentQuestionIndex(nextIndex); 
  }
}, [currentQuestionIndex, totalQuestions]);

  // Redémarrage du quiz
  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedChoice(null);
    setShowResult(false);
    setIsFinished(false);
    setUserAnswers([]);
  }, []);

  return {
    currentQuestionIndex,
    totalQuestions,
    score,
    progress,
    currentQuestion,
    selectedChoice,
    showResult,
    isFinished,
    userAnswers,
    handleAnswer,
    goToNextQuestion,
    handleRestart,
  };
};

export default useQuizEngine;
