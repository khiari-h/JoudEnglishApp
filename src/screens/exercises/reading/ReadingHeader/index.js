// 6. ReadingHeader - MIS À JOUR
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const ReadingHeader = ({ level, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Lecture"
      level={level}
      exerciseType="reading" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

export default ReadingHeader;