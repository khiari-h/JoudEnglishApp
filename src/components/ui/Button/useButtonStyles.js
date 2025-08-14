// src/components/ui/Button/useButtonStyles.js - REFACTORISÉ pour réduire la complexité cognitive
import styles from "./style";

const COLOR_MAP = {
  primary: "#5E60CE",
  secondary: "#6B7280",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
};

// Constantes pour les états communs
const DISABLED_COLORS = {
  text: "#9CA3AF",
  icon: "#9CA3AF",
  background: "#F3F4F6",
  border: "#D1D5DB",
};

const SIZE_CONFIGS = {
  small: {
    button: styles.smallButton,
    text: styles.smallText,
    iconSize: 16,
    loaderSize: "small",
  },
  medium: {
    button: styles.mediumButton,
    text: styles.mediumText,
    iconSize: 20,
    loaderSize: "small",
  },
  large: {
    button: styles.largeButton,
    text: styles.largeText,
    iconSize: 24,
    loaderSize: "large",
  },
};

// Fonctions séparées pour chaque variant
const getOutlinedStyles = (baseColor, disabled) => ({
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: disabled ? DISABLED_COLORS.border : baseColor,
  },
  text: {
    color: disabled ? DISABLED_COLORS.text : baseColor,
  },
  icon: disabled ? DISABLED_COLORS.icon : baseColor,
  pressed: {
    backgroundColor: `${baseColor}10`,
  },
});

const getTextStyles = (baseColor, disabled) => ({
  button: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingHorizontal: 12,
  },
  text: {
    color: disabled ? DISABLED_COLORS.text : baseColor,
  },
  icon: disabled ? DISABLED_COLORS.icon : baseColor,
  pressed: {
    backgroundColor: `${baseColor}10`,
  },
});

const getTonalStyles = (baseColor, disabled) => ({
  button: {
    backgroundColor: disabled ? DISABLED_COLORS.background : `${baseColor}15`,
    borderWidth: 0,
  },
  text: {
    color: disabled ? DISABLED_COLORS.text : baseColor,
  },
  icon: disabled ? DISABLED_COLORS.icon : baseColor,
  pressed: {
    backgroundColor: `${baseColor}25`,
  },
});

const getIconStyles = (iconSize, disabled, colorName) => ({
  button: {
    backgroundColor: disabled ? DISABLED_COLORS.background : "transparent",
    borderWidth: 0,
    padding: 0,
    minWidth: 0,
    minHeight: 0,
  },
  icon: {
    fontSize: iconSize,
    color: disabled ? "#A1A1AA" : colorName,
  },
});

const getFilledStyles = (baseColor, disabled) => ({
  button: {
    backgroundColor: disabled ? "#E5E7EB" : baseColor,
    borderWidth: 0,
  },
  text: {
    color: "white",
  },
  icon: "white",
  pressed: {
    backgroundColor: disabled ? "#E5E7EB" : `${baseColor}DD`,
  },
});

const getSizeStyles = (buttonSize) => {
  return SIZE_CONFIGS[buttonSize] || SIZE_CONFIGS.medium;
};

const getVariantStyles = ({ variant, disabled, baseColor, sizeStyles, colorName }) => {
  const variantMap = {
    outlined: () => getOutlinedStyles(baseColor, disabled),
    text: () => getTextStyles(baseColor, disabled),
    tonal: () => getTonalStyles(baseColor, disabled),
    icon: () => getIconStyles(sizeStyles?.iconSize || 24, disabled, colorName),
    filled: () => getFilledStyles(baseColor, disabled),
  };

  return variantMap[variant]?.() || variantMap.filled();
};

export default function useButtonStyles({
  variant = "filled",
  size = "medium",
  color = "primary",
  disabled = false,
  elevation = true,
  rounded = false,
  fullWidth = false,
}) {
  const baseColor = COLOR_MAP[color] || COLOR_MAP.primary;
  const sizeStyles = getSizeStyles(size);
  const variantStyles = getVariantStyles({ variant, disabled, baseColor, sizeStyles, colorName: color });

  const elevationStyle = elevation && variant === "filled" && !disabled ? styles.withElevation : {};
  const radiusStyle = rounded ? styles.rounded : {};

  return {
    baseColor,
    sizeStyles,
    variantStyles,
    elevationStyle,
    radiusStyle,
    fullWidthStyle: fullWidth ? styles.fullWidth : null,
  };
}


