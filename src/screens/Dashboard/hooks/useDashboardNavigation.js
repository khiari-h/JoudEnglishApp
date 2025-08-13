// src/screens/Dashboard/hooks/useDashboardNavigation.js
import { useCallback } from "react";
import { router } from "expo-router";
import { EXERCISES } from "../../../utils/constants";

export default function useDashboardNavigation({ setCurrentLevel, handleChangeActiveLevel }) {
  const handleContinue = useCallback((activity) => {
    if (activity === "levelSelection") {
      router.push("/tabs/levelSelection");
      return;
    }

    const { type, level, mode } = activity;
    const exercise = Object.values(EXERCISES).find((ex) => ex.id === type);
    if (!exercise) return;

    const params = { level };
    if (mode && type === "vocabulary") params.mode = mode;

    router.push({ pathname: exercise.route, params });
  }, []);

  const handleChangeLevelVisual = useCallback(
    (levelId) => {
      handleChangeActiveLevel(levelId);
      setCurrentLevel(levelId);
    },
    [handleChangeActiveLevel, setCurrentLevel]
  );

  const handleLevelSelect = useCallback(
    (level) => {
      setCurrentLevel(level);
      router.push(`/tabs/exerciseSelection?level=${level}`);
    },
    [setCurrentLevel]
  );

  return { handleContinue, handleChangeLevelVisual, handleLevelSelect };
}


