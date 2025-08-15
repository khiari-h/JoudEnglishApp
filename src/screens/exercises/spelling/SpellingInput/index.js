// SpellingInput/index.js - VERSION SANS DEBUG

import { View, TextInput, Text } from "react-native";
import { useCallback } from "react";
import createStyles from "./style";
import PropTypes from 'prop-types';

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

// ✅ Définition de PropTypes pour la validation des props
SpellingInput.propTypes = {
  // 'value' est manquant dans la validation
  value: PropTypes.string,
  // 'onChangeText' est manquant dans la validation
  onChangeText: PropTypes.func.isRequired,
  // 'disabled' est manquant dans la validation
  disabled: PropTypes.bool,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
  // 'placeholder' est manquant dans la validation
  placeholder: PropTypes.string,
  // 'testID' est manquant dans la validation
  testID: PropTypes.string,
};

export default SpellingInput;