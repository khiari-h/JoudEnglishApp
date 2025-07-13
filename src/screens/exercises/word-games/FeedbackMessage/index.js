// src/screens/exercises/wordGames/components/FeedbackMessage/index.js


import styles from "./style";

/**
 * Composant pour afficher le feedback après une réponse
 * 
 * @param {boolean} isCorrect - Indique si la réponse est correcte
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

export default FeedbackMessage;
