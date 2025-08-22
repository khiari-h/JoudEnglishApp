// AssessmentNavigation/index.js - VERSION REFACTORISÉE avec NavigationButtons

import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import createStyles from "./style";

/**
 * 🎯 AssessmentNavigation - Version Refactorisée
 * Utilise NavigationButtons pour la navigation + bouton Check Answer custom
 * 
 * @param {boolean} showFeedback - Afficher le feedback ou non
 * @param {number|null} selectedAnswer - Index de la réponse sélectionnée ou null
 * @param {boolean} isLastQuestionInSection - Dernière question de la section
 * @param {boolean} canGoPrevious - Peut aller en arrière
 * @param {string} levelColor - Couleur du niveau
 * @param {function} onValidateAnswer - Valider la réponse
 * @param {function} onTryAgain - Réessayer
 * @param {function} onNext - Question suivante
 * @param {function} onPrevious - Question précédente
 */
const AssessmentNavigation = ({
  showFeedback,
  selectedAnswer,
  isLastQuestionInSection,
  canGoPrevious,
  levelColor = "#3b82f6",
  onValidateAnswer,
  onTryAgain,
  onNext,
  onPrevious,
}) => {
  const styles = createStyles(levelColor);

  // Phase 1: Check Answer (avant feedback)
  if (!showFeedback) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.checkButton,
            selectedAnswer === null && styles.disabledButton,
            { backgroundColor: selectedAnswer === null ? "#cbd5e1" : levelColor },
          ]}
          onPress={onValidateAnswer}
          disabled={selectedAnswer === null}
          activeOpacity={0.8}
        >
          <Text style={styles.checkButtonText}>Check Answer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Phase 2: Try Again + Next (après feedback)
  return (
    <View style={styles.container}>
      {/* ✅ MODIFIÉ : Layout vertical pour éviter le débordement */}
      
      {/* Ligne 1: Try Again centré */}
      <View style={styles.tryAgainRow}>
        <TouchableOpacity
          style={[styles.tryAgainButton, { borderColor: levelColor }]}
          onPress={onTryAgain}
          activeOpacity={0.7}
        >
          {/* ✅ AJOUTÉ : Icône refresh pour Try Again */}
          <Ionicons name="refresh" size={18} color={levelColor} style={{ marginRight: 8 }} />
          <Text style={[styles.tryAgainButtonText, { color: levelColor }]}>
            Try Again
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ligne 2: Previous + Next centrés */}
      <View style={styles.navigationRow}>
        <NavigationButtons
          onNext={onNext}
          onPrevious={canGoPrevious ? onPrevious : undefined}
          disablePrevious={!canGoPrevious}
          disableNext={false}
          primaryColor={levelColor}
          isLast={false} // Assessment n'a pas de "finish"
          buttonLabels={{
            next: isLastQuestionInSection ? "Next Section" : "Next",
            previous: "Previous"
          }}
          variant="standard" // Layout standard pour Previous + Next
        />
      </View>
    </View>
  );
};

// PropTypes pour la validation des props
AssessmentNavigation.propTypes = {
  showFeedback: PropTypes.bool.isRequired,
  selectedAnswer: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null])
  ]),
  isLastQuestionInSection: PropTypes.bool.isRequired,
  canGoPrevious: PropTypes.bool.isRequired,
  levelColor: PropTypes.string,
  onValidateAnswer: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func,
};

// Valeurs par défaut
AssessmentNavigation.defaultProps = {
  selectedAnswer: null,
  levelColor: "#3b82f6",
  onPrevious: null,
};

export default AssessmentNavigation;