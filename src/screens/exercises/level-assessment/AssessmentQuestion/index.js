// AssessmentQuestion/index.js - VERSION REFACTORISÉE avec composants génériques

import { View, TouchableOpacity, Text } from "react-native";
import PropTypes from 'prop-types';
import HeroCard from "../../../../components/ui/HeroCard";
import ContentSection from "../../../../components/ui/ContentSection";
import createStyles from "./style";
import { useCallback } from 'react';

/**
 * 🎯 AssessmentQuestion - Version Refactorisée avec composants génériques
 * Utilise HeroCard pour la question + ContentSection pour le feedback
 * 
 * @param {object} question - Question avec text, options, correctAnswer, explanation
 * @param {number} selectedAnswer - Index de la réponse sélectionnée
 * @param {boolean} showFeedback - Afficher le feedback ou non
 * @param {string} levelColor - Couleur du niveau
 * @param {function} onSelectAnswer - Callback sélection réponse
 */
const AssessmentQuestion = ({ question, selectedAnswer, showFeedback, levelColor, onSelectAnswer }) => {
  // ✅ CORRECTION : Déplacer le useCallback AVANT le return conditionnel
  const handlePress = useCallback((idx) => () => onSelectAnswer(idx), [onSelectAnswer]);

  if (!question || !question.options) {
    return null;
  }

  // Déterminer le feedback à afficher
  const isCorrect = selectedAnswer === question.correctAnswer;
  const feedbackText = isCorrect 
    ? "✅ Correct! Great job." 
    : "❌ Oops! The correct answer is different.";

  return (
    <View style={styles.container}>
      {/* 🎯 QUESTION PRINCIPALE - HeroCard */}
      <HeroCard 
        content={question.text}
        fontSize={20}
        levelColor={levelColor}
        showUnderline={false}
        backgroundColor="white"
        padding={24}
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