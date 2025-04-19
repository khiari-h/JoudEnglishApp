// src/screens/exercises/spelling/SpellingActions/index.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./style";

/**
 * Composant pour les boutons d'action de l'exercice d'orthographe
 * 
 * @param {boolean} showFeedback - Indique si le feedback est affiché
 * @param {boolean} isCorrect - Indique si la réponse est correcte
 * @param {string} userInput - Texte saisi par l'utilisateur
 * @param {boolean} isLastExercise - Indique si c'est le dernier exercice
 * @param {boolean} isCompleted - Indique si l'exercice a déjà été complété
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onCheck - Fonction pour vérifier la réponse
 * @param {Function} onNext - Fonction pour passer à l'exercice suivant
 * @param {Function} onRetry - Fonction pour réessayer l'exercice
 */
const SpellingActions = ({
  showFeedback,
  isCorrect,
  userInput,
  isLastExercise,
  isCompleted,
  levelColor,
  onCheck,
  onNext,
  onRetry
}) => {
  // Si l'exercice est déjà complété, montrer simplement le bouton "Next"
  if (isCompleted && !showFeedback) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: levelColor }]}
          onPress={onNext}
        >
          <Text style={styles.buttonText}>
            {isLastExercise ? "Complete" : "Next Exercise"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Affichage normal des boutons
  return (
    <View style={styles.container}>
      {!showFeedback ? (
        <TouchableOpacity
          style={[
            styles.button,
            userInput.trim() === "" ? styles.disabledButton : { backgroundColor: levelColor },
          ]}
          onPress={onCheck}
          disabled={userInput.trim() === ""}
        >
          <Text style={styles.buttonText}>Check Answer</Text>
        </TouchableOpacity>
      ) : isCorrect ? (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: levelColor }]}
          onPress={onNext}
        >
          <Text style={styles.buttonText}>
            {isLastExercise ? "Complete" : "Next Exercise"}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.secondaryButton,
              { borderColor: levelColor }
            ]}
            onPress={onRetry}
          >
            <Text style={[styles.buttonText, { color: levelColor }]}>
              Try Again
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: levelColor }]}
            onPress={onNext}
          >
            <Text style={styles.buttonText}>
              {isLastExercise ? "Complete" : "Next Exercise"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SpellingActions;