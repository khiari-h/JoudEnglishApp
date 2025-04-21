// src/utils/errorCorrection/errorCorrectionDataHelper.js

// Chemin d'import corrigé pour pointer vers le bon emplacement du fichier
import errorsA1Data from "../../data/errorCorrection/errorCorrectionA1";
// Futurs imports pour d'autres niveaux
// import errorsA2Data from "../../data/exercises/errorCorrection/errorCorrectionA2";

/**
 * Récupère les données de correction d'erreurs en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de correction d'erreurs pour le niveau spécifié
 */
export const getErrorCorrectionData = (level) => {
  const dataMap = {
    A1: errorsA1Data,
    // Futurs niveaux: A2: errorsA2Data, etc.
  };
  return dataMap[level] || errorsA1Data;
};

/**
 * Alias de getErrorCorrectionData pour maintenir la compatibilité avec le code existant
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de correction d'erreurs pour le niveau spécifié
 */
export const getErrorsData = getErrorCorrectionData;

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
