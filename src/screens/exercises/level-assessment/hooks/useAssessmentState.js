// src/screens/exercises/levelAssessment/hooks/useAssessmentState.js
import { useState, useEffect, useRef } from "react";

// Utilitaires
import {
  getAssessmentData,
  getAssessmentSections,
  isLastQuestionInSection,
} from "../../../../utils/assessment/assessmentDataHelper";

/**
 * Hook personnalisé pour gérer l'état de l'évaluation de niveau
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
    // Commencer par la première section
    setCurrentSection(sections[0]);
  }, []);

  // Obtenir la question actuelle
  const getCurrentQuestion = () => {
    if (!currentSection || !assessmentData[currentSection]) return null;
    return assessmentData[currentSection].questions[currentQuestionIndex];
  };

  // Gestion de la sélection de réponse (avec protection contre les appels multiples)
  const handleSelectAnswer = (answerIndex) => {
    if (showFeedback) return; // Ne pas permettre de changer la réponse si le feedback est affiché

    console.log(`[Assessment] Sélection de la réponse: ${answerIndex}`);
    setSelectedAnswer(answerIndex);
  };

  // Vérification de la réponse (sans animation pour éviter le tremblement)
  const validateAnswer = () => {
    if (selectedAnswer === null || showFeedback) return;

    // Montrer le feedback directement sans animation
    setShowFeedback(true);
  };

  // Passer à la question suivante ou section suivante
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

  // **NOUVELLES FONCTIONS** - Pour correspondre au pattern VocabularyExercise

  // Changer de section manuellement (avec protection)
  const changeSection = (sectionKey) => {
    if (sections.includes(sectionKey) && sectionKey !== currentSection) {
      console.log(`[Assessment] Changement de section vers: ${sectionKey}`);
      setCurrentSection(sectionKey);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  // Changer de question manuellement (avec protection)
  const changeQuestion = (questionIndex) => {
    if (!currentSection) return;

    const currentSectionData = assessmentData[currentSection];
    if (
      currentSectionData &&
      questionIndex >= 0 &&
      questionIndex < currentSectionData.questions.length &&
      questionIndex !== currentQuestionIndex
    ) {
      console.log(`[Assessment] Changement de question vers: ${questionIndex}`);
      setCurrentQuestionIndex(questionIndex);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  // Restaurer l'état complet (section + question) avec protection contre les boucles
  const restoreState = (sectionIndex, questionIndex) => {
    console.log(
      `[Assessment Hook] Restauration de l'état: section ${sectionIndex}, question ${questionIndex}`
    );

    // Vérifier si on a vraiment besoin de restaurer
    const targetSection = sections[sectionIndex];
    if (!targetSection || targetSection === currentSection) {
      console.log(
        `[Assessment Hook] Restauration ignorée - section identique ou invalide`
      );
      return;
    }

    // Restaurer la section
    if (
      typeof sectionIndex === "number" &&
      sectionIndex >= 0 &&
      sectionIndex < sections.length
    ) {
      const sectionKey = sections[sectionIndex];
      setCurrentSection(sectionKey);

      // Restaurer la question après avoir défini la section
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

    // Réinitialiser les états de réponse
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  // Aller à la question précédente
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      return true;
    }
    return false;
  };

  // Obtenir les informations sur la progression
  const getProgressInfo = () => {
    const currentSectionIndex = sections.indexOf(currentSection);
    const totalSections = sections.length;

    let totalQuestions = 0;
    let currentPosition = 0;

    // Calculer le total de questions et la position actuelle
    sections.forEach((section, index) => {
      const sectionData = assessmentData[section];
      if (sectionData && sectionData.questions) {
        if (index < currentSectionIndex) {
          currentPosition += sectionData.questions.length;
        } else if (index === currentSectionIndex) {
          currentPosition += currentQuestionIndex;
        }
        totalQuestions += sectionData.questions.length;
      }
    });

    return {
      currentSectionIndex,
      totalSections,
      currentPosition: currentPosition + 1, // +1 pour base 1
      totalQuestions,
      progress:
        totalQuestions > 0 ? (currentPosition / totalQuestions) * 100 : 0,
    };
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

    // Actions originales
    handleSelectAnswer,
    validateAnswer,
    goToNextQuestion,
    tryAgain,

    // Nouvelles actions pour la gestion de l'état
    changeSection,
    changeQuestion,
    restoreState,
    goToPreviousQuestion,
    setTestCompleted,

    // Utilitaires
    getProgressInfo,
    isLastQuestionInSection: (questionIndex, section) =>
      isLastQuestionInSection(questionIndex, section, assessmentData),
  };
};

export default useAssessmentState;
