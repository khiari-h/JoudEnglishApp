// 2. ChatbotHeader - MIS À JOUR  
import React from "react";
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

const ChatbotHeader = ({ level, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Conversations"
      level={level}
      exerciseType="conversations" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

export default ChatbotHeader;
