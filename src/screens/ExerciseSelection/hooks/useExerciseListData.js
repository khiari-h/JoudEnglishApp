// src/screens/ExerciseSelection/hooks/useExerciseListData.js
import { useMemo } from "react";
import { EXERCISES, BONUS_EXERCISES, LANGUAGE_LEVELS } from "../../../utils/constants";

export default function useExerciseListData({ level, getExerciseProgress, hasProgress }) {
  const levelInfo = useMemo(() => {
    return LANGUAGE_LEVELS[level] || null;
  }, [level]);

  const exercises = useMemo(() => {
    const list = [];
    Object.values(EXERCISES).forEach((exercise) => {
      if (level === "bonus" && !BONUS_EXERCISES.includes(exercise.id)) return;

      if (exercise.id === "vocabulary_fast") {
        const fastProgress = getExerciseProgress("vocabulary_fast", level);
        list.push({ ...exercise, progress: fastProgress, hasProgress: fastProgress > 0, isFast: true });
        return;
      }

      const progress = getExerciseProgress(exercise.id, level);
      const has = hasProgress(exercise.id, level);
      list.push({ ...exercise, progress, hasProgress: has, isFast: false });
    });
    return list;
  }, [level, getExerciseProgress, hasProgress]);

  return { levelInfo, exercises };
}


