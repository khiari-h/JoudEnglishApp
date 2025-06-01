// src/components/screens/exercises/errorCorrection/ErrorCorrectionProgressBar/index.js
import React from "react";
import { View } from "react-native";
import ProgressBar from "../../../../components/ui/ProgressBar";
import styles from "./style";

/**
 * Barre de progression pour les exercices de correction d'erreurs
 * Version corrigée : progression basée sur exercices COMPLÉTÉS, pas position
 * 
 * @param {number} currentIndex - Index de l'exercice actuel (1-based)
 * @param {number} totalCount - Nombre total d'exercices
 * @param {number} completedCount - Nombre d'exercices complétés ✅ NOUVEAU
 * @param {string} levelColor - Couleur du niveau
 */
const ErrorCorrectionProgressBar = ({
  currentIndex = 1,
  totalCount = 0,
  completedCount = 0,  // ✅ NOUVELLE PROP pour vraie progression
  levelColor = "#5E60CE",
}) => {
  // ✅ VRAIE progression basée sur exercices complétés
  const realProgress = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={realProgress}  // ✅ Basé sur completion, pas position !
        showPercentage
        showValue
        total={totalCount}
        height={6}
        backgroundColor="#e2e8f0"
        fillColor={levelColor}
        borderRadius={3}
        animated
        labelPosition="top"
        valueFormatter={(value, total) => `Exercise ${currentIndex}/${total}`}
        percentageFormatter={(percentage) => `Completed: ${completedCount}/${totalCount} (${percentage}%)`}
        style={styles.progressBar}
      />
    </View>
  );
};

export default ErrorCorrectionProgressBar;
