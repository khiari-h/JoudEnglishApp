// 8. WordGamesHeader (à migrer vers ExerciseHeader)
// src/screens/exercises/wordGames/WordGamesHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const WordGamesHeader = ({ level, levelColor, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Word Games"
      level={level}
      onClose={onBackPress}
      showProgress={false}
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default WordGamesHeader;