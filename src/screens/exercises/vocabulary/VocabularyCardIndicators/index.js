// VocabularyExercise/VocabularyCardIndicators/index.js
import React from 'react';
import PaginationDots from '../../ui/PaginationDots';
import styles from './styles';

/**
 * Indicateurs de progression pour les cartes de vocabulaire
 * Utilise le composant générique PaginationDots
 */
const VocabularyCardIndicators = ({ 
  totalWords = 0,
  currentIndex = 0,
  completedIndices = [],
  onSelectWord,
  levelColor = '#5E60CE'
}) => {
  return (
    <PaginationDots
      total={totalWords}
      active={currentIndex}
      markedIndices={completedIndices}
      onDotPress={onSelectWord}
      activeColor={levelColor}
      markedColor={`${levelColor}50`}
      containerStyle={styles.container}
      dotSize={{ active: 12, inactive: 8 }}
      spacing={4}
    />
  );
};

export default VocabularyCardIndicators;