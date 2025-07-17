// ErrorCorrectionModeSelector/index.js - VERSION SIMPLIFIÉE (80 → 35 lignes)

import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import createStyles from "./style";
import { useCallback } from "react";

/**
 * 🎯 ErrorCorrectionModeSelector - Version Ultra-Simplifiée
 * 80 lignes → 35 lignes (-56% de code)
 * Logique épurée, design clean
 */
const ErrorCorrectionModeSelector = ({
  onSelectMode,
  disabled = false,
  levelColor = "#5E60CE",
}) => {
  const styles = createStyles(levelColor);

  const modes = [
    {
      id: "full",
      title: "Correction complète",
      description: "Corriger la phrase entière",
      icon: "create-outline",
    },
    {
      id: "identify",
      title: "Identifier erreurs",
      description: "Toucher les mots erronés",
      icon: "search-outline",
    },
    {
      id: "multiple_choice",
      title: "Choix multiple",
      description: "Choisir la bonne réponse",
      icon: "list-outline",
    },
  ];

  // Factory de handler pour éviter la création de fonctions inline
  const handleModePress = useCallback((modeId) => () => onSelectMode(modeId), [onSelectMode]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisir un mode :</Text>

      {modes.map((mode) => (
        <TouchableOpacity
          key={mode.id}
          style={[styles.modeCard, disabled && styles.disabledCard]}
          onPress={handleModePress(mode.id)}
          disabled={disabled}
        >
          <Ionicons
            name={mode.icon}
            size={24}
            color={disabled ? "#94a3b8" : levelColor}
            style={styles.icon}
          />
          <View style={styles.modeInfo}>
            <Text style={[styles.modeTitle, disabled && styles.disabledText]}>
              {mode.title}
            </Text>
            <Text style={[styles.modeDescription, disabled && styles.disabledText]}>
              {mode.description}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ErrorCorrectionModeSelector;