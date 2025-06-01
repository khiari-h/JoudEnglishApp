// 8. SpellingHeader - MIS À JOUR
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const SpellingHeader = ({ level, exerciseType, onBackPress }) => {
  // Formatage du titre en fonction du type d'exercice
  const getExerciseTitle = (type) => {
    switch (type) {
      case "correction":
        return "Orthographe - Correction";
      case "rules":
        return "Orthographe - Règles";
      default:
        return "Orthographe";
    }
  };

  return (
    <ExerciseHeader
      title={getExerciseTitle(exerciseType)}
      level={level}
      exerciseType="spelling" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

export default SpellingHeader;
