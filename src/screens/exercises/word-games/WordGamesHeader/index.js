// 9. WordGamesHeader - MIS À JOUR
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

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

export default WordGamesHeader;
