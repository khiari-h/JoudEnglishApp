// src/components/screens/exercises/reading/ReadingNavigation/index.js
import { View } from "react-native";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import styles from "./style";
import { useCallback } from "react";
import PropTypes from 'prop-types';

/**
 * Composant de navigation pour l'exercice de lecture
 * Encapsule la logique de navigation avec différents états
 */
const ReadingNavigation = ({
  showFeedback,
  isCorrect,
  selectedAnswer,
  currentQuestionIndex,
  totalQuestions,
  attempts,
  levelColor,
  onNext,
  onPrevious,
  onRetry
}) => {
  // Déterminer quelle action effectuer pour les boutons
  const handleNavigation = useCallback((action) => {
    if (action === "next") {
      showFeedback ? onNext() : onNext("check");
    } else if (action === "previous") {
      onPrevious();
    } else if (action === "retry") {
      onRetry();
    }
  }, [showFeedback, onNext, onPrevious, onRetry]);

  // Handlers pour NavigationButtons
  const handleNext = useCallback(() => handleNavigation("next"), [handleNavigation]);
  const handlePrevious = useCallback(() => handleNavigation("previous"), [handleNavigation]);
  const handleRetryOrNext = useCallback(() => (attempts > 1 ? handleNavigation("next") : handleNavigation("retry")), [attempts, handleNavigation]);

  // État initial - pas encore de feedback
  if (!showFeedback) {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentIndex={currentQuestionIndex}
          totalCount={totalQuestions}
          disableNext={selectedAnswer === null}
          disablePrevious={currentQuestionIndex === 0}
          showSkip={false}
          primaryColor={levelColor}
          buttonLabels={{
            previous: "Previous",
            next: "Check Answer",
            skip: "Skip",
            finish: "Finish",
          }}
          variant="standard"
        />
      </View>
    );
  }
  // Réponse correcte
  else if (isCorrect) {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentIndex={currentQuestionIndex}
          totalCount={totalQuestions}
          disablePrevious={currentQuestionIndex === 0}
          primaryColor={levelColor}
          buttonLabels={{
            previous: "Previous",
            next: currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Complete",
            skip: "Skip",
            finish: "Complete",
          }}
          variant="standard"
        />
      </View>
    );
  }
  // Réponse incorrecte
  else {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={handleRetryOrNext}
          onPrevious={handlePrevious}
          currentIndex={currentQuestionIndex}
          totalCount={totalQuestions}
          disablePrevious={currentQuestionIndex === 0}
          primaryColor={levelColor}
          buttonLabels={{
            previous: "Previous",
            next: attempts > 1 ? "Skip" : "Try Again",
            skip: "Skip",
            finish: "Finish",
          }}
          // ✅ AJOUTÉ : Icône refresh pour Try Again
          buttonIcons={{
            previous: "chevron-back",
            next: attempts > 1 ? "chevron-forward" : "refresh", // 🔄 Pour Try Again
            finish: "checkmark",
          }}
          variant="standard"
        />
      </View>
    );
  }
};

// ✅ Définition de PropTypes pour valider les props
ReadingNavigation.propTypes = {
  showFeedback: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool,
  selectedAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  currentQuestionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  attempts: PropTypes.number,
  levelColor: PropTypes.string,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ReadingNavigation;