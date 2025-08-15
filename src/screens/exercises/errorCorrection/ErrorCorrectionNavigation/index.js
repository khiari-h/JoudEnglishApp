// src/components/screens/exercises/errorCorrection/ErrorCorrectionNavigation/index.js
import { View } from "react-native";
import PropTypes from "prop-types";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import styles from "./style";

/**
 * Composant de navigation pour les exercices de correction d'erreurs
 * Réutilise le composant NavigationButtons générique
 * 
 * @param {function} onNext - Callback pour passer à l'exercice suivant ou vérifier
 * @param {function} onPrevious - Callback pour revenir à l'exercice précédent
 * @param {function} onExit - Callback pour sortir/passer l'exercice
 * @param {number} currentIndex - Index actuel de l'exercice (0-based)
 * @param {number} totalCount - Nombre total d'exercices
 * @param {boolean} disableNext - Désactiver le bouton suivant
 * @param {boolean} isLastExercise - Indique si c'est le dernier exercice
 * @param {boolean} showFeedback - Indique si on affiche le feedback après vérification
 * @param {string} levelColor - Couleur principale du niveau
 */
const ErrorCorrectionNavigation = ({
  onNext,
  onPrevious,
  onExit,
  currentIndex,
  totalCount,
  disableNext = false,
  isLastExercise = false,
  showFeedback = false,
  levelColor,
}) => {
  // Si on est en mode feedback (après vérification de réponse)
  // ou si on est au dernier exercice, adapter les labels
  const buttonLabels = {
    previous: "Précédent",
    next: showFeedback
      ? isLastExercise
        ? "Voir les résultats"
        : "Exercice suivant"
      : "Vérifier",
    skip: "Passer",
    finish: "Terminer",
  };

  return (
    <View style={styles.container}>
      <NavigationButtons
        onNext={onNext}
        onPrevious={onPrevious}
        onSkip={onExit}
        currentIndex={currentIndex}
        totalCount={totalCount}
        disablePrevious={currentIndex === 0}
        disableNext={disableNext}
        showSkip={!showFeedback && !isLastExercise}
        primaryColor={levelColor}
        buttonLabels={buttonLabels}
        variant="standard"
      />
    </View>
  );
};

// PropTypes pour la validation des props
ErrorCorrectionNavigation.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  disableNext: PropTypes.bool,
  isLastExercise: PropTypes.bool,
  showFeedback: PropTypes.bool,
  levelColor: PropTypes.string.isRequired,
};

// Valeurs par défaut
ErrorCorrectionNavigation.defaultProps = {
  disableNext: false,
  isLastExercise: false,
  showFeedback: false,
};

export default ErrorCorrectionNavigation;