// src/screens/exercises/phrases/PhrasesNavigation/index.js
import React from "react";
import { View } from "react-native";
import NavigationButtons from "../../../../components/exercise-common/NavigationButtons";
import styles from "./style";

/**
 * Composant de navigation pour les phrases
 * Utilise le composant NavigationButtons générique
 * 
 * @param {function} onPrevious - Fonction appelée pour aller à la phrase précédente
 * @param {function} onNext - Fonction appelée pour aller à la phrase suivante
 * @param {boolean} disablePrevious - Désactive le bouton précédent
 * @param {boolean} disableNext - Désactive le bouton suivant
 * @param {number} currentIndex - Index de la phrase actuelle
 * @param {number} totalCount - Nombre total de phrases
 * @param {string} levelColor - Couleur du niveau
 */
const PhrasesNavigation = ({ 
  onPrevious, 
  onNext, 
  disablePrevious = false, 
  disableNext = false,
  currentIndex = 0,
  totalCount = 0,
  levelColor 
}) => {
  return (
    <View style={styles.container}>
      <NavigationButtons
        onNext={onNext}
        onPrevious={onPrevious}
        currentIndex={currentIndex}
        totalCount={totalCount}
        disablePrevious={disablePrevious}
        disableNext={disableNext}
        showSkip={false}
        primaryColor={levelColor}
        buttonLabels={{
          next: "Suivant",
          previous: "Précédent",
          skip: "",
          finish: "Terminer"
        }}
        variant="standard"
      />
    </View>
  );
};

export default PhrasesNavigation;