// VocabularyExercise/VocabularyProgress.js
import React from 'react';
import ProgressBar from '../ui/ProgressBar';

/**
 * Adaptateur pour la barre de progression de l'exercice de vocabulaire
 * Utilise le composant générique ProgressBar
 */
const VocabularyProgress = ({ 
  completed = 0, 
  total = 0,
  levelColor
}) => {
  // Calculer le pourcentage de progression
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0;
  
  return (
    <ProgressBar
      progress={progressPercentage}
      showValue={true}
      total={total}
      fillColor={levelColor}
      height={6}
      labelPosition="none"
      animated={true}
      style={{ marginBottom: 20 }}
      valueFormatter={(value, total) => `${completed}/${total}`}
    />
  );
};

export default VocabularyProgress;