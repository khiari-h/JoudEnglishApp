// SpellingExercise/index.js - VERSION AVEC SAUVEGARDE ACTIVITÉ

import React, { useMemo, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Composants refactorisés
import SpellingHeader from "./SpellingHeader";
import SpellingProgress from "./SpellingProgress";
import SpellingWordSection from "./SpellingWordSection";
import SpellingActions from "./SpellingActions";

// Hook unifié & Utils
import useSpelling from "./hooks/useSpelling";
import useLastActivity from "../../../hooks/useLastActivity"; // ✅ AJOUTÉ
import { getSpellingData, getLevelColor } from "../../../utils/spelling/spellingDataHelper";
import createStyles from "./style";

/**
 * 🎯 SpellingExercise - VERSION AVEC SAUVEGARDE ACTIVITÉ
 */
const SpellingExercise = ({ route }) => {
  const { level = "A1", exerciseType = "correction" } = route.params || {};
  const navigation = useNavigation();
  const styles = createStyles();

  // ✅ AJOUTÉ : Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();

  // Data
  const levelColor = getLevelColor(level);
  const spellingData = useMemo(() => getSpellingData(level, exerciseType), [level, exerciseType]);

  // Hook unifié
  const {
    currentExerciseIndex,
    userInput,
    showHint,
    showFeedback,
    isCorrect,
    loaded,
    showDetailedProgress,
    // Data
    currentExercise,
    totalExercises,
    exercises,
    // Actions
    setUserInput,
    toggleHint,
    toggleDetailedProgress,
    checkAnswer,
    handleNext,
    handlePrevious,
    retryExercise,
    // Computed
    canGoToPrevious,
    isLastExercise,
    isExerciseCompleted,
    hasValidData,
    stats,
    display,
  } = useSpelling(spellingData, level, exerciseType);

  // ✅ AJOUTÉ : Sauvegarder l'activité à chaque changement d'exercice
  useEffect(() => {
    if (loaded && hasValidData && currentExercise && exercises.length > 0) {
      const exerciseTypeName = exerciseType === "correction" ? "Correction" : "Dictée";
      
      saveActivity({
        title: `Orthographe ${exerciseTypeName}`,
        level: level,
        type: "spelling",
        metadata: {
          exercise: currentExerciseIndex,
          totalExercises: totalExercises,
          exerciseType: exerciseType,
          word: currentExercise.word || `Exercice ${currentExerciseIndex + 1}`
        }
      });
    }
  }, [loaded, hasValidData, currentExercise, exercises.length, currentExerciseIndex, totalExercises, exerciseType, level, saveActivity]);

  // Handlers
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleToggleProgressDetails = () => {
    toggleDetailedProgress();
  };

  const handleCheckAnswer = () => {
    checkAnswer();
  };

  const handleNextExercise = () => {
    const result = handleNext();
    if (result.completed) {
      navigation.goBack();
    }
  };

  const handlePreviousExercise = () => {
    handlePrevious();
  };

  const handleRetryExercise = () => {
    retryExercise();
  };

  // Loading state
  if (!loaded || !hasValidData) {
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
      withScrollView={false}
      backgroundColor="#f8fafc"
      statusBarStyle="dark-content"
      withPadding={false}
      style={styles.container}
    >
      {/* Header */}
      <SpellingHeader 
        level={level} 
        exerciseType={exerciseType}
        onBackPress={handleBackPress} 
      />

      {/* Progress */}
      <SpellingProgress 
        exercises={exercises}
        completedExercises={stats.completedExercises || []}
        levelColor={levelColor}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
      />

      {/* Word Section */}
      <SpellingWordSection 
        currentExercise={currentExercise}
        exerciseCounter={display.exerciseCounter}
        level={level}
        levelColor={levelColor}
        userInput={userInput}
        showHint={showHint}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        isCompleted={isExerciseCompleted(currentExerciseIndex)}
        onChangeText={setUserInput}
        onToggleHint={toggleHint}
      />

      {/* Actions */}
      <SpellingActions 
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        userInput={userInput}
        isLastExercise={isLastExercise}
        isCompleted={isExerciseCompleted(currentExerciseIndex)}
        exerciseType={exerciseType} 
        levelColor={levelColor}
        onCheck={handleCheckAnswer}
        onNext={handleNextExercise}
        onRetry={handleRetryExercise}
      />
    </Container>
  );
};

export default SpellingExercise;