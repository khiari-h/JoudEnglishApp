// ConversationProgress/index.js - VERSION CORRIGÉE AVEC useMemo

import React, { useMemo } from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalScenarios,
  calculateCompletedScenariosCount,
  calculateTotalProgress,
  calculateScenarioProgress,
} from "../../../../utils/conversation/conversationStats";

/**
 * 📊 ConversationProgress - Version corrigée avec mémorisation
 * ✅ Évite les boucles infinies avec useMemo
 * ✅ Détecte automatiquement la structure des données
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
  
  // ✅ MÉMORISER la détection de structure
  const dataArray = useMemo(() => {
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
  }, [conversationData]);
  
  // ✅ MÉMORISER tous les calculs
  const statsData = useMemo(() => {
    const totalScenariosCount = calculateTotalScenarios(dataArray);
    const completedScenariosCount = calculateCompletedScenariosCount(completedScenarios);
    const totalProgress = calculateTotalProgress(dataArray, completedScenarios);
    const scenarioProgressData = calculateScenarioProgress(dataArray, completedScenarios, conversationHistory);

    return {
      totalScenariosCount,
      completedScenariosCount,
      totalProgress,
      scenarioProgressData
    };
  }, [dataArray, completedScenarios, conversationHistory]);

  // ✅ MÉMORISER la transformation des données
  const formattedScenarioData = useMemo(() => {
    return statsData.scenarioProgressData.map((scenario, index) => ({
      title: scenario.title,
      completed: scenario.completedSteps,
      total: scenario.totalSteps,
      progress: scenario.progress,
    }));
  }, [statsData.scenarioProgressData]);

  // ✅ MÉMORISER les données de debug (seulement en dev)
  const debugData = useMemo(() => {
    if (process.env.NODE_ENV !== 'development') return null;
    
    return {
      isArray: Array.isArray(conversationData),
      hasScenarios: !!(conversationData?.scenarios),
      hasExercises: !!(conversationData?.exercises),
      hasConversations: !!(conversationData?.conversations),
      dataArrayLength: dataArray.length,
      totalScenariosCount: statsData.totalScenariosCount,
      completedScenariosCount: statsData.completedScenariosCount,
      totalProgress: statsData.totalProgress,
      conversationDataKeys: conversationData && typeof conversationData === 'object' ? Object.keys(conversationData) : "not object"
    };
  }, [conversationData, dataArray.length, statsData]);

  // ✅ CORRECTION FINALE : Pas de log dans le render !

  return (
    <ProgressCard
      title="Progression"
      progress={statsData.totalProgress}
      completed={statsData.completedScenariosCount}
      total={statsData.totalScenariosCount}
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