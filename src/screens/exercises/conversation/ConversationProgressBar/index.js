import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Barre de progression pour les exercices de Conversation
 * 
 * @param {number} progress - Pourcentage de progression (0-100)
 * @param {number} currentStep - Index de l'étape actuelle (commençant par 1)
 * @param {number} totalSteps - Nombre total d'étapes
 * @param {string} levelColor - Couleur du niveau actuel
 */
const ConversationProgressBar = ({
  progress = 0,
  currentStep = 1,
  totalSteps = 0,
  levelColor = "#5E60CE"
}) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${progress * 100}%`, backgroundColor: levelColor }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>
        {currentStep}/{totalSteps}
      </Text>
    </View>
  );
};

export default ConversationProgressBar;