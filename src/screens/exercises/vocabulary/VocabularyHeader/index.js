// 7. VocabularyHeader (déjà utilise ExerciseHeader - à standardiser)
// src/components/screens/exercises/vocabulary/VocabularyHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const VocabularyHeader = ({
  level,
  onBackPress,
  progress = 0,
  completedWords = 0,
  totalWords = 0,
  levelColor,
}) => {
  return (
    <ExerciseHeader
      title="Vocabulary"
      level={level}
      progress={progress}
      currentExercise={completedWords}
      totalExercises={totalWords}
      onClose={onBackPress}
      showProgress={true}
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default VocabularyHeader;

