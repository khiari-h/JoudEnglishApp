// src/screens/Dashboard/hooks/useDashboardSelectors.js
import { useMemo } from "react";
import { LANGUAGE_LEVELS } from "../../../utils/constants";

export default function useDashboardSelectors({ getLevelProgress, currentLevel }) {
  const allLevels = useMemo(() => {
    return ["1", "2", "3", "4", "5", "6", "bonus"].map((levelKey) => {
      const levelInfo = LANGUAGE_LEVELS[levelKey];
      const progress = getLevelProgress(levelKey);
      return {
        id: levelKey,
        title: levelInfo.title,
        color: levelInfo.color,
        icon: levelInfo.icon,
        progress,
        isActive: levelKey === currentLevel,
        isCompleted: progress >= 100,
      };
    });
  }, [getLevelProgress, currentLevel]);

  const globalProgress = useMemo(() => getLevelProgress(currentLevel), [getLevelProgress, currentLevel]);

  return { allLevels, globalProgress };
}


