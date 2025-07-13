// src/components/screens/exercises/grammar/GrammarNavigation/index.js



import styles from "./style";

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
          disablePrevious={true} // Pas de Previous pendant check
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

export default GrammarNavigation;