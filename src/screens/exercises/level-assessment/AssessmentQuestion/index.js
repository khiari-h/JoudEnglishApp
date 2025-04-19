// src/screens/exercises/levelAssessment/AssessmentQuestion/index.js
import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import AssessmentFeedback from "../AssessmentFeedback";
import styles from "./style";

/**
 * Composant pour afficher une question d'évaluation
 * 
 * @param {string} section - Section actuelle de l'évaluation
 * @param {Object} question - Question actuelle avec ses options
 * @param {number} selectedAnswer - Index de la réponse sélectionnée
 * @param {boolean} showFeedback - Indique si le feedback doit être affiché
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Object} fadeAnim - Animation de fondu
 * @param {Function} onSelectAnswer - Fonction appelée lors de la sélection d'une réponse
 */
const AssessmentQuestion = ({
  section,
  question,
  selectedAnswer,
  showFeedback,
  levelColor,
  fadeAnim,
  onSelectAnswer
}) => {
  return (
    <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
      <Text style={styles.sectionTitle}>
        {section.replace("_", " ").toUpperCase()}
      </Text>

      <Text style={styles.questionText}>{question.text}</Text>

      <View style={styles.answerOptions}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerOption,
              selectedAnswer === index && [
                styles.selectedAnswerOption,
                { borderColor: levelColor },
              ],
              showFeedback &&
                index === question.correctAnswer &&
                styles.correctAnswerOption,
            ]}
            onPress={() => onSelectAnswer(index)}
            disabled={showFeedback}
          >
            <Text
              style={[
                styles.answerOptionText,
                selectedAnswer === index && { color: levelColor },
                showFeedback &&
                  index === question.correctAnswer &&
                  styles.correctAnswerText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {showFeedback && (
        <AssessmentFeedback
          isCorrect={selectedAnswer === question.correctAnswer}
          explanation={question.explanation}
        />
      )}
    </Animated.View>
  );
};

export default AssessmentQuestion;