// src/screens/exercises/levelAssessment/AssessmentHeader/index.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./style";

/**
 * En-tête pour l'évaluation de niveau
 * 
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onBackPress - Fonction appelée lorsque le bouton retour est pressé
 */
const AssessmentHeader = ({ level, levelColor, onBackPress }) => {
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
      <Text style={styles.headerTitle}>Level Assessment</Text>
    </View>
  );
};

export default AssessmentHeader;