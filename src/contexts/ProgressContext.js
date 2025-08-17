import { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, LANGUAGE_LEVELS, EXERCISES, BONUS_EXERCISES } from '../utils/constants';
import PropTypes from 'prop-types';

// Créer les contextes pour une meilleure séparation
export const ProgressContext = createContext();
export const ProgressReadContext = createContext();
export const ProgressWriteContext = createContext();

/**
 * Fonction pour générer l'état de progression initial
 */
export const createInitialProgress = () => {
  const exercises = {};
  
  Object.keys(EXERCISES).forEach(exerciseType => {
    exercises[exerciseType] = {};
    Object.keys(LANGUAGE_LEVELS).forEach(levelId => {
      if (levelId === 'bonus') {
        if (BONUS_EXERCISES.includes(exerciseType)) {
          exercises[exerciseType][levelId] = { completed: 0, total: 100 };
        }
      } else {
        exercises[exerciseType][levelId] = { completed: 0, total: 100 };
      }
    });
  });

  return {
    exercises,
    stats: {
      streak: 0,
      totalTimeSpent: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      exercisesCompleted: 0,
      lastLogin: null,
    },
    lastActivity: {
      type: null,
      level: null,
      timestamp: null,
    },
  };
};

// Fournisseur du contexte
export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(createInitialProgress());
  const [isLoading, setIsLoading] = useState(true);
  
  const saveTimeoutRef = useRef(null);
  const isInitialLoad = useRef(true);

  // ========== CHARGEMENT INITIAL depuis AsyncStorage ==========
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
        if (stored) {
          const parsed = JSON.parse(stored);
          setProgress(parsed);
        }
      } catch (error) {
        console.error('Erreur chargement progression:', error);
      } finally {
        setIsLoading(false);
        isInitialLoad.current = false;
      }
    };
    loadProgress();
  }, []);

  // ========== SAUVEGARDE AUTOMATIQUE (avec Debounce) ==========
  useEffect(() => {
    if (isLoading || isInitialLoad.current) {
      return;
    }
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
      } catch (error) {
        console.error('Erreur sauvegarde progression:', error);
      }
    }, 500);
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [progress, isLoading]);

  // ========== MÉTHODES GESTION DE LA PROGRESSION ==========

  const updateExerciseProgress = useCallback((exerciseType, level, completed) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      
      // S'assurer que l'objet de progression pour l'exercice existe
      if (!newProgress.exercises[exerciseType]) {
        newProgress.exercises[exerciseType] = {};
      }
      if (!newProgress.exercises[exerciseType][level]) {
        newProgress.exercises[exerciseType][level] = { completed: 0, total: 100 };
      }
      
      // Mettre à jour la progression de l'exercice
      newProgress.exercises[exerciseType][level].completed = Math.min(Math.max(0, completed), 100);
      
      // Mettre à jour la dernière activité
      newProgress.lastActivity = {
        type: exerciseType,
        level,
        timestamp: new Date().toISOString(),
      };
      return newProgress;
    });
  }, []);

  const updateStats = useCallback((newStats) => {
    setProgress(prev => ({ ...prev, stats: { ...prev.stats, ...newStats } }));
  }, []);

  const resetProgress = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
      setProgress(createInitialProgress());
      return true;
    } catch (error) {
      console.error('Erreur reset progression:', error);
      return false;
    }
  }, []);

  // ========== FONCTIONS DE CALCUL (calculées à la volée) ==========

  const calculateLevelProgress = useCallback((level) => {
    const levelExercises = Object.keys(EXERCISES).filter(type => {
      if (level === 'bonus') {
        return BONUS_EXERCISES.includes(type);
      }
      return true;
    }).map(type => 
      progress.exercises[type]?.[level]?.completed || 0
    );

    if (levelExercises.length === 0) {
      return 0;
    }
    
    const averageProgress = levelExercises.reduce((sum, val) => sum + val, 0) / levelExercises.length;
    return Math.round(averageProgress);
  }, [progress.exercises]);

  const calculateGlobalProgress = useCallback(() => {
    const allLevels = Object.keys(LANGUAGE_LEVELS);
    if (allLevels.length === 0) {
      return 0;
    }

    const totalLevelProgress = allLevels.reduce((sum, levelId) => {
      const levelProgress = calculateLevelProgress(levelId);
      return sum + levelProgress;
    }, 0);

    return Math.round(totalLevelProgress / allLevels.length);
  }, [calculateLevelProgress]);
  
  // ========== VALEURS DU CONTEXTE MÉMORISÉES ==========

  const contextValue = useMemo(() => ({
    progress,
    isLoading,
    updateExerciseProgress,
    updateStats,
    calculateGlobalProgress,
    calculateLevelProgress,
    resetProgress,
  }), [
    progress, 
    isLoading, 
    updateExerciseProgress, 
    updateStats, 
    calculateGlobalProgress, 
    calculateLevelProgress, 
    resetProgress
  ]);

  const readValue = useMemo(() => ({
    progress,
    isLoading,
    calculateGlobalProgress,
    calculateLevelProgress,
  }), [progress, isLoading, calculateGlobalProgress, calculateLevelProgress]);

  const writeValue = useMemo(() => ({
    updateExerciseProgress,
    updateStats,
    resetProgress,
  }), [updateExerciseProgress, updateStats, resetProgress]);

  // ========== STRUCTURE DU FOURNISSEUR ==========
  return (
    <ProgressReadContext.Provider value={readValue}>
      <ProgressWriteContext.Provider value={writeValue}>
        <ProgressContext.Provider value={contextValue}>
          {children}
        </ProgressContext.Provider>
      </ProgressWriteContext.Provider>
    </ProgressReadContext.Provider>
  );
};

// ========== HOOKS POUR CONSOMMER LE CONTEXTE ==========
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const useProgressRead = () => {
  const context = useContext(ProgressReadContext);
  if (!context) {
    throw new Error('useProgressRead must be used within a ProgressProvider');
  }
  return context;
};

export const useProgressWrite = () => {
  const context = useContext(ProgressWriteContext);
  if (!context) {
    throw new Error('useProgressWrite must be used within a ProgressProvider');
  }
  return context;
};

ProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};