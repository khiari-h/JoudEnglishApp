// src/screens/exercises/spelling/SpellingFeedback/index.js
import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher le feedback après une réponse
 * 
 * @param {boolean} isCorrect - Indique si la réponse est correcte
 * @param {string} correctAnswer - La réponse correcte
 * @param {string} explanation - Explication supplémentaire
 * @param {string} levelColor - Couleur associée au niveau
 */
const SpellingFeedback = ({ 
  isCorrect, 
  correctAnswer, 
  explanation,
  levelColor 
}) => {
  return (
    <View style={[
      styles.container, 
      isCorrect 
        ? [styles.correctContainer, { borderLeftColor: "#10b981" }]
        : [styles.incorrectContainer, { borderLeftColor: "#ef4444" }]
    ]}>
      <Text style={styles.resultText}>
        {isCorrect ? "Correct!" : "Incorrect!"}
      </Text>

      {!isCorrect && (
        <Text style={styles.correctAnswerText}>
          The correct answer is: <Text style={styles.answerHighlight}>{correctAnswer}</Text>
        </Text>
      )}

      {explanation && (
        <Text style={styles.explanationText}>
          {explanation}
        </Text>
      )}
    </View>
  );
};

export default SpellingFeedback;
