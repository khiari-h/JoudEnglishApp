// SpellingInput/index.js - VERSION SANS DEBUG

import { View, TextInput, Text } from "react-native";
import { useCallback } from "react";
import createStyles from "./style";

const SpellingInput = ({ 
  value = "", 
  onChangeText, 
  disabled = false, 
  levelColor = "#3b82f6",
  placeholder = "Tapez votre réponse ici...",
  testID = "spelling-input"
}) => {
  const styles = createStyles(levelColor);

  if (!onChangeText) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Erreur: fonction onChangeText manquante
        </Text>
      </View>
    );
  }

  const handleChangeText = useCallback((text) => {
    onChangeText(text);
  }, [onChangeText]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Votre réponse :</Text>
      
      <TextInput
        testID={testID}
        style={[
          styles.input,
          disabled && styles.disabledInput,
          { borderColor: disabled ? "#e2e8f0" : levelColor }
        ]}
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        returnKeyType="done"
        blurOnSubmit
        accessible
        accessibilityLabel="Zone de saisie pour votre réponse"
        accessibilityHint="Tapez votre réponse à l'exercice d'orthographe"
      />
    </View>
  );
};

export default SpellingInput;