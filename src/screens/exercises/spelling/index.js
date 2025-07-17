// SpellingExercise/index.js - VERSION PROPRE

import { useMemo, useEffect, useCallback } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";
import SpellingHeader from "./SpellingHeader";
import SpellingProgress from "./SpellingProgress";
import SpellingCard from "./SpellingCard";
import SpellingActions from "./SpellingActions";

import useSpelling from "./hooks/useSpelling";
import useLastActivity from "../../../hooks/useLastActivity";
import { getSpellingData, getLevelColor } from "../../../utils/spelling/spellingDataHelper";
import createStyles from "./style";

const SpellingExercise = ({ route }) => {
  const { level = "1", exerciseType = "correction" } = route.params || {};
  const navigation = useNavigation();
  const styles = createStyles();
  const { saveActivity } = useLastActivity();

  const levelColor = getLevelColor(level);
  
  const spellingData = useMemo(() => {
    try {
      return getSpellingData(level, exerciseType);
    } catch (error) {
      return null;
    }
  }, [level, exerciseType]);

  const {
    currentExerciseIndex,
    userInput,
    showHint,
    showFeedback,
    isCorrect,
    loaded,
    currentExercise,
    totalExercises,
    exercises,
    setUserInput,
    toggleHint,
    checkAnswer,
    handleNext,
    retryExercise,
    isLastExercise,
    hasValidData,
    stats,
  } = useSpelling(spellingData, level, exerciseType);

  useEffect(() => {
    if (loaded && hasValidData && currentExercise) {
      const exerciseTypeName = exerciseType === "correction" ? "Correction" : 
                              exerciseType === "rules" ? "Règles" : "Homophones";
      
      try {
        saveActivity({
          title: `Orthographe ${exerciseTypeName}`,
          level: level,
          type: "spelling",
          metadata: {
            word: currentExerciseIndex,           // ✅ Index actuel (pour progression)
            totalWords: totalExercises,           // ✅ Total (pour progression)
            exerciseType: exerciseType,
            content: currentExercise.wordToCorrect || `Exercice ${currentExerciseIndex + 1}` // ✅ Contenu de l'exercice
          }
        });
      } catch (error) {
        // Silently fail
      }
    }
  }, [loaded, hasValidData, currentExercise, currentExerciseIndex, totalExercises, exerciseType, level, saveActivity]);

 const handleBackPress = useCallback(() => {
  router.push({
    pathname: "/tabs/exerciseSelection",
    params: { level }
  });
}, [level]);

  const handleCheckAnswer = useCallback(() => {
    try {
      checkAnswer();
    } catch (error) {
      // Silently fail
    }
  }, [checkAnswer]);

  const handleNextExercise = useCallback(() => {
    try {
      const result = handleNext();
      if (result?.completed) {
        navigation.goBack();
      }
    } catch (error) {
      // Silently fail
    }
  }, [handleNext, navigation]);

  const handleRetryExercise = useCallback(() => {
    try {
      retryExercise();
    } catch (error) {
      // Silently fail
    }
  }, [retryExercise]);

  if (!loaded) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} />
          <Text style={styles.loadingText}>Chargement des exercices...</Text>
        </View>
      </Container>
    );
  }

  if (!hasValidData || !spellingData) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <SpellingHeader 
          level={level} 
          exerciseType={exerciseType}
          onBackPress={handleBackPress} 
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Erreur</Text>
          <Text style={styles.errorMessage}>
            Aucun exercice trouvé pour le niveau {level} - {exerciseType}
          </Text>
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
      <SpellingHeader 
        level={level} 
        exerciseType={exerciseType}
        onBackPress={handleBackPress} 
      />

      <SpellingProgress 
        exercises={exercises}
        completedExercises={stats.completedExercises || []}
        levelColor={levelColor}
      />

      <SpellingCard 
        exercise={currentExercise}
        userInput={userInput}
        showHint={showHint}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        isCompleted={stats.completedExercises?.includes(currentExerciseIndex)}
        onChangeText={setUserInput}
        onToggleHint={toggleHint}
        levelColor={levelColor}
      />

      <SpellingActions 
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        userInput={userInput}
        isLastExercise={isLastExercise}
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