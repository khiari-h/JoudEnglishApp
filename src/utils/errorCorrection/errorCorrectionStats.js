// utils/errorCorrection/errorCorrectionStats.js

/**
 * 🎯 Utilitaires de calcul pour Error Correction Exercise
 * Pattern identique à vocabularyStats.js
 */

/**
 * Calcule le nombre total d'exercices dans toutes les catégories
 * @param {Array} categories - Liste des catégories  
 * @param {Array} exercises - Liste de tous les exercices
 * @returns {number} Nombre total d'exercices
 */
export const calculateTotalExercises = (exercises = []) => {
  return exercises.length;
};

/**
 * Calcule le nombre total d'exercices dans une catégorie spécifique
 * @param {string} categoryId - ID de la catégorie
 * @param {Array} exercises - Liste de tous les exercices
 * @returns {number} Nombre d'exercices dans la catégorie
 */
export const calculateExercisesInCategory = (categoryId, exercises = []) => {
  return exercises.filter(ex => ex.categoryId === categoryId).length;
};

/**
 * Calcule le nombre total d'exercices complétés
 * @param {Object} completedExercises - { categoryId: [0, 2, 4] }
 * @returns {number} Nombre total d'exercices complétés
 */
export const calculateCompletedExercisesCount = (completedExercises = {}) => {
  return Object.keys(completedExercises).reduce(
    (count, categoryId) => count + (completedExercises[categoryId]?.length || 0),
    0
  );
};

/**
 * Calcule la progression totale (tous exercices confondus)
 * @param {Array} exercises - Liste de tous les exercices  
 * @param {Object} completedExercises - Exercices complétés par catégorie
 * @returns {number} Pourcentage de progression (0-100)
 */
export const calculateTotalProgress = (exercises = [], completedExercises = {}) => {
  const totalExercises = calculateTotalExercises(exercises);
  const totalCompleted = calculateCompletedExercisesCount(completedExercises);
  
  return totalExercises > 0
    ? Math.min(100, Math.round((totalCompleted / totalExercises) * 100))
    : 0;
};

/**
 * Calcule la progression par catégorie (pour ProgressCard)
 * @param {Array} categories - Liste des catégories
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Object} completedExercises - Exercices complétés par catégorie
 * @returns {Array} Progression par catégorie
 */
export const calculateCategoryProgress = (categories = [], exercises = [], completedExercises = {}) => {
  return categories.map((category) => {
    const exercisesInCategory = calculateExercisesInCategory(category.id, exercises);
    const completedInCategory = completedExercises[category.id]?.length || 0;
    const progress = exercisesInCategory > 0 
      ? Math.min(100, Math.round((completedInCategory / exercisesInCategory) * 100))
      : 0;

    return {
      title: category.name || `Catégorie ${category.id}`,
      totalExercises: exercisesInCategory,
      completedExercises: completedInCategory,
      progress
    };
  });
};

/**
 * Calcule la progression dans une catégorie spécifique
 * @param {string} categoryId - ID de la catégorie
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Object} completedExercises - Exercices complétés par catégorie
 * @returns {number} Pourcentage de progression dans la catégorie (0-100)
 */
export const calculateCategoryProgressById = (categoryId, exercises = [], completedExercises = {}) => {
  const exercisesInCategory = calculateExercisesInCategory(categoryId, exercises);
  const completedInCategory = completedExercises[categoryId]?.length || 0;
  
  return exercisesInCategory > 0
    ? Math.min(100, Math.round((completedInCategory / exercisesInCategory) * 100))
    : 0;
};

/**
 * Obtient les statistiques détaillées pour une catégorie
 * @param {string} categoryId - ID de la catégorie
 * @param {Array} categories - Liste des catégories
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Object} completedExercises - Exercices complétés par catégorie
 * @returns {Object} Statistiques détaillées de la catégorie
 */
export const getCategoryStats = (categoryId, categories = [], exercises = [], completedExercises = {}) => {
  const category = categories.find(cat => cat.id === categoryId);
  const exercisesInCategory = calculateExercisesInCategory(categoryId, exercises);
  const completedInCategory = completedExercises[categoryId]?.length || 0;
  const progress = calculateCategoryProgressById(categoryId, exercises, completedExercises);
  
  return {
    category,
    totalExercises: exercisesInCategory,
    completedExercises: completedInCategory,
    remainingExercises: exercisesInCategory - completedInCategory,
    progress,
    isCompleted: completedInCategory >= exercisesInCategory
  };
};

/**
 * Calcule les statistiques globales pour le dashboard
 * @param {Array} categories - Liste des catégories
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Object} completedExercises - Exercices complétés par catégorie
 * @returns {Object} Statistiques globales
 */
export const calculateGlobalStats = (categories = [], exercises = [], completedExercises = {}) => {
  const totalExercises = calculateTotalExercises(exercises);
  const completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
  const totalProgress = calculateTotalProgress(exercises, completedExercises);
  
  // Calcul des exercices par type
  const exercisesByType = exercises.reduce((acc, exercise) => {
    const type = exercise.type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  
  // Catégories complétées
  const completedCategories = categories.filter(category => {
    const stats = getCategoryStats(category.id, categories, exercises, completedExercises);
    return stats.isCompleted;
  }).length;
  
  return {
    totalExercises,
    completedExercisesCount,
    remainingExercises: totalExercises - completedExercisesCount,
    totalProgress,
    totalCategories: categories.length,
    completedCategories,
    exercisesByType,
    averageProgressPerCategory: categories.length > 0 
      ? Math.round(totalProgress / categories.length) 
      : 0
  };
};

/**
 * Trouve la prochaine catégorie recommandée (non terminée avec le moins de progression)
 * @param {Array} categories - Liste des catégories
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Object} completedExercises - Exercices complétés par catégorie
 * @returns {Object|null} Prochaine catégorie recommandée ou null
 */
export const getRecommendedCategory = (categories = [], exercises = [], completedExercises = {}) => {
  const incompleteCategories = categories
    .map(category => getCategoryStats(category.id, categories, exercises, completedExercises))
    .filter(stats => !stats.isCompleted && stats.totalExercises > 0)
    .sort((a, b) => a.progress - b.progress); // Trier par progression croissante
  
  return incompleteCategories.length > 0 ? incompleteCategories[0] : null;
};

/**
 * Vérifie si tous les exercices sont terminés
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Object} completedExercises - Exercices complétés par catégorie
 * @returns {boolean} True si tout est terminé
 */
export const isAllCompleted = (exercises = [], completedExercises = {}) => {
  const totalExercises = calculateTotalExercises(exercises);
  const completedExercisesCount = calculateCompletedExercisesCount(completedExercises);
  
  return totalExercises > 0 && completedExercisesCount >= totalExercises;
};