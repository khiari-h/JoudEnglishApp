// src/screens/exercises/spelling/SpellingHeader/index.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./style";

/**
 * En-tête pour l'exercice d'orthographe
 * 
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 * @param {string} exerciseType - Type d'exercice (correction, rules)
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onBackPress - Fonction appelée lorsque le bouton retour est pressé
 */
const SpellingHeader = ({ level, exerciseType, levelColor, onBackPress }) => {
  // Formatage du titre en fonction du type d'exercice
  const getExerciseTitle = (type) => {
    switch (type) {
      case "correction":
        return "Spelling Correction";
      case "rules":
        return "Spelling Rules";
      default:
        return "Spelling Practice";
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
        <Text style={styles.levelBadgeText}>{level}</Text>
      </View>
      <Text style={styles.headerTitle}>{getExerciseTitle(exerciseType)}</Text>
    </View>
  );
};

export default SpellingHeader;