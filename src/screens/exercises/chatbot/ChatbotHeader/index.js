// 1. ChatbotHeader (déjà utilise ExerciseHeader - à standardiser)
// src/components/screens/exercises/chatbot/ChatbotHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

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

