// SpellingExercise/index.js - VERSION PROPRE

import { useMemo, useEffect, useCallback } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropTypes from 'prop-types';

import Container from "../../../components/layout/Container";
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

  // Définir exerciseTypeName pour tout le composant
  const exerciseTypeName = exerciseType === "correction" ? "Correction" : 
                          exerciseType === "rules" ? "Règles" : "Homophones";
  
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
    setUserInput,
    toggleHint,
    checkAnswer,
    handleNext,
    retryExercise,
    isLastExercise,
    hasValidData,
  } = useSpelling(spellingData, level, exerciseType);

  useEffect(() => {
    if (loaded && hasValidData && currentExercise) {
      try {
        saveActivity({
          title: `Orthographe ${exerciseTypeName}`,
          level,
          type: "spelling",
          metadata: {
            word: currentExerciseIndex,           // ✅ Index actuel (pour progression)
            totalWords: totalExercises,           // ✅ Total (pour progression)
            exerciseType,
            content: currentExercise.wordToCorrect || `Exercice ${currentExerciseIndex + 1}` // ✅ Contenu de l'exercice
          }
        });
      } catch (error) {
        console.error("Error saving activity:", error);
      }
    }
  }, [loaded, hasValidData, currentExercise, level, exerciseType, currentExerciseIndex, totalExercises, saveActivity]);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  if (!loaded) {
    return (
      <Container>
        <SpellingHeader
          title={`Orthographe ${exerciseTypeName}`}
          level={level}
          levelColor={levelColor}
          onBack={handleBack}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} testID="activity-indicator" />
          <Text style={styles.loadingText}>Chargement des exercices...</Text>
        </View>
      </Container>
    );
  }

  if (!hasValidData) {
    return (
      <Container>
        <SpellingHeader
          title={`Orthographe ${exerciseTypeName}`}
          level={level}
          levelColor={levelColor}
          onBack={handleBack}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Aucune donnée trouvée pour ce niveau.</Text>
          <Text style={styles.errorText}>Veuillez réessayer plus tard.</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <SpellingHeader
        title={`Orthographe ${exerciseTypeName}`}
        level={level}
        levelColor={levelColor}
        onBack={handleBack}
      />
      <SpellingProgress
        currentExerciseIndex={currentExerciseIndex + 1}
        totalExercises={totalExercises}
        levelColor={levelColor}
      />
      <SpellingCard
        currentExercise={currentExercise}
        userInput={userInput}
        showHint={showHint}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        onUserInputChange={setUserInput}
        onHintToggle={toggleHint}
        onCheckAnswer={checkAnswer}
        onNext={handleNext}
        onRetry={retryExercise}
        isLastExercise={isLastExercise}
        levelColor={levelColor}
      />
      <SpellingActions
        isCorrect={isCorrect}
        onNext={handleNext}
        onRetry={retryExercise}
        isLastExercise={isLastExercise}
        levelColor={levelColor}
      />
    </Container>
  );
};

export default SpellingExercise;

// ✅ Ajout de la validation des props
SpellingExercise.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      level: PropTypes.string,
      exerciseType: PropTypes.string,
    }),
  }).isRequired,
};