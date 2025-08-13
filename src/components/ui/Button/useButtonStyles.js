// src/components/ui/Button/useButtonStyles.js
import styles from "./style";

const COLOR_MAP = {
  primary: "#5E60CE",
  secondary: "#6B7280",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
};

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

const getVariantStyles = ({ variant, disabled, baseColor, sizeStyles, colorName }) => {
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
          backgroundColor: `${baseColor}10`,
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
    case "tonal":
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
          // Conserver le comportement existant: pour variant icon, la couleur utilisait le nom brut
          color: disabled ? "#A1A1AA" : colorName,
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
          backgroundColor: disabled ? "#E5E7EB" : `${baseColor}DD`,
        },
      };
  }
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


