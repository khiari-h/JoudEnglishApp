// 2. ErrorCorrectionHeader (mise à jour pour retirer la barre de progression)
// src/components/screens/exercises/errorCorrection/ErrorCorrectionHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const ErrorCorrectionHeader = ({
  level,
  onBackPress, // Renommé de onBack pour uniformité
  levelColor,
}) => {
  return (
    <ExerciseHeader
      title="Correction d'erreurs"
      level={level}
      onClose={onBackPress}
      showProgress={false} // Désormais sans barre de progression
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default ErrorCorrectionHeader;

