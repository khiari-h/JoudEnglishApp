// utils/Conversation/ConversationDataHelper.js

// Import des données de Conversation par niveau
import ConversationA1 from "../../data/conversation/A1";
import ConversationA2 from "../../data/conversation/A2";
import ConversationB1 from "../../data/conversation/B1";
import ConversationB2 from "../../data/conversation/B2";

// Note: Le composant attend une structure { exercises: [...] }
// Nous devons adapter les données pour correspondre à ce format

/**
 * Récupère les données de scénarios de Conversation en fonction du niveau
 * @param {string} level - Le niveau de langue (A1, A2, B1, B2, C1, C2)
 * @returns {Object} Les données de Conversation pour le niveau spécifié
 */
export const getConversationData = (level) => {
  const dataMap = {
    A1: {
      exercises: ConversationA1, // ConversationA1 est déjà un tableau de scénarios
    },
    A2: {
      exercises: ConversationA2,
    },
    B1: {
      exercises: ConversationB1,
    },
    B2: {
      exercises: ConversationB2,
    },
    // Pour les futures niveaux :
    // C1: { exercises: ConversationC1 },
    // C2: { exercises: ConversationC2 },
  };

  return dataMap[level] || dataMap["A1"]; // Par défaut, retourne A1 si le niveau n'existe pas
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

/**
 * Récupère le nombre total de scénarios pour un niveau
 * @param {string} level - Le niveau de langue
 * @returns {number} Nombre total de scénarios
 */
export const getConversationScenariosCount = (level) => {
  const data = getConversationData(level);
  return data.exercises ? data.exercises.length : 0;
};

/**
 * Récupère le nombre total d'étapes pour tous les scénarios d'un niveau
 * @param {string} level - Le niveau de langue
 * @returns {number} Nombre total d'étapes
 */
export const getTotalStepsCount = (level) => {
  const data = getConversationData(level);
  if (!data.exercises) return 0;

  return data.exercises.reduce((total, scenario) => {
    return total + (scenario.steps ? scenario.steps.length : 0);
  }, 0);
};

/**
 * Récupère les statistiques complètes pour un niveau
 * @param {string} level - Le niveau de langue
 * @returns {Object} Statistiques du niveau
 */
export const getConversationLevelStats = (level) => {
  const data = getConversationData(level);

  if (!data.exercises)
    return {
      scenarios: 0,
      totalSteps: 0,
      averageStepsPerScenario: 0,
    };

  const totalScenarios = data.exercises.length;
  const totalSteps = getTotalStepsCount(level);

  return {
    scenarios: totalScenarios,
    totalSteps: totalSteps,
    averageStepsPerScenario:
      totalScenarios > 0 ? totalSteps / totalScenarios : 0,
  };
};
