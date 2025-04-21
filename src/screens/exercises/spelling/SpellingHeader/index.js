// 6. SpellingHeader (déjà uniformisé sans barre de progression)
// src/screens/exercises/spelling/SpellingHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const SpellingHeader = ({ level, exerciseType, levelColor, onBackPress }) => {
  // Formatage du titre en fonction du type d'exercice
  const getExerciseTitle = (type) => {
    switch (type) {
      case "correction":
        return "Spelling Correction";
      case "rules":
        return "Spelling Rules";
      default:
        return "Spelling Practice";
    }
  };

  return (
    <ExerciseHeader
      title={getExerciseTitle(exerciseType)}
      level={level}
      onClose={onBackPress}
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default SpellingHeader;

