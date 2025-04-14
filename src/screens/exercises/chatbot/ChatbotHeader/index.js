import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

/**
 * En-tête pour l'exercice de Chatbot Writing
 */
const ChatbotHeader = ({ level, onBackPress, levelColor }) => {
  return (
    <ExerciseHeader
      title="Chatbot Writing"
      level={level}
      onClose={onBackPress}
      showProgress={false}
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default ChatbotHeader;
