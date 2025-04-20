// src/components/exercise-common/InstructionBox/index.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Boîte d'instructions pour les exercices avec possibilité
 * de les minimiser/maximiser
 */
const InstructionBox = ({
  title = "Instructions",
  instructions,
  examples = [],
  tips = [],
  initiallyExpanded = true,
  variant = "standard", // 'standard', 'compact', 'highlighted'
  primaryColor = "#5E60CE",
}) => {
  // États
  const [expanded, setExpanded] = useState(initiallyExpanded);

  // Animation pour la hauteur (expansion/contraction)
  const [animation] = useState(new Animated.Value(initiallyExpanded ? 1 : 0));

  // Toggle l'expansion
  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  // Déterminer le style en fonction de la variante
  const getVariantStyle = () => {
    switch (variant) {
      case "compact":
        return styles.compactContainer;
      case "highlighted":
        return [styles.highlightedContainer, { borderColor: primaryColor }];
      case "standard":
      default:
        return styles.standardContainer;
    }
  };

  // Animation pour la hauteur maximale
  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 1000], // Valeurs approximatives, s'ajustera automatiquement
  });

  // Animation pour la rotation de l'icône
  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View style={[styles.container, getVariantStyle(), { maxHeight }]}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <View style={styles.titleContainer}>
          <Ionicons
            name="information-circle"
            size={24}
            color={primaryColor}
            style={styles.titleIcon}
          />
          <Text style={[styles.title, { color: primaryColor }]}>{title}</Text>
        </View>

        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          <Ionicons name="chevron-down" size={24} color="#6B7280" />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.contentContainer}>
          {instructions && (
            <Text style={styles.instructions}>{instructions}</Text>
          )}

          {examples.length > 0 && (
            <View style={styles.examplesContainer}>
              <Text style={styles.sectionTitle}>Exemples:</Text>
              {examples.map((example, index) => (
                <View key={index} style={styles.exampleItem}>
                  <Text style={styles.exampleText}>{example}</Text>
                </View>
              ))}
            </View>
          )}

          {tips.length > 0 && (
            <View style={styles.tipsContainer}>
              <Text style={styles.sectionTitle}>Astuces:</Text>
              {tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <Ionicons
                    name="bulb-outline"
                    size={16}
                    color={primaryColor}
                    style={styles.tipIcon}
                  />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </Animated.View>
  );
};

export default InstructionBox;
