// AssessmentProgress/index.js - VERSION CORRIGÉE AVEC useMemo

import React, { useMemo } from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import { calculateSectionProgressData } from "../../../../utils/assessment/assessmentStats";
import { getAssessmentData, getAssessmentSections } from "../../../../utils/assessment/assessmentDataHelper";

/**
 * 📊 AssessmentProgress - Version corrigée avec mémorisation
 * ✅ Évite les boucles infinies avec useMemo
 * ✅ Performance optimisée
 */
const AssessmentProgress = ({
  currentSection = 1,
  totalSections = 0,
  sectionTitle = "",
  currentQuestion = 1,
  totalQuestions = 0,
  answeredQuestionsInSection = 0,
  levelColor = "#3b82f6",
  userAnswers = {},
  level = "A1",
  expanded = false,
  onToggleExpand,
  onSectionPress,
}) => {
  
  // ✅ MÉMORISER le calcul de progression de section
  const sectionProgress = useMemo(() => {
    return totalQuestions > 0 
      ? Math.round((answeredQuestionsInSection / totalQuestions) * 100)
      : 0;
  }, [answeredQuestionsInSection, totalQuestions]);

  // ✅ MÉMORISER les données d'assessment
  const assessmentData = useMemo(() => {
    return getAssessmentData(level);
  }, [level]);

  // ✅ MÉMORISER les sections
  const sections = useMemo(() => {
    return getAssessmentSections();
  }, []);

  // ✅ MÉMORISER le calcul de progression des sections
  const sectionProgressData = useMemo(() => {
    return calculateSectionProgressData(assessmentData, sections, userAnswers);
  }, [assessmentData, sections, userAnswers]);

  // ✅ MÉMORISER la transformation des données
  const formattedSectionData = useMemo(() => {
    return sectionProgressData.map((section, index) => ({
      title: section.title,
      completed: section.answeredQuestions,
      total: section.totalQuestions,
      progress: section.progress,
    }));
  }, [sectionProgressData]);

  // ✅ MÉMORISER les données de debug (seulement en dev)
  const debugData = useMemo(() => {
    if (process.env.NODE_ENV !== 'development') return null;
    
    return {
      currentSection,
      totalSections,
      currentQuestion,
      totalQuestions,
      answeredQuestionsInSection,
      sectionProgress,
      hasAssessmentData: !!assessmentData,
      sectionsLength: sections.length,
      assessmentDataKeys: assessmentData && typeof assessmentData === 'object' ? Object.keys(assessmentData) : "not object or null"
    };
  }, [currentSection, totalSections, currentQuestion, totalQuestions, answeredQuestionsInSection, sectionProgress, assessmentData, sections.length]);

  // ✅ CORRECTION FINALE : Pas de log dans le render !
  // Le log était dans le render, il se déclenchait à chaque fois

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