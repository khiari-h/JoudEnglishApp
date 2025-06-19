// src/components/screens/exercises/reading/QuestionIndicators/index.js
import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Indicateurs visuels pour naviguer entre les questions
 */
const QuestionIndicators = ({
  totalQuestions,
  currentQuestionIndex,
  completedQuestions = [],
  onSelectQuestion,
  levelColor,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalQuestions }).map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelectQuestion(index)}
        >
          <View
            style={[
              styles.indicator,
              {
                backgroundColor:
                  currentQuestionIndex === index
                    ? levelColor
                    : completedQuestions.includes(index)
                    ? `${levelColor}50`
                    : "#e5e7eb",
                width: currentQuestionIndex === index ? 12 : 8,
                height: currentQuestionIndex === index ? 12 : 8,
              },
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuestionIndicators;
