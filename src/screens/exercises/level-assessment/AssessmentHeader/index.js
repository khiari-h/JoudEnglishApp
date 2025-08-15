import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";
import PropTypes from 'prop-types';

const AssessmentHeader = ({ level, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Évaluation"
      level={level}
      exerciseType="assessment" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

// ✅ Ajout de la validation des props
AssessmentHeader.propTypes = {
  level: PropTypes.string.isRequired,
  onBackPress: PropTypes.func.isRequired,
};

export default AssessmentHeader;

