import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Hook personnalisé pour gérer la progression dans les exercices de grammaire
 * Version améliorée avec timestamp pour le suivi d'activités
 *
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useGrammarProgress = (level) => {
  // États pour suivre la progression
  const [completedExercises, setCompletedExercises] = useState({});
  const [lastPosition, setLastPosition] = useState({
    ruleIndex: 0,
    exerciseIndex: 0,
  });
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
        const savedCompletedExercisesJson = await AsyncStorage.getItem(
          COMPLETED_EXERCISES_KEY
        );
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

        setCompletedExercises({});
        setLastPosition({ ruleIndex: 0, exerciseIndex: 0 });
        setUserAnswers([]);
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [COMPLETED_EXERCISES_KEY, LAST_POSITION_KEY, USER_ANSWERS_KEY]);

  // Sauvegarder la dernière position avec timestamp
  const saveLastPosition = useCallback(
    async (ruleIndex, exerciseIndex) => {
      try {
        // Important: ajouter le timestamp pour le suivi d'activité
        const newPosition = {
          ruleIndex,
          exerciseIndex,
          timestamp: Date.now(), // Ajout du timestamp
        };

        setLastPosition(newPosition);
        await AsyncStorage.setItem(
          LAST_POSITION_KEY,
          JSON.stringify(newPosition)
        );
      } catch (error) {

      }
    },
    [LAST_POSITION_KEY]
  );

  // Marquer un exercice comme complété
  const markExerciseAsCompleted = useCallback(
    async (ruleIndex, exerciseIndex, isCorrect, answer) => {
      try {
        // Mettre à jour les exercices complétés uniquement si la réponse est correcte
        if (isCorrect) {
          const updatedCompletedExercises = { ...completedExercises };

          if (!updatedCompletedExercises[ruleIndex]) {
            updatedCompletedExercises[ruleIndex] = [];
          }

          // Éviter les doublons
          if (!updatedCompletedExercises[ruleIndex].includes(exerciseIndex)) {
            updatedCompletedExercises[ruleIndex].push(exerciseIndex);
            setCompletedExercises(updatedCompletedExercises);
            await AsyncStorage.setItem(
              COMPLETED_EXERCISES_KEY,
              JSON.stringify(updatedCompletedExercises)
            );
          }
        }

        // Sauvegarder la réponse de l'utilisateur (correcte ou non)
        const newAnswer = {
          ruleIndex,
          exerciseIndex,
          isCorrect,
          userAnswer: answer,
          timestamp: Date.now(), // Ajout du timestamp pour la réponse
        };

        const updatedUserAnswers = [...userAnswers, newAnswer];
        setUserAnswers(updatedUserAnswers);
        await AsyncStorage.setItem(
          USER_ANSWERS_KEY,
          JSON.stringify(updatedUserAnswers)
        );
      } catch (error) {

      }
    },
    [completedExercises, userAnswers, COMPLETED_EXERCISES_KEY, USER_ANSWERS_KEY]
  );

  // Initialiser la progression
  const initializeProgress = useCallback(
    (grammarData) => {
      if (!initialized && loaded && grammarData) {
        const rules = grammarData || [];
        const newCompletedExercises = { ...completedExercises };

        // Créer des entrées vides pour les règles manquantes
        rules.forEach((_, index) => {
          if (!newCompletedExercises[index]) {
            newCompletedExercises[index] = [];
          }
        });

        setCompletedExercises(newCompletedExercises);
        setInitialized(true);
      }
    },
    [completedExercises, initialized, loaded]
  );

  // Vérifier si un exercice est complété
  const isExerciseCompleted = useCallback(
    (ruleIndex, exerciseIndex) => {
      return (
        completedExercises[ruleIndex]?.includes(exerciseIndex)
      );
    },
    [completedExercises]
  );

  // Obtenir la progression pour une règle spécifique
  const getRuleProgress = useCallback(
    (ruleIndex, totalExercises) => {
      if (!completedExercises[ruleIndex]) return 0;
      return (completedExercises[ruleIndex].length / totalExercises) * 100;
    },
    [completedExercises]
  );

  // Calculer la progression globale
  const getOverallProgress = useCallback(() => {
    let totalExercises = 0;
    let completedCount = 0;

    Object.keys(completedExercises).forEach((ruleIndex) => {
      const completed = completedExercises[ruleIndex] || [];
      completedCount += completed.length;

      // Estimer le nombre total d'exercices par règle
      // Note: ceci est une approximation, idéalement on utiliserait le vrai total
      totalExercises += 2; // Supposer 2 exercices par règle en moyenne
    });

    return totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;
  }, [completedExercises]);

  // Réinitialiser la progression pour un débogage facile
  const resetProgress = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([
        COMPLETED_EXERCISES_KEY,
        LAST_POSITION_KEY,
        USER_ANSWERS_KEY,
      ]);

      setCompletedExercises({});
      setLastPosition({ ruleIndex: 0, exerciseIndex: 0 });
      setUserAnswers([]);
      setInitialized(false);
    } catch (error) {

    }
  }, [COMPLETED_EXERCISES_KEY, LAST_POSITION_KEY, USER_ANSWERS_KEY]);

  return {
    completedExercises,
    lastPosition,
    userAnswers,
    loaded,
    saveLastPosition,
    markExerciseAsCompleted,
    initializeProgress,
    isExerciseCompleted,
    getRuleProgress,
    getOverallProgress,
    resetProgress,
  };
};

export default useGrammarProgress;

