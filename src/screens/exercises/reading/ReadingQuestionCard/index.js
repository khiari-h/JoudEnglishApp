// ReadingQuestionCard/index.js - VERSION SIMPLE
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeroCard from "../../../../components/ui/HeroCard";
import ContentSection from "../../../../components/ui/ContentSection";
import createStyles from "./style";

/**
 * ❓ ReadingQuestionCard - Version Simple & Efficace
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

  // Handle option press
  const handleOptionPress = (optionIndex) => {
    if (showFeedback) return;
    onSelectAnswer(optionIndex);
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
      {/* Question Header */}
      <View style={styles.questionHeader}>
        <HeroCard 
          content={`Question ${questionIndex + 1}`}
          fontSize={18}
          levelColor={levelColor}
          showUnderline={false}
          backgroundColor="#F8F9FA"
        />
      </View>
      
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
              key={index}
              style={[
                styles.optionButton,
                optionState === 'selected' && { 
                  borderColor: levelColor,
                  backgroundColor: `${levelColor}08`,
                },
                optionState === 'correct' && styles.optionCorrect,
                optionState === 'incorrect' && styles.optionIncorrect,
              ]}
              onPress={() => handleOptionPress(index)}
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

export default ReadingQuestionCard;