// src/contexts/ProgressContext.js
import React, { createContext, useState, useEffect } from 'react';
import { storageService } from '../utils/storageUtils'; 
import { LEVELS, EXERCISE_TYPES } from '../utils/constants';

// Créer le contexte
export const ProgressContext = createContext();

/**
 * Structure initiale de la progression
 */
const createInitialProgress = () => {
  // Créer un objet pour tous les niveaux
  const levels = {};
  LEVELS.forEach(level => {
    levels[level] = { completed: 0, total: 100 };
  });

  // Créer un objet pour tous les types d'exercices
  const exercises = {};
  Object.keys(EXERCISE_TYPES).forEach(type => {
    exercises[type] = {};

    // Pour chaque niveau dans ce type d'exercice
    LEVELS.forEach(level => {
      exercises[type][level] = { completed: 0, total: 100 };
    });
  });

  return {
    // Progression globale par niveau
    levels,

    // Progression par type d'exercice et niveau
    exercises,

    // Dernière activité
    lastActivity: {
      type: null,
      level: null,
      timestamp: null,
    },

    // Statistiques
    stats: {
      streak: 0,
      totalTimeSpent: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      exercisesCompleted: 0,
      lastLogin: null,
    },

    // Exercices complétés (identifiants)
    completedExercises: {},
  };
};

/**
 * Fournisseur de contexte pour gérer la progression de l'utilisateur
 */
export const ProgressProvider = ({ children }) => {
  // État
  const [progress, setProgress] = useState(createInitialProgress());
  const [isLoading, setIsLoading] = useState(true);

  // Charger la progression au démarrage
  useEffect(() => {
    let mounted = true;

    const loadProgress = async () => {
      try {
        setIsLoading(true);
        const savedProgress = await storageService.getProgress();

        if (mounted && savedProgress) {
          setProgress(savedProgress);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadProgress();

    return () => {
      mounted = false;
    };
  }, []); // ← Dépendances vides = une seule fois

  // Sauvegarder la progression lorsqu'elle change
  useEffect(() => {
    let timeoutId;

    if (!isLoading) {
      // Debounce pour éviter trop de sauvegardes
      timeoutId = setTimeout(() => {
        storageService.saveProgress(progress);
      }, 500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [progress, isLoading]);

  // Mettre à jour la progression d'un exercice spécifique
  const updateExerciseProgress = (exerciseType, level, completed, total = 100) => {
    setProgress(prevProgress => {
      // Vérifier que l'exerciceType et le level existent
      if (!prevProgress.exercises[exerciseType] || !prevProgress.exercises[exerciseType][level]) {
        console.warn(`Exercise type ${exerciseType} or level ${level} not found`);
        return prevProgress;
      }

      // Copie pour éviter de modifier directement l'état
      const newProgress = { ...prevProgress };

      // Mise à jour de la progression de l'exercice spécifique
      newProgress.exercises[exerciseType][level] = { 
        completed: Math.min(Math.max(0, completed), total), // Entre 0 et total
        total
      };

      // Recalcul de la progression globale du niveau
      const levelExercises = Object.keys(newProgress.exercises).map(
        type => newProgress.exercises[type][level]
      );

      const totalCompleted = levelExercises.reduce(
        (sum, exercise) => sum + exercise.completed, 0
      );

      const totalPossible = levelExercises.reduce(
        (sum, exercise) => sum + exercise.total, 0
      );

      newProgress.levels[level] = {
        completed: Math.round((totalCompleted / totalPossible) * 100),
        total: 100
      };

      // Mise à jour de la dernière activité
      newProgress.lastActivity = {
        type: exerciseType,
        level,
        timestamp: new Date().toISOString(),
      };

      return newProgress;
    });
  };

  // Mettre à jour les statistiques
  const updateStats = (newStats) => {
    setProgress(prevProgress => ({
      ...prevProgress,
      stats: {
        ...prevProgress.stats,
        ...newStats
      }
    }));
  };

  // Mettre à jour le streak
  const updateStreak = async () => {
    try {
      const streakData = await storageService.updateStreak();

      if (streakData) {
        updateStats({
          streak: streakData.currentStreak,
          lastLogin: streakData.lastLoginDate
        });
      }

      return streakData?.currentStreak || 0;
    } catch (error) {
      console.error('Error updating streak:', error);
      return 0;
    }
  };

  // Marquer un exercice comme complété
  const markExerciseCompleted = async (exerciseId, level, score, metadata = {}) => {
    try {
      const result = await storageService.markExerciseCompleted(exerciseId, level, score);

      if (result) {
        setProgress(prevProgress => {
          const newProgress = { ...prevProgress };

          // Ajouter l'exercice aux exercices complétés
          newProgress.completedExercises[exerciseId] = {
            level,
            score,
            completedAt: new Date().toISOString(),
            ...metadata
          };

          // Incrémenter le compteur d'exercices complétés
          newProgress.stats.exercisesCompleted += 1;

          return newProgress;
        });
      }

      return result;
    } catch (error) {
      console.error('Error marking exercise completed:', error);
      return false;
    }
  };

  // Vérifier si un exercice est complété
  const isExerciseCompleted = (exerciseId) => {
    return Boolean(progress.completedExercises[exerciseId]);
  };

  // Enregistrer les résultats d'exercice
  const saveExerciseResults = (exerciseType, level, results) => {
    if (!results) return;

    // Mise à jour des statistiques globales
    updateStats({
      correctAnswers: progress.stats.correctAnswers + results.correct,
      totalAnswers: progress.stats.totalAnswers + results.total,
      totalTimeSpent: progress.stats.totalTimeSpent + (results.timeSpent || 0),
    });

    // Calculer la progression en pourcentage
    const completedPercentage = Math.round((results.correct / results.total) * 100);

    // Mettre à jour la progression de l'exercice
    updateExerciseProgress(exerciseType, level, completedPercentage);

    // Si l'exercice a un ID, le marquer comme complété
    if (results.exerciseId) {
      markExerciseCompleted(results.exerciseId, level, completedPercentage, {
        correct: results.correct,
        total: results.total,
        timeSpent: results.timeSpent,
      });
    }

    return completedPercentage;
  };

  // Réinitialiser toute la progression
  const resetProgress = async () => {
    try {
      await storageService.resetAllData();
      setProgress(createInitialProgress());
      return true;
    } catch (error) {
      console.error('Error resetting progress:', error);
      return false;
    }
  };

  // Valeur fournie par le contexte
  const contextValue = {
    progress,
    updateExerciseProgress,
    updateStats,
    updateStreak,
    markExerciseCompleted,
    isExerciseCompleted,
    saveExerciseResults,
    resetProgress,
    isLoading,
  };

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;