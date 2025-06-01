// src/screens/exercises/conversations/ConversationProgressBar/index.js
import React from 'react';
import { View } from 'react-native';
import ProgressBar from '../../../../components/ui/ProgressBar';
import styles from './style';

/**
 * Barre de progression pour les exercices de Conversation
 * Version unifiée utilisant ProgressBar de base
 * 
 * @param {number} progress - Pourcentage de progression (0-100) - ✅ STANDARDISÉ
 * @param {number} currentStep - Index de l'étape actuelle (commençant par 1)
 * @param {number} totalSteps - Nombre total d'étapes
 * @param {string} levelColor - Couleur du niveau actuel
 */
const ConversationProgressBar = ({
  progress = 0,           // ✅ MAINTENANT 0-100 au lieu de 0-1
  currentStep = 1,
  totalSteps = 0,
  levelColor = "#5E60CE"
}) => {
  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progress}
        showPercentage={false}
        showValue
        total={totalSteps}
        height={6}
        backgroundColor="#e2e8f0"
        fillColor={levelColor}
        borderRadius={3}
        animated
        labelPosition="right"
        valueFormatter={(value, total) => `${currentStep}/${total}`}
        style={styles.progressBar}
      />
    </View>
  );
};

export default ConversationProgressBar;
