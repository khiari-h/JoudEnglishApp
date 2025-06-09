// AssessmentProgress/index.js - VERSION REFACTORISÉE avec ProgressCard

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import { calculateSectionProgressData } from "../../../../utils/assessment/assessmentStats";
import { getAssessmentData, getAssessmentSections } from "../../../../utils/assessment/assessmentDataHelper";

/**
 * 📊 AssessmentProgress - Version Refactorisée avec ProgressCard générique
 * Réutilise le composant ProgressCard comme VocabularyProgress
 * 
 * @param {number} currentSection - Section actuelle (1-based)
 * @param {number} totalSections - Nombre total de sections
 * @param {string} sectionTitle - Titre de la section actuelle
 * @param {number} currentQuestion - Question actuelle (1-based)
 * @param {number} totalQuestions - Total questions dans la section
 * @param {number} answeredQuestionsInSection - Questions répondues dans la section
 * @param {string} levelColor - Couleur du niveau
 * @param {object} userAnswers - Réponses de l'utilisateur
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
  
  // Calculer la progression de la section actuelle
  const sectionProgress = totalQuestions > 0 
    ? Math.round((answeredQuestionsInSection / totalQuestions) * 100)
    : 0;

  // Données pour l'expansion (optionnel)
  const assessmentData = getAssessmentData(level);
  const sections = getAssessmentSections();
  const sectionProgressData = calculateSectionProgressData(assessmentData, sections, userAnswers);

  // Transformation pour le format ProgressCard
  const formattedSectionData = sectionProgressData.map((section, index) => ({
    title: section.title,
    completed: section.answeredQuestions,
    total: section.totalQuestions,
    progress: section.progress,
  }));

  return (
    <ProgressCard
      title="Assessment Progress"
      subtitle={`Section ${currentSection}/${totalSections} • Question ${currentQuestion}/${totalQuestions}`}
      progress={sectionProgress}
      completed={answeredQuestionsInSection}
      total={totalQuestions}
      unit="questions"
      levelColor={levelColor}
      expandable={false} // ✅ DÉSACTIVÉ pour Assessment - pas de navigation libre
      expanded={false}
      onToggleExpand={undefined}
      categoryData={[]} // ✅ Pas de données d'expansion
      onCategoryPress={undefined}
    />
  );
};

export default AssessmentProgress;