// src/screens/exercises/spelling/SpellingProgressBar/index.js
import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

/**
 * Barre de progression pour l'exercice d'orthographe
 * 
 * @param {number} progress - Pourcentage de progression (0-100)
 * @param {number} currentIndex - Numéro de l'exercice actuel
 * @param {number} totalCount - Nombre total d'exercices
 * @param {number} completedCount - Nombre d'exercices complétés
 * @param {string} levelColor - Couleur associée au niveau
 */
const SpellingProgressBar = ({
  progress = 0,
  currentIndex = 1,
  totalCount = 0,
  completedCount = 0,
  levelColor = "#3b82f6"
}) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%`, backgroundColor: levelColor },
          ]}
        />
      </View>
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>
          {currentIndex}/{totalCount}
        </Text>
        <Text style={styles.completedText}>
          Completed: {completedCount}/{totalCount}
        </Text>
      </View>
    </View>
  );
};

export default SpellingProgressBar;