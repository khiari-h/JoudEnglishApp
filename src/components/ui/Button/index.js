// src/components/ui/Button/index.js
import { View } from "react-native";
import PropTypes from 'prop-types';
import styles from "./style";
import BasePressable from "./BasePressable";
import ButtonSpinner from "./ButtonSpinner";
import ButtonLabel from "./ButtonLabel";
import { LeftIcon, RightIcon, IconOnly } from "./ButtonIcon";
import useButtonStyles from "./useButtonStyles";

/**
 * 🎨 Fonction pour mapper les couleurs hexadécimales vers les couleurs prédéfinies du Button
 * @param {string} color - Couleur (hexadécimale ou prédéfinie)
 * @returns {string} Couleur prédéfinie valide
 */
const mapHexToButtonColor = (color) => {
  // Si c'est déjà une couleur prédéfinie, la retourner
  if (['primary', 'secondary', 'success', 'warning', 'danger', 'info'].includes(color)) {
    return color;
  }
  
  // Mapping des couleurs hexadécimales vers les couleurs prédéfinies
  const colorMap = {
    '#3b82f6': 'primary',    // Bleu
    '#8b5cf6': 'secondary',  // Violet
    '#10b981': 'success',    // Vert
    '#f59e0b': 'warning',    // Orange
    '#ef4444': 'danger',     // Rouge
    '#6366f1': 'info',       // Indigo
    '#9333EA': 'secondary',  // Violet premium (bonus)
  };
  
  return colorMap[color] || 'primary'; // Fallback vers primary
};

/**
 * Composant Button modernisé utilisant Pressable avec feedback visuel amélioré
 * ✅ ACCEPTE MAINTENANT LES COULEURS HEXADÉCIMALES AUTOMATIQUEMENT
 */
const Button = ({
  title,
  onPress,
  variant = "filled", // 'filled', 'outlined', 'text', 'icon', 'tonal'
  size = "medium", // 'small', 'medium', 'large'
  color = "primary", // 'primary', 'secondary', 'success', 'warning', 'danger', 'info' OU couleur hexadécimale
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
  // ✅ MAPPING AUTOMATIQUE : Convertir la couleur hexadécimale en couleur prédéfinie
  const mappedColor = mapHexToButtonColor(color);
  
  const { baseColor, sizeStyles, variantStyles, elevationStyle, radiusStyle, fullWidthStyle } =
    useButtonStyles({ variant, size, color: mappedColor, disabled, elevation, rounded, fullWidth });
  const iconSize = sizeStyles.iconSize;

  // Rendu du bouton
  return (
    <BasePressable
      style={({ pressed }) => [
        styles.button,
        sizeStyles.button,
        variantStyles.button,
        fullWidthStyle,
        pressed && variantStyles.pressed,
        elevationStyle,
        radiusStyle,
        style,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled || loading}
      androidRipple={
        variant !== "text" && variant !== "outlined"
          ? { color: `${baseColor}30`, borderless: false }
          : null
      }
      {...props}
    >
      {loading ? (
        <ButtonSpinner size={sizeStyles.loaderSize} color={variantStyles.text.color} />
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon && !iconOnly && (
            <LeftIcon name={leftIcon} size={iconSize} color={variantStyles.icon} />
          )}
          {iconOnly && (
            <IconOnly name={iconOnly} size={iconSize} color={variantStyles.icon} />
          )}
          {!iconOnly && (
            <ButtonLabel
              title={title}
              sizeStyles={sizeStyles}
              variantStyles={variantStyles}
              uppercase={uppercase}
              textStyle={textStyle}
            />
          )}
          {rightIcon && !iconOnly && (
            <RightIcon name={rightIcon} size={iconSize} color={variantStyles.icon} />
          )}
        </View>
      )}
    </BasePressable>
  );
};

// PropTypes pour le composant Button
Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['filled', 'outlined', 'text', 'icon', 'tonal']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info']),
    PropTypes.string // ✅ AJOUTÉ : Accepte maintenant les couleurs hexadécimales
  ]),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  iconOnly: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onLongPress: PropTypes.func,
  elevation: PropTypes.bool,
  uppercase: PropTypes.bool,
  rounded: PropTypes.bool,
};

export default Button;
