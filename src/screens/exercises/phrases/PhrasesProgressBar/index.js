// src/screens/exercises/phrases/PhrasesProgressBar/index.js
import React from 'react';
import { View } from 'react-native';
import ProgressBar from '../../../../components/ui/ProgressBar';
import styles from './style';

/**
 * Barre de progression pour les exercices de Phrases
 * Version unifiée utilisant ProgressBar de base
 * 
 * @param {number} progress - Pourcentage de progression (0-100) basé sur phrases complétées
 * @param {number} currentPhrase - Index de la phrase actuelle (commençant par 1)
 * @param {number} totalPhrases - Nombre total de phrases
 * @param {number} completedCount - Nombre de phrases complétées ✅ NOUVEAU
 * @param {string} levelColor - Couleur du niveau actuel
 */
const PhrasesProgressBar = ({
  progress = 0,           // ✅ Maintenant basé sur completion, pas position
  currentPhrase = 1,
  totalPhrases = 0,
  completedCount = 0,     // ✅ NOUVEAU pour cohérence
  levelColor = "#5E60CE"
}) => {
  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progress}
        showPercentage={true}
        showValue={true}
        total={totalPhrases}
        height={6}
        backgroundColor="#e2e8f0"
        fillColor={levelColor}
        borderRadius={3}
        animated={true}
        labelPosition="top"
        valueFormatter={(value, total) => `Phrase ${currentPhrase}/${total}`}
        percentageFormatter={(percentage) => `Completed: ${completedCount}/${totalPhrases} (${percentage}%)`}
        style={styles.progressBar}
      />
    </View>
  );
};

export default PhrasesProgressBar;