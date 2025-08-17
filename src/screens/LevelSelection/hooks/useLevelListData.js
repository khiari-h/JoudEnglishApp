// src/screens/LevelSelection/hooks/useLevelListData.js
import { useMemo } from "react";
import { LANGUAGE_LEVELS, LEVELS_LIST } from "../../../utils/constants";

export default function useLevelListData({ getLevelProgress, hasProgress }) {
  // Nous n'avons pas besoin de déterminer le "currentLevel" sur cet écran.
  // L'écran de sélection des niveaux doit juste lister tous les niveaux.
  
  const levels = useMemo(() => {
    return LEVELS_LIST.map((levelKey) => {
      const levelInfo = LANGUAGE_LEVELS[levelKey];
      const progress = getLevelProgress(levelKey);

      // Une meilleure manière de vérifier si un niveau a été commencé
      const hasStarted = progress > 0;

      return {
        id: levelKey,
        title: levelInfo.title,
        progress,
        color: levelInfo.color,
        icon: levelInfo.icon,
        hasProgress: hasStarted, // Le nom est plus logique ici
        hasStarted: hasStarted,
      };
    });
  }, [getLevelProgress]);

  // Supprimer currentUserLevel et currentLevelData car ils ne sont pas pertinents pour cet écran.
  // Le composant LevelSelection utilise déjà `levels` et n'a pas besoin des autres.
  return { levels };
}