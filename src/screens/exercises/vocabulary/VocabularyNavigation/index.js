// src/components/screens/exercises/vocabulary/VocabularyNavigation/index.js
import React from "react";
import { View } from "react-native";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import styles from "./style";

/**
 * Composant de navigation pour l'exercice de vocabulaire
 * Utilise le composant NavigationButtons générique
 */
const VocabularyNavigation = ({
  onPrevious,
  onNext,
  canGoPrevious = true,
  isLast = false,
  currentIndex = 0,
  totalWords = 0,
  levelColor,
}) => {
  return (
    <View style={styles.container}>
      <NavigationButtons
        onNext={onNext}
        onPrevious={onPrevious}
        currentIndex={isLast ? totalWords - 1 : currentIndex}
        totalCount={totalWords || 2} // Valeur par défaut pour éviter les divisions par zéro
        disablePrevious={!canGoPrevious}
        disableNext={false}
        showSkip={false}
        primaryColor={levelColor}
        buttonLabels={{
          next: isLast ? "Terminer" : "Suivant",
          previous: "Précédent",
          skip: "",
          finish: "Terminer"
        }}
        variant="standard"
      />
    </View>
  );
};

export default VocabularyNavigation;
