// utils/chatbot/chatbotDataHelper.js

// Import des données de chatbot par niveau
import chatbotA1Data from "../../data/chatbot/chatbotA1";


/**
 * Récupère les données de scénarios de chatbot en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de chatbot pour le niveau spécifié
 */
export const getChatbotData = (level) => {
  const dataMap = {
    A1: chatbotA1Data,

  };
  return dataMap[level] || chatbotA1Data;
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