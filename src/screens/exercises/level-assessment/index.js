// src/screens/exercises/levelAssessment/index.js
import React, { useEffect, useCallback } from "react";
import { SafeAreaView, View, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants spécifiques à l'évaluation de niveau
import AssessmentHeader from "./AssessmentHeader";
import AssessmentProgressBar from "./AssessmentProgressBar";
import AssessmentQuestion from "./AssessmentQuestion";
import AssessmentActions from "./AssessmentActions";
import AssessmentResults from "./AssessmentResults";

// Hooks personnalisés EXISTANTS (utilisés tels quels)
import useAssessmentState from "./hooks/useAssessmentState";
import useAssessmentProgress from "./hooks/useAssessmentProgress";

// Utilitaires et helpers
import {
  getLevelColor,
  getAssessmentSections,
} from "../../../utils/assessment/assessmentDataHelper";

// Styles
import styles from "./style";

/**
 * Composant principal pour l'évaluation de niveau (Level Assessment)
 * Version recodée : hooks existants + ProgressBar unifiée + logique simplifiée
 */
const LevelAssessment = ({ route }) => {
  // ========== NAVIGATION ET PARAMÈTRES ==========
  const navigation = useNavigation();
  const { level = "A1" } = route.params || {};

  // Données du niveau
  const levelColor = getLevelColor(level);
  const sections = getAssessmentSections();

  // ========== HOOKS EXISTANTS (utilisés tels quels) ==========

  // Hook d'état UI (avec toute sa logique existante)
  const {
    currentSection,
    currentQuestionIndex,
    currentQuestion,
    selectedAnswer,
    showFeedback,
    testCompleted,
    assessmentData,
    handleSelectAnswer,
    validateAnswer,
    goToNextQuestion: originalGoToNextQuestion,
    tryAgain,
    changeSection,
    changeQuestion,
    setTestCompleted,
    restoreState,
  } = useAssessmentState(level);

  // Hook de progression (avec toute sa logique existante)
  const {
    lastPosition,
    loaded: progressLoaded,
    userAnswers,
    saveLastPosition,
    saveUserAnswer,
    saveAssessmentResults,
    isAssessmentCompleted,
    calculateUserScore,
    resetAssessment,
  } = useAssessmentProgress(level);

  // ========== DONNÉES CALCULÉES (utilisant hooks existants) ==========

  // Index de la section actuelle (1-based pour affichage)
  const currentSectionIndex = sections.indexOf(currentSection) + 1;

  // Titre de la section actuelle
  const sectionTitle = assessmentData[currentSection]?.title || currentSection;

  // Question actuelle (1-based pour affichage)
  const currentQuestionNumber = currentQuestionIndex + 1;

  // Total questions dans la section actuelle
  const totalQuestionsInSection = assessmentData[currentSection]?.questions?.length || 0;

  // Questions répondues dans la section actuelle
  const answeredInCurrentSection = Object.keys(userAnswers[currentSection] || {}).length;

  // Vérification si réponse correcte
  const isCorrect = currentQuestion && selectedAnswer !== null
    ? selectedAnswer === currentQuestion.correctAnswer
    : false;

  // ========== INITIALISATION ==========

  // Restaurer la dernière position (logique existante)
  useEffect(() => {
    if (progressLoaded && lastPosition && !currentSection) {

      // Utiliser restoreState du hook existant
      if (restoreState) {
        restoreState(lastPosition.sectionIndex, lastPosition.questionIndex);
      } else {
        // Fallback manuel
        if (typeof lastPosition.sectionIndex === "number" && sections[lastPosition.sectionIndex]) {
          const sectionKey = sections[lastPosition.sectionIndex];
          if (changeSection) {
            changeSection(sectionKey);
          }
        }

        if (typeof lastPosition.questionIndex === "number" && changeQuestion) {
          changeQuestion(lastPosition.questionIndex);
        }
      }

      // Si l'évaluation était terminée, afficher les résultats
      if (isAssessmentCompleted()) {
        setTestCompleted(true);
      }
    }
  }, [progressLoaded, lastPosition, currentSection, restoreState, sections, changeSection, changeQuestion, isAssessmentCompleted, setTestCompleted]);

  // Sauvegarder position lors des changements (logique existante)
  useEffect(() => {
    if (progressLoaded && currentSection && !showFeedback && sections.indexOf(currentSection) !== -1) {
      const sectionIndex = sections.indexOf(currentSection);

      // Éviter sauvegarde si même position
      if (lastPosition && 
          lastPosition.sectionIndex === sectionIndex && 
          lastPosition.questionIndex === currentQuestionIndex) {
        return;
      }

      saveLastPosition(sectionIndex, currentQuestionIndex);
    }
  }, [progressLoaded, currentSection, currentQuestionIndex, showFeedback, sections, lastPosition, saveLastPosition]);

  // ========== GESTIONNAIRES D'ÉVÉNEMENTS ==========

  // Validation de réponse (utilise hooks existants + sync)
  const handleValidateAnswer = useCallback(() => {
    if (selectedAnswer === null) return;

    // Appeler la validation du hook existant
    validateAnswer();

    // Sauvegarder la réponse pour le calcul du score
    if (currentSection && currentQuestion) {
      saveUserAnswer(
        currentSection,
        currentQuestionIndex,
        selectedAnswer,
        isCorrect
      );

    }
  }, [selectedAnswer, currentSection, currentQuestionIndex, currentQuestion, validateAnswer, saveUserAnswer, isCorrect]);

  // Navigation question suivante (override du hook existant)
  const handleNextQuestion = useCallback(() => {

    // Vérifier si fin de l'évaluation
    const isLastSection = sections.indexOf(currentSection) === sections.length - 1;
    const isLastQuestion = currentQuestionIndex === (assessmentData[currentSection]?.questions?.length || 0) - 1;

    if (isLastSection && isLastQuestion && showFeedback) {

      // Calculer et sauvegarder les résultats finaux
      try {
        const userScore = calculateUserScore();
        const results = {
          level,
          userScore,
          sectionsCompleted: sections.map((section) => ({
            key: section,
            title: assessmentData[section]?.title || section,
          })),
          completedAt: new Date().toISOString(),
        };

        saveAssessmentResults(results);

        // Marquer le test comme terminé
        setTestCompleted(true);
        return;
      } catch (error) {

        Alert.alert("Erreur", "Impossible de calculer le score final.");
        return;
      }
    }

    // Utiliser la navigation du hook existant
    originalGoToNextQuestion();
  }, [sections, currentSection, currentQuestionIndex, assessmentData, showFeedback, calculateUserScore, level, saveAssessmentResults, setTestCompleted, originalGoToNextQuestion]);

  // Recommencer l'évaluation
  const handleRetry = useCallback(async () => {

    try {
      await resetAssessment();
      setTestCompleted(false);

      // Recommencer à la première section
      if (sections.length > 0) {
        changeSection(sections[0]);
        changeQuestion(0);
      }
    } catch (error) {

      Alert.alert("Erreur", "Impossible de réinitialiser l'évaluation.");
    }
  }, [resetAssessment, setTestCompleted, sections, changeSection, changeQuestion]);

  // Retour navigation
  const handleBackPress = useCallback(() => {

    navigation.goBack();
  }, [navigation]);

  // Navigation vers Dashboard
  const handleContinue = useCallback(() => {

    navigation.navigate("Dashboard");
  }, [navigation]);

  // ========== GESTION RÉSULTATS ==========

  if (testCompleted) {
    try {
      const userScore = calculateUserScore();

      return (
        <SafeAreaView style={styles.container}>
          <AssessmentResults 
            level={level}
            levelColor={levelColor}
            userScore={userScore}
            onContinue={handleContinue}
            onRetry={handleRetry}
          />
        </SafeAreaView>
      );
    } catch (error) {

      // Affichage de fallback
      return (
        <SafeAreaView style={styles.container}>
          <AssessmentResults 
            level={level}
            levelColor={levelColor}
            onContinue={handleContinue}
            onRetry={handleRetry}
          />
        </SafeAreaView>
      );
    }
  }

  // ========== GESTION CHARGEMENT ==========

  if (!currentSection || !currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <AssessmentHeader
          level={level}
          levelColor={levelColor}
          onBackPress={handleBackPress}
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement de l'évaluation...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ========== LOGS DEBUG ==========

  // ========== RENDU PRINCIPAL ==========
  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête avec niveau et bouton retour */}
      <AssessmentHeader
        level={level}
        levelColor={levelColor}
        onBackPress={handleBackPress}
      />

      {/* ✅ NOUVELLE ProgressBar unifiée */}
      <AssessmentProgressBar
        currentSection={currentSectionIndex}
        totalSections={sections.length}
        sectionTitle={sectionTitle}
        currentQuestion={currentQuestionNumber}
        totalQuestions={totalQuestionsInSection}
        answeredQuestionsInSection={answeredInCurrentSection}
        levelColor={levelColor}
      />

      {/* Zone de contenu principal */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <AssessmentQuestion
          section={currentSection}
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
          levelColor={levelColor}
          onSelectAnswer={handleSelectAnswer}
        />
      </ScrollView>

      {/* Boutons d'action */}
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
