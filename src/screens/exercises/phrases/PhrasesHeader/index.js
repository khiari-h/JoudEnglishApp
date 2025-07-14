// 5. PhrasesHeader - MIS À JOUR
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

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

export default PhrasesHeader;
