// src/screens/exercises/levelAssessment/hooks/useAssessmentState.js
import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

// Utilitaires
import { 
  getAssessmentData, 
  getAssessmentSections, 
  isLastQuestionInSection 
} from '../../../../utils/assessment/assessmentDataHelper';

/**
 * Hook personnalisé pour gérer l'état de l'évaluation de niveau
 * 
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 */
const useAssessmentState = (level) => {
  // Référence pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;

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

  // Gestion de la sélection de réponse
  const handleSelectAnswer = (answerIndex) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  // Vérification de la réponse
  const validateAnswer = () => {
    if (selectedAnswer === null) return;

    // Montrer le feedback
    setShowFeedback(true);

    // Animation de feedback
    Animated.timing(fadeAnim, {
      toValue: 0.7,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
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

  return {
    currentSection,
    currentQuestionIndex,
    currentQuestion: getCurrentQuestion(),
    selectedAnswer,
    showFeedback,
    testCompleted,
    fadeAnim,
    assessmentData,
    handleSelectAnswer,
    validateAnswer,
    goToNextQuestion,
    tryAgain,
    isLastQuestionInSection: (questionIndex, section) => 
      isLastQuestionInSection(questionIndex, section, assessmentData)
  };
};

export default useAssessmentState;