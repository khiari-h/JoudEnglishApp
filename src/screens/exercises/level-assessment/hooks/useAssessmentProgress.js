// src/screens/exercises/levelAssessment/hooks/useAssessmentProgress.js
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Hook personnalisé pour gérer la progression dans les évaluations de niveau
 * Permet de sauvegarder la progression et la dernière position pour le suivi des activités
 *
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useAssessmentProgress = (level) => {
  // États pour suivre la progression
  const [assessmentResults, setAssessmentResults] = useState({});
  const [lastPosition, setLastPosition] = useState({
    sectionIndex: 0,
    questionIndex: 0,
  });
  const [userAnswers, setUserAnswers] = useState({});
  const [loaded, setLoaded] = useState(false);

  // Clés pour AsyncStorage
  const ASSESSMENT_RESULTS_KEY = `assessment_results_${level}`;
  const LAST_POSITION_KEY = `assessment_position_${level}`;
  const USER_ANSWERS_KEY = `assessment_answers_${level}`;

  // Charger les données sauvegardées
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Récupérer les résultats d'évaluation
        const savedResultsJson = await AsyncStorage.getItem(
          ASSESSMENT_RESULTS_KEY
        );
        const savedResults = savedResultsJson
          ? JSON.parse(savedResultsJson)
          : {};

        // Récupérer la dernière position
        const savedPositionJson = await AsyncStorage.getItem(LAST_POSITION_KEY);
        const savedPosition = savedPositionJson
          ? JSON.parse(savedPositionJson)
          : { sectionIndex: 0, questionIndex: 0 };

        // Récupérer les réponses de l'utilisateur
        const savedAnswersJson = await AsyncStorage.getItem(USER_ANSWERS_KEY);
        const savedAnswers = savedAnswersJson
          ? JSON.parse(savedAnswersJson)
          : {};

        setAssessmentResults(savedResults);
        setLastPosition(savedPosition);
        setUserAnswers(savedAnswers);
        setLoaded(true);
      } catch (error) {
        setAssessmentResults({});
        setLastPosition({ sectionIndex: 0, questionIndex: 0 });
        setUserAnswers({});
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [level]);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(
    async (sectionIndex, questionIndex) => {
      try {
        const newPosition = {
          sectionIndex,
          questionIndex,
          timestamp: Date.now(), // Important pour le tracking dans useLastActivity
        };
        setLastPosition(newPosition);
        await AsyncStorage.setItem(
          LAST_POSITION_KEY,
          JSON.stringify(newPosition)
        );
      } catch (error) {
        // Silencieux
      }
    },
    [LAST_POSITION_KEY]
  );

  // Enregistrer une réponse de l'utilisateur
  const saveUserAnswer = useCallback(
    async (sectionKey, questionIndex, selectedAnswer, isCorrect) => {
      try {
        // Mettre à jour les réponses de l'utilisateur
        const updatedAnswers = { ...userAnswers };

        if (!updatedAnswers[sectionKey]) {
          updatedAnswers[sectionKey] = {};
        }

        updatedAnswers[sectionKey][questionIndex] = {
          selectedAnswer,
          isCorrect,
          timestamp: Date.now(),
        };

        setUserAnswers(updatedAnswers);
        await AsyncStorage.setItem(
          USER_ANSWERS_KEY,
          JSON.stringify(updatedAnswers)
        );
      } catch (error) {
        // Silencieux
      }
    },
    [userAnswers, USER_ANSWERS_KEY]
  );

  // Sauvegarder les résultats complets de l'évaluation
  const saveAssessmentResults = useCallback(
    async (results) => {
      try {
        const resultsWithTimestamp = {
          ...results,
          completedAt: new Date().toISOString(),
          timestamp: Date.now(),
        };

        setAssessmentResults(resultsWithTimestamp);
        await AsyncStorage.setItem(
          ASSESSMENT_RESULTS_KEY,
          JSON.stringify(resultsWithTimestamp)
        );
      } catch (error) {
        // Silencieux
      }
    },
    [ASSESSMENT_RESULTS_KEY]
  );

  // Obtenir les résultats d'évaluation
  const getAssessmentResults = useCallback(() => {
    return assessmentResults;
  }, [assessmentResults]);

  // Calculer le score de l'utilisateur
  const calculateUserScore = useCallback(() => {
    let correctAnswers = 0;
    let totalQuestions = 0;

    Object.values(userAnswers).forEach((section) => {
      Object.values(section).forEach((answer) => {
        totalQuestions++;
        if (answer.isCorrect) {
          correctAnswers++;
        }
      });
    });

    return {
      correctAnswers,
      totalQuestions,
      percentage:
        totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
    };
  }, [userAnswers]);

  // Vérifier si l'évaluation est complétée
  const isAssessmentCompleted = useCallback(() => {
    return assessmentResults && assessmentResults.completedAt !== undefined;
  }, [assessmentResults]);

  // Réinitialiser toutes les données d'évaluation
  const resetAssessment = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([
        ASSESSMENT_RESULTS_KEY,
        LAST_POSITION_KEY,
        USER_ANSWERS_KEY,
      ]);

      setAssessmentResults({});
      setLastPosition({ sectionIndex: 0, questionIndex: 0 });
      setUserAnswers({});
    } catch (error) {
      // Silencieux
    }
  }, [ASSESSMENT_RESULTS_KEY, LAST_POSITION_KEY, USER_ANSWERS_KEY]);

  return {
    assessmentResults,
    lastPosition,
    userAnswers,
    loaded,
    saveLastPosition,
    saveUserAnswer,
    saveAssessmentResults,
    getAssessmentResults,
    calculateUserScore,
    isAssessmentCompleted,
    resetAssessment,
  };
};

export default useAssessmentProgress;
