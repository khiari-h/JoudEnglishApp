import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";
import styles from "./style"; // Importer les styles

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
      // Vous pouvez utiliser styles ici si nécessaire
    />
  );
};

export default VocabularyHeader;
