// SpellingActions/index.js - VERSION PROPRE

import { View, useCallback } from "react-native";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import styles from "./style";

const SpellingActions = ({
  showFeedback,
  isCorrect,
  userInput,
  isLastExercise,
  exerciseType,
  levelColor,
  onCheck,
  onNext,
  onRetry
}) => {

  const canCheckAnswer = useCallback(() => {
    if (exerciseType === "homophones") {
      return userInput !== "" && userInput !== null && userInput !== undefined;
    }
    return userInput && userInput.trim() !== "";
  }, [exerciseType, userInput]);

  const handleCheckAnswer = useCallback(() => {
    try {
      onCheck();
    } catch (error) {
      // Silently fail
    }
  }, [onCheck]);

  const handleNext = useCallback(() => {
    try {
      onNext();
    } catch (error) {
      // Silently fail
    }
  }, [onNext]);

  const handleRetry = useCallback(() => {
    try {
      onRetry();
    } catch (error) {
      // Silently fail
    }
  }, [onRetry]);

  if (!showFeedback) {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={handleCheckAnswer}
          disablePrevious
          disableNext={!canCheckAnswer()}
          primaryColor={levelColor}
          buttonLabels={{
            next: "Vérifier la réponse"
          }}
          variant="centered"
        />
      </View>
    );
  }

  if (showFeedback && isCorrect) {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={handleNext}
          disablePrevious
          disableNext={false}
          primaryColor={levelColor}
          buttonLabels={{
            next: isLastExercise ? "Terminer" : "Exercice suivant"
          }}
          variant="centered"
        />
      </View>
    );
  }

  if (showFeedback && !isCorrect) {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={handleNext}
          onPrevious={handleRetry}
          disablePrevious={false}
          disableNext={false}
          primaryColor={levelColor}
          buttonLabels={{
            next: isLastExercise ? "Terminer" : "Exercice suivant",
            previous: "Réessayer"
          }}
          variant="standard"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationButtons
        onNext={handleNext}
        primaryColor={levelColor}
        buttonLabels={{ next: "Continuer" }}
        variant="centered"
      />
    </View>
  );
};

export default SpellingActions;