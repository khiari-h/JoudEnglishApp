import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const AssessmentHeader = ({ level, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Évaluation"
      level={level}
      exerciseType="assessment" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

export default AssessmentHeader;

