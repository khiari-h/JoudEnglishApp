import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher le feedback après une réponse
 * Version améliorée avec meilleure gestion des réponses incorrectes
 */
const GrammarFeedback = ({
  isVisible,
  isCorrect,
  explanation,
  correctAnswer,
  attempts,
}) => {
  if (!isVisible) return null;

  // Formater la réponse correcte pour l'affichage
  const formatCorrectAnswer = () => {
    if (!correctAnswer) return "";

    // Si la réponse contient des alternatives (séparées par des /)
    if (typeof correctAnswer === "string" && correctAnswer.includes("/")) {
      return correctAnswer
        .split("/")
        .map((ans) => ans.trim())
        .join(" ou ");
    }

    return correctAnswer;
  };

  return (
    <View
      style={[
        styles.feedbackContainer,
        isCorrect ? styles.correctFeedback : styles.incorrectFeedback,
      ]}
    >
      <Text style={styles.feedbackTitle}>
        {isCorrect
          ? "Correct!"
          : attempts === 1
          ? "Essayez encore!"
          : "Incorrect!"}
      </Text>

      <Text style={styles.feedbackText}>
        {isCorrect
          ? explanation || "Bien joué!"
          : attempts > 1
          ? `La réponse correcte est: ${formatCorrectAnswer()}`
          : "Vous pouvez réessayer une fois de plus."}
      </Text>

      {!isCorrect && attempts === 1 && correctAnswer && (
        <Text style={styles.feedbackHint}>
          {
            "Astuce: Vérifiez l'orthographe et la ponctuation ou essayez une autre formulation."
          }
        </Text>
      )}
    </View>
  );
};

export default GrammarFeedback;
