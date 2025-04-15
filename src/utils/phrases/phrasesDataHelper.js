// src/utils/phrases/phrasesDataHelper.js
import phrasesA1Data from "../../data/exercises/phrases/phrasesA1";
// Pour les futurs niveaux: import phrasesA2Data from "../../data/exercises/phrases/phrasesA2";

/**
 * Récupère les données de phrases en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de phrases pour le niveau spécifié
 */
export const getPhrasesData = (level) => {
  const dataMap = {
    A1: phrasesA1Data,
    // Futurs niveaux: A2: phrasesA2Data, etc.
  };
  return dataMap[level] || phrasesA1Data;
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