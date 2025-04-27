// src/screens/exercises/levelAssessment/index.js
import React, { useEffect } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants spécifiques à l'évaluation de niveau
import AssessmentHeader from "./AssessmentHeader";
import AssessmentQuestion from "./AssessmentQuestion";
import AssessmentActions from "./AssessmentActions";
import AssessmentResults from "./AssessmentResults";

// Hooks personnalisés
import useAssessmentState from "./hooks/useAssessmentState";
import useAssessmentProgress from "./hooks/useAssessmentProgress"; // Nouveau hook de progression

// Utilitaires et helpers
import { getLevelColor, getAssessmentSections } from "../../../utils/assessment/assessmentDataHelper";

// Styles
import styles from "./style";

/**
 * Composant principal pour l'évaluation de niveau (Level Assessment)
 * Version améliorée avec gestion de la progression et sauvegarde de la dernière position
 */
const LevelAssessment = ({ route }) => {
  // Hooks de navigation
  const navigation = useNavigation();
  const { level = "A1" } = route.params || {};

  // Sections disponibles
  const sections = getAssessmentSections();

  // Initialisation des couleurs
  const levelColor = getLevelColor(level);

  // Utilisation du hook personnalisé pour gérer l'état de l'évaluation
  const {
    currentSection,
    currentQuestionIndex,
    currentQuestion,
    selectedAnswer,
    showFeedback,
    testCompleted,
    fadeAnim,
    assessmentData,
    handleSelectAnswer,
    validateAnswer,
    goToNextQuestion,
    tryAgain,
    setCurrentSection,
    setCurrentQuestionIndex,
    setTestCompleted
  } = useAssessmentState(level);

  // Utilisation du nouveau hook de progression pour le suivi des activités
  const { 
    lastPosition,
    loaded: progressLoaded,
    saveLastPosition,
    saveUserAnswer,
    saveAssessmentResults,
    isAssessmentCompleted
  } = useAssessmentProgress(level);

  // Restaurer la dernière position si disponible
  useEffect(() => {
    if (progressLoaded && lastPosition) {
      console.log('[Assessment] Restauration depuis la position sauvegardée:', lastPosition);
      
      // Restaurer la section
      if (typeof lastPosition.sectionIndex === 'number' && sections[lastPosition.sectionIndex]) {
        const sectionKey = sections[lastPosition.sectionIndex];
        setCurrentSection(sectionKey);
      }
      
      // Restaurer la question
      if (typeof lastPosition.questionIndex === 'number') {
        setCurrentQuestionIndex(lastPosition.questionIndex);
      }
      
      // Si l'évaluation était déjà terminée, afficher les résultats
      if (isAssessmentCompleted()) {
        setTestCompleted(true);
      }
    }
  }, [progressLoaded, lastPosition, sections]);

  // Sauvegarder la position quand la section ou la question change
  useEffect(() => {
    if (progressLoaded && currentSection) {
      const sectionIndex = sections.indexOf(currentSection);
      if (sectionIndex !== -1) {
        console.log(`[Assessment] Mise à jour de la position: section ${sectionIndex}, question ${currentQuestionIndex}`);
        saveLastPosition(sectionIndex, currentQuestionIndex);
      }
    }
  }, [currentSection, currentQuestionIndex, progressLoaded, saveLastPosition, sections]);

  // Version améliorée de validateAnswer pour sauvegarder la réponse
  const handleValidateAnswer = () => {
    if (selectedAnswer === null) return;
    
    // Vérifier si la réponse est correcte
    const isCorrect = currentQuestion && selectedAnswer === currentQuestion.correctAnswer;
    
    // Appeler la fonction originale
    validateAnswer();
    
    // Sauvegarder la réponse dans AsyncStorage
    if (currentSection && currentQuestion) {
      saveUserAnswer(currentSection, currentQuestionIndex, selectedAnswer, isCorrect);
    }
  };

  // Version améliorée de goToNextQuestion
  const handleNextQuestion = () => {
    // Si c'est la dernière question de la dernière section
    const isLastSection = sections.indexOf(currentSection) === sections.length - 1;
    const isLastQuestion = currentQuestionIndex === assessmentData[currentSection]?.questions.length - 1;
    
    if (isLastSection && isLastQuestion && showFeedback) {
      // Sauvegarder les résultats complets
      const results = {
        level,
        sectionsCompleted: sections.map(section => ({ 
          key: section, 
          title: assessmentData[section]?.title || section 
        })),
        completedAt: new Date().toISOString()
      };
      
      saveAssessmentResults(results);
    }
    
    // Appeler la fonction originale
    goToNextQuestion();
  };

  // Si le test est terminé, afficher les résultats
  if (testCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <AssessmentResults 
          level={level}
          levelColor={levelColor}
          onContinue={() => navigation.navigate("Dashboard")}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête */}
      <AssessmentHeader 
        level={level} 
        levelColor={levelColor} 
        onBackPress={() => navigation.goBack()} 
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {currentSection && currentQuestion && (
          <AssessmentQuestion
            section={currentSection}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
            levelColor={levelColor}
            fadeAnim={fadeAnim}
            onSelectAnswer={handleSelectAnswer}
          />
        )}
      </ScrollView>

      <AssessmentActions
        showFeedback={showFeedback}
        selectedAnswer={selectedAnswer}
        currentQuestionIndex={currentQuestionIndex}
        currentSection={currentSection}
        levelColor={levelColor}
        onValidateAnswer={handleValidateAnswer} 
        onTryAgain={tryAgain}
        onNextQuestion={handleNextQuestion} 
      />
    </SafeAreaView>
  );
};

export default LevelAssessment;