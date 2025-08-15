// 3. GrammarHeader - MIS À JOUR
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";
import PropTypes from 'prop-types';

const GrammarHeader = ({ level, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Grammaire"
      level={level}
      exerciseType="grammar" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

// ✅ Définition de PropTypes pour la validation des props
GrammarHeader.propTypes = {
  // 'onBackPress' est manquant dans la validation
  onBackPress: PropTypes.func.isRequired,
  // 'level' est manquant dans la validation
  level: PropTypes.string.isRequired,
};

export default GrammarHeader;