// ReadingExercise/index.js - VERSION AVEC SAUVEGARDE ACTIVITÉ
import React, { useMemo, useEffect } from "react";
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
import useLastActivity from "../../../hooks/useLastActivity"; // ✅ AJOUTÉ
import { getReadingData, getLevelColor } from "../../../utils/reading/readingDataHelper";
import createStyles from "./style";

/**
 * 🎯 ReadingExercise - VERSION AVEC SAUVEGARDE ACTIVITÉ
 */
const ReadingExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // ✅ AJOUTÉ : Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();

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
    showDetailedProgress,
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
    toggleDetailedProgress,
    scrollViewRef,
    textsScrollViewRef,
    fadeAnim,
    slideAnim,
  } = useReading(exercises, level);

  // ✅ AJOUTÉ : Sauvegarder l'activité à chaque changement d'exercice/question
  useEffect(() => {
    if (loaded && exercises.length > 0 && currentExercise && currentQuestion) {
      saveActivity({
        title: "Lecture",
        level: level,
        type: "reading",
        metadata: {
          exercise: selectedExerciseIndex,
          question: currentQuestionIndex,
          totalQuestions: totalQuestions,
          exerciseTitle: currentExercise.title || `Texte ${selectedExerciseIndex + 1}`,
          totalExercises: exercises.length
        }
      });
    }
  }, [loaded, exercises.length, currentExercise, currentQuestion, selectedExerciseIndex, currentQuestionIndex, totalQuestions, level, saveActivity]);

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

  const handleToggleProgressDetails = () => {
    toggleDetailedProgress();
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
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
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