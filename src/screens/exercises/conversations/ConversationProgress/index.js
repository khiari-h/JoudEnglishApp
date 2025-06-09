// ConversationProgress/index.js - VERSION REFACTORISÉE avec ProgressCard

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalScenarios,
  calculateCompletedScenariosCount,
  calculateTotalProgress,
  calculateScenarioProgress,
} from "../../../../utils/conversation/conversationStats";

/**
 * 📊 ConversationProgress - Version Refactorisée avec ProgressCard générique
 * Même qualité visuelle que VocabularyProgress, GrammarProgress, etc.
 * Cohérent avec les 4 autres exercices ✅
 * 
 * @param {number} progress - Pourcentage de progression du scénario actuel (0-100)
 * @param {number} currentStep - Étape actuelle (1-based)
 * @param {number} totalSteps - Nombre total d'étapes du scénario actuel
 * @param {string} levelColor - Couleur du niveau
 * @param {Array} conversationData - Données des conversations (pour expansion optionnelle)
 * @param {Object} completedScenarios - Scénarios complétés
 * @param {Object} conversationHistory - Historique des conversations
 * @param {boolean} expanded - État d'expansion
 * @param {function} onToggleExpand - Fonction pour toggle expansion
 * @param {function} onScenarioPress - Fonction appelée lors du clic sur scénario
 */
const ConversationProgress = ({
  progress = 0,
  currentStep = 1,
  totalSteps = 0,
  levelColor = "#5E60CE",
  conversationData = [],
  completedScenarios = {},
  conversationHistory = {},
  expanded = false,
  onToggleExpand = () => {},
  onScenarioPress = () => {},
}) => {
  
  // Calculs des statistiques globales
  const totalScenariosCount = calculateTotalScenarios(conversationData);
  const completedScenariosCount = calculateCompletedScenariosCount(completedScenarios);
  const totalProgress = calculateTotalProgress(conversationData, completedScenarios);
  
  // Données des scénarios pour l'expansion (optionnel)
  const scenarioProgressData = calculateScenarioProgress(conversationData, completedScenarios, conversationHistory);

  // Transformation pour le format ProgressCard (identique aux autres exercices)
  const formattedScenarioData = scenarioProgressData.map((scenario, index) => ({
    title: scenario.title,
    completed: scenario.completedSteps,
    total: scenario.totalSteps,
    progress: scenario.progress,
  }));

  return (
    <ProgressCard
      title="Conversation Progress"
      progress={totalProgress} // Progress global, pas juste du scénario actuel
      completed={completedScenariosCount}
      total={totalScenariosCount}
      unit="scenarios"
      levelColor={levelColor}
      expandable={formattedScenarioData.length > 0} // Expansion si scénarios disponibles
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedScenarioData}
      onCategoryPress={onScenarioPress}
      // Affichage secondaire pour le scénario actuel
      secondaryInfo={totalSteps > 0 ? `Step ${currentStep}/${totalSteps}` : ""}
    />
  );
};

export default ConversationProgress;