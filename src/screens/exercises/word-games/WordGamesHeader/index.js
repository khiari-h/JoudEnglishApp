// 8. WordGamesHeader (déjà uniformisé sans barre de progression)
// src/screens/exercises/wordGames/WordGamesHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const WordGamesHeader = ({ level, levelColor, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Word Games"
      level={level}
      onClose={onBackPress}
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default WordGamesHeader;