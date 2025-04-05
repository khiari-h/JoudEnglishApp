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
      A1: { completed: 0, total: 100 },
      A2: { completed: 0, total: 100 },
      B1: { completed: 0, total: 100 },
      B2: { completed: 0, total: 100 },
      C1: { completed: 0, total: 100 },
      C2: { completed: 0, total: 100 },
    },
    // Progression par type d'exercice et niveau
    exercises: {
      vocabulary: {
        A1: { completed: 0, total: 100 },
        A2: { completed: 0, total: 100 },
        B1: { completed: 0, total: 100 },
        B2: { completed: 0, total: 100 },
        C1: { completed: 0, total: 100 },
        C2: { completed: 0, total: 100 },
      },
      grammar: {
        A1: { completed: 0, total: 100 },
        A2: { completed: 0, total: 100 },
        B1: { completed: 0, total: 100 },
        B2: { completed: 0, total: 100 },
        C1: { completed: 0, total: 100 },
        C2: { completed: 0, total: 100 },
      },
      reading: {
        A1: { completed: 0, total: 100 },
        A2: { completed: 0, total: 100 },
        B1: { completed: 0, total: 100 },
        B2: { completed: 0, total: 100 },
        C1: { completed: 0, total: 100 },
        C2: { completed: 0, total: 100 },
      },
      chatbot: {
        A1: { completed: 0, total: 100 },
        A2: { completed: 0, total: 100 },
        B1: { completed: 0, total: 100 },
        B2: { completed: 0, total: 100 },
        C1: { completed: 0, total: 100 },
        C2: { completed: 0, total: 100 },
      },
      errorCorrection: {
        A1: { completed: 0, total: 100 },
        A2: { completed: 0, total: 100 },
        B1: { completed: 0, total: 100 },
        B2: { completed: 0, total: 100 },
        C1: { completed: 0, total: 100 },
        C2: { completed: 0, total: 100 },
      },
      phrases: {
        A1: { completed: 0, total: 100 },
        A2: { completed: 0, total: 100 },
        B1: { completed: 0, total: 100 },
        B2: { completed: 0, total: 100 },
        C1: { completed: 0, total: 100 },
        C2: { completed: 0, total: 100 },
      },
      spelling: {
        A1: { completed: 0, total: 100 },
        A2: { completed: 0, total: 100 },
        B1: { completed: 0, total: 100 },
        B2: { completed: 0, total: 100 },
        C1: { completed: 0, total: 100 },
        C2: { completed: 0, total: 100 },
      },
      wordGames: {
        A1: { completed: 0, total: 100 },
        A2: { completed: 0, total: 100 },
        B1: { completed: 0, total: 100 },
        B2: { completed: 0, total: 100 },
        C1: { completed: 0, total: 100 },
        C2: { completed: 0, total: 100 },
      },
      assessment: {
        A1: { completed: 0, total: 100 },
        A2: { completed: 0, total: 100 },
        B1: { completed: 0, total: 100 },
        B2: { completed: 0, total: 100 },
        C1: { completed: 0, total: 100 },
        C2: { completed: 0, total: 100 },
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
      newProgress.exercises[exerciseType][level] = { 
        completed, 
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
        // Réinitialiser à l'état initial
        levels: {
          A1: { completed: 0, total: 100 },
          // ...autres niveaux
        },
        exercises: {
          vocabulary: {
            A1: { completed: 0, total: 100 },
            // ...autres niveaux
          },
          // ...autres types d'exercices
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

  return {
    progress,
    updateExerciseProgress,
    updateStats,
    resetProgress,
  };
};

export default useProgress;