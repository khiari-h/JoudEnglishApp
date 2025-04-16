// src/components/screens/exercises/errorCorrection/ErrorCorrectionHeader/index.js
import React from "react";
import { View } from "react-native";
import ExerciseHeader from "../../../../exercise-common/ExerciseHeader";
import styles from "./style";

/**
 * En-tête pour l'écran d'exercice de correction d'erreurs
 * Réutilise le composant ExerciseHeader générique
 */
const ErrorCorrectionHeader = ({
  level,
  currentExerciseIndex,
  totalExercises,
  progress,
  onBack,
  levelColor,
}) => {
  return (
    <View style={styles.container}>
      <ExerciseHeader
        title="Correction d'erreurs"
        level={level}
        progress={progress}
        totalExercises={totalExercises}
        currentExercise={currentExerciseIndex + 1}
        onClose={onBack}
        showProgress={totalExercises > 0}
        levelColor={levelColor}
        backIcon="arrow-back"
      />
    </View>
  );
};

export default ErrorCorrectionHeader;