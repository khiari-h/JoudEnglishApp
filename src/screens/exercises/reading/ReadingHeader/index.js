// 5. ReadingHeader (déjà uniformisé sans barre de progression)
// src/components/screens/exercises/reading/ReadingHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const ReadingHeader = ({ level, onBackPress, levelColor }) => {
  return (
    <ExerciseHeader
      title="Reading"
      level={level}
      onClose={onBackPress}
      showProgress={false}
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default ReadingHeader;

