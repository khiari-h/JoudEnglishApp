// src/screens/exercises/wordGames/components/FeedbackMessage/index.js
import { View, Text } from "react-native";
import styles from "./style";
import PropTypes from 'prop-types';

/**
 * Composant pour afficher le feedback après une réponse
 * * @param {boolean} isCorrect - Indique si la réponse est correcte
 * @param {string} successMessage - Message à afficher en cas de succès
 * @param {string} failureMessage - Message à afficher en cas d'échec
 * @param {string} correctAnswer - Réponse correcte à afficher en cas d'échec
 * @param {string} levelColor - Couleur associée au niveau
 */
const FeedbackMessage = ({
  isCorrect,
  successMessage,
  failureMessage,
  correctAnswer,
  levelColor
}) => {
  return (
    <View
      style={[
        styles.feedbackContainer,
        isCorrect
          ? [styles.correctFeedback, { borderLeftColor: levelColor }]
          : styles.incorrectFeedback,
      ]}
    >
      <Text style={styles.feedbackTitle}>
        {isCorrect ? "Great job!" : "Try again!"}
      </Text>
      <Text style={styles.feedbackText}>
        {isCorrect
          ? successMessage || "You've successfully completed this game!"
          : failureMessage || "Don't worry, you can try another word game."}
      </Text>
      {!isCorrect && correctAnswer && (
        <Text style={styles.correctAnswerText}>
          Correct answer: <Text style={styles.answerHighlight}>{correctAnswer}</Text>
        </Text>
      )}
    </View>
  );
};

// ✅ Définition de PropTypes pour la validation des props
FeedbackMessage.propTypes = {
  // 'isCorrect' est manquant dans la validation
  isCorrect: PropTypes.bool.isRequired,
  // 'successMessage' est manquant dans la validation
  successMessage: PropTypes.string,
  // 'failureMessage' est manquant dans la validation
  failureMessage: PropTypes.string,
  // 'correctAnswer' est manquant dans la validation
  correctAnswer: PropTypes.string,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default FeedbackMessage;