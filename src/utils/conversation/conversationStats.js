// utils/conversation/conversationStats.js - Fonctions utilitaires (pattern identique aux autres exercices)

/**
 * 📊 Utilitaires de calcul pour Conversation
 * Pattern identique à utils/vocabulary/vocabularyStats.js, utils/grammar/grammarStats.js, etc.
 * Garde la logique métier séparée des composants
 */

/**
 * Calculer le nombre total de scénarios
 * @param {Array} conversationData - Données de conversation [{ steps: [...] }]
 * @returns {number} Nombre total de scénarios
 */
export const calculateTotalScenarios = (conversationData) => {
  return conversationData.length;
};

/**
 * Calculer le nombre total d'étapes
 * @param {Array} conversationData - Données de conversation [{ steps: [...] }]
 * @returns {number} Nombre total d'étapes
 */
export const calculateTotalSteps = (conversationData) => {
  return conversationData.reduce((total, scenario) => {
    return total + (scenario.steps?.length || 0);
  }, 0);
};

/**
 * Calculer le nombre de scénarios complétés
 * @param {Object} completedScenarios - Scénarios complétés {0: {...}, 1: {...}}
 * @returns {number} Nombre de scénarios complétés
 */
export const calculateCompletedScenariosCount = (completedScenarios) => {
  return Object.values(completedScenarios).filter(Boolean).length;
};

/**
 * Calculer la progression totale en pourcentage
 * @param {Array} conversationData - Données de conversation
 * @param {Object} completedScenarios - Scénarios complétés
 * @returns {number} Pourcentage de progression (0-100)
 */
export const calculateTotalProgress = (conversationData, completedScenarios) => {
  const totalScenarios = calculateTotalScenarios(conversationData);
  const completedCount = calculateCompletedScenariosCount(completedScenarios);
  
  return totalScenarios > 0 ? Math.round((completedCount / totalScenarios) * 100) : 0;
};

/**
 * Calculer la progression par scénario
 * @param {Array} conversationData - Données de conversation
 * @param {Object} completedScenarios - Scénarios complétés
 * @param {Object} conversationHistory - Historique des conversations
 * @returns {Array} Progression par scénario
 */
export const calculateScenarioProgress = (conversationData, completedScenarios, conversationHistory) => {
  return conversationData.map((scenario, index) => {
    const totalSteps = scenario.steps?.length || 0;
    const isCompleted = Boolean(completedScenarios[index]);
    
    let completedSteps = 0;
    if (isCompleted) {
      completedSteps = totalSteps;
    } else if (conversationHistory[index]?.conversation) {
      // Count bot messages to determine progress
      const botMessages = conversationHistory[index].conversation.filter(msg => msg.sender === "bot");
      completedSteps = Math.min(botMessages.length, totalSteps);
    }
    
    const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
    
    return {
      title: scenario.title || `Scenario ${index + 1}`,
      totalSteps,
      completedSteps,
      progress: Math.round(progress),
      isCompleted,
    };
  });
};

/**
 * Calculer les statistiques d'un scénario spécifique
 * @param {Object} scenario - Scénario spécifique
 * @param {Object} completedScenarios - Scénarios complétés
 * @param {Object} conversationHistory - Historique des conversations
 * @param {number} scenarioIndex - Index du scénario
 * @returns {Object} Statistiques du scénario
 */
export const calculateScenarioStats = (scenario, completedScenarios, conversationHistory, scenarioIndex) => {
  const totalSteps = scenario.steps?.length || 0;
  const isCompleted = Boolean(completedScenarios[scenarioIndex]);
  
  let currentStep = 0;
  let messageCount = 0;
  
  if (conversationHistory[scenarioIndex]?.conversation) {
    const conversation = conversationHistory[scenarioIndex].conversation;
    messageCount = conversation.length;
    
    // Calculate current step based on bot messages
    const botMessages = conversation.filter(msg => msg.sender === "bot");
    currentStep = Math.min(botMessages.length, totalSteps);
  }
  
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  
  return {
    totalSteps,
    currentStep,
    progress: Math.round(progress),
    messageCount,
    isCompleted,
    hasStarted: messageCount > 0,
  };
};