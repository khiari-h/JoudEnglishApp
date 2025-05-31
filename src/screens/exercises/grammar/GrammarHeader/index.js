
// 3. GrammarHeader - MIS À JOUR
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const GrammarHeader = ({ level, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Grammaire"
      level={level}
      exerciseType="grammar" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

export default GrammarHeader;