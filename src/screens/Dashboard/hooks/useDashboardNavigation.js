// src/screens/Dashboard/hooks/useDashboardNavigation.js
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native"; // ✅ CHANGÉ
import { ROUTES } from "../../../navigation/routes"; // ✅ AJOUT

export const useDashboardNavigation = (updateStreak, startTracking) => {
  const navigation = useNavigation(); // ✅ CHANGÉ

  const navigateToExercise = useCallback(
    (activity) => {
      if (!activity) return;

      try {
        // Mettre à jour le streak pour toute activité
        updateStreak();

        if (activity === "levelSelection") {
          navigation.navigate(ROUTES.LEVEL_SELECTION); // ✅ CHANGÉ
          return;
        }

        const { type, level, mode } = activity;
        const routes = {
          vocabulary: ROUTES.VOCABULARY_EXERCISE,
          grammar: ROUTES.GRAMMAR_EXERCISE,
          reading: ROUTES.READING_EXERCISE,
          conversations: ROUTES.CONVERSATION_EXERCISE,
          phrases: ROUTES.PHRASES_EXERCISE,
          spelling: ROUTES.SPELLING_EXERCISE,
          wordGames: ROUTES.WORD_GAMES_EXERCISE,
          assessment: ROUTES.ASSESSMENT_EXERCISE,
        };

        const routeName = routes[type] || ROUTES.LEVEL_SELECTION;
        const params = { level };

        // Passer le mode pour vocabulary
        if (mode && type === "vocabulary") {
          params.mode = mode;
        }

        navigation.navigate(routeName, params); // ✅ CHANGÉ
      } catch (error) {
        console.error('Erreur navigation:', error);
      }
    },
    [updateStreak, navigation]
  );

  const handleLevelSelect = useCallback((level, handleChangeActiveLevel) => {
    handleChangeActiveLevel(level);
    navigation.navigate(ROUTES.EXERCISE_SELECTION, { level }); // ✅ CHANGÉ
  }, [navigation]);

  const handleDailyChallengeStart = useCallback(
    (type, level) => {
      // Mettre à jour le streak
      updateStreak();

      // Démarrer le tracking pour le défi du jour
      let trackingKey = type;
      if (type === "vocabulary") {
        trackingKey = "vocabulary_classic"; // Par défaut classic pour défi
      }
      startTracking(trackingKey);

      // Naviguer vers l'exercice
      navigateToExercise({ type, level });
    },
    [updateStreak, startTracking, navigateToExercise]
  );

  const handleEvaluationStart = useCallback(
    (level) => {
      // Mettre à jour le streak pour évaluation
      updateStreak();
      startTracking("assessment");

      navigation.navigate(ROUTES.ASSESSMENT_EXERCISE, { level }); // ✅ CHANGÉ
    },
    [updateStreak, startTracking, navigation]
  );

  return {
    navigateToExercise,
    handleLevelSelect,
    handleDailyChallengeStart,
    handleEvaluationStart,
  };
};