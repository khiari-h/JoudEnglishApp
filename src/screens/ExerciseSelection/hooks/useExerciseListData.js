import { useMemo } from "react";
import { EXERCISES, BONUS_EXERCISES, LANGUAGE_LEVELS } from "../../../utils/constants";

export default function useExerciseListData({ level, getExerciseProgress, hasProgress }) {
    const levelInfo = useMemo(() => {
        return LANGUAGE_LEVELS[level] || null;
    }, [level]);

    const exercises = useMemo(() => {
        const list = [];
        
        // Parcourir uniquement les valeurs d'EXERCISES, pas les clés
        Object.values(EXERCISES).forEach((exercise) => {

            // Logique pour les niveaux bonus
            if (level === "bonus" && !BONUS_EXERCISES.includes(exercise.id)) {
                return; // Ignorer les exercices qui ne sont pas dans la liste des bonus
            }

            // Calculer la progression pour tous les exercices
            const progress = getExerciseProgress(exercise.id, level);
            const has = hasProgress(exercise.id, level);

            // Ajouter l'exercice à la liste avec ses données de progression
            list.push({ ...exercise, progress, hasProgress: has, isFast: exercise.id === "vocabulary_fast" });
        });

        // Retourner la liste complète des exercices pour le niveau donné
        return list;

    }, [level, getExerciseProgress, hasProgress]);

    return { levelInfo, exercises };
}