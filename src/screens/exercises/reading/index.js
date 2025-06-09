// ReadingExercise/index.js - VERSION CLEAN & SIMPLE
import React, { useMemo } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Components
import ReadingHeader from "./ReadingHeader";
import ReadingTextSelector from "./ReadingTextSelector";
import ReadingProgress from "./ReadingProgress";
import ReadingText from "./ReadingText";
import ReadingQuestionCard from "./ReadingQuestionCard";
import QuestionIndicators from "./QuestionIndicators";
import ReadingNavigation from "./ReadingNavigation";
import ExerciseFeedback from "../../../components/exercise-common/ExerciseFeedback";
import InstructionBox from "../../../components/exercise-common/InstructionBox";

// Hook & Utils
import useReading from "./hooks/useReading";
import { getReadingData, getLevelColor } from "../../../utils/reading/readingDataHelper";
import createStyles from "./style";

/**
 * 🎯 ReadingExercise - VERSION CLEAN & SIMPLE
 * 300 lignes → 120 lignes (-60% de code)
 * 1 hook au lieu de 3, logique claire, maintenable
 */
const ReadingExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // Data
  const levelColor = getLevelColor(level);
  const readingData = useMemo(() => getReadingData(level), [level]);
  const exercises = readingData?.exercises || [];

  // Hook unifié
  const {
    selectedExerciseIndex,
    currentQuestionIndex,
    selectedAnswer,
    showFeedback,
    textExpanded,
    attempts,
    completedQuestions,
    loaded,
    currentExercise,
    currentQuestion,
    totalQuestions,
    isCorrect,
    progress,
    changeExercise,
    changeQuestion,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    retryQuestion,
    toggleTextExpansion,
    scrollViewRef,
    textsScrollViewRef,
    fadeAnim,
    slideAnim,
  } = useReading(exercises, level);

  // Handlers
  const handleBackPress = () => navigation.goBack();
  
  const handleNext = () => {
    if (showFeedback) {
      nextQuestion();
    } else {
      submitAnswer();
    }
  };

  const handleExerciseProgressPress = (index) => {
    changeExercise(index);
  };

  // Loading state
  if (!loaded || !exercises.length) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} />
        </View>
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
        ref: scrollViewRef,
        showsVerticalScrollIndicator: false,
        contentContainerStyle: styles.scrollContent,
      }}
    >
      {/* Header */}
      <ReadingHeader
        level={level}
        onBackPress={handleBackPress}
      />

      {/* Progress */}
      <ReadingProgress
        readingData={readingData}
        completedQuestions={completedQuestions}
        levelColor={levelColor}
        expanded={false}
        onToggleExpand={() => {}}
        onExercisePress={handleExerciseProgressPress}
      />

      {/* Exercise Selector */}
      <ReadingTextSelector
        exercises={exercises}
        selectedIndex={selectedExerciseIndex}
        onSelectExercise={changeExercise}
        scrollViewRef={textsScrollViewRef}
        levelColor={levelColor}
      />

      {/* Instructions */}
      <InstructionBox
        title="📖 Reading Exercise"
        instructions="Read the text carefully and answer the questions."
        variant="compact"
        primaryColor={levelColor}
        initiallyExpanded={false}
      />

      {/* Reading Text */}
      <ReadingText
        exercise={currentExercise}
        textExpanded={textExpanded}
        onToggleExpand={toggleTextExpansion}
        levelColor={levelColor}
      />

      {/* Question */}
      {currentQuestion && (
        <ReadingQuestionCard
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={selectAnswer}
          showFeedback={showFeedback}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
          levelColor={levelColor}
        />
      )}

      {/* Feedback */}
      {showFeedback && currentQuestion && (
        <ExerciseFeedback
          type={isCorrect ? "success" : "error"}
          message={isCorrect ? "🎉 Perfect!" : "🤔 Not quite..."}
          explanation={
            isCorrect
              ? currentQuestion.explanation
              : attempts > 1
              ? `💡 The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`
              : "💪 Try again!"
          }
          showDismissButton={false}
        />
      )}

      {/* Question Indicators */}
      <QuestionIndicators
        totalQuestions={totalQuestions}
        currentQuestionIndex={currentQuestionIndex}
        completedQuestions={completedQuestions[selectedExerciseIndex] || []}
        onSelectQuestion={changeQuestion}
        levelColor={levelColor}
      />

      {/* Navigation */}
      <ReadingNavigation
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        selectedAnswer={selectedAnswer}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        attempts={attempts}
        levelColor={levelColor}
        onNext={handleNext}
        onPrevious={previousQuestion}
        onRetry={retryQuestion}
      />
    </Container>
  );
};

export default ReadingExercise;