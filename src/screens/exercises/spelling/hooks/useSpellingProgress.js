// src/screens/exercises/spelling/hooks/useSpellingProgress.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook personnalisé pour gérer la progression dans les exercices d'orthographe
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 * @param {string} exerciseType - Type d'exercice (correction, rules, homophones)
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
        let savedPosition;
        
        try {
          // Tenter de parser comme un objet (nouveau format)
          const parsedPosition = JSON.parse(savedPositionJson);
          savedPosition = typeof parsedPosition === 'object' && parsedPosition !== null 
            ? parsedPosition.exerciseIndex 
            : parsedPosition || 0;
        } catch (e) {
          // Fallback au cas où c'est juste un nombre (ancien format)
          savedPosition = Number(savedPositionJson) || 0;
        }
        
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
      
      // Stocker comme un objet avec timestamp au lieu d'un simple nombre
      const positionData = {
        exerciseIndex,
        exerciseType,
        timestamp: Date.now()
      };
      
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(positionData));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la position:', error);
    }
  }, [LAST_POSITION_KEY, exerciseType]);

  // Marquer un exercice comme complété
  const markExerciseAsCompleted = useCallback(async (exerciseIndex, isCorrect, userAnswer, correctAnswer, additionalData = {}) => {
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
        exerciseType, // ✨ Ajout pour traçabilité
        timestamp: Date.now(),
        ...additionalData // ✨ Pour données spécifiques (ex: choix disponibles pour homophones)
      };
      
      const updatedUserAnswers = [...userAnswers, newAnswer];
      setUserAnswers(updatedUserAnswers);
      await AsyncStorage.setItem(USER_ANSWERS_KEY, JSON.stringify(updatedUserAnswers));
      
    } catch (error) {
      console.error('Erreur lors du marquage de l\'exercice comme complété:', error);
    }
  }, [completedExercises, userAnswers, COMPLETED_EXERCISES_KEY, USER_ANSWERS_KEY, exerciseType]);

  // Initialiser la progression
  const initializeProgress = useCallback((exercises) => {
    if (!initialized && loaded && exercises) {
      setInitialized(true);
    }
  }, [initialized, loaded]);

  // Calculer la progression globale
  const calculateProgress = useCallback((totalExercises) => {
    if (completedExercises.length === 0 || totalExercises <= 0) return 0;
    return (completedExercises.length / totalExercises) * 100;
  }, [completedExercises]);

  // Vérifier si un exercice est complété
  const isExerciseCompleted = useCallback((exerciseIndex) => {
    return completedExercises.includes(exerciseIndex);
  }, [completedExercises]);

  // ✨ Nouvelle fonction pour obtenir les statistiques par type
  const getStatsByType = useCallback(() => {
    const typeAnswers = userAnswers.filter(answer => answer.exerciseType === exerciseType);
    const correct = typeAnswers.filter(answer => answer.isCorrect).length;
    const total = typeAnswers.length;
    
    return {
      correct,
      total,
      accuracy: total > 0 ? (correct / total) * 100 : 0
    };
  }, [userAnswers, exerciseType]);

  return {
    completedExercises,
    lastPosition,
    userAnswers,
    loaded,
    saveLastPosition,
    markExerciseAsCompleted,
    initializeProgress,
    calculateProgress,
    isExerciseCompleted,
    getStatsByType 
  };
};

export default useSpellingProgress;