// src/components/screens/exercises/errorCorrection/ErrorCorrectionExerciseCard/index.js




/**
 * Carte représentant un type d'exercice de correction d'erreurs dans la sélection
 * Réutilise le composant ExerciseCard générique
 */
const ErrorCorrectionExerciseCard = ({
  title,
  description,
  progress = 0,
  isNew = false,
  levelColor = "#5E60CE",
  onPress,
}) => {
  return (
    <ExerciseCard
      title={title}
      description={description}
      icon="✏️" // Icône pour la correction d'erreurs
      progress={progress}
      color={levelColor}
      onPress={onPress}
      isNew={isNew}
    />
  );
};

export default ErrorCorrectionExerciseCard;
