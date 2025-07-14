// ConversationProgress/index.js - VERSION CORRIGÉE AVEC useMemo

import { useMemo } from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalScenarios,
  calculateCompletedScenarios,
  calculateTotalSteps,
  calculateCompletedSteps,
} from "../../../../utils/conversation/conversationStats";

/**
 * 📊 ConversationProgress - Version corrigée avec mémorisation
 * ✅ Évite les boucles infinies avec useMemo
 * ✅ Performance optimisée
 * ✅ Détecte automatiquement la structure des données
 */
const ConversationProgress = ({
  currentStep = 1,
  totalSteps = 0,
  levelColor = "#5E60CE",
  conversationData = [],
  completedScenarios = {},
  conversationHistory = {},
  expanded = false,
  onToggleExpand,
  onScenarioPress,
}) => {
  
  // ✅ MÉMORISER les statistiques calculées
  const statsData = useMemo(() => {
    const totalScenarios = calculateTotalScenarios(conversationData);
    const completedScenariosCount = calculateCompletedScenarios(completedScenarios);
    const totalStepsCount = calculateTotalSteps(conversationData);
    const completedStepsCount = calculateCompletedSteps(conversationHistory);
    
    return {
      totalScenarios,
      completedScenariosCount,
      totalStepsCount,
      completedStepsCount,
      completionProgress: totalStepsCount > 0 ? Math.round((completedStepsCount / totalStepsCount) * 100) : 0,
      scenarioProgressData: conversationData.map((scenario, index) => ({
        title: scenario.title || `Scénario ${index + 1}`,
        completedSteps: conversationHistory[scenario.id]?.length || 0,
        totalSteps: scenario.steps?.length || 1,
        progress: scenario.steps?.length > 0 
          ? Math.round(((conversationHistory[scenario.id]?.length || 0) / scenario.steps.length) * 100)
          : 0
      }))
    };
  }, [conversationData, completedScenarios, conversationHistory]);

  // ✅ MÉMORISER la transformation des données
  const formattedScenarioData = useMemo(() => {
    return statsData.scenarioProgressData.map((scenario) => ({
      title: scenario.title,
      completed: scenario.completedSteps,
      total: scenario.totalSteps,
      progress: scenario.progress,
    }));
  }, [statsData.scenarioProgressData]);

  return (
    <ProgressCard
      title="Progression"
      subtitle={`${statsData.completedScenariosCount}/${statsData.totalScenarios} scénarios • ${statsData.completedStepsCount}/${statsData.totalStepsCount} étapes`}
      progress={statsData.completionProgress}
      completed={statsData.completedStepsCount}
      total={statsData.totalStepsCount}
      unit="étapes"
      levelColor={levelColor}
      expandable={true}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedScenarioData}
      onCategoryPress={onScenarioPress}
    />
  );
};

export default ConversationProgress;