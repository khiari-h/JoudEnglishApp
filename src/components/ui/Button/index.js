// src/components/ui/Button/index.js
import { View } from "react-native";
import styles from "./style";
import BasePressable from "./BasePressable";
import ButtonSpinner from "./ButtonSpinner";
import ButtonLabel from "./ButtonLabel";
import { LeftIcon, RightIcon, IconOnly } from "./ButtonIcon";
import useButtonStyles from "./useButtonStyles";

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
  const { baseColor, sizeStyles, variantStyles, elevationStyle, radiusStyle, fullWidthStyle } =
    useButtonStyles({ variant, size, color, disabled, elevation, rounded, fullWidth });
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

export default Button;
