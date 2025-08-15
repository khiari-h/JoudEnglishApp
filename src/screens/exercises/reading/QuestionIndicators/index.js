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
  // ✅ Extraction de la logique conditionnelle pour améliorer la lisibilité
  

  // Déterminer la couleur de l'indicateur
  const getIndicatorColor = (index) => {
    if (currentQuestionIndex === index) return levelColor;
    if (completedQuestions.includes(index)) return `${levelColor}50`;
    return "#e5e7eb";
  };
  
  // Déterminer la taille de l'indicateur
  const getIndicatorSize = (index) => {
    return currentQuestionIndex === index ? 12 : 8;
  };

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
          key={`indicator-${index}-${currentQuestionIndex === index ? 'current' : 'other'}`}
          onPress={handleSelectQuestion(index)}
        >
          <View
            style={[
              styles.indicator,
              {
                backgroundColor: getIndicatorColor(index),
                width: getIndicatorSize(index),
                height: getIndicatorSize(index),
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