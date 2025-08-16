// 8. SpellingHeader - MIS À JOUR
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";
import PropTypes from 'prop-types';

const SpellingHeader = ({ level, exerciseType, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Orthographe"
      level={level}
      exerciseType="spelling"
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

// ✅ Définition de PropTypes pour la validation des props
SpellingHeader.propTypes = {
  level: PropTypes.string.isRequired,
  onBackPress: PropTypes.func.isRequired,
};

export default SpellingHeader;