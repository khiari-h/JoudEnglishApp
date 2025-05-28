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
 * Version complète avec système de notation et gestion de la progression
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
    assessmentData,
    handleSelectAnswer,
    validateAnswer,
    goToNextQuestion,
    tryAgain,
    changeSection,
    changeQuestion,
    setTestCompleted,
    restoreState,
  } = useAssessmentState(level);

  // Utilisation du hook de progression pour le suivi et la notation
  const {
    lastPosition,
    loaded: progressLoaded,
    saveLastPosition,
    saveUserAnswer,
    saveAssessmentResults,
    isAssessmentCompleted,
    calculateUserScore,
    resetAssessment,
  } = useAssessmentProgress(level);

  // Restaurer la dernière position si disponible
  useEffect(() => {
    if (progressLoaded && lastPosition) {
      console.log(
        "[Assessment] Restauration depuis la position sauvegardée:",
        lastPosition
      );

      // Utiliser restoreState pour restaurer l'état complet
      if (restoreState) {
        restoreState(lastPosition.sectionIndex, lastPosition.questionIndex);
      } else {
        // Fallback : restaurer manuellement
        if (
          typeof lastPosition.sectionIndex === "number" &&
          sections[lastPosition.sectionIndex]
        ) {
          const sectionKey = sections[lastPosition.sectionIndex];
          if (changeSection) {
            changeSection(sectionKey);
          }
        }

        if (typeof lastPosition.questionIndex === "number" && changeQuestion) {
          changeQuestion(lastPosition.questionIndex);
        }
      }

      // Si l'évaluation était déjà terminée, afficher les résultats
      if (isAssessmentCompleted()) {
        setTestCompleted(true);
      }
    }
  }, [
    progressLoaded,
    lastPosition,
    sections,
    restoreState,
    changeSection,
    changeQuestion,
    isAssessmentCompleted,
    setTestCompleted,
  ]);

  // Sauvegarder la position lors des changements de section/question
  useEffect(() => {
    if (progressLoaded && currentSection && !showFeedback) {
      const sectionIndex = sections.indexOf(currentSection);
      if (sectionIndex !== -1) {
        console.log(
          `[Assessment] Sauvegarde position: section ${sectionIndex}, question ${currentQuestionIndex}`
        );
        saveLastPosition(sectionIndex, currentQuestionIndex);
      }
    }
  }, [
    currentSection,
    currentQuestionIndex,
    progressLoaded,
    saveLastPosition,
    sections,
    showFeedback,
  ]);

  // Validation de réponse avec sauvegarde
  const handleValidateAnswer = () => {
    if (selectedAnswer === null) return;

    // Vérifier si la réponse est correcte
    const isCorrect =
      currentQuestion && selectedAnswer === currentQuestion.correctAnswer;

    // Appeler la fonction de validation originale
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
  };

  // Navigation vers la question suivante avec sauvegarde des résultats
  const handleNextQuestion = () => {
    // Vérifier si c'est la fin de l'évaluation
    const isLastSection =
      sections.indexOf(currentSection) === sections.length - 1;
    const isLastQuestion =
      currentQuestionIndex ===
      assessmentData[currentSection]?.questions.length - 1;

    if (isLastSection && isLastQuestion && showFeedback) {
      // Calculer et sauvegarder les résultats finaux
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

      console.log("[Assessment] Sauvegarde des résultats finaux:", results);
      saveAssessmentResults(results);
    }

    // Passer à la question suivante
    goToNextQuestion();
  };

  // Fonction pour recommencer l'évaluation
  const handleRetry = async () => {
    console.log("[Assessment] Recommencer l'évaluation");
    await resetAssessment();
    setTestCompleted(false);
    
    // Recommencer à la première section
    if (sections.length > 0) {
      changeSection(sections[0]);
      changeQuestion(0);
    }
  };

  // Affichage des résultats avec notation
  if (testCompleted) {
    const userScore = calculateUserScore();
    
    return (
      <SafeAreaView style={styles.container}>
        <AssessmentResults 
          level={level}
          levelColor={levelColor}
          userScore={userScore}
          onContinue={() => navigation.navigate("Dashboard")}
          onRetry={handleRetry}
        />
      </SafeAreaView>
    );
  }

  // Affichage principal de l'évaluation
  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête avec niveau et bouton retour */}
      <AssessmentHeader
        level={level}
        levelColor={levelColor}
        onBackPress={() => navigation.goBack()}
      />

      {/* Zone de contenu principal */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {currentSection && currentQuestion && (
          <AssessmentQuestion
            section={currentSection}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
            levelColor={levelColor}
            onSelectAnswer={handleSelectAnswer}
          />
        )}
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