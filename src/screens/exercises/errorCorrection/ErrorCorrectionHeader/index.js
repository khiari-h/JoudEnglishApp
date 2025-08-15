// 1. ErrorCorrectionHeader - MIS À JOUR
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";
import PropTypes from 'prop-types';

const ErrorCorrectionHeader = ({ level, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Correction d'erreurs"
      level={level}
      exerciseType="errorCorrection" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

// ✅ Définition de PropTypes pour la validation des props
ErrorCorrectionHeader.propTypes = {
  // 'level' est manquant dans la validation
  level: PropTypes.string.isRequired,
  // 'onBackPress' est manquant dans la validation
  onBackPress: PropTypes.func.isRequired,
};

export default ErrorCorrectionHeader;