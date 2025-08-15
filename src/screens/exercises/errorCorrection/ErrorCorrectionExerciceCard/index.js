// src/components/screens/exercises/errorCorrection/ErrorCorrectionExerciseCard/index.js
import PropTypes from 'prop-types';
import ExerciseCard from "../../../../components/exercise-common/ExerciseCard";

/**
 * Carte représentant un type d'exercice de correction d'erreurs dans la sélection
 * Réutilise le composant ExerciseCard générique
 * 
 * @param {string} title - Titre de l'exercice
 * @param {string} description - Description de l'exercice
 * @param {number} progress - Progression (0-100)
 * @param {boolean} isNew - Si l'exercice est nouveau
 * @param {string} levelColor - Couleur du niveau
 * @param {function} onPress - Fonction appelée au clic
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

// ✅ PropTypes - Corrige toutes les erreurs de validation
ErrorCorrectionExerciseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  progress: PropTypes.number,
  isNew: PropTypes.bool,
  levelColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

// ✅ Valeurs par défaut
ErrorCorrectionExerciseCard.defaultProps = {
  progress: 0,
  isNew: false,
  levelColor: "#5E60CE",
};

export default ErrorCorrectionExerciseCard;