// utils/spelling/spellingStats.js

/**
 * 🎯 Utilitaires de calcul pour Spelling Exercise
 * Pattern identique à vocabularyStats.js et errorCorrectionStats.js
 */

/**
 * Calcule le nombre total d'exercices
 * @param {Array} exercises - Liste de tous les exercices
 * @returns {number} Nombre total d'exercices
 */
export const calculateTotalExercises = (exercises = []) => {
  return exercises.length;
};

/**
 * Calcule le nombre total d'exercices complétés
 * @param {Array} completedExercises - Liste des indices d'exercices complétés
 * @returns {number} Nombre total d'exercices complétés
 */
export const calculateCompletedExercisesCount = (completedExercises = []) => {
  return completedExercises.length;
};

/**
 * Calcule la progression totale
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Array} completedExercises - Liste des indices d'exercices complétés
 * @returns {number} Pourcentage de progression (0-100)
 */
export const calculateTotalProgress = (exercises = [], completedExercises = []) => {
  const totalExercises = calculateTotalExercises(exercises);
  const totalCompleted = calculateCompletedExercisesCount(completedExercises);
  
  return totalExercises > 0
    ? Math.min(100, Math.round((totalCompleted / totalExercises) * 100))
    : 0;
};

/**
 * Calcule les statistiques par type d'exercice
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Array} completedExercises - Liste des indices d'exercices complétés
 * @returns {Object} Statistiques par type
 */
export const calculateStatsByType = (exercises = [], completedExercises = []) => {
  const stats = {
    correction: { total: 0, completed: 0, progress: 0 },
    spelling_rule: { total: 0, completed: 0, progress: 0 },
    homophones: { total: 0, completed: 0, progress: 0 }
  };

  // Compter par type
  exercises.forEach((exercise, index) => {
    const type = exercise.type || 'correction';
    if (stats[type]) {
      stats[type].total++;
      if (completedExercises.includes(index)) {
        stats[type].completed++;
      }
    }
  });

  // Calculer les progressions
  Object.keys(stats).forEach(type => {
    const { total, completed } = stats[type];
    stats[type].progress = total > 0 
      ? Math.min(100, Math.round((completed / total) * 100))
      : 0;
  });

  return stats;
};

/**
 * Calcule les statistiques de performance (correct/incorrect)
 * @param {Array} userAnswers - Liste des réponses utilisateur avec isCorrect
 * @returns {Object} Statistiques de performance
 */
export const calculatePerformanceStats = (userAnswers = []) => {
  const total = userAnswers.length;
  const correct = userAnswers.filter(answer => answer.isCorrect).length;
  const incorrect = total - correct;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    total,
    correct,
    incorrect,
    accuracy
  };
};

/**
 * Calcule les statistiques de performance par type
 * @param {Array} userAnswers - Liste des réponses utilisateur
 * @returns {Object} Statistiques de performance par type
 */
export const calculatePerformanceByType = (userAnswers = []) => {
  const types = ['correction', 'spelling_rule', 'homophones'];
  const statsByType = {};

  types.forEach(type => {
    const typeAnswers = userAnswers.filter(answer => answer.exerciseType === type);
    statsByType[type] = calculatePerformanceStats(typeAnswers);
  });

  return statsByType;
};

/**
 * Trouve le prochain exercice non complété
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Array} completedExercises - Liste des indices d'exercices complétés
 * @param {number} currentIndex - Index actuel
 * @returns {number} Index du prochain exercice ou -1 si tous complétés
 */
export const findNextUncompletedExercise = (exercises = [], completedExercises = [], currentIndex = 0) => {
  const totalExercises = exercises.length;
  
  // Chercher à partir de l'index suivant
  for (let i = currentIndex + 1; i < totalExercises; i++) {
    if (!completedExercises.includes(i)) {
      return i;
    }
  }
  
  // Chercher depuis le début si rien trouvé
  for (let i = 0; i <= currentIndex; i++) {
    if (!completedExercises.includes(i)) {
      return i;
    }
  }
  
  return -1; // Tous complétés
};

/**
 * Vérifie si tous les exercices sont terminés
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Array} completedExercises - Liste des indices d'exercices complétés
 * @returns {boolean} True si tout est terminé
 */
export const isAllCompleted = (exercises = [], completedExercises = []) => {
  const totalExercises = calculateTotalExercises(exercises);
  const completedCount = calculateCompletedExercisesCount(completedExercises);
  
  return totalExercises > 0 && completedCount >= totalExercises;
};

/**
 * Calcule les exercices restants par type
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Array} completedExercises - Liste des indices d'exercices complétés
 * @returns {Object} Exercices restants par type
 */
export const calculateRemainingByType = (exercises = [], completedExercises = []) => {
  const statsByType = calculateStatsByType(exercises, completedExercises);
  const remaining = {};

  Object.keys(statsByType).forEach(type => {
    const { total, completed } = statsByType[type];
    remaining[type] = Math.max(0, total - completed);
  });

  return remaining;
};

/**
 * Génère un résumé complet des statistiques
 * @param {Array} exercises - Liste de tous les exercices
 * @param {Array} completedExercises - Liste des indices d'exercices complétés
 * @param {Array} userAnswers - Liste des réponses utilisateur
 * @returns {Object} Résumé complet des statistiques
 */
export const generateProgressSummary = (exercises = [], completedExercises = [], userAnswers = []) => {
  const totalExercises = calculateTotalExercises(exercises);
  const completedCount = calculateCompletedExercisesCount(completedExercises);
  const totalProgress = calculateTotalProgress(exercises, completedExercises);
  const statsByType = calculateStatsByType(exercises, completedExercises);
  const performanceStats = calculatePerformanceStats(userAnswers);
  const performanceByType = calculatePerformanceByType(userAnswers);
  const remainingByType = calculateRemainingByType(exercises, completedExercises);
  const allCompleted = isAllCompleted(exercises, completedExercises);

  return {
    overview: {
      totalExercises,
      completedCount,
      remainingCount: totalExercises - completedCount,
      totalProgress,
      allCompleted
    },
    byType: statsByType,
    performance: {
      overall: performanceStats,
      byType: performanceByType
    },
    remaining: remainingByType
  };
};