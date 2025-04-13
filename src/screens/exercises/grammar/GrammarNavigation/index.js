import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

/**
 * Composant pour la navigation dans les exercices de grammaire
 */
const GrammarNavigation = ({
  showFeedback,
  isCorrect,
  canCheckAnswer,
  onCheckAnswer,
  onPreviousExercise,
  onNextExercise,
  onRetryExercise,
  onSkipExercise,
  isFirstExercise,
  isLastExercise,
  attempts,
  levelColor = "#3b82f6"
}) => {
  // Afficher différents boutons en fonction de l'état
  if (!showFeedback) {
    // Afficher le bouton "Check" quand l'utilisateur n'a pas encore validé sa réponse
    return (
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[
            styles.actionButton,
            canCheckAnswer 
              ? [styles.enabledButton, { backgroundColor: levelColor }]
              : styles.disabledButton
          ]}
          onPress={onCheckAnswer}
          disabled={!canCheckAnswer}
        >
          <Text style={styles.actionButtonText}>Check</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (isCorrect) {
    // Afficher les boutons "Previous" et "Next" quand la réponse est correcte
    return (
      <View style={styles.actionContainer}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[
              styles.navButton,
              styles.prevButton,
              { opacity: !isFirstExercise ? 1 : 0.5 },
              { backgroundColor: `${levelColor}15` }
            ]}
            onPress={onPreviousExercise}
            disabled={isFirstExercise}
          >
            <Text style={[styles.navButtonText, { color: levelColor }]}>
              Previous
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.navButton,
              styles.nextButton,
              { backgroundColor: levelColor }
            ]}
            onPress={onNextExercise}
          >
            <Text style={styles.nextButtonText}>
              {isLastExercise ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    // Afficher les boutons "Try Again" et "Skip" quand la réponse est incorrecte
    return (
      <View style={styles.actionContainer}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[
              styles.navButton,
              styles.retryButton,
              { backgroundColor: `${levelColor}15` }
            ]}
            onPress={onRetryExercise}
          >
            <Text style={[styles.navButtonText, { color: levelColor }]}>
              Try Again
            </Text>
          </TouchableOpacity>
          
          {attempts > 1 && (
            <TouchableOpacity 
              style={[
                styles.navButton,
                styles.skipButton,
                { backgroundColor: levelColor }
              ]}
              onPress={onSkipExercise}
            >
              <Text style={styles.nextButtonText}>
                Skip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
};

export default GrammarNavigation;