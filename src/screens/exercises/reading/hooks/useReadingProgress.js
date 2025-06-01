// src/screens/exercises/reading/hooks/useReadingProgress.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook personnalisé pour gérer la progression globale des exercices de lecture
 * 
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 */
const useReadingProgress = (level) => {
  // États pour suivre la progression
  const [completedExercises, setCompletedExercises] = useState({});
  const [lastPosition, setLastPosition] = useState({ exerciseIndex: 0, questionIndex: 0 });
  const [loaded, setLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Clés pour AsyncStorage
  const COMPLETED_EXERCISES_KEY = `reading_completed_${level}`;
  const LAST_POSITION_KEY = `reading_position_${level}`;

  // Charger les données sauvegardées
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Récupérer les exercices complétés
        const savedCompletedExercisesJson = await AsyncStorage.getItem(COMPLETED_EXERCISES_KEY);
        const savedCompletedExercises = savedCompletedExercisesJson 
          ? JSON.parse(savedCompletedExercisesJson) 
          : {};

        // Récupérer la dernière position
        const savedPositionJson = await AsyncStorage.getItem(LAST_POSITION_KEY);
        const savedPosition = savedPositionJson 
          ? JSON.parse(savedPositionJson) 
          : { exerciseIndex: 0, questionIndex: 0 };

        setCompletedExercises(savedCompletedExercises);
        setLastPosition(savedPosition);
        setLoaded(true);
      } catch (error) {

        setCompletedExercises({});
        setLastPosition({ exerciseIndex: 0, questionIndex: 0 });
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [COMPLETED_EXERCISES_KEY, LAST_POSITION_KEY]);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(async (exerciseIndex, questionIndex) => {
    try {
      const newPosition = { 
        exerciseIndex, 
        questionIndex,
        timestamp: Date.now() // Ajout du timestamp pour suivre la dernière activité
      };
      setLastPosition(newPosition);
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(newPosition));
    } catch (error) {

    }
  }, [LAST_POSITION_KEY]);

  // Marquer un exercice comme complété
  const markExerciseAsCompleted = useCallback(async (exerciseIndex, completedQuestions) => {
    try {
      const updatedCompletedExercises = { ...completedExercises };

      if (!updatedCompletedExercises[exerciseIndex]) {
        updatedCompletedExercises[exerciseIndex] = {
          completedAt: new Date().toISOString(),
          completedQuestions
        };
      } else {
        updatedCompletedExercises[exerciseIndex] = {
          ...updatedCompletedExercises[exerciseIndex],
          completedAt: new Date().toISOString(),
          completedQuestions
        };
      }

      setCompletedExercises(updatedCompletedExercises);
      await AsyncStorage.setItem(COMPLETED_EXERCISES_KEY, JSON.stringify(updatedCompletedExercises));
    } catch (error) {

    }
  }, [completedExercises, COMPLETED_EXERCISES_KEY]);

  // Mettre à jour la progression d'un exercice
  const updateExerciseProgress = useCallback(async (exerciseIndex, completedQuestions) => {
    try {
      const updatedCompletedExercises = { ...completedExercises };

      if (!updatedCompletedExercises[exerciseIndex]) {
        updatedCompletedExercises[exerciseIndex] = {
          updatedAt: new Date().toISOString(),
          completedQuestions
        };
      } else {
        updatedCompletedExercises[exerciseIndex] = {
          ...updatedCompletedExercises[exerciseIndex],
          updatedAt: new Date().toISOString(),
          completedQuestions
        };
      }

      setCompletedExercises(updatedCompletedExercises);
      await AsyncStorage.setItem(COMPLETED_EXERCISES_KEY, JSON.stringify(updatedCompletedExercises));
    } catch (error) {

    }
  }, [completedExercises, COMPLETED_EXERCISES_KEY]);

  // Initialiser la progression
  const initializeProgress = useCallback((readingData) => {
    if (!initialized && loaded && readingData) {
      const exercises = readingData.exercises || [];
      const newCompletedExercises = { ...completedExercises };

      // Vérifier si les données correspondent aux exercices disponibles
      exercises.forEach((_, index) => {
        // Initialiser uniquement les entrées manquantes
        if (!newCompletedExercises[index]) {
          newCompletedExercises[index] = null;
        }
      });

      setCompletedExercises(newCompletedExercises);
      setInitialized(true);
    }
  }, [completedExercises, initialized, loaded]);

  // Calculer la progression globale
  const calculateOverallProgress = useCallback(() => {
    const totalExercises = Object.keys(completedExercises).length;
    if (totalExercises === 0) return 0;

    const completedCount = Object.values(completedExercises).filter(Boolean).length;
    return (completedCount / totalExercises) * 100;
  }, [completedExercises]);

  return {
    completedExercises,
    lastPosition,
    loaded,
    saveLastPosition,
    markExerciseAsCompleted,
    updateExerciseProgress,
    initializeProgress,
    calculateOverallProgress
  };
};

export default useReadingProgress;
