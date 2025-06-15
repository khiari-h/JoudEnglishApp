// ConversationProgress/index.js - VERSION CORRIGÉE AVEC DÉTECTION AUTO

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalScenarios,
  calculateCompletedScenariosCount,
  calculateTotalProgress,
  calculateScenarioProgress,
} from "../../../../utils/conversation/conversationStats";

/**
 * 📊 ConversationProgress - Version Corrigée avec détection automatique
 * ✅ Détecte automatiquement la structure des données
 * ✅ Gère exercises, scenarios, conversations, etc.
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
  
  // ✅ DÉTECTION AUTOMATIQUE de la structure
  const getDataArray = () => {
    // Si c'est un tableau directement
    if (Array.isArray(conversationData)) {
      return conversationData;
    }
    
    // Si c'est un objet avec des propriétés
    if (conversationData && typeof conversationData === 'object') {
      // Cherche scenarios, exercises, conversations, etc.
      return conversationData.scenarios || 
             conversationData.exercises || 
             conversationData.conversations || 
             conversationData.items || 
             [];
    }
    
    return [];
  };

  const dataArray = getDataArray();
  
  // ✅ UTILISE la vraie structure détectée
  const totalScenariosCount = calculateTotalScenarios(dataArray);
  const completedScenariosCount = calculateCompletedScenariosCount(completedScenarios);
  const totalProgress = calculateTotalProgress(dataArray, completedScenarios);
  const scenarioProgressData = calculateScenarioProgress(dataArray, completedScenarios, conversationHistory);

  // Transformation pour le format ProgressCard
  const formattedScenarioData = scenarioProgressData.map((scenario, index) => ({
    title: scenario.title,
    completed: scenario.completedSteps,
    total: scenario.totalSteps,
    progress: scenario.progress,
  }));

  console.log("🔍 ConversationProgress Debug:", {
    isArray: Array.isArray(conversationData),
    hasScenarios: !!(conversationData?.scenarios),
    hasExercises: !!(conversationData?.exercises),
    hasConversations: !!(conversationData?.conversations),
    dataArrayLength: dataArray.length,
    totalScenariosCount,
    completedScenariosCount,
    totalProgress,
    conversationDataKeys: conversationData && typeof conversationData === 'object' ? Object.keys(conversationData) : "not object"
  });

  return (
    <ProgressCard
      title="Progression" // ✅ Titre uniforme
      progress={totalProgress}
      completed={completedScenariosCount}
      total={totalScenariosCount}
      unit="scénarios"
      levelColor={levelColor}
      expandable={formattedScenarioData.length > 0}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedScenarioData}
      onCategoryPress={onScenarioPress}
      secondaryInfo={totalSteps > 0 ? `Étape ${currentStep}/${totalSteps}` : ""}
    />
  );
};

export default ConversationProgress;