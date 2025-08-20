// src/screens/exercises/levelAssessment/index.js - VERSION CORRIGÉE
import { useMemo, useEffect, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import PropTypes from 'prop-types';

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
import useLastActivity from "../../../hooks/useLastActivity";
import { getLevelColor } from "../../../utils/assessment/assessmentDataHelper";
import createStyles from "./style";

/**
 * 🎯 LevelAssessment - VERSION CORRIGÉE
 */
const LevelAssessment = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();

  // Data
  const levelColor = getLevelColor(level);

  // Hook unifié
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
    sections,
    assessmentData,
  } = useAssessment(level);

  // ✅ DEBUG: Ajouter des logs pour identifier le problème
  console.log('🔍 DEBUG LevelAssessment render:', {
    loaded,
    currentSection,
    currentQuestion,
    totalSections,
    sections: display?.currentSectionIndex
  });

  // ✅ CORRECTION : Mémoriser les métadonnées
  const activityMetadata = useMemo(() => ({
    section: display?.currentSectionIndex || 0,
    question: currentQuestionIndex,
    totalQuestions: totalQuestionsInSection,
    sectionTitle: display?.sectionTitle || `Section ${(display?.currentSectionIndex || 0) + 1}`,
    totalSections
  }), [display?.currentSectionIndex, currentQuestionIndex, totalQuestionsInSection, display?.sectionTitle, totalSections]);

  // ✅ CORRECTION : Callback mémorisé pour saveActivity
  const handleSaveActivity = useCallback(() => {
    if (loaded && currentSection && currentQuestion && !testCompleted) {
      saveActivity({
        title: "Évaluation",
        level,
        type: "assessment",
        metadata: activityMetadata
      });
    }
  }, [loaded, currentSection, currentQuestion, testCompleted, level, saveActivity, activityMetadata]);

  // ✅ CORRECTION : useEffect optimisé pour sauvegarder l'activité
  useEffect(() => {
    handleSaveActivity();
  }, [handleSaveActivity]);

  // Handlers
  const handleBackPress = useCallback(() => {
    router.push({
      pathname: "/tabs/exerciseSelection",
      params: { level }
    });
  }, [level]);

  const handleValidateAnswer = useCallback(() => validateAnswer(), [validateAnswer]);

  const handleNextQuestion = useCallback(() => {
    const result = handleNext();
    if (result?.completed) {
      const finalResults = {
        level,
        userScore: stats,
        sectionsCompleted: stats.totalSections,
        completedAt: new Date().toISOString(),
      };
      saveAssessmentResults(finalResults);
    }
  }, [handleNext, level, stats, saveAssessmentResults]);

  const handlePreviousQuestion = useCallback(() => handlePrevious(), [handlePrevious]);

  const handleRetry = useCallback(async () => {
    try {
      await resetAssessment();
      console.log('🔄 Assessment reset successfully');
    } catch (error) {
      console.warn('Error resetting assessment:', error);
      // Fallback: continuer même si la réinitialisation échoue
    }
  }, [resetAssessment]);

  const handleContinue = useCallback(() => navigation.navigate("Dashboard"), [navigation]);

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
          <ActivityIndicator size="large"
          color={levelColor}
          testID="activity-indicator" />
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

      {/* Progress */}
      <AssessmentProgress
        sections={sections}
        assessmentData={assessmentData}
        userAnswers={userAnswers}
        levelColor={levelColor}
        expanded={false}
        onToggleExpand={() => {}}
        onSectionPress={() => {}}
      />

      {/* Question */}
      <AssessmentQuestion
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        showFeedback={showFeedback}
        levelColor={levelColor}
        onSelectAnswer={handleSelectAnswer}
      />

      {/* Navigation */}
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

// ✅ Ajout de la validation des props
LevelAssessment.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      level: PropTypes.string,
    }),
  }).isRequired,
};