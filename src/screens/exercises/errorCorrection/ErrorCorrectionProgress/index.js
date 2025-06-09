// ErrorCorrectionProgress/index.js - VERSION REFACTORISÉE (utilise ProgressCard)

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalExercises,
  calculateCompletedExercisesCount,
  calculateTotalProgress,
  calculateCategoryProgress,
} from "../../../../utils/errorCorrection/errorCorrectionStats";

/**
 * 📊 ErrorCorrectionProgress - Version Refactorisée avec ProgressCard générique
 * Pattern identique à VocabularyProgress
 * 
 * @param {Array} categories - Liste des catégories
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Object} completedExercises - Exercices complétés par catégorie
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} expanded - État d'expansion
 * @param {function} onToggleExpand - Fonction pour toggle expansion
 * @param {function} onCategoryPress - Fonction appelée lors du clic sur catégorie
 */
const ErrorCorrectionProgress = ({
  categories = [],
  exercises = [],
  completedExercises = {},
  levelColor,
  expanded = false,
  onToggleExpand,
  onCategoryPress,
}) => {
  
  // Calculs des statistiques (utilise les nouveaux utilitaires)
  const totalExercisesCount = calculateTotalExercises(categories, exercises);
  const completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
  const totalProgress = calculateTotalProgress(categories, exercises, completedExercises);
  
  // Données des catégories pour l'expansion
  const categoryProgressData = calculateCategoryProgress(categories, exercises, completedExercises);

  // Transformation pour le format ProgressCard
  const formattedCategoryData = categoryProgressData.map((category, index) => ({
    title: category.title,
    completed: category.completedExercises,
    total: category.totalExercises,
    progress: category.progress,
  }));

  return (
    <ProgressCard
      title="Progression"
      progress={totalProgress}
      completed={completedExercisesCount}
      total={totalExercisesCount}
      unit="exercices"
      levelColor={levelColor}
      expandable={true}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedCategoryData}
      onCategoryPress={onCategoryPress}
    />
  );
};

export default ErrorCorrectionProgress;