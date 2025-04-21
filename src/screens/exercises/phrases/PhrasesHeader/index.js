// 4. PhrasesHeader (déjà uniformisé sans barre de progression)
// src/screens/exercises/phrases/PhrasesHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const PhrasesHeader = ({ level, onBackPress, levelColor }) => {
  return (
    <ExerciseHeader
      title="Phrases & Expressions"
      level={level}
      onClose={onBackPress}
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default PhrasesHeader;

