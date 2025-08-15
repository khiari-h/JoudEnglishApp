// src/components/screens/exercises/grammar/GrammarNavigation/index.js
import { View } from "react-native";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import styles from "./style";
import PropTypes from 'prop-types';

/**
 * 🎯 GrammarNavigation - Version Simple avec NavigationButtons
 * - Réutilise le composant générique NavigationButtons
 * - Logique simplifiée et cohérente avec Vocabulaire
 * - Pas de code dupliqué
 * - Design unifié
 */
const GrammarNavigation = ({
  showFeedback,
  isCorrect,
  canCheckAnswer,
  onCheckAnswer,
  onPreviousExercise,
  onNextExercise,
  onRetryExercise,
  onSkipExercise,
  isFirstExercise,
  isLastExercise,
  levelColor = "#3b82f6",
}) => {

  // 🎯 LOGIQUE SIMPLIFIÉE - 3 modes clairs

  // Mode 1: Pas encore vérifié → Check Answer
  if (!showFeedback) {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={onCheckAnswer}
          disableNext={!canCheckAnswer}
          disablePrevious // Pas de Previous pendant check
          showSkip={false}
          currentIndex={0}
          totalCount={1}
          primaryColor={levelColor}
          buttonLabels={{
            next: "Check Answer",
            previous: "",
            skip: "",
            finish: "",
          }}
          variant="centered" // Juste le bouton Check centré
        />
      </View>
    );
  }

  // Mode 2: Réponse correcte → Navigation normale
  if (isCorrect) {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={onNextExercise}
          onPrevious={onPreviousExercise}
          disablePrevious={isFirstExercise}
          disableNext={false}
          showSkip={false}
          currentIndex={isLastExercise ? 1 : 0}
          totalCount={2}
          primaryColor={levelColor}
          buttonLabels={{
            next: isLastExercise ? "Finish" : "Next",
            previous: "Previous",
            skip: "",
            finish: "Finish",
          }}
          variant="standard" // Navigation standard comme Vocabulaire
        />
      </View>
    );
  }

  // Mode 3: Réponse incorrecte → Try Again + Skip
  return (
    <View style={styles.container}>
      <NavigationButtons
        onNext={onSkipExercise}
        onPrevious={onRetryExercise}
        disablePrevious={false}
        disableNext={false}
        showSkip={false}
        currentIndex={0}
        totalCount={1}
        primaryColor={levelColor}
        buttonLabels={{
          next: "Skip",
          previous: "Try Again",
          skip: "",
          finish: "",
        }}
        variant="standard" // Try Again à gauche, Skip à droite
      />
    </View>
  );
};

// ✅ Définition de PropTypes pour valider les props
GrammarNavigation.propTypes = {
  // 'showFeedback' est manquant dans la validation
  showFeedback: PropTypes.bool,
  // 'isCorrect' est manquant dans la validation
  isCorrect: PropTypes.bool,
  // 'canCheckAnswer' est manquant dans la validation
  canCheckAnswer: PropTypes.bool,
  // 'onCheckAnswer' est manquant dans la validation
  onCheckAnswer: PropTypes.func.isRequired,
  // 'onPreviousExercise' est manquant dans la validation
  onPreviousExercise: PropTypes.func.isRequired,
  // 'onNextExercise' est manquant dans la validation
  onNextExercise: PropTypes.func.isRequired,
  // 'onRetryExercise' est manquant dans la validation
  onRetryExercise: PropTypes.func.isRequired,
  // 'onSkipExercise' est manquant dans la validation
  onSkipExercise: PropTypes.func.isRequired,
  // 'isFirstExercise' est manquant dans la validation
  isFirstExercise: PropTypes.bool,
  // 'isLastExercise' est manquant dans la validation
  isLastExercise: PropTypes.bool,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default GrammarNavigation;