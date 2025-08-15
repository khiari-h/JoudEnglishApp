// 5. PhrasesHeader - MIS À JOUR
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";
import PropTypes from 'prop-types';

const PhrasesHeader = ({ level, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Expressions"
      level={level}
      exerciseType="phrases" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

// ✅ Ajout de la validation des props
PhrasesHeader.propTypes = {
  level: PropTypes.string.isRequired,
  onBackPress: PropTypes.func.isRequired,
};

export default PhrasesHeader;
