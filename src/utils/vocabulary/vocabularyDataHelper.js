// utils/vocabularyDataHelper.js

// Import des données de vocabulaire par niveau
import vocabularyA1Data from "../../data/vocabulary/A1";

/**
 * Récupère les données de vocabulaire en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de vocabulaire pour le niveau spécifié
 */
export const getVocabularyData = (level) => {
  const dataMap = {
    A1: vocabularyA1Data,
  };
  return dataMap[level] || vocabularyA1Data;
};

/**
 * Récupère la couleur associée à un niveau de langue
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {string} Code couleur hexadécimal pour le niveau
 */
export const getLevelColor = (level) => {
  const colors = {
    A1: "#3b82f6", // Bleu
  };
  return colors[level] || "#5E60CE"; // Couleur par défaut
};
