// src/utils/reading/readingHelper.js
import readingA1Data from "../../data/reading/readingA1";
// Futurs imports pour d'autres niveaux
// import readingA2Data from "../../data/exercises/reading/readingA2";

/**
 * Récupère les données de lecture en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de lecture pour le niveau spécifié
 */
export const getReadingData = (level) => {
  const dataMap = {
    A1: readingA1Data,
    // Futurs niveaux: A2: readingA2Data, etc.
  };
  return dataMap[level] || readingA1Data;
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