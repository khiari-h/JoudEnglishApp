// 3. GrammarHeader (déjà utilise ExerciseHeader - à standardiser)
// src/components/screens/exercises/grammar/GrammarHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const GrammarHeader = ({ level, onBackPress, levelColor }) => {
  return (
    <ExerciseHeader
      title="Grammar"
      level={level}
      onClose={onBackPress}
      showProgress={false}
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default GrammarHeader;
