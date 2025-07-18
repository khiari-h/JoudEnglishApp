// src/components/exercise-common/ExerciseFeedback/index.js
import React, { useCallback } from "react";
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
  const handleDismiss = useCallback(() => {
    if (process.env.NODE_ENV === 'test') {
      if (onDismiss) onDismiss();
      return;
    }
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && onDismiss) {
        onDismiss();
      }
    });
  }, [onDismiss, fadeAnim]);

  // Si aucune condition de rendu n'est remplie, retourner null explicitement
  return null;
};

export default ExerciseFeedback;

