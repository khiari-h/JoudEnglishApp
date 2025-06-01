// src/screens/exercises/levelAssessment/hooks/useAssessmentState.js
import { useState, useEffect } from "react";

// Utilitaires
import {
  getAssessmentData,
  getAssessmentSections,
  isLastQuestionInSection,
} from "../../../../utils/assessment/assessmentDataHelper";

/**
 * Hook personnalisé pour gérer l'état de l'évaluation de niveau
 * VERSION SIMPLIFIÉE POUR DEBUG
 *
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 */
const useAssessmentState = (level) => {
  // Données d'évaluation basées sur le niveau
  const assessmentData = getAssessmentData(level);
  const sections = getAssessmentSections();

  // États de gestion du test
  const [currentSection, setCurrentSection] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  // Initialisation du test
  useEffect(() => {
    if (!currentSection && sections.length > 0) {
      setCurrentSection(sections[0]);
    }
  }, [currentSection, sections]);

  // Obtenir la question actuelle
  const getCurrentQuestion = () => {
    if (!currentSection || !assessmentData[currentSection]) {
      return null;
    }
    const question =
      assessmentData[currentSection].questions[currentQuestionIndex];
    return question;
  };

  // Gestion de la sélection de réponse (VERSION SIMPLIFIÉE)
  const handleSelectAnswer = (answerIndex) => {
    if (showFeedback) {
      return;
    }

    setSelectedAnswer(answerIndex);
  };

  // Vérification de la réponse (VERSION SIMPLIFIÉE)
  const validateAnswer = () => {
    if (selectedAnswer === null || showFeedback) {
      return;
    }

    setShowFeedback(true);
  };

  // Passer à la question suivante
  const goToNextQuestion = () => {
    if (!currentSection) return;

    const currentSectionData = assessmentData[currentSection];
    if (!currentSectionData) return;

    if (currentQuestionIndex < currentSectionData.questions.length - 1) {
      // Passer à la question suivante dans la section
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Passer à la section suivante
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSection(sections[currentSectionIndex + 1]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Test terminé
        setTestCompleted(true);
      }
    }
  };

  // Réessayer la question actuelle
  const tryAgain = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  // Fonctions simplifiées pour la compatibilité
  const changeSection = (sectionKey) => {
    if (sections.includes(sectionKey)) {
      setCurrentSection(sectionKey);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const changeQuestion = (questionIndex) => {
    if (!currentSection) return;

    const currentSectionData = assessmentData[currentSection];
    if (
      currentSectionData &&
      questionIndex >= 0 &&
      questionIndex < currentSectionData.questions.length
    ) {
      setCurrentQuestionIndex(questionIndex);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  // Restaurer l'état complet (section + question) avec protection anti-boucle
  const restoreState = (sectionIndex, questionIndex) => {
    // Vérifier si on a vraiment besoin de restaurer (éviter les boucles)
    const targetSection = sections[sectionIndex];
    const currentSectionIndex = sections.indexOf(currentSection);

    if (
      currentSectionIndex === sectionIndex &&
      currentQuestionIndex === questionIndex
    ) {
      return;
    }

    if (
      typeof sectionIndex === "number" &&
      sectionIndex >= 0 &&
      sectionIndex < sections.length
    ) {
      const sectionKey = sections[sectionIndex];

      setCurrentSection(sectionKey);

      if (
        assessmentData[sectionKey] &&
        typeof questionIndex === "number" &&
        questionIndex >= 0 &&
        questionIndex < assessmentData[sectionKey].questions.length
      ) {
        setCurrentQuestionIndex(questionIndex);
      } else {
        setCurrentQuestionIndex(0);
      }
    }

    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  return {
    // États
    currentSection,
    currentQuestionIndex,
    currentQuestion: getCurrentQuestion(),
    selectedAnswer,
    showFeedback,
    testCompleted,
    assessmentData,

    // Actions
    handleSelectAnswer,
    validateAnswer,
    goToNextQuestion,
    tryAgain,
    changeSection,
    changeQuestion,
    restoreState,
    setTestCompleted,

    // Utilitaires
    isLastQuestionInSection: (questionIndex, section) =>
      isLastQuestionInSection(questionIndex, section, assessmentData),
  };
};

export default useAssessmentState;
