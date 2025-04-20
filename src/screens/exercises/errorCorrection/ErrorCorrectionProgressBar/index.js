// src/components/screens/exercises/errorCorrection/ErrorCorrectionProgressBar/index.js
import React from "react";
import { View } from "react-native";
import ProgressBar from "../../../../components/ui/ProgressBar";
import styles from "./style";

/**
 * Barre de progression pour les exercices de correction d'erreurs
 */
const ErrorCorrectionProgressBar = ({
  currentExerciseIndex,
  totalExercises,
  levelColor = "#5E60CE",
}) => {
  // Calcul du pourcentage de progression
  const progressPercentage =
    totalExercises > 0
      ? Math.round(((currentExerciseIndex + 1) / totalExercises) * 100)
      : 0;

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progressPercentage}
        showPercentage={false}
        showValue={true}
        total={totalExercises}
        height={6}
        backgroundColor="#e2e8f0"
        fillColor={levelColor}
        borderRadius={3}
        animated={true}
        labelPosition="right"
        valueFormatter={(value, total) => `${value}/${total}`}
      />
    </View>
  );
};

export default ErrorCorrectionProgressBar;
