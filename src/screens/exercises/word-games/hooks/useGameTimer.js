// src/screens/exercises/wordGames/hooks/useGameTimer.js
import { useState, useRef, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer le timer des jeux
 */
const useGameTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);

  // Gérer le timer
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timerActive, timeLeft]);

  // Démarrer le timer
  const startTimer = () => {
    setTimerActive(true);
  };

  // Arrêter le timer
  const stopTimer = () => {
    setTimerActive(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  // Réinitialiser le timer
  const resetTimer = (time = 0) => {
    stopTimer();
    setTimeLeft(time);
  };

  return {
    timeLeft,
    timerActive,
    startTimer,
    stopTimer,
    resetTimer
  };
};

export default useGameTimer;