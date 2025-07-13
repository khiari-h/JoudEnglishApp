// WordGamesNavigation/index.js - VERSION REFACTORISÉE avec NavigationButtons




import createStyles from "./style";

/**
 * 🎯 WordGamesNavigation - Version Refactorisée
 * Utilise NavigationButtons pour la navigation + bouton Check Answer custom
 * 
 * @param {object} currentGame - Jeu actuel
 * @param {boolean} showFeedback - Afficher le feedback ou non
 * @param {array} selectedItems - Items sélectionnés
 * @param {boolean} isLastGame - Dernier jeu
 * @param {boolean} canGoPrevious - Peut aller en arrière
 * @param {string} levelColor - Couleur du niveau
 * @param {function} onCheckAnswer - Vérifier la réponse
 * @param {function} onNext - Jeu suivant
 * @param {function} onPrevious - Jeu précédent
 */
const WordGamesNavigation = ({
  currentGame,
  showFeedback,
  selectedItems = [],
  isLastGame,
  canGoPrevious,
  levelColor = "#3b82f6",
  onCheckAnswer,
  onNext,
  onPrevious,
}) => {
  const styles = createStyles(levelColor);

  // Déterminer si le bouton Check Answer doit être disponible
  const isMatchingOrAutoComplete = currentGame?.type === "matching";
  const hasSelection = selectedItems.length > 0;
  const canCheckAnswer = !isMatchingOrAutoComplete && hasSelection;

  // Phase 1: Check Answer (pour categorization seulement)
  if (!showFeedback && currentGame?.type === "categorization") {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.checkButton,
            !canCheckAnswer && styles.disabledButton,
            { backgroundColor: canCheckAnswer ? levelColor : "#cbd5e1" },
          ]}
          onPress={onCheckAnswer}
          disabled={!canCheckAnswer}
          activeOpacity={0.8}
        >
          <Text style={styles.checkButtonText}>
            {hasSelection ? "Check Answer" : "Select items to check"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Phase 2: Matching games (auto-complete, pas de bouton Check)
  if (!showFeedback && currentGame?.type === "matching") {
    return (
      <View style={styles.container}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>Find all matching pairs</Text>
        </View>
      </View>
    );
  }

  // Phase 3: Navigation après feedback (tous types de jeux)
  return (
    <View style={styles.container}>
      <NavigationButtons
        onNext={onNext}
        onPrevious={canGoPrevious ? onPrevious : undefined}
        disablePrevious={!canGoPrevious}
        disableNext={false}
        primaryColor={levelColor}
        isLast={isLastGame}
        buttonLabels={{
          next: isLastGame ? "See Results" : "Next Game",
          previous: "Previous Game",
          finish: "See Results"
        }}
        layout="full" // Utilise toute la largeur
      />
    </View>
  );
};

export default WordGamesNavigation;