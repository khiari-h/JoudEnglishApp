import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

/**
 * Composant pour afficher le feedback après une réponse
 */
const GrammarFeedback = ({ 
  isVisible,
  isCorrect,
  explanation,
  correctAnswer,
  attempts
}) => {
  if (!isVisible) return null;
  
  return (
    <View style={[
      styles.feedbackContainer,
      isCorrect ? styles.correctFeedback : styles.incorrectFeedback
    ]}>
      <Text style={styles.feedbackTitle}>
        {isCorrect ? 'Correct!' : 'Incorrect!'}
      </Text>
      <Text style={styles.feedbackText}>
        {isCorrect 
          ? explanation || "Well done!" 
          : (attempts > 1 
            ? `The correct answer is: ${correctAnswer}` 
            : "Try again!")
        }
      </Text>
    </View>
  );
};

export default GrammarFeedback;