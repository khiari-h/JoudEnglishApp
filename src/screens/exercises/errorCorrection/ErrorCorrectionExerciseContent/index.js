// src/components/screens/exercises/errorCorrection/ErrorCorrectionExerciseContent/index.js
import PropTypes from 'prop-types';
import ExerciseCard from "../../../../components/exercise-common/ExerciseCard";

/**
 * Carte représentant un exercice de correction d'erreurs dans la liste des exercices
 * Utilise le composant générique ExerciseCard
 * 
 * @param {string} categoryName - Nom de la catégorie d'erreurs
 * @param {string} description - Description de l'exercice
 * @param {number} progress - Progression (0-100)
 * @param {string} levelColor - Couleur du niveau
 * @param {function} onPress - Fonction appelée au clic
 * @param {boolean} isNew - Si l'exercice est nouveau
 */
const ErrorCorrectionExerciseContent = ({
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

// ✅ PropTypes - Corrige toutes les erreurs de validation
ErrorCorrectionExerciseContent.propTypes = {
  categoryName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  progress: PropTypes.number,
  levelColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

// ✅ Valeurs par défaut
ErrorCorrectionExerciseContent.defaultProps = {
  progress: 0,
  levelColor: "#5E60CE",
  isNew: false,
};

export default ErrorCorrectionExerciseContent;