// 7. VocabularyHeader - MIS À JOUR (avec support mode)
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const VocabularyHeader = ({ level, mode, onBackPress }) => {
  // Titre adapté selon le mode
  const getTitle = () => {
    if (mode === 'fast') return 'Vocabulaire Fast';
    if (mode === 'classic') return 'Vocabulaire Classique';
    return 'Vocabulaire';
  };

  return (
    <ExerciseHeader
      title={getTitle()}
      level={level}
      exerciseType="vocabulary" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

export default VocabularyHeader;
