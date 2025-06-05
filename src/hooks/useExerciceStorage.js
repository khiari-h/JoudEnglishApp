// hooks/useExerciseStorage.js - VERSION CORRIGÉE
/**
 * Hook pour gérer le stockage des temps d'exercice
 * Responsabilité unique : persistance des données
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  readFromStorage, 
  writeToStorage, 
  resetStorage,
  getStorageInfo 
} from '../utils/storageUtils.js';
import { DEFAULT_STATS, EXERCISE_TYPES } from '../utils/timeConstants.js';
import { sanitizeTimeStats, isValidTimeInSeconds } from '../utils/timeUtils.js';

const useExerciseStorage = () => {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  // Charger les données au montage
  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        const storageData = await readFromStorage(); // ✅ CORRIGÉ - ajout await
        
        if (storageData?.data) {
          const sanitizedStats = sanitizeTimeStats(storageData.data);
          // Fusionner avec les defaults pour s'assurer qu'on a tous les exercices
          const completeStats = { ...DEFAULT_STATS, ...sanitizedStats };
          setStats(completeStats);
        } else {
          setStats(DEFAULT_STATS);
        }
        
        setIsLoaded(true);
      } catch (err) {
        console.error('Error loading exercise storage:', err);
        setError(err.message);
        setStats(DEFAULT_STATS);
        setIsLoaded(true);
      }
    };
    
    loadData();
  }, []);
  
  // Sauvegarder les stats
  const saveStats = useCallback(async (newStats) => {
    try {
      const sanitizedStats = sanitizeTimeStats(newStats);
      const success = await writeToStorage(undefined, sanitizedStats); // ✅ CORRIGÉ - ajout await
      
      if (success) {
        setStats(sanitizedStats);
        setError(null);
        return true;
      } else {
        throw new Error('Failed to write to storage');
      }
    } catch (err) {
      console.error('Error saving stats:', err);
      setError(err.message);
      return false;
    }
  }, []);
  
  // Ajouter du temps à un exercice
  const addTime = useCallback(async (exerciseType, timeInSeconds) => {
    // Validation des paramètres
    if (!Object.values(EXERCISE_TYPES).includes(exerciseType)) {
      setError(`Invalid exercise type: ${exerciseType}`);
      return false;
    }
    
    if (!isValidTimeInSeconds(timeInSeconds)) {
      setError(`Invalid time value: ${timeInSeconds}`);
      return false;
    }
    
    if (timeInSeconds <= 0) {
      return true; // Rien à ajouter mais pas d'erreur
    }
    
    const newStats = {
      ...stats,
      [exerciseType]: (stats[exerciseType] || 0) + timeInSeconds
    };
    
    return await saveStats(newStats); // ✅ CORRIGÉ - ajout await
  }, [stats, saveStats]);
  
  // Obtenir le temps pour un exercice (en secondes)
  const getTime = useCallback((exerciseType) => {
    if (!Object.values(EXERCISE_TYPES).includes(exerciseType)) {
      return 0;
    }
    
    return stats[exerciseType] || 0;
  }, [stats]);
  
  // Obtenir toutes les stats
  const getAllStats = useCallback(() => {
    return { ...stats };
  }, [stats]);
  
  // Remettre à zéro un exercice
  const resetExercise = useCallback(async (exerciseType) => {
    if (!Object.values(EXERCISE_TYPES).includes(exerciseType)) {
      setError(`Invalid exercise type: ${exerciseType}`);
      return false;
    }
    
    const newStats = {
      ...stats,
      [exerciseType]: 0
    };
    
    return await saveStats(newStats); // ✅ CORRIGÉ - ajout await
  }, [stats, saveStats]);
  
  // Remettre à zéro toutes les stats
  const resetAll = useCallback(async () => {
    try {
      const success = await resetStorage(); // ✅ CORRIGÉ - ajout await
      if (success) {
        setStats(DEFAULT_STATS);
        setError(null);
        return true;
      } else {
        throw new Error('Failed to reset storage');
      }
    } catch (err) {
      console.error('Error resetting storage:', err);
      setError(err.message);
      return false;
    }
  }, []);
  
  // Obtenir les infos de debug
  const getDebugInfo = useCallback(async () => {
    const storageInfo = await getStorageInfo(); // ✅ CORRIGÉ - ajout await
    return {
      ...storageInfo,
      currentStats: stats,
      error,
      isLoaded
    };
  }, [stats, error, isLoaded]);
  
  // Calculer le temps total
  const getTotalTime = useCallback(() => {
    return Object.values(stats).reduce((total, time) => total + time, 0);
  }, [stats]);
  
  return {
    // État
    stats,
    isLoaded,
    error,
    
    // Actions principales
    addTime,
    getTime,
    getAllStats,
    
    // Actions de maintenance
    resetExercise,
    resetAll,
    
    // Utilitaires
    getTotalTime,
    getDebugInfo,
    
    // Validation
    isValidExerciseType: (type) => Object.values(EXERCISE_TYPES).includes(type)
  };
};

export default useExerciseStorage;