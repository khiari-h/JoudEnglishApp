import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook personnalisé pour gérer la progression dans les exercices de grammaire
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useGrammarProgress = (level) => {
  // États pour suivre la progression
  const [completedExercises, setCompletedExercises] = useState({});
  const [lastPosition, setLastPosition] = useState({ ruleIndex: 0, exerciseIndex: 0 });
  const [userAnswers, setUserAnswers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Clés pour AsyncStorage
  const COMPLETED_EXERCISES_KEY = `grammar_completed_${level}`;
  const LAST_POSITION_KEY = `grammar_position_${level}`;
  const USER_ANSWERS_KEY = `grammar_answers_${level}`;

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
          : { ruleIndex: 0, exerciseIndex: 0 };
        
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
        setCompletedExercises({});
        setLastPosition({ ruleIndex: 0, exerciseIndex: 0 });
        setUserAnswers([]);
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [COMPLETED_EXERCISES_KEY, LAST_POSITION_KEY, USER_ANSWERS_KEY]);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(async (ruleIndex, exerciseIndex) => {
    try {
      const newPosition = { 
        ruleIndex, 
        exerciseIndex,
        timestamp: Date.now() // Ajout du timestamp pour suivre la dernière activité
      };
      setLastPosition(newPosition);
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(newPosition));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la position:', error);
    }
  }, [LAST_POSITION_KEY]);

  // Marquer un exercice comme complété
  const markExerciseAsCompleted = useCallback(async (ruleIndex, exerciseIndex, isCorrect, answer) => {
    try {
      // Mettre à jour les exercices complétés
      const updatedCompletedExercises = { ...completedExercises };
      
      if (!updatedCompletedExercises[ruleIndex]) {
        updatedCompletedExercises[ruleIndex] = [];
      }
      
      if (!updatedCompletedExercises[ruleIndex].includes(exerciseIndex)) {
        updatedCompletedExercises[ruleIndex].push(exerciseIndex);
        setCompletedExercises(updatedCompletedExercises);
        await AsyncStorage.setItem(COMPLETED_EXERCISES_KEY, JSON.stringify(updatedCompletedExercises));
      }
      
      // Sauvegarder la réponse de l'utilisateur
      const newAnswer = {
        ruleIndex,
        exerciseIndex,
        isCorrect,
        userAnswer: answer,
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
  const initializeProgress = useCallback((grammarData) => {
    if (!initialized && loaded && grammarData) {
      const rules = grammarData || [];
      const newCompletedExercises = { ...completedExercises };
      
      rules.forEach((_, index) => {
        if (!newCompletedExercises[index]) {
          newCompletedExercises[index] = [];
        }
      });
      
      setCompletedExercises(newCompletedExercises);
      setInitialized(true);
    }
  }, [completedExercises, initialized, loaded]);

  return {
    completedExercises,
    lastPosition,
    userAnswers,
    loaded,
    saveLastPosition,
    markExerciseAsCompleted,
    initializeProgress
  };
};

export default useGrammarProgress;