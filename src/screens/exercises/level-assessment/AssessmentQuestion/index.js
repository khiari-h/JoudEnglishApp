// src/screens/exercises/level-assessment/AssessmentQuestion/index.js - VERSION HARMONISÉE avec WordCard moderne 🎯

import { View, Text, TouchableOpacity } from "react-native";
import { useCallback } from "react";
import PropTypes from 'prop-types';
import WordCard from "../../../../components/ui/WordCard"; // ← NOUVELLE WordCard harmonisée
import ContentSection from "../../../../components/ui/ContentSection";
import createStyles from "./style";

/**
 * ❓ AssessmentQuestion - Version harmonisée avec WordCard moderne
 * Utilise la même WordCard que vocabulaire/expressions/grammaire/lecture/jeux pour une cohérence globale
 * ✅ HARMONISÉ : Même design, même comportement, même qualité
 * 
 * @param {object} question - Question à afficher
 * @param {number} selectedAnswer - Réponse sélectionnée
 * @param {boolean} showFeedback - Afficher le feedback
 * @param {string} levelColor - Couleur du niveau
 * @param {function} onSelectAnswer - Fonction appelée lors de la sélection
 */
const AssessmentQuestion = ({
  question,
  selectedAnswer,
  showFeedback,
  levelColor = "#3b82f6",
  onSelectAnswer,
}) => {
  const styles = createStyles();

  if (!question || !question.options) {
    return null;
  }

  // Déterminer le feedback à afficher
  const isCorrect = selectedAnswer === question.correctAnswer;
  const feedbackText = isCorrect 
    ? "✅ Correct! Great job." 
    : "❌ Oops! The correct answer is different.";

  // Handler stable pour chaque option
  const handlePress = useCallback(
    (index) => () => {
      if (!showFeedback) {
        onSelectAnswer(index);
      }
    },
    [onSelectAnswer, showFeedback]
  );

  return (
    <View style={styles.container}>
      {/* 🆕 NOUVELLE WORD CARD HARMONISÉE - Même design que vocabulaire/expressions/grammaire/lecture/jeux */}
      <WordCard
        content={question.text}
        translation=""
        counter=""
        showTranslation={false}
        onToggleTranslation={() => {}} // Pas de toggle pour évaluation
        levelColor={levelColor}
        type="assessment"
        showCounter={false} // Pas de compteur pour évaluation
        showRevealButton={false} // Pas de bouton reveal pour évaluation
      />
      
      {/* 📝 OPTIONS DE RÉPONSE */}
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedAnswer === index && [
                styles.selectedOption,
                { borderColor: levelColor, backgroundColor: `${levelColor}08` }
              ],
              showFeedback && index === question.correctAnswer && [
                styles.correctOption,
                { borderColor: '#10b981', backgroundColor: '#f0fdf4' }
              ],
            ]}
            onPress={handlePress(index)}
            disabled={showFeedback}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                selectedAnswer === index && { color: levelColor, fontWeight: '600' },
                showFeedback && index === question.correctAnswer && { 
                  color: '#10b981', 
                  fontWeight: '600' 
                },
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 📖 FEEDBACK - ContentSection */}
      {showFeedback && (
        <ContentSection
          title="Feedback"
          content={feedbackText}
          levelColor={isCorrect ? '#10b981' : '#ef4444'}
          backgroundColor={isCorrect ? '#f0fdf4' : '#fef2f2'}
          icon={isCorrect ? '✅' : '❌'}
        />
      )}

      {/* 📝 EXPLICATION - ContentSection (si disponible) */}
      {showFeedback && question.explanation && (
        <ContentSection
          title="Explanation"
          content={question.explanation}
          levelColor="#6366f1"
          backgroundColor="#f8fafc"
          isItalic
        />
      )}
    </View>
  );
};

// PropTypes pour le composant AssessmentQuestion
AssessmentQuestion.propTypes = {
  question: PropTypes.shape({
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.number.isRequired,
    explanation: PropTypes.string,
  }).isRequired,
  selectedAnswer: PropTypes.number,
  showFeedback: PropTypes.bool.isRequired,
  levelColor: PropTypes.string,
  onSelectAnswer: PropTypes.func.isRequired,
};

export default AssessmentQuestion;