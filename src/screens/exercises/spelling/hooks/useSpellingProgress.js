// src/screens/exercises/spelling/hooks/useSpellingProgress.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook personnalisé pour gérer la progression dans les exercices d'orthographe
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 * @param {string} exerciseType - Type d'exercice (correction, rules)
 */
const useSpellingProgress = (level, exerciseType) => {
  // États pour suivre la progression
  const [completedExercises, setCompletedExercises] = useState([]);
  const [lastPosition, setLastPosition] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Clés pour AsyncStorage
  const COMPLETED_EXERCISES_KEY = `spelling_${exerciseType}_completed_${level}`;
  const LAST_POSITION_KEY = `spelling_${exerciseType}_position_${level}`;
  const USER_ANSWERS_KEY = `spelling_${exerciseType}_answers_${level}`;

  // Charger les données sauvegardées
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Récupérer les exercices complétés
        const savedCompletedExercisesJson = await AsyncStorage.getItem(COMPLETED_EXERCISES_KEY);
        const savedCompletedExercises = savedCompletedExercisesJson 
          ? JSON.parse(savedCompletedExercisesJson) 
          : [];
        
        // Récupérer la dernière position
        const savedPositionJson = await AsyncStorage.getItem(LAST_POSITION_KEY);
        const savedPosition = savedPositionJson 
          ? JSON.parse(savedPositionJson) 
          : 0;
        
        // Récupérer les réponses de l'utilisateur
        const savedAnswersJson = await AsyncStorage.getItem(USER_ANSWERS_KEY);
        const savedAnswers = savedAnswersJson 
          ? JSON.parse(savedAnswersJson) 
          : [];
        
        setCompletedExercises(savedCompletedExercises);
        setLastPosition(savedPosition);
        setUserAnswers(savedAnswers);
        setLoaded(true);
      } catch (error) {
        console.error('Erreur lors du chargement des données de progression:', error);
        setCompletedExercises([]);
        setLastPosition(0);
        setUserAnswers([]);
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [COMPLETED_EXERCISES_KEY, LAST_POSITION_KEY, USER_ANSWERS_KEY]);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(async (exerciseIndex) => {
    try {
      setLastPosition(exerciseIndex);
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(exerciseIndex));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la position:', error);
    }
  }, [LAST_POSITION_KEY]);

  // Marquer un exercice comme complété
  const markExerciseAsCompleted = useCallback(async (exerciseIndex, isCorrect, userAnswer, correctAnswer) => {
    try {
      // Mettre à jour les exercices complétés
      const updatedCompletedExercises = [...completedExercises];
      
      if (!updatedCompletedExercises.includes(exerciseIndex)) {
        updatedCompletedExercises.push(exerciseIndex);
        setCompletedExercises(updatedCompletedExercises);
        await AsyncStorage.setItem(COMPLETED_EXERCISES_KEY, JSON.stringify(updatedCompletedExercises));
      }
      
      // Sauvegarder la réponse de l'utilisateur
      const newAnswer = {
        exerciseIndex,
        isCorrect,
        userAnswer,
        correctAnswer,
        timestamp: Date.now()
      };
      
      const updatedUserAnswers = [...userAnswers, newAnswer];
      setUserAnswers(updatedUserAnswers);
      await AsyncStorage.setItem(USER_ANSWERS_KEY, JSON.stringify(updatedUserAnswers));
      
    } catch (error) {
      console.error('Erreur lors du marquage de l\'exercice comme complété:', error);
    }
  }, [completedExercises, userAnswers, COMPLETED_EXERCISES_KEY, USER_ANSWERS_KEY]);

  // Initialiser la progression
  const initializeProgress = useCallback((exercises) => {
    if (!initialized && loaded && exercises) {
      setInitialized(true);
    }
  }, [initialized, loaded]);

  // Calculer la progression globale
  const calculateProgress = useCallback(() => {
    if (completedExercises.length === 0) return 0;
    return (completedExercises.length / totalExercises) * 100;
  }, [completedExercises]);

  // Vérifier si un exercice est complété
  const isExerciseCompleted = useCallback((exerciseIndex) => {
    return completedExercises.includes(exerciseIndex);
  }, [completedExercises]);

  return {
    completedExercises,
    lastPosition,
    userAnswers,
    loaded,
    saveLastPosition,
    markExerciseAsCompleted,
    initializeProgress,
    calculateProgress,
    isExerciseCompleted
  };
};

export default useSpellingProgress;