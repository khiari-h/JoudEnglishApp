// src/screens/exercises/levelAssessment/AssessmentFeedback/index.js
import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher le feedback après une réponse
 * 
 * @param {boolean} isCorrect - Indique si la réponse est correcte
 * @param {string} explanation - Explication supplémentaire (optionnel)
 */
const AssessmentFeedback = ({ isCorrect, explanation }) => {
  return (
    <View style={styles.feedbackContainer}>
      <Text style={styles.feedbackText}>
        {isCorrect
          ? "Correct! Great job."
          : "Oops! The correct answer is different."}
      </Text>
      {explanation && (
        <Text style={styles.explanationText}>
          {explanation}
        </Text>
      )}
    </View>
  );
};

export default AssessmentFeedback;