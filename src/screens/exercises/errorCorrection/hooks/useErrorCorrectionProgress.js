// src/screens/exercises/errorCorrection/hooks/useErrorCorrectionProgress.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useErrorCorrectionProgress = (level) => {
  const [completedExercises, setCompletedExercises] = useState({});
  const [lastPosition, setLastPosition] = useState({ 
    categoryIndex: 0, 
    exerciseIndex: 0 
  });
  const [loaded, setLoaded] = useState(false);

  // Clés pour AsyncStorage
  const COMPLETED_EXERCISES_KEY = `error_correction_completed_${level}`;
  const LAST_POSITION_KEY = `error_correction_position_${level}`;

  // Charger les données sauvegardées
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedCompletedExercisesJson = await AsyncStorage.getItem(COMPLETED_EXERCISES_KEY);
        const savedCompletedExercises = savedCompletedExercisesJson 
          ? JSON.parse(savedCompletedExercisesJson) 
          : {};
        
        const savedPositionJson = await AsyncStorage.getItem(LAST_POSITION_KEY);
        const savedPosition = savedPositionJson 
          ? JSON.parse(savedPositionJson) 
          : { categoryIndex: 0, exerciseIndex: 0 };
        
        setCompletedExercises(savedCompletedExercises);
        setLastPosition(savedPosition);
        setLoaded(true);
      } catch (error) {
        console.error('Erreur lors du chargement des données de progression:', error);
        setLoaded(true);
      }
    };

    loadSavedData();
  }, []);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(async (categoryIndex, exerciseIndex) => {
    try {
      const newPosition = { 
        categoryIndex, 
        exerciseIndex,
        timestamp: Date.now()  // Ajout du timestamp pour suivre la dernière activité
      };
      setLastPosition(newPosition);
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(newPosition));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la position:', error);
    }
  }, []);

  // Marquer un exercice comme complété
  const markExerciseAsCompleted = useCallback(async (categoryIndex, exerciseIndex, isCorrect, userAnswer) => {
    try {
      const updatedCompletedExercises = { ...completedExercises };
      
      if (!updatedCompletedExercises[categoryIndex]) {
        updatedCompletedExercises[categoryIndex] = [];
      }

      // Ajouter l'exercice complété avec des détails
      const exerciseResult = {
        index: exerciseIndex,
        isCorrect,
        userAnswer,
        completedAt: new Date().toISOString()
      };

      // Éviter les doublons
      if (!updatedCompletedExercises[categoryIndex].some(
        ex => ex.index === exerciseIndex
      )) {
        updatedCompletedExercises[categoryIndex].push(exerciseResult);
        
        setCompletedExercises(updatedCompletedExercises);
        await AsyncStorage.setItem(
          COMPLETED_EXERCISES_KEY, 
          JSON.stringify(updatedCompletedExercises)
        );
      }
    } catch (error) {
      console.error('Erreur lors du marquage de l\'exercice comme complété:', error);
    }
  }, [completedExercises]);

  // Calculer la progression globale
  const calculateOverallProgress = useCallback(() => {
    const totalCategories = Object.keys(completedExercises).length;
    if (totalCategories === 0) return 0;
    
    const completedCategories = Object.values(completedExercises)
      .filter(exercises => exercises.length > 0)
      .length;
    
    return (completedCategories / totalCategories) * 100;
  }, [completedExercises]);

  return {
    completedExercises,
    lastPosition,
    loaded,
    saveLastPosition,
    markExerciseAsCompleted,
    calculateOverallProgress
  };
};

export default useErrorCorrectionProgress;