// src/components/screens/exercises/reading/ReadingNavigation/index.js
import { View } from "react-native";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import styles from "./style";

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
  const handleNavigation = (action) => {
    if (action === "next") {
      showFeedback ? onNext() : onNext("check");
    } else if (action === "previous") {
      onPrevious();
    } else if (action === "retry") {
      onRetry();
    }
  };

  // État initial - pas encore de feedback
  if (!showFeedback) {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={() => handleNavigation("next")}
          onPrevious={() => handleNavigation("previous")}
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
          onNext={() => handleNavigation("next")}
          onPrevious={() => handleNavigation("previous")}
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
          onNext={attempts > 1 ? () => handleNavigation("next") : () => handleNavigation("retry")}
          onPrevious={() => handleNavigation("previous")}
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
          variant="standard"
        />
      </View>
    );
  }
};

export default ReadingNavigation;
