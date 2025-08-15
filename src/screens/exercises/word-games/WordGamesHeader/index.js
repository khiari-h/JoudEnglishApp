// 9. WordGamesHeader - MIS À JOUR
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";
import PropTypes from 'prop-types';

const WordGamesHeader = ({ level, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Jeux de mots"
      level={level}
      exerciseType="wordGames" // ✅ NOUVEAU
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

// ✅ Ajout de la validation des props
WordGamesHeader.propTypes = {
  level: PropTypes.string.isRequired,
  onBackPress: PropTypes.func.isRequired,
};

export default WordGamesHeader;
