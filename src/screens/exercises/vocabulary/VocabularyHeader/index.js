// VocabularyHeader unifié sans barre de progression
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const VocabularyHeader = ({ level, onBackPress, levelColor }) => {
  return (
    <ExerciseHeader
      title="Vocabulary"
      level={level}
      onClose={onBackPress}
      showProgress={false} // Désactiver la barre de progression
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default VocabularyHeader;
