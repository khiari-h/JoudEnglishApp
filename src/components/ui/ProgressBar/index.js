// src/components/ui/ProgressBar/index.js
import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import styles from "./style";

/**
 * Composant ProgressBar pour afficher une barre de progression
 * avec options de personnalisation
 */
const ProgressBar = ({
  progress = 0, // 0 à 100
  showPercentage = false,
  showValue = false,
  total = 100,
  height = 8,
  backgroundColor = "#E5E7EB",
  fillColor = "#5E60CE",
  borderRadius = 4,
  animated = true,
  animationDuration = 500,
  label,
  labelPosition = "top", // 'top', 'left', 'right', 'none'
  style,
  valueFormatter = (value, total) => `${value}/${total}`,
  percentageFormatter = (percentage) => `${Math.round(percentage)}%`,
}) => {
  // Calculer le pourcentage validé
  const validProgress = Math.min(Math.max(progress, 0), 100);

  // Animation de la barre de progression
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Effet pour animer la barre de progression
  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: validProgress,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(validProgress);
    }
  }, [validProgress, animated, animationDuration]);

  // Largeur animée de la barre de remplissage
  const width = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  // Composants label, valeur et pourcentage
  const renderLabel = () => {
    if (!label) return null;

    return <Text style={styles.label}>{label}</Text>;
  };

  const renderValue = () => {
    if (!showValue) return null;

    const calculatedValue = Math.round((validProgress / 100) * total);

    return (
      <Text style={styles.value}>{valueFormatter(calculatedValue, total)}</Text>
    );
  };

  const renderPercentage = () => {
    if (!showPercentage) return null;

    return (
      <Text style={styles.percentage}>
        {percentageFormatter(validProgress)}
      </Text>
    );
  };

  // Déterminer le contenu au-dessus/à côté de la barre de progression
  const renderTopContent = () => {
    if (labelPosition !== "top") return null;

    return (
      <View style={styles.topContentContainer}>
        {renderLabel()}
        <View style={styles.valuesContainer}>
          {renderValue()}
          {renderPercentage()}
        </View>
      </View>
    );
  };

  // Déterminer le contenu à gauche/droite de la barre de progression
  const renderSideContent = () => {
    if (labelPosition !== "left" && labelPosition !== "right") {
      return {
        left: null,
        right: null,
      };
    }

    const labelComponent = renderLabel();
    const valueComponent = (
      <View style={styles.inlineValuesContainer}>
        {renderValue()}
        {renderPercentage()}
      </View>
    );

    if (labelPosition === "left") {
      return {
        left: labelComponent,
        right: valueComponent,
      };
    } else {
      return {
        left: valueComponent,
        right: labelComponent,
      };
    }
  };

  const { left, right } = renderSideContent();

  return (
    <View style={[styles.container, style]}>
      {/* Contenu au-dessus (si labelPosition est 'top') */}
      {renderTopContent()}

      <View style={styles.barContainer}>
        {/* Contenu à gauche (si labelPosition est 'left' ou 'right') */}
        {left}

        {/* Barre de progression */}
        <View
          style={[
            styles.progressBarContainer,
            { height, backgroundColor, borderRadius },
            (labelPosition === "left" || labelPosition === "right") &&
              styles.flex1,
          ]}
        >
          <Animated.View
            style={[
              styles.progressFill,
              {
                width,
                backgroundColor: fillColor,
                borderRadius,
              },
            ]}
          />
        </View>

        {/* Contenu à droite (si labelPosition est 'left' ou 'right') */}
        {right}
      </View>
    </View>
  );
};

export default ProgressBar;
