// src/utils/phrases/phrasesDataHelper.js
import phrasesA1Data from "../../data/phrases/A1";
// Imports pour les futurs niveaux (à décommenter quand ils seront implémentés)
// import phrasesA2Data from "../../data/phrases/A2";
// import phrasesB1Data from "../../data/phrases/B1";
// import phrasesB2Data from "../../data/phrases/B2";
// import phrasesC1Data from "../../data/phrases/C1";
// import phrasesC2Data from "../../data/phrases/C2";

/**
 * Récupère les données de phrases en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de phrases pour le niveau spécifié
 */
export const getPhrasesData = (level) => {
  const dataMap = {
    A1: phrasesA1Data,
    // Futurs niveaux (à décommenter quand ils seront implémentés)
    // A2: phrasesA2Data,
    // B1: phrasesB1Data,
    // B2: phrasesB2Data,
    // C1: phrasesC1Data,
    // C2: phrasesC2Data,
  };

  // Si le niveau demandé n'existe pas ou n'est pas encore implémenté,
  // on retourne toujours le niveau A1 comme niveau par défaut
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
  return colors[level] || "#3b82f6"; // Bleu par défaut (A1)
};

/**
 * Récupère le titre descriptif d'un niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {string} Description du niveau
 */
export const getLevelTitle = (level) => {
  const titles = {
    A1: "Débutant",
    A2: "Élémentaire",
    B1: "Intermédiaire",
    B2: "Intermédiaire supérieur",
    C1: "Avancé",
    C2: "Maîtrise",
  };
  return `${level} - ${titles[level] || titles.A1}`;
};

