// src/components/screens/exercises/grammar/GrammarNavigation/index.js
import React from 'react';
import { View } from 'react-native';
import NavigationButtons from '../../../../components/exercise-common/NavigationButtons';
import styles from './style';

/**
 * Composant pour la navigation dans les exercices de grammaire
 * Utilise le composant commun NavigationButtons
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
  attempts,
  levelColor = "#3b82f6"
}) => {
  // Mode check - quand l'utilisateur n'a pas encore vérifié sa réponse
  if (!showFeedback) {
    return (
      <View style={styles.actionContainer}>
        <NavigationButtons
          onNext={onCheckAnswer}
          disableNext={!canCheckAnswer}
          disablePrevious={true}
          showSkip={false}
          currentIndex={0}
          totalCount={1}
          primaryColor={levelColor}
          buttonLabels={{
            next: "Check",
            previous: "",
            skip: "",
            finish: ""
          }}
          variant="centered"
        />
      </View>
    );
  } 
  // Mode réponse correcte - navigation vers exercice suivant ou précédent
  else if (isCorrect) {
    return (
      <View style={styles.actionContainer}>
        <NavigationButtons
          onNext={onNextExercise}
          onPrevious={onPreviousExercise}
          disablePrevious={isFirstExercise}
          disableNext={false}
          showSkip={false}
          currentIndex={isLastExercise ? 1 : 0}
          totalCount={2}  // Valeur arbitraire pour définir si on est au dernier élément
          primaryColor={levelColor}
          buttonLabels={{
            next: isLastExercise ? "Finish" : "Next",
            previous: "Previous",
            skip: "",
            finish: "Finish"
          }}
          variant="standard"
        />
      </View>
    );
  } 
  // Mode réponse incorrecte - réessayer ou passer
  else {
    return (
      <View style={styles.actionContainer}>
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
            finish: ""
          }}
          variant={attempts > 1 ? "standard" : "centered"}
        />
      </View>
    );
  }
};

export default GrammarNavigation;