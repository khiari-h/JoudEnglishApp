// 2. ChatbotHeader - MIS À JOUR  
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";
import PropTypes from 'prop-types';

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

// ✅ Définition de PropTypes pour la validation des props
ChatbotHeader.propTypes = {
  // 'level' est manquant dans la validation
  level: PropTypes.string.isRequired,
  // 'onBackPress' est manquant dans la validation
  onBackPress: PropTypes.func.isRequired,
};

export default ChatbotHeader;