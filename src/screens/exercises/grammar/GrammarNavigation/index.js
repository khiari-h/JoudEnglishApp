// src/components/screens/exercises/grammar/GrammarNavigation/index.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import styles from "./style";

/**
 * Composant pour la navigation dans les exercices de grammaire
 * Utilise le composant commun NavigationButtons avec un bouton Try Again amélioré
 */
const GrammarNavigation = ({
  showFeedback,
  isCorrect,
  canCheckAnswer,
  onCheckAnswer,
  onPreviousExercise,
  onNextExercise,
  onRetryExercise,
  onSkipExercise,
  isFirstExercise,
  isLastExercise,
  attempts,
  levelColor = "#3b82f6",
}) => {
  // Mode check - quand l'utilisateur n'a pas encore vérifié sa réponse
  if (!showFeedback) {
    return (
      <View style={styles.actionContainer}>
        <NavigationButtons
          onNext={onCheckAnswer}
          disableNext={!canCheckAnswer}
          disablePrevious
          showSkip={false}
          currentIndex={0}
          totalCount={1}
          primaryColor={levelColor}
          buttonLabels={{
            next: "Check",
            previous: "",
            skip: "",
            finish: "",
          }}
          variant="centered"
        />
      </View>
    );
  }
  // Mode réponse correcte - navigation vers exercice suivant ou précédent
  else if (isCorrect) {
    return (
      <View style={styles.actionContainer}>
        <NavigationButtons
          onNext={onNextExercise}
          onPrevious={onPreviousExercise}
          disablePrevious={isFirstExercise}
          disableNext={false}
          showSkip={false}
          currentIndex={isLastExercise ? 1 : 0}
          totalCount={2} // Valeur arbitraire pour définir si on est au dernier élément
          primaryColor={levelColor}
          buttonLabels={{
            next: isLastExercise ? "Finish" : "Next",
            previous: "Previous",
            skip: "",
            finish: "Finish",
          }}
          variant="standard"
        />
      </View>
    );
  }
  // Mode réponse incorrecte - réessayer ou passer
  else {
    // Style par défaut pour les boutons s'ils ne sont pas définis dans styles
    const containerStyle = styles.customButtonsContainer || {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: "#fff",
    };

    const tryAgainStyle = styles.tryAgainButton || {
      backgroundColor: "#f3f4f6",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      flex: 1,
      marginRight: 10,
    };

    const skipStyle = styles.skipButton || {
      backgroundColor: levelColor,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
      flex: 1,
      marginLeft: 10,
    };

    const tryAgainTextStyle = styles.tryAgainText || {
      color: "#4b5563",
      fontWeight: "600",
      fontSize: 16,
    };

    const skipTextStyle = styles.skipText || {
      color: "white",
      fontWeight: "600",
      fontSize: 16,
    };

    return (
      <View style={styles.actionContainer}>
        <View style={containerStyle}>
          {/* Bouton Try Again personnalisé et bien visible */}
          <TouchableOpacity
            style={tryAgainStyle}
            onPress={onRetryExercise}
            accessible
            accessibilityLabel="Try Again"
            accessibilityHint="Attempt the exercise again"
          >
            <Ionicons
              name="refresh"
              size={20}
              color="#4b5563"
              style={{ marginRight: 8 }}
            />
            <Text style={tryAgainTextStyle}>Try Again</Text>
          </TouchableOpacity>

          {/* Bouton Skip */}
          <TouchableOpacity
            style={skipStyle}
            onPress={onSkipExercise}
            accessible
            accessibilityLabel="Skip"
            accessibilityHint="Skip this exercise and move to the next one"
          >
            <Text style={skipTextStyle}>Skip</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color="white"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default GrammarNavigation;
