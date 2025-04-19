// src/screens/exercises/levelAssessment/AssessmentResults/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher les résultats de l'évaluation
 * 
 * @param {string} level - Niveau de langue
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onContinue - Fonction appelée quand l'utilisateur continue
 */
const AssessmentResults = ({ level, levelColor, onContinue }) => {
  return (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsTitle}>Assessment Complete!</Text>
      <Text style={styles.resultsFeedback}>
        Thank you for completing the level {level} assessment.
      </Text>
      <TouchableOpacity
        style={[styles.continueButton, { backgroundColor: levelColor }]}
        onPress={onContinue}
      >
        <Text style={styles.continueButtonText}>Continue to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AssessmentResults;