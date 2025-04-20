// src/utils/spelling/spellingDataHelper.js

// Import des données d'orthographe par niveau et type
import spellingCorrectionA1 from "../../data/spelling/spellingCorrectionA1";
import spellingRulesA1 from "../../data/spelling/spellingRulesA1";

/**
 * Récupère les données d'exercices d'orthographe en fonction du niveau et du type
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @param {string} type - Le type d'exercice (correction, rules)
 * @returns {Object} Les données d'exercices d'orthographe pour le niveau et type spécifiés
 */
export const getSpellingData = (level, type) => {
  // Mapping des données par niveau et type
  const dataMap = {
    A1: {
      correction: spellingCorrectionA1,
      rules: spellingRulesA1,
    },
    // Ajouter d'autres niveaux au besoin
  };

  // Sélectionner les données appropriées
  if (dataMap[level] && dataMap[level][type]) {
    return dataMap[level][type];
  }

  // Par défaut, retourner les données A1
  return type === "rules" ? spellingRulesA1 : spellingCorrectionA1;
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
