// utils/grammar/grammarDataHelper.js

// Import des données de grammaire par niveau
import grammarA1 from "../../data/grammar/A1";
import grammarA2 from "../../data/grammar/A2";
import grammarB1 from "../../data/grammar/B1";
import grammarB2 from "../../data/grammar/B2";
import grammarC1 from "../../data/grammar/C1";
import grammarC2 from "../../data/grammar/C2";

/**
 * Récupère les données de grammaire en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de grammaire pour le niveau spécifié
 */
export const getGrammarData = (level) => {
  const dataMap = {
    A1: grammarA1,
    A2: grammarA2,
    B1: grammarB1,
    B2: grammarB2,
    C1: grammarC1,
    C2: grammarC2
  };
  // Retourne A1 par défaut si le niveau n'est pas reconnu
  return dataMap[level] || grammarA1;
};

/**
 * Récupère la couleur associée à un niveau de langue
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {string} Code couleur hexadécimal pour le niveau
 */
export const getLevelColor = (level) => {
  const colors = {
    A1: "#3b82f6", // Bleu
    A2: "#8b5cf6", // Violet
    B1: "#10b981", // Vert
    B2: "#f59e0b", // Orange
    C1: "#ef4444", // Rouge
    C2: "#6366f1", // Indigo
  };
  return colors[level] || "#3b82f6"; // Bleu par défaut
};

/**
 * Récupère le nombre total de règles de grammaire pour un niveau
 * @param {string} level - Le niveau de langue
 * @returns {number} Nombre total de règles
 */
export const getGrammarRulesCount = (level) => {
  const data = getGrammarData(level);
  return data ? data.length : 0;
};

/**
 * Récupère le nombre total d'exercices pour un niveau
 * @param {string} level - Le niveau de langue
 * @returns {number} Nombre total d'exercices
 */
export const getTotalExercisesCount = (level) => {
  const data = getGrammarData(level);
  if (!data) return 0;

  return data.reduce((total, rule) => {
    return total + (rule.exercises ? rule.exercises.length : 0);
  }, 0);
};

/**
 * Récupère les statistiques complètes pour un niveau
 * @param {string} level - Le niveau de langue
 * @returns {Object} Statistiques du niveau
 */
export const getLevelStats = (level) => {
  const data = getGrammarData(level);

  if (!data) return {
    rules: 0,
    exercises: 0,
    averageExercisesPerRule: 0
  };

  const totalRules = data.length;
  const totalExercises = getTotalExercisesCount(level);

  return {
    rules: totalRules,
    exercises: totalExercises,
    averageExercisesPerRule: totalRules > 0 ? totalExercises / totalRules : 0
  };
};
