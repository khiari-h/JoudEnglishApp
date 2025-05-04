// utils/grammar/grammarDataHelper.js

// Import des données de grammaire par niveau
import grammarA1 from "../../data/grammar/grammarA1"; // Import depuis le dossier grammarA1 avec le fichier index.js
// Pour les futurs niveaux: 
// import grammarA2 from "../../data/grammar/grammarA2";

/**
 * Récupère les données de grammaire en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de grammaire pour le niveau spécifié
 */
export const getGrammarData = (level) => {
  const dataMap = {
    A1: grammarA1,
    // Futurs niveaux: A2: grammarA2, etc.
  };
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