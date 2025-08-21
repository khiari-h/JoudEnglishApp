// ReadingQuestionCard/index.js - VERSION HARMONISÉE avec WordCard moderne 🎯
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useCallback } from "react";
import PropTypes from 'prop-types';
import { Ionicons } from "@expo/vector-icons";
import WordCard from "../../../../components/ui/WordCard"; // ← NOUVELLE WordCard harmonisée
import ContentSection from "../../../../components/ui/ContentSection";
import createStyles from "./style";

/**
 * ❓ ReadingQuestionCard - Version harmonisée avec WordCard moderne
 * Utilise la même WordCard que vocabulaire/expressions/grammaire pour une cohérence globale
 * ✅ HARMONISÉ : Même design, même comportement, même qualité
 * ❌ Confetti animations
 * ❌ Complex micro-interactions
 * ✅ Clean, functional, maintainable
 */
const ReadingQuestionCard = ({
  question,
  questionIndex,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,
  fadeAnim,
  slideAnim,
  levelColor = "#3b82f6",
}) => {
  const styles = createStyles(levelColor);

  // Hook AVANT tout return conditionnel ✅
  const handleOptionPressCallback = useCallback(
    (optionIndex) => () => {
      if (!showFeedback) {
        onSelectAnswer(optionIndex);
      }
    },
    [onSelectAnswer, showFeedback]
  );

  if (!question) return null;

  // Determine option state
  const getOptionState = (optionIndex) => {
    if (!showFeedback) {
      return selectedAnswer === optionIndex ? 'selected' : 'default';
    }
    
    if (optionIndex === question.correctAnswer) {
      return 'correct';
    }
    
    if (selectedAnswer === optionIndex && selectedAnswer !== question.correctAnswer) {
      return 'incorrect';
    }
    
    return 'default';
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* 🆕 NOUVELLE WORD CARD HARMONISÉE - Même design que vocabulaire/expressions/grammaire */}
      <WordCard
        content={`Question ${questionIndex + 1}`}
        translation=""
        counter=""
        showTranslation={false}
        onToggleTranslation={() => {}} // Pas de toggle pour lecture
        levelColor={levelColor}
        type="reading"
        showCounter={false} // Pas de compteur pour lecture
        showRevealButton={false} // Pas de bouton reveal pour lecture
      />
      
      {/* Question Text */}
      <ContentSection
        title="❓ Question"
        content={question.text}
        levelColor={levelColor}
        backgroundColor="white"
        contentStyle={{
          fontSize: 18,
          fontWeight: "600",
          color: "#1e293b",
          lineHeight: 26,
        }}
      />

      {/* Options */}
      <View style={styles.optionsContainer}>
        <Text style={[styles.optionsTitle, { color: levelColor }]}>
          💡 Choose your answer:
        </Text>
        
        {question.options.map((option, index) => {
          const optionState = getOptionState(index);
          
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                optionState === 'selected' && { 
                  borderColor: levelColor,
                  backgroundColor: `${levelColor}08`,
                },
                optionState === 'correct' && styles.optionCorrect,
                optionState === 'incorrect' && styles.optionIncorrect,
              ]}
              onPress={handleOptionPressCallback(index)}
              disabled={showFeedback}
              activeOpacity={0.8}
            >
              <View style={styles.optionContent}>
                {/* Option Letter */}
                <View 
                  style={[
                    styles.optionLetterContainer,
                    { backgroundColor: `${levelColor}15` },
                    optionState === 'correct' && { backgroundColor: '#10b98120' },
                    optionState === 'incorrect' && { backgroundColor: '#ef444420' },
                  ]}
                >
                  <Text style={[
                    styles.optionLetter, 
                    { color: levelColor },
                    optionState === 'correct' && { color: '#10b981' },
                    optionState === 'incorrect' && { color: '#ef4444' },
                  ]}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                
                {/* Option Text */}
                <Text
                  style={[
                    styles.optionText,
                    optionState === 'selected' && { 
                      color: levelColor, 
                      fontWeight: "600" 
                    },
                    optionState === 'correct' && styles.optionCorrectText,
                    optionState === 'incorrect' && styles.optionIncorrectText,
                  ]}
                >
                  {option}
                </Text>
                
                {/* Status Icon */}
                {showFeedback && (
                  <View>
                    {optionState === 'correct' && (
                      <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                    )}
                    {optionState === 'incorrect' && (
                      <Ionicons name="close-circle" size={24} color="#ef4444" />
                    )}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

ReadingQuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
  questionIndex: PropTypes.number.isRequired,
  selectedAnswer: PropTypes.number,
  onSelectAnswer: PropTypes.func.isRequired,
  showFeedback: PropTypes.bool,
  fadeAnim: PropTypes.instanceOf(Animated.Value).isRequired,
  slideAnim: PropTypes.instanceOf(Animated.Value).isRequired,
  levelColor: PropTypes.string,
};

export default ReadingQuestionCard;