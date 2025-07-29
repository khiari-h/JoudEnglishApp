// src/hooks/useQuizEngine.js
import { useState, useCallback } from 'react';

const useQuizEngine = (questions = []) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const goToNextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, totalQuestions]);

  const handleAnswer = useCallback((choice) => {
    if (showResult || !currentQuestion) return;

    setSelectedAnswer(choice);
    setShowResult(true);

    if (choice === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  }, [showResult, currentQuestion]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsFinished(false);
  }, []);

  return {
    currentIndex, currentQuestion, score, selectedAnswer,
    showResult, isFinished, progress, totalQuestions,
    handleAnswer, handleRestart, goToNextQuestion,
  };
};

export default useQuizEngine;