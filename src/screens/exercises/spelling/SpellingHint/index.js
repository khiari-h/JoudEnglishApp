// src/screens/exercises/spelling/SpellingHint/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher un indice dans l'exercice d'orthographe
 * 
 * @param {string} hint - Texte de l'indice
 * @param {boolean} showHint - Indique si l'indice est affiché
 * @param {Function} onToggle - Fonction pour afficher/masquer l'indice
 * @param {string} levelColor - Couleur associée au niveau
 */
const SpellingHint = ({ hint, showHint, onToggle, levelColor }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={onToggle}
      >
        <Text style={[styles.toggleButtonText, { color: levelColor }]}>
          {showHint ? "Hide hint" : "Show hint"}
        </Text>
      </TouchableOpacity>
      
      {showHint && (
        <View style={[styles.hintContainer, { borderColor: `${levelColor}30` }]}>
          <Text style={styles.hintText}>
            {hint}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SpellingHint;