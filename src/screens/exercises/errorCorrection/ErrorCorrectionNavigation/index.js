// src/components/screens/exercises/errorCorrection/ErrorCorrectionNavigation/index.js
import { View, TouchableOpacity, Text } from "react-native";
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
 * @param {function} onTryAgain - Callback pour réessayer l'exercice
 * @param {number} currentIndex - Index actuel de l'exercice (0-based)
 * @param {number} totalCount - Nombre total d'exercices
 * @param {boolean} disableNext - Désactiver le bouton suivant
 * @param {boolean} isLastExercise - Indique si c'est le dernier exercice
 * @param {boolean} showFeedback - Indique si on affiche le feedback après vérification
 * @param {boolean} isCorrect - Indique si la réponse est correcte
 * @param {string} levelColor - Couleur principale du niveau
 */
const ErrorCorrectionNavigation = ({
  onNext,
  onPrevious,
  onExit,
  onTryAgain,
  currentIndex,
  totalCount,
  disableNext = false,
  isLastExercise = false,
  showFeedback = false,
  isCorrect = false,
  levelColor,
}) => {
  // ✅ Extraction de la logique conditionnelle pour améliorer la lisibilité
  
  // Déterminer le label du bouton suivant
  const getNextButtonLabel = () => {
    if (!showFeedback) return "Vérifier";
    if (isLastExercise) return "Voir les résultats";
    return "Exercice suivant";
  };

  // Si on est en mode feedback (après vérification de réponse)
  // ou si on est au dernier exercice, adapter les labels
  const buttonLabels = {
    previous: "Précédent",
    next: getNextButtonLabel(),
    skip: "Passer",
    finish: "Terminer",
  };

  return (
    <View style={styles.container}>
      {/* ✅ AJOUTÉ : Bouton Try Again quand la réponse est incorrecte */}
      {showFeedback && !isCorrect && onTryAgain && (
        <TouchableOpacity
          style={[
            styles.tryAgainButton,
            { backgroundColor: levelColor }
          ]}
          onPress={onTryAgain}
          activeOpacity={0.8}
        >
          <Text style={styles.tryAgainButtonText}>🔄 Réessayer</Text>
        </TouchableOpacity>
      )}
      
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
  onTryAgain: PropTypes.func, // Added onTryAgain to propTypes
  currentIndex: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  disableNext: PropTypes.bool,
  isLastExercise: PropTypes.bool,
  showFeedback: PropTypes.bool,
  isCorrect: PropTypes.bool, // Added isCorrect to propTypes
  levelColor: PropTypes.string.isRequired,
};

// Valeurs par défaut
ErrorCorrectionNavigation.defaultProps = {
  disableNext: false,
  isLastExercise: false,
  showFeedback: false,
  isCorrect: false, // Added isCorrect to defaultProps
};

export default ErrorCorrectionNavigation;