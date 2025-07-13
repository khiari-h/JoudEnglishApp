// 2. ChatbotHeader - MIS À JOUR  



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
