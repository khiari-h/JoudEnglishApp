// VocabularyExercise/VocabularyHeader.js
import React from 'react';
import ExerciseHeader from '../exercise-common/ExerciseHeader';

/**
 * Header pour l'exercice de vocabulaire
 * Utilise le composant générique ExerciseHeader
 */
const VocabularyHeader = ({
  level,
  onBackPress,
  progress = 0,
  completedWords = 0,
  totalWords = 0,
  levelColor
}) => {
  return (
    <ExerciseHeader 
      title="Vocabulary"
      level={level}
      progress={progress}
      currentExercise={completedWords}
      totalExercises={totalWords}
      onClose={onBackPress}
      showProgress={true}
      levelColor={levelColor}
    />
  );
};

export default VocabularyHeader;