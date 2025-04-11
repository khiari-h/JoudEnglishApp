// VocabularyExercise/VocabularyHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";
import styles from "./style";

/**
 * En-tête pour l'exercice de vocabulaire
 * Note: Pour remplacer la croix par une flèche de retour,
 * il faudrait modifier le composant ExerciseHeader ou ajouter
 * une propriété pour contrôler l'icône
 */
const VocabularyHeader = ({
  level,
  onBackPress,
  progress = 0,
  completedWords = 0,
  totalWords = 0,
  levelColor,
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
      backIcon="arrow-back" // Ajouter cette propriété si ExerciseHeader la supporte
      // Si ExerciseHeader ne supporte pas le changement d'icône,
      // il faudra modifier ce composant
    />
  );
};

export default VocabularyHeader;