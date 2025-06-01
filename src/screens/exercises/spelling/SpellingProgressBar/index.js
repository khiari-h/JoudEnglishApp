// src/screens/exercises/spelling/SpellingProgressBar/index.js
import React from "react";
import { View } from "react-native";
import ProgressBar from "../../../../components/ui/ProgressBar";
import styles from "./style";

/**
 * Barre de progression pour l'exercice d'orthographe
 * Version unifiée avec ProgressBar de base + vraie logique de completion
 * 
 * @param {number} currentIndex - Numéro de l'exercice actuel (1-based)
 * @param {number} totalCount - Nombre total d'exercices
 * @param {number} completedCount - Nombre d'exercices complétés
 * @param {string} levelColor - Couleur associée au niveau
 */
const SpellingProgressBar = ({
  currentIndex = 1,
  totalCount = 0,
  completedCount = 0,
  levelColor = "#3b82f6"
}) => {
  // ✅ VRAIE progression basée sur exercices complétés
  const realProgress = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={realProgress}
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

export default SpellingProgressBar;