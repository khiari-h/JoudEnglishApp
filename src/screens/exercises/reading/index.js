// ReadingExercise/index.js - SANS BOUCLES INFINIES

import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import PropTypes from 'prop-types';

import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";
import ReadingHeader from "./ReadingHeader";
import ReadingTextSelector from "./ReadingTextSelector";
import ReadingProgress from "./ReadingProgress";
import ReadingText from "./ReadingText";
import ReadingQuestionCard from "./ReadingQuestionCard";
import QuestionIndicators from "./QuestionIndicators";
import ReadingNavigation from "./ReadingNavigation";
import ExerciseFeedback from "../../../components/exercise-common/ExerciseFeedback";
import InstructionBox from "../../../components/exercise-common/InstructionBox";

import useReading from "./hooks/useReading";
import useLastActivity from "../../../hooks/useLastActivity";
import { getReadingData, loadReadingData, getLevelColor } from "../../../utils/reading/readingDataHelper";
import createStyles from "./style";
import { useEffect, useCallback, useState } from 'react';

const ReadingExercise = ({ route }) => {
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();
  const { saveActivity } = useLastActivity();

  // Data
  const levelColor = getLevelColor(level);
  const [readingData, setReadingData] = useState(
    process.env.JEST_WORKER_ID ? getReadingData(level) : null
  );
  const exercises = readingData?.exercises || [];

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (process.env.JEST_WORKER_ID) {
        const data = getReadingData(level);
        if (isMounted) setReadingData(data);
        return;
      }
      const data = await loadReadingData(level);
      if (isMounted) setReadingData(data);
    };
    load();
    return () => { isMounted = false; };
  }, [level]);

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

  // ✅ SAUVEGARDE SIMPLIFIÉE - seulement quand exercice/question change
  useEffect(() => {
    if (!loaded || exercises.length === 0 || !currentExercise || !currentQuestion) return;

    const saveActivityAsync = async () => {
      try {
        await saveActivity({
          title: "Lecture",
          level,
          type: "reading",
          metadata: {
            word: selectedExerciseIndex, // ✅ Pour cohérence avec autres exercices
            totalWords: exercises.length, // ✅ Pour cohérence
            exercise: selectedExerciseIndex,
            question: currentQuestionIndex,
            totalQuestions,
            exerciseTitle: currentExercise.title || `Texte ${selectedExerciseIndex + 1}`,
            totalExercises: exercises.length
          }
        });
      } catch (error) {
        console.error('Error saving activity:', error);
      }
    };

    saveActivityAsync();
  }, [selectedExerciseIndex, currentQuestionIndex]); // ✅ SEULEMENT ces 2 dépendances !

  // Handlers
  const handleBackPress = useCallback(() => {
    router.push({
      pathname: "/tabs/exerciseSelection",
      params: { level }
    });
  }, [level]);

  const handleNext = useCallback(() => {
    if (showFeedback) {
      nextQuestion();
    } else {
      submitAnswer();
    }
  }, [showFeedback, nextQuestion, submitAnswer]);

  const handleExerciseProgressPress = useCallback((index) => {
    changeExercise(index);
  }, [changeExercise]);

  const handleToggleProgressDetails = useCallback(() => {
    toggleDetailedProgress();
  }, [toggleDetailedProgress]);

  // ✅ Extraction de la logique conditionnelle pour améliorer la lisibilité
  const getExplanationMessage = () => {
    if (isCorrect) return currentQuestion.explanation;
    if (attempts > 1) {
      return `💡 The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`;
    }
    return "💪 Try again!";
  };

  // =================== LOADING STATE ===================
  if (!loaded || !exercises.length) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} testID="activity-indicator" />
        </View>
      </Container>
    );
  }

  // =================== MAIN RENDER ===================
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
      <ReadingHeader
        level={level}
        onBackPress={handleBackPress}
      />

      <ReadingProgress
        readingData={readingData}
        completedQuestions={completedQuestions}
        levelColor={levelColor}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onExercisePress={handleExerciseProgressPress}
      />

      <ReadingTextSelector
        exercises={exercises}
        selectedIndex={selectedExerciseIndex}
        onSelectExercise={changeExercise}
        scrollViewRef={textsScrollViewRef}
        levelColor={levelColor}
      />

      <InstructionBox
        title="📖 Reading Exercise"
        instructions="Read the text carefully and answer the questions."
        variant="compact"
        primaryColor={levelColor}
        initiallyExpanded={false}
      />

      <ReadingText
        exercise={currentExercise}
        textExpanded={textExpanded}
        onToggleExpand={toggleTextExpansion}
        levelColor={levelColor}
      />

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

      {showFeedback && currentQuestion && (
        <ExerciseFeedback
          type={isCorrect ? "success" : "error"}
          message={isCorrect ? "🎉 Perfect!" : "🤔 Not quite..."}
          explanation={getExplanationMessage()}
          showDismissButton={false}
        />
      )}

      <QuestionIndicators
        totalQuestions={totalQuestions}
        currentQuestionIndex={currentQuestionIndex}
        completedQuestions={completedQuestions[selectedExerciseIndex] || []}
        onSelectQuestion={changeQuestion}
        levelColor={levelColor}
      />

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

// ✅ Ajout de la validation des props
ReadingExercise.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      level: PropTypes.string,
    }),
  }).isRequired,
};