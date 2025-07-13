
// 3. GrammarHeader - MIS À JOUR



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

export default GrammarHeader;
