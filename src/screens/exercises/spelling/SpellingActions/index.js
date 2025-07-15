// SpellingActions/index.js - VERSION PROPRE

import { View } from "react-native";
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

  const canCheckAnswer = () => {
    if (exerciseType === "homophones") {
      return userInput !== "" && userInput !== null && userInput !== undefined;
    }
    return userInput && userInput.trim() !== "";
  };

  const handleCheckAnswer = () => {
    try {
      onCheck();
    } catch (error) {
      // Silently fail
    }
  };

  const handleNext = () => {
    try {
      onNext();
    } catch (error) {
      // Silently fail
    }
  };

  const handleRetry = () => {
    try {
      onRetry();
    } catch (error) {
      // Silently fail
    }
  };

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