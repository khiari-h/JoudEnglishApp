// src/components/screens/exercises/errorCorrection/ErrorCorrectionModeSelector/index.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant pour sélectionner le mode d'exercice de correction d'erreurs
 * (Correction complète, Identification d'erreurs, Choix multiple)
 */
const ErrorCorrectionModeSelector = ({
  onSelectMode,
  disabled = false,
  levelColor = "#5E60CE",
}) => {
  const modes = [
    {
      id: "full",
      title: "Correction complète",
      description: "Corriger la phrase entière en modifiant le texte",
      icon: "create-outline",
    },
    {
      id: "identify",
      title: "Identifier les erreurs",
      description: "Toucher les mots qui contiennent des erreurs",
      icon: "search-outline",
    },
    {
      id: "multiple_choice",
      title: "Choix multiple",
      description: "Choisir la version correcte parmi les options",
      icon: "list-outline",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisir un mode d'exercice :</Text>

      {modes.map((mode) => (
        <TouchableOpacity
          key={mode.id}
          style={[
            styles.modeCard,
            { borderColor: levelColor },
            disabled && styles.disabledCard,
          ]}
          onPress={() => onSelectMode(mode.id)}
          disabled={disabled}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${levelColor}20` },
            ]}
          >
            <Ionicons
              name={mode.icon}
              size={24}
              color={disabled ? "#94a3b8" : levelColor}
            />
          </View>
          <View style={styles.modeInfo}>
            <Text
              style={[
                styles.modeTitle,
                disabled && styles.disabledText,
              ]}
            >
              {mode.title}
            </Text>
            <Text
              style={[
                styles.modeDescription,
                disabled && styles.disabledText,
              ]}
            >
              {mode.description}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ErrorCorrectionModeSelector;
