import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import styles from "./style"; // Assuming the styles file is named style.js

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
  return (
    <Animated.View
      style={[
        styles.questionContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.questionTitle}>
        Question {questionIndex + 1}
      </Text>
      <Text style={styles.questionText}>{question.text}</Text>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && styles.selectedOption,
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
                selectedAnswer === index && styles.selectedOptionText,
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
    </Animated.View>
  );
};

export default ReadingQuestion;