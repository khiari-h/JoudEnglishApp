// src/screens/exercises/levelAssessment/AssessmentActions/index.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./style";

/**
 * Composant pour les boutons d'action
 *
 * @param {boolean} showFeedback - Indique si le feedback est affiché
 * @param {number} selectedAnswer - Index de la réponse sélectionnée
 * @param {number} currentQuestionIndex - Index de la question actuelle
 * @param {string} currentSection - Section actuelle
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onValidateAnswer - Fonction pour valider la réponse
 * @param {Function} onTryAgain - Fonction pour réessayer
 * @param {Function} onNextQuestion - Fonction pour passer à la question suivante
 */
const AssessmentActions = ({
  showFeedback,
  selectedAnswer,
  currentQuestionIndex,
  currentSection,
  levelColor,
  onValidateAnswer,
  onTryAgain,
  onNextQuestion,
}) => {
  // Déterminer si nous passons à la section suivante
  const isLastQuestionInSection = (
    currentQuestionIndex,
    currentSection,
    sectionData
  ) => {
    if (!sectionData || !sectionData[currentSection]) return false;
    return (
      currentQuestionIndex === sectionData[currentSection].questions.length - 1
    );
  };

  const handleValidatePress = () => {
    if (onValidateAnswer) {
      onValidateAnswer();
    }
  };

  return (
    <View style={styles.actionContainer}>
      {!showFeedback ? (
        <TouchableOpacity
          style={[
            styles.actionButton,
            selectedAnswer === null && styles.disabledButton,
            { backgroundColor: selectedAnswer === null ? "#ccc" : levelColor },
          ]}
          onPress={handleValidatePress}
          disabled={selectedAnswer === null}
        >
          <Text style={styles.actionButtonText}>Check Answer</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.tryAgainButton,
              { borderColor: levelColor },
            ]}
            onPress={() => {
              onTryAgain();
            }}
          >
            <Text style={[styles.actionButtonText, { color: levelColor }]}>
              Try Again
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: levelColor }]}
            onPress={() => {
              onNextQuestion();
            }}
          >
            <Text style={styles.actionButtonText}>
              Next{" "}
              {isLastQuestionInSection(currentQuestionIndex, currentSection, {}) // Remplacé par l'appel approprié dans le hook
                ? "Section"
                : "Question"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AssessmentActions;
