// src/components/ui/Button/index.js
import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

/**
 * Composant Button modernisé utilisant Pressable avec feedback visuel amélioré
 */
const Button = ({
  title,
  onPress,
  variant = "filled", // 'filled', 'outlined', 'text', 'icon', 'tonal'
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
  onLongPress,
  elevation = true, // Ajoute un effet d'élévation sur les boutons filled
  uppercase = false, // Option pour mettre le texte en majuscules
  rounded = false, // Option pour des coins plus arrondis
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

  // Déterminer les styles en fonction de la taille
  const getSizeStyles = (buttonSize) => {
    switch (buttonSize) {
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

  const sizeStyles = getSizeStyles(size);

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
          pressed: {
            backgroundColor: `${baseColor}10`, // 10% d'opacité lors de la pression
          },
        };
      case "text":
        return {
          button: {
            backgroundColor: "transparent",
            borderWidth: 0,
            paddingHorizontal: 12,
          },
          text: {
            color: disabled ? "#9CA3AF" : baseColor,
          },
          icon: disabled ? "#9CA3AF" : baseColor,
          pressed: {
            backgroundColor: `${baseColor}10`,
          },
        };
      case "tonal": // Nouvelle variante tonale
        return {
          button: {
            backgroundColor: disabled ? "#F3F4F6" : `${baseColor}15`,
            borderWidth: 0,
          },
          text: {
            color: disabled ? "#9CA3AF" : baseColor,
          },
          icon: disabled ? "#9CA3AF" : baseColor,
          pressed: {
            backgroundColor: `${baseColor}25`,
          },
        };
      case "icon": {
        const iconSizeValue = sizeStyles?.iconSize || 24;
        return {
          button: {
            backgroundColor: disabled ? "#F3F4F6" : "transparent",
            borderWidth: 0,
            padding: 0,
            minWidth: 0,
            minHeight: 0,
          },
          icon: {
            fontSize: iconSizeValue,
            color: disabled ? "#A1A1AA" : color,
          },
        };
      }
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
          pressed: {
            backgroundColor: disabled ? "#E5E7EB" : `${baseColor}DD`, // Légèrement plus foncé quand pressé
          },
        };
    }
  };

  const variantStyles = getVariantStyles();
  const iconSize = sizeStyles.iconSize;

  // Styles d'élévation
  const elevationStyle = 
    elevation && variant === "filled" && !disabled 
      ? styles.withElevation 
      : {};

  // Styles de coins arrondis
  const radiusStyle = rounded ? styles.rounded : {};

  // Rendu du bouton
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        sizeStyles.button,
        variantStyles.button,
        fullWidth && styles.fullWidth,
        pressed && variantStyles.pressed,
        elevationStyle,
        radiusStyle,
        style,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled || loading}
      android_ripple={
        variant !== "text" && variant !== "outlined"
          ? { color: `${baseColor}30`, borderless: false }
          : null
      }
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
                uppercase && styles.uppercase,
                textStyle,
              ]}
              numberOfLines={1}
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
    </Pressable>
  );
};

export default Button;
