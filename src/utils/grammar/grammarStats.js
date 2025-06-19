// utils/grammar/grammarStats.js - Fonctions utilitaires (pattern identique à vocabularyStats)

/**
 * 📊 Utilitaires de calcul pour Grammar
 * Pattern identique à utils/vocabulary/vocabularyStats.js
 * Garde la logique métier séparée des composants
 */

/**
 * Calculer le nombre total d'exercices
 * @param {Array} grammarData - Données de grammaire [{ exercises: [...] }]
 * @returns {number} Nombre total d'exercices
 */
export const calculateTotalExercises = (grammarData) => {
  return grammarData.reduce((total, rule) => {
    return total + (rule.exercises?.length || 0);
  }, 0);
};

/**
 * Calculer le nombre d'exercices complétés
 * @param {Object} completedExercises - Exercices complétés {0: [0,1], 1: [0]}
 * @returns {number} Nombre d'exercices complétés
 */
export const calculateCompletedExercisesCount = (completedExercises) => {
  return Object.values(completedExercises).reduce((total, exercises) => {
    return total + (exercises?.length || 0);
  }, 0);
};

/**
 * Calculer la progression totale en pourcentage
 * @param {Array} grammarData - Données de grammaire
 * @param {Object} completedExercises - Exercices complétés
 * @returns {number} Pourcentage de progression (0-100)
 */
export const calculateTotalProgress = (grammarData, completedExercises) => {
  const totalExercises = calculateTotalExercises(grammarData);
  const completedCount = calculateCompletedExercisesCount(completedExercises);
  
  return totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;
};

/**
 * Calculer la progression par règle grammaticale
 * @param {Array} grammarData - Données de grammaire
 * @param {Object} completedExercises - Exercices complétés
 * @returns {Array} Progression par règle
 */
export const calculateRuleProgress = (grammarData, completedExercises) => {
  return grammarData.map((rule, index) => {
    const totalExercises = rule.exercises?.length || 0;
    const completedCount = completedExercises[index]?.length || 0;
    const progress = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;
    
    return {
      title: rule.title,
      totalExercises,
      completedExercises: completedCount,
      progress: Math.round(progress),
    };
  });
};