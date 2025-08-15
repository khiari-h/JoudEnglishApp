// 8. SpellingHeader - MIS À JOUR
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";
import PropTypes from 'prop-types';

const SpellingHeader = ({ level, exerciseType, onBackPress }) => {
  // Formatage du titre en fonction du type d'exercice
  const getExerciseTitle = (type) => {
    switch (type) {
      case "correction":
        return "Orthographe - Correction";
      case "rules":
        return "Orthographe - Règles";
      default:
        return "Orthographe";
    }
  };

  return (
    <ExerciseHeader
      title={getExerciseTitle(exerciseType)}
      level={level}
      exerciseType="spelling" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

// ✅ Définition de PropTypes pour la validation des props
SpellingHeader.propTypes = {
  // 'level' est manquant dans la validation
  level: PropTypes.string.isRequired,
  // 'exerciseType' est manquant dans la validation
  exerciseType: PropTypes.oneOf(['correction', 'rules']).isRequired,
  // 'onBackPress' est manquant dans la validation
  onBackPress: PropTypes.func.isRequired,
};

export default SpellingHeader;