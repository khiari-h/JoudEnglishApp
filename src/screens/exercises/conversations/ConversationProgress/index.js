// ConversationProgress/index.js - VERSION CORRIGÉE AVEC useMemo

import { useMemo } from "react";
import PropTypes from "prop-types";
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
 * 
 * @param {string} levelColor - Couleur principale du composant
 * @param {Array} conversationData - Données des scénarios de conversation
 * @param {Object} completedScenarios - Scénarios complétés par l'utilisateur
 * @param {Object} conversationHistory - Historique des conversations par scénario
 * @param {boolean} expanded - État d'expansion du composant
 * @param {function} onToggleExpand - Callback pour toggle l'expansion
 * @param {function} onScenarioPress - Callback appelé lors du clic sur un scénario
 */
const ConversationProgress = ({
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
      expandable
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedScenarioData}
      onCategoryPress={onScenarioPress}
    />
  );
};

// PropTypes pour la validation des props
ConversationProgress.propTypes = {
  levelColor: PropTypes.string,
  conversationData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      steps: PropTypes.array,
    })
  ),
  completedScenarios: PropTypes.object,
  conversationHistory: PropTypes.object,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  onScenarioPress: PropTypes.func,
};

// Valeurs par défaut
ConversationProgress.defaultProps = {
  levelColor: "#5E60CE",
  conversationData: [],
  completedScenarios: {},
  conversationHistory: {},
  expanded: false,
  onToggleExpand: null,
  onScenarioPress: null,
};

export default ConversationProgress;