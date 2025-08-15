// src/components/screens/exercises/reading/QuestionIndicators/index.js
import { View, TouchableOpacity } from "react-native";
import { useCallback } from "react";
import styles from "./style";
import PropTypes from 'prop-types';

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
  // Handler stable pour la sélection d'une question
  const handleSelectQuestion = useCallback(
    (index) => () => {
      onSelectQuestion(index);
    },
    [onSelectQuestion]
  );

  return (
    <View style={styles.container}>
      {Array.from({ length: totalQuestions }).map((_, index) => (
        <TouchableOpacity
          key={`indicator-${index}`} // eslint-disable-next-line react/no-array-index-key
          onPress={handleSelectQuestion(index)}
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

// ✅ Définition de PropTypes pour la validation des props
QuestionIndicators.propTypes = {
  // 'totalQuestions' est manquant dans la validation
  totalQuestions: PropTypes.number.isRequired,
  // 'currentQuestionIndex' est manquant dans la validation
  currentQuestionIndex: PropTypes.number.isRequired,
  // 'completedQuestions' est manquant dans la validation
  completedQuestions: PropTypes.arrayOf(PropTypes.number),
  // 'onSelectQuestion' est manquant dans la validation
  onSelectQuestion: PropTypes.func.isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default QuestionIndicators;