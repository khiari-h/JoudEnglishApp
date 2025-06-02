// hooks/useExerciseTracking.js
/**
 * Hook composé pour tracker le temps d'un exercice
 * Combine useTimer + useExerciseStorage
 */

import { useState, useCallback, useEffect } from 'react';
import useTimer from './useTimer.js';
import useExerciseStorage from './useExerciseStorage.js';
import { TIMER_CONFIG } from '../utils/timeConstants.js';

const useExerciseTracking = () => {
  const timer = useTimer();
  const storage = useExerciseStorage();
  
  // État du tracking
  const [currentExercise, setCurrentExercise] = useState(null);
  const [sessionStats, setSessionStats] = useState({});
  
  // Démarrer le tracking d'un exercice
  const startTracking = useCallback((exerciseType) => {
    if (!storage.isValidExerciseType(exerciseType)) {
      console.error(`Invalid exercise type: ${exerciseType}`);
      return false;
    }
    
    // Arrêter le tracking précédent s'il y en a un
    if (currentExercise) {
      stopTracking();
    }
    
    // Démarrer le nouveau tracking
    const success = timer.start();
    if (success) {
      setCurrentExercise(exerciseType);
      setSessionStats(prev => ({
        ...prev,
        [exerciseType]: 0
      }));
    }
    
    return success;
  }, [currentExercise, timer, storage]);
  
  // Arrêter et sauvegarder le tracking
  const stopTracking = useCallback(() => {
    if (!currentExercise) {
      return { exerciseType: null, timeSpent: 0, saved: false };
    }
    
    const timeSpent = timer.stop();
    let saved = false;
    
    // Sauvegarder seulement si c'est significatif
    if (timeSpent >= TIMER_CONFIG.MIN_SESSION_SECONDS) {
      saved = storage.addTime(currentExercise, timeSpent);
      
      if (saved) {
        setSessionStats(prev => ({
          ...prev,
          [currentExercise]: (prev[currentExercise] || 0) + timeSpent
        }));
      }
    }
    
    const result = {
      exerciseType: currentExercise,
      timeSpent,
      saved
    };
    
    setCurrentExercise(null);
    return result;
  }, [currentExercise, timer, storage]);
  
  // Pause le tracking (garde l'exercice actuel)
  const pauseTracking = useCallback(() => {
    return timer.pause();
  }, [timer]);
  
  // Reprendre le tracking
  const resumeTracking = useCallback(() => {
    return timer.resume();
  }, [timer]);
  
  // Auto-save périodique pour éviter la perte de données
  useEffect(() => {
    if (!currentExercise || !timer.isRunning) {
      return;
    }
    
    const autoSaveInterval = setInterval(() => {
      if (timer.elapsedTime >= TIMER_CONFIG.MIN_SESSION_SECONDS) {
        // Sauvegarder le temps accumulé sans arrêter le timer
        storage.addTime(currentExercise, timer.elapsedTime);
        // Reset le timer pour éviter la double comptabilisation
        const wasRunning = timer.isRunning;
        timer.reset();
        if (wasRunning) {
          timer.start();
        }
      }
    }, TIMER_CONFIG.AUTO_SAVE_INTERVAL_MS);
    
    return () => clearInterval(autoSaveInterval);
  }, [currentExercise, timer, storage]);
  
  // Obtenir les stats formatées pour l'affichage
  const getFormattedStats = useCallback(() => {
    const allStats = storage.getAllStats();
    const formatted = {};
    
    Object.entries(allStats).forEach(([exerciseType, timeInSeconds]) => {
      formatted[exerciseType] = Math.floor(timeInSeconds / 60); // En minutes pour l'affichage
    });
    
    return formatted;
  }, [storage]);
  
  // Obtenir le temps total d'un exercice (incluant la session en cours)
  const getTotalTime = useCallback((exerciseType) => {
    const storedTime = storage.getTime(exerciseType);
    const sessionTime = currentExercise === exerciseType ? timer.elapsedTime : 0;
    return storedTime + sessionTime;
  }, [storage, currentExercise, timer.elapsedTime]);
  
  // Obtenir les infos de debug
  const getDebugInfo = useCallback(() => {
    return {
      timer: {
        isRunning: timer.isRunning,
        elapsedTime: timer.elapsedTime,
        canStart: timer.canStart,
        canStop: timer.canStop
      },
      storage: storage.getDebugInfo(),
      tracking: {
        currentExercise,
        sessionStats
      }
    };
  }, [timer, storage, currentExercise, sessionStats]);
  
  // Cleanup automatique à la destruction
  useEffect(() => {
    return () => {
      if (currentExercise && timer.isRunning) {
        // Auto-save final
        const timeSpent = timer.elapsedTime;
        if (timeSpent >= TIMER_CONFIG.MIN_SESSION_SECONDS) {
          storage.addTime(currentExercise, timeSpent);
        }
      }
    };
  }, [currentExercise, timer, storage]);
  
  return {
    // État du tracking
    isTracking: !!currentExercise,
    currentExercise,
    currentSessionTime: timer.elapsedTime,
    isRunning: timer.isRunning,
    
    // Actions de tracking
    startTracking,
    stopTracking,
    pauseTracking,
    resumeTracking,
    
    // Données et stats
    getFormattedStats,
    getTotalTime,
    getAllStats: storage.getAllStats,
    
    // État du storage
    isLoaded: storage.isLoaded,
    error: storage.error,
    
    // Actions de maintenance
    resetExercise: storage.resetExercise,
    resetAll: storage.resetAll,
    
    // Debug
    getDebugInfo
  };
};

export default useExerciseTracking;