// src/hooks/useProgress.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook pour gérer la progression de l'utilisateur dans l'application
 */
const useProgress = () => {
  // État principal pour stocker les données de progression
  const [progress, setProgress] = useState({
    // Progression globale par niveau
    levels: {
      1: { completed: 0, total: 100 },
      2: { completed: 0, total: 100 },
      3: { completed: 0, total: 100 },
      4: { completed: 0, total: 100 },
      5: { completed: 0, total: 100 },
      6: { completed: 0, total: 100 },
      bonus: { completed: 0, total: 100 },
    },
    // Progression par type d'exercice et niveau
    exercises: {
      vocabulary: {
        1: { completed: 0, total: 100 },
        2: { completed: 0, total: 100 },
        3: { completed: 0, total: 100 },
        4: { completed: 0, total: 100 },
        5: { completed: 0, total: 100 },
        6: { completed: 0, total: 100 },
        bonus: { completed: 0, total: 100 },
      },
      phrases: {
        1: { completed: 0, total: 100 },
        2: { completed: 0, total: 100 },
        3: { completed: 0, total: 100 },
        4: { completed: 0, total: 100 },
        5: { completed: 0, total: 100 },
        6: { completed: 0, total: 100 },
        bonus: { completed: 0, total: 100 },
      },
      grammar: {
        1: { completed: 0, total: 100 },
        2: { completed: 0, total: 100 },
        3: { completed: 0, total: 100 },
        4: { completed: 0, total: 100 },
        5: { completed: 0, total: 100 },
        6: { completed: 0, total: 100 },
      },
      spelling: {
        1: { completed: 0, total: 100 },
        2: { completed: 0, total: 100 },
        3: { completed: 0, total: 100 },
        4: { completed: 0, total: 100 },
        5: { completed: 0, total: 100 },
        6: { completed: 0, total: 100 },
      },
      reading: {
        1: { completed: 0, total: 100 },
        2: { completed: 0, total: 100 },
        3: { completed: 0, total: 100 },
        4: { completed: 0, total: 100 },
        5: { completed: 0, total: 100 },
        6: { completed: 0, total: 100 },
        bonus: { completed: 0, total: 100 },
      },
      errorCorrection: {
        1: { completed: 0, total: 100 },
        2: { completed: 0, total: 100 },
        3: { completed: 0, total: 100 },
        4: { completed: 0, total: 100 },
        5: { completed: 0, total: 100 },
        6: { completed: 0, total: 100 },
      },
      conversations: {
        1: { completed: 0, total: 100 },
        2: { completed: 0, total: 100 },
        3: { completed: 0, total: 100 },
        4: { completed: 0, total: 100 },
        5: { completed: 0, total: 100 },
        6: { completed: 0, total: 100 },
      },
      wordGames: {
        1: { completed: 0, total: 100 },
        2: { completed: 0, total: 100 },
        3: { completed: 0, total: 100 },
        4: { completed: 0, total: 100 },
        5: { completed: 0, total: 100 },
        6: { completed: 0, total: 100 },
      },
      assessment: {
        1: { completed: 0, total: 100 },
        2: { completed: 0, total: 100 },
        3: { completed: 0, total: 100 },
        4: { completed: 0, total: 100 },
        5: { completed: 0, total: 100 },
        6: { completed: 0, total: 100 },
      },
    },
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
  });

  // Chargement initial des données de progression
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const storedProgress = await AsyncStorage.getItem('userProgress');
        
        if (storedProgress) {
          setProgress(JSON.parse(storedProgress));
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };

    loadProgress();
  }, []);

  // Sauvegarde de la progression lorsqu'elle change
  useEffect(() => {
    const saveProgress = async () => {
      try {
        await AsyncStorage.setItem('userProgress', JSON.stringify(progress));
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    };

    saveProgress();
  }, [progress]);

  // Mise à jour de la progression d'un exercice
  const updateExerciseProgress = useCallback((exerciseType, level, completed, total = 100) => {
    setProgress(prevProgress => {
      // Copie pour éviter de modifier directement l'état
      const newProgress = { ...prevProgress };
      
      // Mise à jour de la progression de l'exercice spécifique
      if (newProgress.exercises[exerciseType] && newProgress.exercises[exerciseType][level]) {
        newProgress.exercises[exerciseType][level] = { 
          completed, 
          total 
        };
      }
      
      // Recalcul de la progression globale du niveau
      const levelExercises = Object.keys(newProgress.exercises)
        .filter(type => newProgress.exercises[type][level])
        .map(type => newProgress.exercises[type][level]);
      
      if (levelExercises.length > 0) {
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
      }
      
      // Mise à jour de la dernière activité
      newProgress.lastActivity = {
        type: exerciseType,
        level,
        timestamp: new Date().toISOString(),
      };
      
      return newProgress;
    });
  }, []);

  // Mise à jour du streak et d'autres statistiques
  const updateStats = useCallback((statsUpdates) => {
    setProgress(prevProgress => {
      const newProgress = { ...prevProgress };
      newProgress.stats = { ...newProgress.stats, ...statsUpdates };
      return newProgress;
    });
  }, []);

  // Réinitialisation de la progression
  const resetProgress = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('userProgress');
      setProgress({
        levels: {
          1: { completed: 0, total: 100 },
          2: { completed: 0, total: 100 },
          3: { completed: 0, total: 100 },
          4: { completed: 0, total: 100 },
          5: { completed: 0, total: 100 },
          6: { completed: 0, total: 100 },
          bonus: { completed: 0, total: 100 },
        },
        exercises: {
          vocabulary: {
            1: { completed: 0, total: 100 },
            2: { completed: 0, total: 100 },
            3: { completed: 0, total: 100 },
            4: { completed: 0, total: 100 },
            5: { completed: 0, total: 100 },
            6: { completed: 0, total: 100 },
            bonus: { completed: 0, total: 100 },
          },
          // ... autres exercices avec la même structure
        },
        lastActivity: {
          type: null,
          level: null,
          timestamp: null,
        },
        stats: {
          streak: 0,
          totalTimeSpent: 0,
          correctAnswers: 0,
          totalAnswers: 0,
          exercisesCompleted: 0,
          lastLogin: null,
        },
      });
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  }, []);

  // Calculer la progression globale de l'application
  const calculateGlobalProgress = useCallback(() => {
    const allLevels = Object.keys(progress.levels);
    if (allLevels.length === 0) return 0;

    const totalCompleted = allLevels.reduce((sum, levelKey) => {
      return sum + (progress.levels[levelKey]?.completed || 0);
    }, 0);

    const averageProgress = totalCompleted / allLevels.length;
    return Math.round(averageProgress);
  }, [progress.levels]);

  // Calculer la progression d'un niveau spécifique en temps réel
  const calculateLevelProgress = useCallback((level) => {
    return progress.levels[level]?.completed || 0;
  }, [progress.levels]);

  return {
    progress,
    updateExerciseProgress,
    updateStats,
    resetProgress,
    calculateGlobalProgress,
    calculateLevelProgress,
  };
};

export default useProgress;