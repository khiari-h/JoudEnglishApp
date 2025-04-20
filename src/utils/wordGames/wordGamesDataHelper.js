// src/utils/wordGames/wordGamesDataHelper.js

// Import des données de jeux de mots par niveau
import wordGamesA1Data from "../../data/word-games/wordGamesA1";

/**
 * Récupère les données des jeux de mots en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données des jeux de mots pour le niveau spécifié
 */
export const getWordGamesData = (level) => {
  const dataMap = {
    A1: wordGamesA1Data,
  };
  return dataMap[level] || wordGamesA1Data;
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
  return colors[level] || "#4361EE"; // Couleur par défaut
};
