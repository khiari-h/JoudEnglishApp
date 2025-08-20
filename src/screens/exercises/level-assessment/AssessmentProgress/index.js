// AssessmentProgress/index.js - VERSION SIMPLE AVEC UTILS

import { useMemo } from "react";
import PropTypes from 'prop-types';
import ProgressCard from "../../../../components/ui/ProgressCard";
import {
  calculateTotalQuestions,
  calculateAnsweredQuestionsCount,
  calculateTotalProgress,
  calculateSectionProgressData,
} from "../../../../utils/assessment/assessmentStats";

/**
 * 📊 AssessmentProgress - Version simple avec utils
 * ✅ Utilise les fonctions d'assessmentStats.js comme les autres composants
 * ✅ Utilise totalQuestions du fichier de données
 * ✅ Code propre et cohérent
 * 
 * @param {Array} sections - Liste des clés de sections
 * @param {Object} assessmentData - Données complètes de l'évaluation
 * @param {Object} userAnswers - Réponses de l'utilisateur par section
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} expanded - État d'expansion
 * @param {Function} onToggleExpand - Callback pour l'expansion
 * @param {Function} onSectionPress - Callback pour cliquer sur une section
 */
const AssessmentProgress = ({
  sections = [],
  assessmentData = {},
  userAnswers = {},
  levelColor = "#3b82f6",
  expanded = false,
  onToggleExpand,
  onSectionPress,
}) => {
  
  // ✅ MÉMORISER les calculs avec les utils
  const progressData = useMemo(() => {
    // Utiliser les fonctions d'assessmentStats.js
    const totalQuestions = calculateTotalQuestions(assessmentData, sections);
    const answeredQuestions = calculateAnsweredQuestionsCount(userAnswers);
    const totalProgress = calculateTotalProgress(assessmentData, sections, userAnswers);
    const sectionData = calculateSectionProgressData(assessmentData, sections, userAnswers);
    
    // Transformer pour le format ProgressCard
    const formattedSectionData = sectionData.map((section) => ({
      title: section.title,
      completed: section.answeredQuestions,
      total: section.totalQuestions,
      progress: section.progress,
    }));
    
    return {
      totalProgress,
      sectionData: formattedSectionData,
      totalQuestions,
      answeredQuestions,
    };
  }, [sections, assessmentData, userAnswers]);

  return (
    <ProgressCard
      title="Progression de l'évaluation"
      subtitle={`${progressData.answeredQuestions} / ${progressData.totalQuestions} questions répondues`}
      progress={progressData.totalProgress}
      completed={progressData.answeredQuestions}
      total={progressData.totalQuestions}
      unit="questions"
      levelColor={levelColor}
      expandable={true}
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={progressData.sectionData}
      onCategoryPress={onSectionPress}
    />
  );
};

// ✅ PropTypes cohérents avec les autres composants
AssessmentProgress.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string),
  assessmentData: PropTypes.object,
  userAnswers: PropTypes.object,
  levelColor: PropTypes.string,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  onSectionPress: PropTypes.func,
};

// ✅ Valeurs par défaut
AssessmentProgress.defaultProps = {
  sections: [],
  assessmentData: {},
  userAnswers: {},
  levelColor: "#3b82f6",
  expanded: false,
  onToggleExpand: undefined,
  onSectionPress: undefined,
};

export default AssessmentProgress;