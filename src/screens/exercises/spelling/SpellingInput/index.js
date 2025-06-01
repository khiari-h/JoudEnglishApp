// src/screens/exercises/spelling/SpellingInput/index.js
import React from "react";
import { View, TextInput, Text } from "react-native";
import styles from "./style";

/**
 * Composant pour la saisie de la réponse dans les exercices d'orthographe
 * 
 * @param {string} value - La valeur actuelle de l'input
 * @param {Function} onChangeText - Fonction appelée lors de la modification du texte
 * @param {boolean} disabled - Indique si l'input est désactivé
 * @param {string} levelColor - Couleur associée au niveau
 */
const SpellingInput = ({ 
  value, 
  onChangeText, 
  disabled = false, 
  levelColor 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your answer:</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: levelColor },
          disabled && styles.disabledInput
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Type your answer here"
        placeholderTextColor="#94a3b8"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!disabled}
      />
    </View>
  );
};

export default SpellingInput;
