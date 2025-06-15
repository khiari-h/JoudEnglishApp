// src/screens/exercises/levelAssessment/index.js - VERSION AVEC SAUVEGARDE ACTIVITÉ
import React, { useMemo, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Components
import AssessmentHeader from "./AssessmentHeader";
import AssessmentProgress from "./AssessmentProgress";
import AssessmentQuestion from "./AssessmentQuestion";
import AssessmentNavigation from "./AssessmentNavigation";
import AssessmentResults from "./AssessmentResults";

// Hook & Utils
import useAssessment from "./hooks/useAssessment";
import useLastActivity from "../../../hooks/useLastActivity"; // ✅ AJOUTÉ
import { getLevelColor } from "../../../utils/assessment/assessmentDataHelper";
import createStyles from "./style";

/**
 * 🎯 LevelAssessment - VERSION AVEC SAUVEGARDE ACTIVITÉ
 */
const LevelAssessment = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // ✅ AJOUTÉ : Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();

  // Data
  const levelColor = getLevelColor(level);

  // Hook unifié - Remplace useAssessmentState + useAssessmentProgress
  const {
    currentSection,
    currentQuestionIndex,
    selectedAnswer,
    showFeedback,
    testCompleted,
    userAnswers,
    loaded,
    currentQuestion,
    totalSections,
    totalQuestionsInSection,
    handleSelectAnswer,
    validateAnswer,
    tryAgain,
    handleNext,
    handlePrevious,
    saveAssessmentResults,
    resetAssessment,
    canGoToPrevious,
    isLastQuestionInSection,
    stats,
    display,
  } = useAssessment(level);

  // ✅ AJOUTÉ : Sauvegarder l'activité à chaque changement de section/question (pas si test terminé)
  useEffect(() => {
    if (loaded && currentSection && currentQuestion && !testCompleted) {
      saveActivity({
        title: "Évaluation",
        level: level,
        type: "assessment",
        metadata: {
          section: display?.currentSectionIndex || 0,
          question: currentQuestionIndex,
          totalQuestions: totalQuestionsInSection,
          sectionTitle: display?.sectionTitle || `Section ${(display?.currentSectionIndex || 0) + 1}`,
          totalSections: totalSections
        }
      });
    }
  }, [loaded, currentSection, currentQuestion, testCompleted, display?.currentSectionIndex, currentQuestionIndex, totalQuestionsInSection, display?.sectionTitle, totalSections, level, saveActivity]);

  // Handlers
  const handleBackPress = () => navigation.goBack();

  const handleValidateAnswer = () => validateAnswer();

  const handleNextQuestion = () => {
    const result = handleNext();
    if (result.completed) {
      // Calculer et sauvegarder les résultats finaux
      const finalResults = {
        level,
        userScore: stats,
        sectionsCompleted: stats.totalSections,
        completedAt: new Date().toISOString(),
      };
      saveAssessmentResults(finalResults);
    }
  };

  const handlePreviousQuestion = () => handlePrevious();

  const handleRetry = async () => {
    try {
      await resetAssessment();
    } catch (error) {
      console.log('Error retrying assessment:', error);
    }
  };

  const handleContinue = () => navigation.navigate("Dashboard");

  // Loading state
  if (!loaded || !currentSection || !currentQuestion) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <AssessmentHeader
          level={level}
          onBackPress={handleBackPress}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} />
        </View>
      </Container>
    );
  }

  // Results state
  if (testCompleted) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <AssessmentResults 
          level={level}
          levelColor={levelColor}
          userScore={stats}
          onContinue={handleContinue}
          onRetry={handleRetry}
        />
      </Container>
    );
  }

  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
      withScrollView
      backgroundColor="#f8fafc"
      statusBarStyle="dark-content"
      withPadding={false}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        contentContainerStyle: styles.scrollContent,
      }}
    >
      {/* Header */}
      <AssessmentHeader
        level={level}
        onBackPress={handleBackPress}
      />

      {/* Progress - Utilise ProgressCard générique */}
      <AssessmentProgress
        currentSection={display.currentSectionIndex}
        totalSections={totalSections}
        sectionTitle={display.sectionTitle}
        currentQuestion={display.questionNumber}
        totalQuestions={totalQuestionsInSection}
        answeredQuestionsInSection={stats.answeredInCurrentSection}
        levelColor={levelColor}
        userAnswers={userAnswers}
        level={level}
      />

      {/* Question - Utilise HeroCard + RevealButton + ContentSection */}
      <AssessmentQuestion
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        levelColor={levelColor}
        onSelectAnswer={handleSelectAnswer}
      />

      {/* Navigation - Utilise NavigationButtons générique */}
      <AssessmentNavigation
        showFeedback={showFeedback}
        selectedAnswer={selectedAnswer}
        isLastQuestionInSection={isLastQuestionInSection}
        canGoPrevious={canGoToPrevious}
        levelColor={levelColor}
        onValidateAnswer={handleValidateAnswer}
        onTryAgain={tryAgain}
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
      />
    </Container>
  );
};

export default LevelAssessment;