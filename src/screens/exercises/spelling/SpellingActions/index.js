// src/screens/exercises/spelling/SpellingActions/index.js - AVEC PROPTYPES ET GESTION D'ERREURS

import { View } from "react-native";
import { useCallback } from "react";
import PropTypes from 'prop-types';
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import createStyles from "./style";

const SpellingActions = ({
  showFeedback,
  isCorrect,
  userInput,
  isLastExercise,
  exerciseType,
  levelColor = "#3b82f6",
  onCheck,
  onNext,
  onRetry,
}) => {
  const styles = createStyles(levelColor);

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
      console.warn("Erreur lors de la vérification de la réponse:", error);
      // On peut ajouter une notification utilisateur ici si nécessaire
    }
  }, [onCheck]);

  const handleNext = useCallback(() => {
    try {
      onNext();
    } catch (error) {
      console.warn("Erreur lors du passage à l'exercice suivant:", error);
      // On peut ajouter une notification utilisateur ici si nécessaire
    }
  }, [onNext]);

  const handleRetry = useCallback(() => {
    try {
      onRetry();
    } catch (error) {
      console.warn("Erreur lors de la nouvelle tentative:", error);
      // On peut ajouter une notification utilisateur ici si nécessaire
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

// PropTypes pour le composant SpellingActions
SpellingActions.propTypes = {
  showFeedback: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  userInput: PropTypes.string.isRequired,
  isLastExercise: PropTypes.bool.isRequired,
  exerciseType: PropTypes.string.isRequired,
  levelColor: PropTypes.string,
  onCheck: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default SpellingActions;