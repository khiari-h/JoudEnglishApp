// src/screens/Dashboard/hooks/useDashboardData.js - VERSION NETTOYÉE
import { useMemo } from "react";
import { LANGUAGE_LEVELS } from "../../../utils/constants";

export const useDashboardData = (
  progressContext,
  currentLevel,
  lastActivity,
  currentStreak
) => {
  const {
    progress = {},
    calculateGlobalProgress = () => 0,
    calculateLevelProgress = () => 0,
  } = progressContext || {};

  // Mémoriser les calculs lourds pour éviter les re-calculs inutiles
  const globalProgress = useMemo(() => {
    return calculateGlobalProgress();
  }, [calculateGlobalProgress]);

  const levelProgress = useMemo(() => {
    return calculateLevelProgress(currentLevel);
  }, [calculateLevelProgress, currentLevel]);

  // Mémoriser la liste des niveaux pour éviter les re-créations
  const allLevels = useMemo(() => {
    return Object.keys(LANGUAGE_LEVELS).map((levelKey) => ({
      id: levelKey,
      color: LANGUAGE_LEVELS[levelKey].color,
      isActive: levelKey === currentLevel,
    }));
  }, [currentLevel]);

  // Mémoriser les niveaux d'apprentissage avec progress
  const getAllLearningLevels = useMemo(() => {
    return Object.keys(LANGUAGE_LEVELS).map((levelKey) => ({
      id: levelKey,
      title: LANGUAGE_LEVELS[levelKey].title,
      color: LANGUAGE_LEVELS[levelKey].color,
      progress: calculateLevelProgress(levelKey),
      isActive: levelKey === currentLevel,
    }));
  }, [calculateLevelProgress, currentLevel]);

  // ✅ SUPPRIMÉ : Plus besoin d'exerciseTimeStats fake !
  // RecommendationsSection récupère maintenant ses vraies données
  // via useExerciseTracking directement

  return {
    progress,
    globalProgress,
    levelProgress,
    allLevels,
    getAllLearningLevels,
    // exerciseTimeStats, ← SUPPRIMÉ !
    lastActivity,
    currentStreak,
  };
};