// VocabularyExercise/VocabularyNavigation/index.js
import React from "react";
import { View } from "react-native";
import Button from "../../../../components/ui/Button";
import styles from "./style";

/**
 * Composant de navigation pour l'exercice de vocabulaire
 * Utilise le composant Button générique
 */
const VocabularyNavigation = ({
  onPrevious,
  onNext,
  canGoPrevious = true,
  isLast = false,
  levelColor,
}) => {
  // Convertir la couleur du niveau en code de couleur pour le bouton
  const getButtonColor = () => {
    const colorMap = {
      "#3b82f6": "info",
      "#8b5cf6": "primary",
      "#10b981": "success",
      "#f59e0b": "warning",
      "#ef4444": "danger",
      "#6366f1": "primary",
    };

    return colorMap[levelColor] || "primary";
  };

  const buttonColor = getButtonColor();

  return (
    <View style={styles.container}>
      <Button
        title="Précédent"
        variant="tonal"
        color={buttonColor}
        onPress={onPrevious}
        disabled={!canGoPrevious}
        leftIcon="chevron-back"
        style={styles.previousButton}
      />

      <Button
        title={isLast ? "Terminer" : "Suivant"}
        variant="filled"
        color={buttonColor}
        onPress={onNext}
        rightIcon="chevron-forward"
        style={styles.nextButton}
      />
    </View>
  );
};

export default VocabularyNavigation;
