import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

/**
 * En-tête pour l'exercice de grammaire
 */
const GrammarHeader = ({
  level,
  onBackPress,
  progress = 0,
  currentExercise = 0,
  totalExercises = 0,
  levelColor,
}) => {
  return (
    <ExerciseHeader
      title="Grammar"
      level={level}
      progress={progress}
      currentExercise={currentExercise}
      totalExercises={totalExercises}
      onClose={onBackPress}
      showProgress={true}
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default GrammarHeader;