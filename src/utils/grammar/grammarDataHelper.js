// utils/grammar/grammarDataHelper.js

// Import des données de grammaire par niveau
import grammarA1Data from "../../data/exercises/grammar/grammarA1";
// Pour les futurs niveaux: import grammarA2Data from "../../data/exercises/grammar/grammarA2";

/**
 * Récupère les données de grammaire en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de grammaire pour le niveau spécifié
 */
export const getGrammarData = (level) => {
  const dataMap = {
    A1: grammarA1Data,
    // Futurs niveaux: A2: grammarA2Data, etc.
  };
  return dataMap[level] || grammarA1Data;
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