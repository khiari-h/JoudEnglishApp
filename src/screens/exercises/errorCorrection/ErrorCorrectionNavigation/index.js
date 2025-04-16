// src/components/screens/exercises/errorCorrection/ErrorCorrectionNavigation/index.js
import React from "react";
import { View } from "react-native";
import NavigationButtons from "../../../../exercise-common/NavigationButtons";
import styles from "./style";

/**
 * Composant de navigation pour les exercices de correction d'erreurs
 * Réutilise le composant NavigationButtons générique
 */
const ErrorCorrectionNavigation = ({
  onNext,
  onPrevious,
  onExit,
  currentIndex,
  totalCount,
  disableNext = false,
  isLastExercise = false,
  showFeedback = false,
  levelColor,
}) => {
  // Si on est en mode feedback (après vérification de réponse)
  // ou si on est au dernier exercice, adapter les labels
  const buttonLabels = {
    previous: "Précédent",
    next: showFeedback 
        ? (isLastExercise ? "Voir les résultats" : "Exercice suivant") 
        : "Vérifier",
    skip: "Passer",
    finish: "Terminer",
  };

  return (
    <View style={styles.container}>
      <NavigationButtons
        onNext={onNext}
        onPrevious={onPrevious}
        onSkip={onExit}
        currentIndex={currentIndex}
        totalCount={totalCount}
        disablePrevious={currentIndex === 0}
        disableNext={disableNext}
        showSkip={!showFeedback && !isLastExercise}
        primaryColor={levelColor}
        buttonLabels={buttonLabels}
        variant="standard"
      />
    </View>
  );
};

export default ErrorCorrectionNavigation;