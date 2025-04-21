// 2. ErrorCorrectionHeader (déjà utilise ExerciseHeader - à standardiser)
// src/components/screens/exercises/errorCorrection/ErrorCorrectionHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const ErrorCorrectionHeader = ({
  level,
  currentExerciseIndex,
  totalExercises,
  progress,
  onBackPress, // Renommé de onBack pour uniformité
  levelColor,
}) => {
  return (
    <ExerciseHeader
      title="Correction d'erreurs"
      level={level}
      progress={progress}
      totalExercises={totalExercises}
      currentExercise={currentExerciseIndex + 1}
      onClose={onBackPress}
      showProgress={totalExercises > 0}
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default ErrorCorrectionHeader;

