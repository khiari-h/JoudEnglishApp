// ErrorCorrectionProgress/index.js - VERSION CORRIGÉE AVEC DÉTECTION AUTO

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalExercises,
  calculateCompletedExercisesCount,
  calculateTotalProgress,
  calculateCategoryProgress,
} from "../../../../utils/errorCorrection/errorCorrectionStats";

/**
 * 📊 ErrorCorrectionProgress - Version Corrigée avec détection automatique
 * ✅ Détecte automatiquement la structure des données
 * ✅ Gère différentes structures de données
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
  
  // ✅ DÉTECTION AUTOMATIQUE : Assure qu'on a les bonnes données
  const getValidCategories = () => {
    if (Array.isArray(categories) && categories.length > 0) {
      return categories;
    }
    // Fallback si pas de catégories mais qu'on a des exercices
    if (Array.isArray(exercises) && exercises.length > 0) {
      // Créer des catégories virtuelles basées sur les exercices
      const categoriesFromExercises = exercises.reduce((cats, ex, index) => {
        const categoryId = ex.categoryId || ex.category || 'general';
        if (!cats.find(c => c.id === categoryId)) {
          cats.push({
            id: categoryId,
            name: ex.categoryName || `Catégorie ${categoryId}`,
            exercises: exercises.filter(e => (e.categoryId || e.category || 'general') === categoryId)
          });
        }
        return cats;
      }, []);
      return categoriesFromExercises;
    }
    return [];
  };

  const getValidExercises = () => {
    if (Array.isArray(exercises) && exercises.length > 0) {
      return exercises;
    }
    // Si pas d'exercices directement, extraire des catégories
    if (Array.isArray(categories) && categories.length > 0) {
      return categories.reduce((exs, cat) => {
        if (cat.exercises && Array.isArray(cat.exercises)) {
          return [...exs, ...cat.exercises];
        }
        return exs;
      }, []);
    }
    return [];
  };

  const validCategories = getValidCategories();
  const validExercises = getValidExercises();
  
  // ✅ UTILISE la vraie structure détectée
  const totalExercisesCount = calculateTotalExercises(validCategories, validExercises);
  const completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
  const totalProgress = calculateTotalProgress(validCategories, validExercises, completedExercises);
  const categoryProgressData = calculateCategoryProgress(validCategories, validExercises, completedExercises);

  // Transformation pour le format ProgressCard
  const formattedCategoryData = categoryProgressData.map((category, index) => ({
    title: category.title,
    completed: category.completedExercises,
    total: category.totalExercises,
    progress: category.progress,
  }));

  console.log("🔍 ErrorCorrectionProgress Debug:", {
    originalCategoriesLength: categories.length,
    originalExercisesLength: exercises.length,
    validCategoriesLength: validCategories.length,
    validExercisesLength: validExercises.length,
    totalExercisesCount,
    completedExercisesCount,
    totalProgress
  });

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