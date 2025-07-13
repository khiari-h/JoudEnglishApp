// 5. PhrasesHeader - MIS À JOUR



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
