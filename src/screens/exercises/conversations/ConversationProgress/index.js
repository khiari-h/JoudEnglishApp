// ConversationProgress/index.js - VERSION AVEC GAMIFICATION

import { useMemo } from "react";
import PropTypes from "prop-types";
import ProgressCard from "../../../../components/ui/ProgressCard";
import useProgressGamification from "../../../../hooks/useProgressGamification";
import {
  calculateTotalScenarios,
  calculateCompletedScenariosCount,
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
    const completedScenariosCount = calculateCompletedScenariosCount(completedScenarios);
    const totalStepsCount = calculateTotalSteps(conversationData);
    const completedStepsCount = calculateCompletedSteps(conversationHistory, completedScenarios);
    
    return {
      totalScenarios,
      completedScenariosCount,
      totalStepsCount,
      completedStepsCount,
      completionProgress: totalStepsCount > 0 ? Math.round((completedStepsCount / totalStepsCount) * 100) : 0,
      scenarioProgressData: conversationData.map((scenario, index) => {
        const isCompleted = Boolean(completedScenarios[index]);
        
        return {
          title: scenario.title || `Scénario ${index + 1}`,
          completedSteps: isCompleted ? (scenario.steps?.length || 1) : 0,
          totalSteps: scenario.steps?.length || 1,
          progress: isCompleted ? 100 : 0
        };
      })
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

  // 🎭 GAMIFICATION : Hook déplacé au niveau racine (comme dans VocabularyProgress)
  const gamification = useProgressGamification({
    progress: statsData.completionProgress,
    completed: statsData.completedScenariosCount,
    total: statsData.totalScenarios,
    type: "conversations"
  });

  return (
    <ProgressCard
      title={gamification.messages.main} // 🎭 Titre dynamique et motivant
      subtitle={gamification.messages.subtitle} // 🎭 Sous-titre dynamique
      progress={statsData.completionProgress}
      completed={statsData.completedScenariosCount}
      total={statsData.totalScenarios}
      unit="scénarios"
      levelColor={gamification.colors.primary} // 🎭 Couleur dynamique selon la progression
      expandable
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={formattedScenarioData}
      onCategoryPress={onScenarioPress}
      // 🎭 Props de gamification pour ProgressCard
      gamificationData={gamification}
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