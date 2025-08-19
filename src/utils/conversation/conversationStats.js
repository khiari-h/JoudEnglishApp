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
 * Calculer le nombre d'étapes complétées
 * @param {Object} conversationHistory - Historique des conversations par scénario
 * @param {Object} completedScenarios - Scénarios complétés par l'utilisateur
 * @returns {number} Nombre d'étapes complétées
 */
export const calculateCompletedSteps = (conversationHistory, completedScenarios = {}) => {
  return Object.entries(conversationHistory).reduce((total, [scenarioIndex, history]) => {
    if (history?.conversation) {
      // ✅ CORRIGÉ : Ne compter les étapes que si le scénario est complètement terminé
      const isScenarioCompleted = Boolean(completedScenarios[scenarioIndex]);
      
      if (isScenarioCompleted) {
        // Si le scénario est terminé, compter toutes ses étapes
        const botMessages = history.conversation.filter(msg => msg.sender === "bot");
        return total + botMessages.length;
      } else {
        // Si le scénario n'est pas terminé, ne pas compter ses étapes
        return total;
      }
    }
    return total;
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
    let progress = 0;
    
    if (isCompleted) {
      // ✅ CORRIGÉ : Si le scénario est terminé, montrer 100% de progression
      completedSteps = totalSteps;
      progress = 100;
    } else {
      // ✅ CORRIGÉ : Si le scénario n'est pas terminé, montrer 0% de progression
      completedSteps = 0;
      progress = 0;
    }
    
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
  let progress = 0;
  
  if (isCompleted) {
    // ✅ CORRIGÉ : Si le scénario est terminé, montrer 100% de progression
    currentStep = totalSteps;
    progress = 100;
    
    if (conversationHistory[scenarioIndex]?.conversation) {
      messageCount = conversationHistory[scenarioIndex].conversation.length;
    }
  } else {
    // ✅ CORRIGÉ : Si le scénario n'est pas terminé, montrer 0% de progression
    currentStep = 0;
    progress = 0;
    
    if (conversationHistory[scenarioIndex]?.conversation) {
      messageCount = conversationHistory[scenarioIndex].conversation.length;
    }
  }
  
  return {
    totalSteps,
    currentStep,
    progress: Math.round(progress),
    messageCount,
    isCompleted,
    hasStarted: messageCount > 0,
  };
};