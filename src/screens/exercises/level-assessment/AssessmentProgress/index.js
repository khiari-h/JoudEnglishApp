// AssessmentProgress/index.js - VERSION CORRIGÉE AVEC useMemo et PropTypes

import { useMemo } from "react";
import PropTypes from 'prop-types';
import ProgressCard from "../../../../components/ui/ProgressCard";

/**
 * 📊 AssessmentProgress - Version corrigée avec mémorisation et PropTypes
 * ✅ Évite les boucles infinies avec useMemo
 * ✅ Performance optimisée
 * ✅ Validation des props complète
 * 
 * @param {number} currentSection - Section actuelle (1-based)
 * @param {number} totalSections - Nombre total de sections
 * @param {number} currentQuestion - Question actuelle dans la section (1-based)
 * @param {number} totalQuestions - Nombre total de questions dans la section
 * @param {number} answeredQuestionsInSection - Questions répondues dans la section
 * @param {string} levelColor - Couleur du niveau
 */
const AssessmentProgress = ({
  currentSection = 1,
  totalSections = 0,
  currentQuestion = 1,
  totalQuestions = 0,
  answeredQuestionsInSection = 0,
  levelColor = "#3b82f6",
}) => {
  
  // ✅ MÉMORISER le calcul de progression de section
  const sectionProgress = useMemo(() => {
    return totalQuestions > 0 
      ? Math.round((answeredQuestionsInSection / totalQuestions) * 100)
      : 0;
  }, [answeredQuestionsInSection, totalQuestions]);

  return (
    <ProgressCard
      title="Progression"
      subtitle={`Section ${currentSection}/${totalSections} • Question ${currentQuestion}/${totalQuestions}`}
      progress={sectionProgress}
      completed={answeredQuestionsInSection}
      total={totalQuestions}
      unit="questions"
      levelColor={levelColor}
      expandable={false}
      expanded={false}
      onToggleExpand={undefined}
      categoryData={[]}
      onCategoryPress={undefined}
    />
  );
};

// ✅ PropTypes - Corrige toutes les erreurs de validation
AssessmentProgress.propTypes = {
  currentSection: PropTypes.number,
  totalSections: PropTypes.number,
  currentQuestion: PropTypes.number,
  totalQuestions: PropTypes.number,
  answeredQuestionsInSection: PropTypes.number,
  levelColor: PropTypes.string,
};

// ✅ Valeurs par défaut
AssessmentProgress.defaultProps = {
  currentSection: 1,
  totalSections: 0,
  currentQuestion: 1,
  totalQuestions: 0,
  answeredQuestionsInSection: 0,
  levelColor: "#3b82f6",
};

export default AssessmentProgress;