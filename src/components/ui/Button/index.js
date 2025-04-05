// src/components/ui/Button/index.js
import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant Button réutilisable avec différentes variantes et états
 */
const Button = ({
  title,
  onPress,
  variant = "filled", // 'filled', 'outlined', 'text', 'icon'
  size = "medium", // 'small', 'medium', 'large'
  color = "primary", // 'primary', 'secondary', 'success', 'warning', 'danger', 'info'
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  iconOnly,
  style,
  textStyle,
  activeOpacity = 0.7,
  onLongPress,
  ...props
}) => {
  // Définition des couleurs pour chaque type
  const colors = {
    primary: "#5E60CE",
    secondary: "#6B7280",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#3B82F6",
  };

  // Couleur de base pour ce bouton
  const baseColor = colors[color] || colors.primary;

  // Déterminer les styles en fonction de la variante
  const getVariantStyles = () => {
    switch (variant) {
      case "outlined":
        return {
          button: {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: disabled ? "#D1D5DB" : baseColor,
          },
          text: {
            color: disabled ? "#9CA3AF" : baseColor,
          },
          icon: disabled ? "#9CA3AF" : baseColor,
        };
      case "text":
        return {
          button: {
            backgroundColor: "transparent",
            borderWidth: 0,
            paddingHorizontal: 8,
          },
          text: {
            color: disabled ? "#9CA3AF" : baseColor,
          },
          icon: disabled ? "#9CA3AF" : baseColor,
        };
      case "icon":
        return {
          button: {
            backgroundColor: disabled ? "#F3F4F6" : `${baseColor}10`,
            borderWidth: 0,
            borderRadius: 24,
            paddingVertical: 0,
            paddingHorizontal: 0,
            width: iconSize,
            height: iconSize,
            justifyContent: "center",
            alignItems: "center",
          },
          text: {
            color: disabled ? "#9CA3AF" : baseColor,
          },
          icon: disabled ? "#9CA3AF" : baseColor,
        };
      case "filled":
      default:
        return {
          button: {
            backgroundColor: disabled ? "#E5E7EB" : baseColor,
            borderWidth: 0,
          },
          text: {
            color: "white",
          },
          icon: "white",
        };
    }
  };

  // Déterminer les styles en fonction de la taille
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          button: styles.smallButton,
          text: styles.smallText,
          iconSize: 16,
          loaderSize: "small",
        };
      case "large":
        return {
          button: styles.largeButton,
          text: styles.largeText,
          iconSize: 24,
          loaderSize: "large",
        };
      case "medium":
      default:
        return {
          button: styles.mediumButton,
          text: styles.mediumText,
          iconSize: 20,
          loaderSize: "small",
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const iconSize = sizeStyles.iconSize;

  // Rendu du bouton
  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyles.button,
        variantStyles.button,
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        // Affichage du loader
        <ActivityIndicator
          size={sizeStyles.loaderSize}
          color={variantStyles.text.color}
        />
      ) : (
        <View style={styles.contentContainer}>
          {/* Icône gauche (si présente) */}
          {leftIcon && !iconOnly && (
            <View style={styles.leftIconContainer}>
              <Ionicons
                name={leftIcon}
                size={iconSize}
                color={variantStyles.icon}
              />
            </View>
          )}

          {/* Icône pour le bouton icône */}
          {iconOnly && (
            <Ionicons
              name={iconOnly}
              size={iconSize}
              color={variantStyles.icon}
            />
          )}

          {/* Texte du bouton (sauf si bouton icône uniquement) */}
          {!iconOnly && title && (
            <Text
              style={[
                styles.text,
                sizeStyles.text,
                variantStyles.text,
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}

          {/* Icône droite (si présente) */}
          {rightIcon && !iconOnly && (
            <View style={styles.rightIconContainer}>
              <Ionicons
                name={rightIcon}
                size={iconSize}
                color={variantStyles.icon}
              />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
