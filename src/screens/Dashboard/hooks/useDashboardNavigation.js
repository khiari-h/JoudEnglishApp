// src/screens/Dashboard/hooks/useDashboardNavigation.js
import { useCallback } from "react";
import { router } from "expo-router";

export const useDashboardNavigation = (updateStreak, startTracking) => {
  const navigateToExercise = useCallback(
    (activity) => {
      if (!activity) return;

      try {
        // Mettre à jour le streak pour toute activité
        updateStreak();

        if (activity === "levelSelection") {
          router.push("/(tabs)/levelSelection");
          return;
        }

        const { type, level, mode } = activity;
        const routes = {
          vocabulary: "/(tabs)/vocabularyExercise",
          grammar: "/(tabs)/grammarExercise",
          reading: "/(tabs)/readingExercise",
          conversations: "/(tabs)/conversationsExercise",
          phrases: "/(tabs)/phrasesExercise",
          spelling: "/(tabs)/spellingExercise",
          wordGames: "/(tabs)/wordGamesExercise",
          assessment: "/(tabs)/levelAssessment",
        };

        const pathname = routes[type] || "/(tabs)/levelSelection";
        const params = { level };

        // Passer le mode pour vocabulary
        if (mode && type === "vocabulary") {
          params.mode = mode;
        }

        router.push({ pathname, params });
      } catch (error) {

      }
    },
    [updateStreak]
  );

  const handleLevelSelect = useCallback((level, handleChangeActiveLevel) => {
    handleChangeActiveLevel(level);
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level },
    });
  }, []);

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

      router.push({
        pathname: "/(tabs)/levelAssessment",
        params: { level },
      });
    },
    [updateStreak, startTracking]
  );

  return {
    navigateToExercise,
    handleLevelSelect,
    handleDailyChallengeStart,
    handleEvaluationStart,
  };
};

