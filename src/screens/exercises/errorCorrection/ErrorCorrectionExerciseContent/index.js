// src/components/screens/exercises/errorCorrection/ErrorCorrectionExerciseCard/index.js
import ExerciseCard from "../../../../components/exercise-common/ExerciseCard";

/**
 * Carte représentant un exercice de correction d'erreurs dans la liste des exercices
 * Utilise le composant générique ExerciseCard
 */
const ErrorCorrectionExerciseCard = ({
  categoryName,
  description,
  progress = 0,
  levelColor = "#5E60CE",
  onPress,
  isNew = false,
}) => {
  return (
    <ExerciseCard
      title={`Correction d'erreurs: ${categoryName}`}
      description={description}
      icon="✏️"
      progress={progress}
      color={levelColor}
      onPress={onPress}
      isNew={isNew}
    />
  );
};

export default ErrorCorrectionExerciseCard;
