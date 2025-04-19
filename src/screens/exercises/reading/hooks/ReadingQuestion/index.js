// src/components/screens/exercises/reading/ReadingQuestion/index.js
import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import Card from "../../../../ui/Card";
import styles from "./style";

/**
 * Composant pour afficher une question de lecture et ses options
 */
const ReadingQuestion = ({
  question,
  questionIndex,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,
  fadeAnim,
  slideAnim,
  levelColor,
}) => {
  if (!question) return null;

  const renderOptions = () => (
    <View style={styles.optionsContainer}>
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedAnswer === index && [
              styles.selectedOption,
              { borderColor: levelColor },
            ],
            showFeedback &&
              index === question.correctAnswer &&
              styles.correctOption,
            showFeedback &&
              selectedAnswer === index &&
              selectedAnswer !== question.correctAnswer &&
              styles.incorrectOption,
          ]}
          onPress={() => onSelectAnswer(index)}
          disabled={showFeedback}
        >
          <Text
            style={[
              styles.optionText,
              selectedAnswer === index && { color: levelColor },
              showFeedback &&
                index === question.correctAnswer &&
                styles.correctOptionText,
              showFeedback &&
                selectedAnswer === index &&
                selectedAnswer !== question.correctAnswer &&
                styles.incorrectOptionText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

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
      <Card
        title={`Question ${questionIndex + 1}`}
        subtitle={question.text}
        headerIcon="help-circle-outline"
        headerIconColor={levelColor}
      >
        {renderOptions()}
      </Card>
    </Animated.View>
  );
};

export default ReadingQuestion;