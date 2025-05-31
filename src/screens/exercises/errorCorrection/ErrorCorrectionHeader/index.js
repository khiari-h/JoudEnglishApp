// 1. ErrorCorrectionHeader - MIS À JOUR
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const ErrorCorrectionHeader = ({ level, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Correction d'erreurs"
      level={level}
      exerciseType="errorCorrection" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

export default ErrorCorrectionHeader;



