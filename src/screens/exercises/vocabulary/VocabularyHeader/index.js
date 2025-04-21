// 7. VocabularyHeader (mise à jour pour retirer la barre de progression)
// src/components/screens/exercises/vocabulary/VocabularyHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const VocabularyHeader = ({ level, onBackPress, levelColor }) => {
  return (
    <ExerciseHeader
      title="Vocabulary"
      level={level}
      onClose={onBackPress}
      showProgress={false} // Désormais sans barre de progression
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default VocabularyHeader;

