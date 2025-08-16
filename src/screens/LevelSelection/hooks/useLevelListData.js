// src/screens/LevelSelection/hooks/useLevelListData.js
import { useMemo } from "react";
import { LANGUAGE_LEVELS, LEVELS_LIST } from "../../../utils/constants";

export default function useLevelListData({ getLevelProgress, hasProgress }) {
  const currentUserLevel = useMemo(() => {
    for (let i = 1; i <= 6; i++) {
      if (getLevelProgress(i.toString()) === 0) {
        return i;
      }
    }
    return 6;
  }, [getLevelProgress]);

  const currentLevelData = LANGUAGE_LEVELS[currentUserLevel];

  const levels = useMemo(() => {
    return LEVELS_LIST.map((levelKey) => {
      const levelInfo = LANGUAGE_LEVELS[levelKey];
      const progress = getLevelProgress(levelKey);

      const started =
        hasProgress("vocabulary", levelKey) ||
        hasProgress("phrases", levelKey) ||
        hasProgress("grammar", levelKey) ||
        hasProgress("reading", levelKey) ||

        hasProgress("conversations", levelKey) ||
        hasProgress("errorCorrection", levelKey) ||
        hasProgress("wordGames", levelKey) ||
        hasProgress("assessment", levelKey);

      return {
        id: levelKey,
        title: levelInfo.title,
        progress,
        color: levelInfo.color,
        icon: levelInfo.icon,
        hasProgress: progress > 0,
        hasStarted: started,
      };
    });
  }, [getLevelProgress, hasProgress]);

  return { currentUserLevel, currentLevelData, levels };
}


