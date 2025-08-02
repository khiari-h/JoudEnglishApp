// src/hooks/useQuizEngine.js
import { useState, useMemo, useCallback } from 'react';

const useQuizEngine = (questions) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const totalQuestions = useMemo(() => {
    if (!Array.isArray(questions)) return 0;
    return questions.length;
  }, [questions]);
  const currentQuestion = useMemo(() => {
    if (!questions || totalQuestions === 0 || currentQuestionIndex >= totalQuestions) {
      return null;
    }
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex, totalQuestions]);

  const progress = useMemo(() => {
    if (totalQuestions === 0) return 0;
    // On calcule le pourcentage de progression
    return ((currentQuestionIndex) / totalQuestions) * 100;
  }, [currentQuestionIndex, totalQuestions]);

  const handleAnswer = useCallback((choice) => {
    if (showResult) return false; // Empêche de répondre à nouveau

    if (!currentQuestion) return false; // Prevent handling answers when no current question

    const isCorrect = choice === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    setSelectedChoice(choice);
    setUserAnswers(prev => [...prev, { question: currentQuestion.word, choice, isCorrect }]);
    setShowResult(true); // Affiche le résultat et attend que l'utilisateur clique sur "Continuer"

    return isCorrect;
  }, [currentQuestion, showResult]);
  const goToNextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedChoice(null); // Réinitialise le choix pour la nouvelle question
      setShowResult(false);   // Cache le résultat pour la nouvelle question
    } else {
      setIsFinished(true); // Fin du quiz
    }
  }, [currentQuestionIndex, totalQuestions]);

  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedChoice(null);
    setShowResult(false);
    setIsFinished(false);
    setUserAnswers([]);
  }, []);

  return {
    currentQuestionIndex, totalQuestions, score, progress,
    currentQuestion, selectedChoice, showResult, isFinished,
    userAnswers, handleAnswer, goToNextQuestion, handleRestart,
  };
};

export default useQuizEngine;