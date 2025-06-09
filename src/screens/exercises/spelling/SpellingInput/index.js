// SpellingInput/index.js - VERSION SIMPLIFIÉE (nettoyage styles)

import React from "react";
import { View, TextInput, Text } from "react-native";
import createStyles from "./style";

/**
 * ✏️ SpellingInput - Version Simplifiée  
 * Garde la logique mais simplifie les styles
 * 
 * @param {string} value - La valeur actuelle de l'input
 * @param {function} onChangeText - Fonction appelée lors de la modification du texte
 * @param {boolean} disabled - Indique si l'input est désactivé
 * @param {string} levelColor - Couleur associée au niveau
 */
const SpellingInput = ({ 
  value, 
  onChangeText, 
  disabled = false, 
  levelColor = "#3b82f6" 
}) => {
  const styles = createStyles(levelColor);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Votre réponse :</Text>
      <TextInput
        style={[
          styles.input,
          disabled && styles.disabledInput
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Tapez votre réponse ici"
        placeholderTextColor="#94a3b8"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!disabled}
      />
    </View>
  );
};

export default SpellingInput;