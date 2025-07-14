// ReadingHeader/index.js - VERSION CORRIGÉE
import ExerciseHeader from "../../../../components/exercise-common/ExerciseHeader";

/**
 * 🏆 ReadingHeader - Version corrigée avec exerciseType reading
 * Utilise le bon exerciseType maintenant qu'on a les constantes
 */
const ReadingHeader = ({ level, onBackPress }) => {
  return (
    <ExerciseHeader
      title="Reading"
      level={level || "A1"} // ← SÉCURISÉ : fallback si level undefined
      exerciseType="reading" // ← CORRECT : existe dans les constantes
      onClose={onBackPress}
      backIcon="arrow-back"
    />
  );
};

export default ReadingHeader;