// AssessmentNavigation/index.js - VERSION REFACTORISÉE avec NavigationButtons




import createStyles from "./style";

/**
 * 🎯 AssessmentNavigation - Version Refactorisée
 * Utilise NavigationButtons pour la navigation + bouton Check Answer custom
 * 
 * @param {boolean} showFeedback - Afficher le feedback ou non
 * @param {number} selectedAnswer - Index de la réponse sélectionnée
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
      <View style={styles.feedbackActionsRow}>
        {/* Bouton Try Again */}
        <TouchableOpacity
          style={[styles.tryAgainButton, { borderColor: levelColor }]}
          onPress={onTryAgain}
          activeOpacity={0.7}
        >
          <Text style={[styles.tryAgainButtonText, { color: levelColor }]}>
            Try Again
          </Text>
        </TouchableOpacity>

        {/* Bouton Next (utilise NavigationButtons) */}
        <View style={styles.nextButtonContainer}>
          <NavigationButtons
            onNext={onNext}
            onPrevious={canGoPrevious ? onPrevious : undefined}
            disablePrevious={!canGoPrevious}
            disableNext={false}
            primaryColor={levelColor}
            isLast={false} // Assessment n'a pas de "finish"
            buttonLabels={{
              next: isLastQuestionInSection ? "Next Section" : "Next Question",
              previous: "Previous"
            }}
            layout="minimal" // Nouveau prop pour layout réduit
          />
        </View>
      </View>
    </View>
  );
};

export default AssessmentNavigation;