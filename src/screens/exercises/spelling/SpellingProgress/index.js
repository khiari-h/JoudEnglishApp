// SpellingProgress/index.js - VERSION RESTRUCTURÉE POUR LA VRAIE STRUCTURE SPELLING

import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalExercises,
  calculateCompletedExercisesCount,
  calculateTotalProgress,
} from "../../../../utils/spelling/spellingStats";
import { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * 📊 SpellingProgress - Version restructurée pour la vraie structure Spelling
 * ✅ Gère les 3 types séparés : correction, rules, homophones
 * ✅ Même logique que VocabularyProgress
 * ✅ Cohérent avec les autres modules
 */
const SpellingProgress = ({
  exercises = [],
  completedExercises = [],
  levelColor = "#3b82f6",
  expanded = false,
  onToggleExpand,
  onCategoryPress,
}) => {
  
  // ✅ MÉMORISER tous les calculs statistiques
  const statsData = useMemo(() => {
    const totalExercisesCount = calculateTotalExercises(exercises);
    const completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
    const totalProgress = calculateTotalProgress(exercises, completedExercises);

    // ✅ CORRIGÉ : Calcul de la progression par type d'exercice
    // Spelling a déjà des exercices groupés par type, pas besoin de regrouper
    const typeProgressData = [
      {
        title: "Correction",
        totalExercises: exercises.filter(ex => ex.type === 'correction').length,
        completedExercises: exercises.filter((ex, index) => 
          ex.type === 'correction' && completedExercises.includes(index)
        ).length,
        progress: 0
      },
      {
        title: "Règles", 
        totalExercises: exercises.filter(ex => ex.type === 'rules').length,
        completedExercises: exercises.filter((ex, index) => 
          ex.type === 'rules' && completedExercises.includes(index)
        ).length,
        progress: 0
      },
      {
        title: "Homophones",
        totalExercises: exercises.filter(ex => ex.type === 'homophones').length,
        completedExercises: exercises.filter((ex, index) => 
          ex.type === 'homophones' && completedExercises.includes(index)
        ).length,
        progress: 0
      }
    ];

    // Calculer les pourcentages pour chaque type
    typeProgressData.forEach(typeData => {
      typeData.progress = typeData.totalExercises > 0 
        ? Math.round((typeData.completedExercises / typeData.totalExercises) * 100)
        : 0;
    });

    return {
      totalExercisesCount,
      completedExercisesCount,
      totalProgress,
      typeProgressData
    };
  }, [exercises, completedExercises]);

  // ✅ Transformation des données pour ProgressCard
  const formattedTypeData = useMemo(() => {
    return statsData.typeProgressData.map((typeData) => ({
      title: typeData.title,
      completed: typeData.completedExercises,
      total: typeData.totalExercises,
      progress: typeData.progress,
    }));
  }, [statsData.typeProgressData]);

  return (
    <ProgressCard
      title="Progression"
      progress={statsData.totalProgress}
      completed={statsData.completedExercisesCount}
      total={statsData.totalExercisesCount}
      unit="exercices"
      levelColor={levelColor}
      expandable
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedTypeData}
      onCategoryPress={onCategoryPress}
    />
  );
};

// ✅ Définition de PropTypes pour la validation des props
SpellingProgress.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    // Structure des exercices d'orthographe
  })),
  completedExercises: PropTypes.arrayOf(PropTypes.number),
  levelColor: PropTypes.string,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  onCategoryPress: PropTypes.func,
};

export default SpellingProgress;