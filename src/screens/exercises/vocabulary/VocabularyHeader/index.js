// VocabularyHeader - Version épurée mobile-first
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

/**
 * 🎯 VocabularyHeader - Version Mobile-First Épurée
 * - Titres courts et clairs
 * - Cohérence avec ExerciseSelection
 * - Focus sur l'essentiel
 * - Pas de redondance
 */
const VocabularyHeader = ({ level, mode, onBackPress }) => {
  // 🎯 TITRES ÉPURÉS - Mobile-first
  const getTitle = () => {
    if (mode === 'fast') return 'Fast'; // Simple et clair ⚡
    return 'Vocabulaire'; // Par défaut pour classic
  };

  return (
    <ExerciseHeader
      title={getTitle()}
      level={level}
      exerciseType="vocabulary" // Même type, seul le mode change
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

export default VocabularyHeader;