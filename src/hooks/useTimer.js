// hooks/useTimer.js
/**
 * Hook pour gérer un timer simple et réutilisable
 * Responsabilité unique : compter le temps écoulé
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { TIMER_CONFIG } from '../utils/timeConstants.js';
import { getElapsedSeconds } from '../utils/timeUtils.js';

const useTimer = () => {
  // État du timer
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Références pour le timer
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  
  // Démarrer le timer
  const start = useCallback(() => {
    if (isRunning) return false; // Déjà en cours
    
    startTimeRef.current = Date.now();
    setIsRunning(true);
    setElapsedTime(0);
    
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = getElapsedSeconds(startTimeRef.current);
        setElapsedTime(elapsed);
      }
    }, TIMER_CONFIG.INTERVAL_MS);
    
    return true;
  }, [isRunning]);
  
  // Arrêter le timer
  const stop = useCallback(() => {
    if (!isRunning) return 0; // Pas en cours
    
    // Calculer le temps final
    const finalTime = startTimeRef.current 
      ? getElapsedSeconds(startTimeRef.current)
      : elapsedTime;
    
    // Nettoyer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setIsRunning(false);
    setElapsedTime(finalTime);
    startTimeRef.current = null;
    
    return finalTime;
  }, [isRunning, elapsedTime]);
  
  // Pause le timer (garde le temps actuel)
  const pause = useCallback(() => {
    if (!isRunning) return false;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setIsRunning(false);
    
    // Garder le temps actuel
    if (startTimeRef.current) {
      const currentTime = getElapsedSeconds(startTimeRef.current);
      setElapsedTime(currentTime);
    }
    
    return true;
  }, [isRunning]);
  
  // Reprendre le timer (depuis la pause)
  const resume = useCallback(() => {
    if (isRunning) return false;
    
    // Ajuster le temps de début pour tenir compte du temps déjà écoulé
    startTimeRef.current = Date.now() - (elapsedTime * 1000);
    setIsRunning(true);
    
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = getElapsedSeconds(startTimeRef.current);
        setElapsedTime(elapsed);
      }
    }, TIMER_CONFIG.INTERVAL_MS);
    
    return true;
  }, [isRunning, elapsedTime]);
  
  // Reset le timer
  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setIsRunning(false);
    setElapsedTime(0);
    startTimeRef.current = null;
    
    return true;
  }, []);
  
  // Cleanup à la destruction du composant
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return {
    // État
    isRunning,
    elapsedTime, // en secondes
    
    // Actions
    start,
    stop,
    pause,
    resume,
    reset,
    
    // Utilitaires
    canStart: !isRunning,
    canStop: isRunning,
    canPause: isRunning,
    canResume: !isRunning && elapsedTime > 0
  };
};

export default useTimer;