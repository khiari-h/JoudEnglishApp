// AssessmentProgress/index.js - VERSION CORRIGÉE AVEC useMemo

import { useMemo } from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import { getAssessmentData, getAssessmentSections } from "../../../../utils/assessment/assessmentDataHelper";

/**
 * 📊 AssessmentProgress - Version corrigée avec mémorisation
 * ✅ Évite les boucles infinies avec useMemo
 * ✅ Performance optimisée
 */
const AssessmentProgress = ({
  currentSection = 1,
  totalSections = 0,
  currentQuestion = 1,
  totalQuestions = 0,
  answeredQuestionsInSection = 0,
  levelColor = "#3b82f6",
  level = "A1",
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

export default AssessmentProgress;