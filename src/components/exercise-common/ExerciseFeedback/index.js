// src/components/exercise-common/ExerciseFeedback/index.js
import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant pour afficher un feedback après une réponse
 * (correct, incorrect ou information supplémentaire)
 */
const ExerciseFeedback = ({
  type = "success", // 'success', 'error', 'info'
  message,
  explanation,
  onDismiss,
  autoHide = false,
  autoHideDuration = 3000,
  showDismissButton = true,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Animation d'entrée
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto-masquage si activé
    if (autoHide) {
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished && onDismiss) {
            onDismiss();
          }
        });
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, []);

  // Définir les couleurs et icônes en fonction du type
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          containerStyle: styles.successContainer,
          icon: "checkmark-circle",
          iconColor: "#10B981",
        };
      case "error":
        return {
          containerStyle: styles.errorContainer,
          icon: "close-circle",
          iconColor: "#EF4444",
        };
      case "info":
      default:
        return {
          containerStyle: styles.infoContainer,
          icon: "information-circle",
          iconColor: "#3B82F6",
        };
    }
  };

  const { containerStyle, icon, iconColor } = getTypeStyles();

  // Handler pour fermer le feedback
  const handleDismiss = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && onDismiss) {
        onDismiss();
      }
    });
  };

  return (
    <Animated.View
      style={[styles.container, containerStyle, { opacity: fadeAnim }]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.message}>{message}</Text>
          {explanation ? (
            <Text style={styles.explanation}>{explanation}</Text>
          ) : null}
        </View>

        {showDismissButton && (
          <TouchableOpacity
            style={styles.dismissButton}
            onPress={handleDismiss}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

export default ExerciseFeedback;

