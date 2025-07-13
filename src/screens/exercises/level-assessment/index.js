// src/screens/exercises/levelAssessment/index.js - VERSION CORRIGÉE


import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

// Layout


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
  } = useAssessment(level);

  // ✅ CORRECTION : Mémoriser les métadonnées
  const activityMetadata = useMemo(() => ({
    section: display?.currentSectionIndex || 0,
    question: currentQuestionIndex,
    totalQuestions: totalQuestionsInSection,
    sectionTitle: display?.sectionTitle || `Section ${(display?.currentSectionIndex || 0) + 1}`,
    totalSections: totalSections
  }), [display?.currentSectionIndex, currentQuestionIndex, totalQuestionsInSection, display?.sectionTitle, totalSections]);

  // ✅ CORRECTION : Callback mémorisé pour saveActivity
  const handleSaveActivity = useCallback(() => {
    if (loaded && currentSection && currentQuestion && !testCompleted) {
      saveActivity({
        title: "Évaluation",
        level: level,
        type: "assessment",
        metadata: activityMetadata
      });
    }
  }, [loaded, currentSection, currentQuestion, testCompleted, level, saveActivity, activityMetadata]);

  // ✅ CORRECTION : useEffect optimisé
  useEffect(() => {
    handleSaveActivity();
  }, [handleSaveActivity]);

  // Handlers
 const handleBackPress = () => {
  router.push({
    pathname: "/(tabs)/exerciseSelection",
    params: { level }
  });
};

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

      {/* Progress */}
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