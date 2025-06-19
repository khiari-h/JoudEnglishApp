// hooks/useExerciseTracking.js - VERSION STABLE
/**
 * Hook composé pour tracker le temps d'un exercice
 * Combine useTimer + useExerciseStorage
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import useTimer from './useTimer.js';
import useExerciseStorage from './useExerciceStorage.js'; // ✅ CORRIGÉ - sans faute
import { TIMER_CONFIG } from '../utils/timeConstants.js';

const useExerciseTracking = () => {
  const timer = useTimer();
  const storage = useExerciseStorage();
  
  // État du tracking
  const [currentExercise, setCurrentExercise] = useState(null);
  const [sessionStats, setSessionStats] = useState({});
  
  // ✅ FIX : Utiliser useRef pour éviter les dépendances instables
  const currentExerciseRef = useRef(null);
  
  // ✅ FIX : Démarrer le tracking avec des dépendances stables
  const startTracking = useCallback((exerciseType) => {
    if (!storage.isValidExerciseType(exerciseType)) {
      console.error(`Invalid exercise type: ${exerciseType}`);
      return false;
    }
    
    // Arrêter le tracking précédent s'il y en a un
    if (currentExerciseRef.current) {
      // Utiliser une version simplifiée pour éviter la dépendance circulaire
      const timeSpent = timer.stop();
      if (timeSpent >= TIMER_CONFIG.MIN_SESSION_SECONDS) {
        storage.addTime(currentExerciseRef.current, timeSpent);
      }
    }
    
    // Démarrer le nouveau tracking
    const success = timer.start();
    if (success) {
      setCurrentExercise(exerciseType);
      currentExerciseRef.current = exerciseType; // ✅ Sync avec ref
      setSessionStats(prev => ({
        ...prev,
        [exerciseType]: 0
      }));
    }
    
    return success;
  }, [timer.start, timer.stop, storage.isValidExerciseType, storage.addTime]); // ✅ Dépendances spécifiques et stables
  
  // ✅ FIX : Arrêter le tracking avec des dépendances stables
  const stopTracking = useCallback(async () => {
    const currentEx = currentExerciseRef.current; // ✅ Utiliser ref
    
    if (!currentEx) {
      return { exerciseType: null, timeSpent: 0, saved: false };
    }
    
    const timeSpent = timer.stop();
    let saved = false;
    
    // Sauvegarder seulement si c'est significatif
    if (timeSpent >= TIMER_CONFIG.MIN_SESSION_SECONDS) {
      saved = await storage.addTime(currentEx, timeSpent);
      
      if (saved) {
        setSessionStats(prev => ({
          ...prev,
          [currentEx]: (prev[currentEx] || 0) + timeSpent
        }));
      }
    }
    
    const result = {
      exerciseType: currentEx,
      timeSpent,
      saved
    };
    
    setCurrentExercise(null);
    currentExerciseRef.current = null; // ✅ Sync avec ref
    return result;
  }, [timer.stop, storage.addTime]); // ✅ Dépendances spécifiques et stables
  
  // ✅ FIX : Pause le tracking avec dépendances stables
  const pauseTracking = useCallback(() => {
    return timer.pause();
  }, [timer.pause]);
  
  // ✅ FIX : Reprendre le tracking avec dépendances stables
  const resumeTracking = useCallback(() => {
    return timer.resume();
  }, [timer.resume]);
  
  // ✅ FIX : Auto-save périodique avec useRef
  useEffect(() => {
    if (!currentExerciseRef.current || !timer.isRunning) {
      return;
    }
    
    const autoSaveInterval = setInterval(async () => {
      const currentEx = currentExerciseRef.current;
      if (currentEx && timer.elapsedTime >= TIMER_CONFIG.MIN_SESSION_SECONDS) {
        // Sauvegarder le temps accumulé sans arrêter le timer
        await storage.addTime(currentEx, timer.elapsedTime);
        // Reset le timer pour éviter la double comptabilisation
        const wasRunning = timer.isRunning;
        timer.reset();
        if (wasRunning) {
          timer.start();
        }
      }
    }, TIMER_CONFIG.AUTO_SAVE_INTERVAL_MS);
    
    return () => clearInterval(autoSaveInterval);
  }, [timer.isRunning, timer.elapsedTime, timer.reset, timer.start, storage.addTime]);
  
  // Obtenir les stats formatées pour l'affichage
  const getFormattedStats = useCallback(() => {
    const allStats = storage.getAllStats();
    const formatted = {};
    
    Object.entries(allStats).forEach(([exerciseType, timeInSeconds]) => {
      formatted[exerciseType] = Math.floor(timeInSeconds / 60); // En minutes pour l'affichage
    });
    
    return formatted;
  }, [storage.getAllStats]);
  
  // Obtenir le temps total d'un exercice (incluant la session en cours)
  const getTotalTime = useCallback((exerciseType) => {
    const storedTime = storage.getTime(exerciseType);
    const sessionTime = currentExerciseRef.current === exerciseType ? timer.elapsedTime : 0;
    return storedTime + sessionTime;
  }, [storage.getTime, timer.elapsedTime]);
  
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
        currentExercise: currentExerciseRef.current,
        sessionStats
      }
    };
  }, [timer.isRunning, timer.elapsedTime, timer.canStart, timer.canStop, storage.getDebugInfo, sessionStats]);
  
  // ✅ FIX : Cleanup automatique avec useRef
  useEffect(() => {
    return () => {
      const currentEx = currentExerciseRef.current;
      if (currentEx && timer.isRunning) {
        // Auto-save final
        const timeSpent = timer.elapsedTime;
        if (timeSpent >= TIMER_CONFIG.MIN_SESSION_SECONDS) {
          storage.addTime(currentEx, timeSpent);
        }
      }
    };
  }, []); // ✅ Cleanup seulement au démontage
  
  // ✅ FIX : Sync entre state et ref
  useEffect(() => {
    currentExerciseRef.current = currentExercise;
  }, [currentExercise]);
  
  return {
    // État du tracking
    isTracking: !!currentExercise,
    currentExercise,
    currentSessionTime: timer.elapsedTime,
    isRunning: timer.isRunning,
    
    // Actions de tracking - ✅ Maintenant stables !
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