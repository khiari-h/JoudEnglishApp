// 1. ChatbotHeader (déjà uniformisé sans barre de progression)
// src/components/screens/exercises/conversation/ChatbotHeader/index.js
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const ChatbotHeader = ({ level, onBackPress, levelColor }) => {
  return (
    <ExerciseHeader
      title="Conversation Writing"
      level={level}
      onClose={onBackPress}
      levelColor={levelColor}
      backIcon="arrow-back"
    />
  );
};

export default ChatbotHeader;

