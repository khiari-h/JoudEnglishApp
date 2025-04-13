import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

/**
 * Barre de progression pour les exercices de grammaire
 * 
 * @param {number} progress - Pourcentage de progression (0-100)
 * @param {number} currentExercise - Index de l'exercice actuel (commençant par 1)
 * @param {number} totalExercises - Nombre total d'exercices
 * @param {string} levelColor - Couleur du niveau actuel
 */
const GrammarProgressBar = ({
  progress = 0,
  currentExercise = 1,
  totalExercises = 0,
  levelColor = "#3b82f6"
}) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${progress}%`, backgroundColor: levelColor }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>
        {currentExercise}/{totalExercises}
      </Text>
    </View>
  );
};

export default GrammarProgressBar;