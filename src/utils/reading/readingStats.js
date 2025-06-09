// utils/reading/readingStats.js - Fonctions utilitaires (pattern identique à vocabularyStats)

/**
 * 📊 Utilitaires de calcul pour Reading
 * Pattern identique à utils/vocabulary/vocabularyStats.js
 * Garde la logique métier séparée des composants
 */

/**
 * Calculer le nombre total de questions
 * @param {Array} readingData - Données de lecture [{ questions: [...] }]
 * @returns {number} Nombre total de questions
 */
export const calculateTotalQuestions = (readingData) => {
  return readingData.reduce((total, exercise) => {
    return total + (exercise.questions?.length || 0);
  }, 0);
};

/**
 * Calculer le nombre de questions complétées
 * @param {Object} completedQuestions - Questions complétées {0: [0,1,2], 1: [0]}
 * @returns {number} Nombre de questions complétées
 */
export const calculateCompletedQuestionsCount = (completedQuestions) => {
  return Object.values(completedQuestions).reduce((total, questions) => {
    return total + (questions?.length || 0);
  }, 0);
};

/**
 * Calculer la progression totale en pourcentage
 * @param {Array} readingData - Données de lecture
 * @param {Object} completedQuestions - Questions complétées
 * @returns {number} Pourcentage de progression (0-100)
 */
export const calculateTotalProgress = (readingData, completedQuestions) => {
  const totalQuestions = calculateTotalQuestions(readingData);
  const completedCount = calculateCompletedQuestionsCount(completedQuestions);
  
  return totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;
};

/**
 * Calculer la progression par exercice de lecture
 * @param {Array} readingData - Données de lecture
 * @param {Object} completedQuestions - Questions complétées
 * @returns {Array} Progression par exercice
 */
export const calculateExerciseProgress = (readingData, completedQuestions) => {
  return readingData.map((exercise, index) => {
    const totalQuestions = exercise.questions?.length || 0;
    const completedCount = completedQuestions[index]?.length || 0;
    const progress = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;
    
    return {
      title: exercise.title,
      totalQuestions,
      completedQuestions: completedCount,
      progress: Math.round(progress),
    };
  });
};