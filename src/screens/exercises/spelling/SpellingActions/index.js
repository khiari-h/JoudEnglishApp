// src/screens/exercises/spelling/SpellingActions/index.js
import React from "react";
import { View } from "react-native";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import styles from "./style";

/**
 * Composant pour les boutons d'action de l'exercice d'orthographe
 * Utilise le composant NavigationButtons pour la cohérence de l'interface
 * 
 * @param {boolean} showFeedback - Indique si le feedback est affiché
 * @param {boolean} isCorrect - Indique si la réponse est correcte
 * @param {string} userInput - Texte saisi par l'utilisateur
 * @param {boolean} isLastExercise - Indique si c'est le dernier exercice
 * @param {boolean} isCompleted - Indique si l'exercice a déjà été complété
 * @param {string} exerciseType - Type d'exercice (correction, spelling_rule, homophones)
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onCheck - Fonction pour vérifier la réponse
 * @param {Function} onNext - Fonction pour passer à l'exercice suivant
 * @param {Function} onRetry - Fonction pour réessayer l'exercice
 */
const SpellingActions = ({
  showFeedback,
  isCorrect,
  userInput,
  isLastExercise,
  isCompleted,
  exerciseType,
  levelColor,
  onCheck,
  onNext,
  onRetry
}) => {
  // Fonction pour déterminer si la réponse peut être vérifiée
  const canCheckAnswer = () => {
    if (exerciseType === "homophones") {
      // Pour les homophones, vérifier qu'un choix est sélectionné
      return userInput !== "";
    } else {
      // Pour les autres types, vérifier que le texte n'est pas vide
      return userInput.trim() !== "";
    }
  };

  // Si l'exercice est déjà complété, montrer simplement le bouton "Next"
  if (isCompleted && !showFeedback) {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={onNext}
          currentIndex={isLastExercise ? 1 : 0} // Pour déterminer si c'est le dernier exercice
          totalCount={2} // Valeur arbitraire pour forcer l'affichage du label approprié
          disablePrevious={true}
          showSkip={false}
          primaryColor={levelColor}
          buttonLabels={{
            next: isLastExercise ? "Complete" : "Next Exercise",
            previous: "",
            skip: "",
            finish: "Complete"
          }}
          variant="centered"
        />
      </View>
    );
  }

  // Cas où l'utilisateur n'a pas encore validé sa réponse
  if (!showFeedback) {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={onCheck}
          disablePrevious={true}
          disableNext={!canCheckAnswer()}
          showSkip={false}
          primaryColor={levelColor}
          buttonLabels={{
            next: "Check Answer",
            previous: "",
            skip: "",
            finish: ""
          }}
          variant="centered"
        />
      </View>
    );
  } 
  // Cas où la réponse est correcte
  else if (isCorrect) {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={onNext}
          disablePrevious={true}
          showSkip={false}
          primaryColor={levelColor}
          currentIndex={isLastExercise ? 1 : 0}
          totalCount={2}
          buttonLabels={{
            next: isLastExercise ? "Complete" : "Next Exercise",
            previous: "",
            skip: "",
            finish: "Complete"
          }}
          variant="centered"
        />
      </View>
    );
  } 
  // Cas où la réponse est incorrecte
  else {
    return (
      <View style={styles.container}>
        <NavigationButtons
          onNext={onNext}
          onPrevious={onRetry}
          disablePrevious={false}
          showSkip={false}
          primaryColor={levelColor}
          currentIndex={isLastExercise ? 1 : 0}
          totalCount={2}
          buttonLabels={{
            next: isLastExercise ? "Complete" : "Next Exercise",
            previous: "Try Again",
            skip: "",
            finish: "Complete"
          }}
          variant="standard"
        />
      </View>
    );
  }
};

export default SpellingActions;