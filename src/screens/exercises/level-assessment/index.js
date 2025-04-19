// src/screens/exercises/levelAssessment/index.js
import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Composants spécifiques à l'évaluation de niveau
import AssessmentHeader from "./AssessmentHeader";
import AssessmentQuestion from "./AssessmentQuestion";
import AssessmentActions from "./AssessmentActions";
import AssessmentResults from "./AssessmentResults";

// Hooks personnalisés
import useAssessmentState from "./hooks/useAssessmentState";

// Utilitaires et helpers
import { getLevelColor } from "../../../utils/assessment/assessmentDataHelper";

// Styles
import styles from "./style";

/**
 * Composant principal pour l'évaluation de niveau (Level Assessment)
 */
const LevelAssessment = ({ route }) => {
    // Hooks de navigation
    const navigation = useNavigation();
    const { level = "A1" } = route.params || {};

  // Initialisation des couleurs
  const levelColor = getLevelColor(level);

  // Utilisation du hook personnalisé pour gérer l'état de l'évaluation
  const {
    currentSection,
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    showFeedback,
    testCompleted,
    fadeAnim,
    handleSelectAnswer,
    validateAnswer,
    goToNextQuestion,
    tryAgain
  } = useAssessmentState(level);

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
        onValidateAnswer={validateAnswer}
        onTryAgain={tryAgain}
        onNextQuestion={goToNextQuestion}
      />
    </SafeAreaView>
  );
};

export default LevelAssessment;