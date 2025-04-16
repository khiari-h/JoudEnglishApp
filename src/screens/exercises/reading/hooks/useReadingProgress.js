// src/components/screens/exercises/reading/hooks/useReadingProgress.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook personnalisé pour gérer la progression dans les exercices de lecture
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useReadingProgress = (level) => {
  // États pour suivre la progression
  const [completedQuestions, setCompletedQuestions] = useState({});
  const [loaded, setLoaded] = useState(false);
  
  // Clés pour AsyncStorage
  const COMPLETED_QUESTIONS_KEY = `reading_completed_${level}`;
  
  // Charger les données sauvegardées
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedCompletedQuestionsJson = await AsyncStorage.getItem(COMPLETED_QUESTIONS_KEY);
        const savedCompletedQuestions = savedCompletedQuestionsJson 
          ? JSON.parse(savedCompletedQuestionsJson) 
          : {};
        
        setCompletedQuestions(savedCompletedQuestions);
        setLoaded(true);
      } catch (error) {
        console.error('Erreur lors du chargement des données de progression:', error);
        setCompletedQuestions({});
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [COMPLETED_QUESTIONS_KEY]);
  
  // Vérifier si une question est complétée
  const isQuestionCompleted = useCallback((exerciseIndex, questionIndex) => {
    return completedQuestions[exerciseIndex]?.includes(questionIndex) || false;
  }, [completedQuestions]);
  
  // Marquer une question comme complétée
  const markQuestionAsCompleted = useCallback(async (exerciseIndex, questionIndex) => {
    try {
      // Vérifier si la question est déjà complétée
      if (isQuestionCompleted(exerciseIndex, questionIndex)) {
        return;
      }
      
      // Mettre à jour l'état
      const updatedCompletedQuestions = { ...completedQuestions };
      
      if (!updatedCompletedQuestions[exerciseIndex]) {
        updatedCompletedQuestions[exerciseIndex] = [];
      }
      
      updatedCompletedQuestions[exerciseIndex].push(questionIndex);
      setCompletedQuestions(updatedCompletedQuestions);
      
      // Sauvegarder dans AsyncStorage
      await AsyncStorage.setItem(
        COMPLETED_QUESTIONS_KEY,
        JSON.stringify(updatedCompletedQuestions)
      );
    } catch (error) {
      console.error('Erreur lors du marquage de la question comme complétée:', error);
    }
  }, [completedQuestions, isQuestionCompleted, COMPLETED_QUESTIONS_KEY]);
  
  // Réinitialiser la progression d'un exercice
  const resetExerciseProgress = useCallback(async (exerciseIndex) => {
    try {
      const updatedCompletedQuestions = { ...completedQuestions };
      updatedCompletedQuestions[exerciseIndex] = [];
      
      setCompletedQuestions(updatedCompletedQuestions);
      
      // Sauvegarder dans AsyncStorage
      await AsyncStorage.setItem(
        COMPLETED_QUESTIONS_KEY,
        JSON.stringify(updatedCompletedQuestions)
      );
    } catch (error) {
      console.error('Erreur lors de la réinitialisation de la progression:', error);
    }
  }, [completedQuestions, COMPLETED_QUESTIONS_KEY]);
  
  // Calculer la progression globale
  const calculateProgress = useCallback((exerciseIndex, totalQuestions) => {
    const completed = completedQuestions[exerciseIndex]?.length || 0;
    return totalQuestions > 0 ? (completed / totalQuestions) * 100 : 0;
  }, [completedQuestions]);
  
  // Vérifier si tous les exercices sont complétés
  const areAllQuestionsCompleted = useCallback((exercisesData) => {
    if (!exercisesData || exercisesData.length === 0) {
      return false;
    }
    
    return exercisesData.every((exercise, index) => {
      const questionsCount = exercise.questions?.length || 0;
      const completedCount = completedQuestions[index]?.length || 0;
      return questionsCount > 0 && completedCount === questionsCount;
    });
  }, [completedQuestions]);
  
  // Initialiser les questions complétées pour de nouveaux exercices
  const initializeCompletedQuestions = useCallback((exercisesData) => {
    if (!exercisesData || exercisesData.length === 0 || Object.keys(completedQuestions).length > 0) {
      return;
    }
    
    const initialCompletedQuestions = {};
    exercisesData.forEach((_, index) => {
      initialCompletedQuestions[index] = [];
    });
    
    setCompletedQuestions(initialCompletedQuestions);
  }, [completedQuestions]);
  
  return {
    completedQuestions,
    loaded,
    isQuestionCompleted,
    markQuestionAsCompleted,
    resetExerciseProgress,
    calculateProgress,
    areAllQuestionsCompleted,
    initializeCompletedQuestions,
  };
};

export default useReadingProgress;