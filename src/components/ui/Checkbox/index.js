// src/components/ui/Checkbox/index.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  Easing 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

/**
 * Composant Checkbox pour les cases à cocher
 */
const Checkbox = ({
  // Propriétés de base
  checked = false,
  onChange,
  label,
  
  // Apparence
  size = 'medium', // 'small', 'medium', 'large'
  color = 'primary', // 'primary', 'secondary', 'success', 'warning', 'danger', 'info'
  variant = 'default', // 'default', 'outlined', 'filled'
  shape = 'rounded', // 'rounded', 'square', 'circle'
  
  // Options
  indeterminate = false,
  disabled = false,
  error = false,
  required = false,
  
  // Style
  style,
  labelStyle,
  iconColor,
  
  // Props additionnelles
  testID,
  accessibilityLabel,
  children,
  ...restProps
}) => {
  // État local pour gérer la case cochée
  const [isChecked, setIsChecked] = useState(checked);
  
  // Animation pour le check
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  
  // Mise à jour de l'état lorsque la prop checked change
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);
  
  // Animation lorsque l'état change
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: isChecked || indeterminate ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [isChecked, indeterminate]);
  
  // Définition des couleurs pour chaque type
  const colors = {
    primary: '#5E60CE',
    secondary: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  };
  
  // Couleur de base
  const baseColor = error ? colors.danger : colors[color] || colors.primary;
  
  // Gérer le changement d'état
  const handlePress = () => {
    if (disabled) return;
    
    const newValue = !isChecked;
    setIsChecked(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Déterminer les styles de taille
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          box: styles.smallBox,
          icon: 12,
          label: styles.smallLabel,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          box: styles.largeBox,
          icon: 20,
          label: styles.largeLabel,
        };
      case 'medium':
      default:
        return {
          container: styles.mediumContainer,
          box: styles.mediumBox,
          icon: 16,
          label: styles.mediumLabel,
        };
    }
  };
  
  // Déterminer les styles de variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          container: {},
          box: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: disabled ? '#D1D5DB' : baseColor,
          },
        };
      case 'filled':
        return {
          container: {},
          box: {
            backgroundColor: disabled ? '#E5E7EB' : '#F3F4F6',
            borderWidth: 0,
          },
        };
      case 'default':
      default:
        return {
          container: {},
          box: {
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: disabled ? '#D1D5DB' : baseColor,
          },
        };
    }
  };
  
  // Déterminer les styles de forme
  const getShapeStyles = () => {
    switch (shape) {
      case 'circle':
        return {
          borderRadius: 50,
        };
      case 'square':
        return {
          borderRadius: 0,
        };
      case 'rounded':
      default:
        return {
          borderRadius: 4,
        };
    }
  };
  
  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();
  const shapeStyles = getShapeStyles();
  
  // Icône à afficher en fonction de l'état
  const getIcon = () => {
    if (indeterminate) {
      return 'remove';
    }
    return 'checkmark';
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        sizeStyles.container,
        variantStyles.container,
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      testID={testID}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
      {...restProps}
    >
      <View
        style={[
          styles.box,
          sizeStyles.box,
          variantStyles.box,
          shapeStyles,
          (isChecked || indeterminate) && {
            backgroundColor: disabled ? '#D1D5DB' : baseColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: scaleAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Ionicons
            name={getIcon()}
            size={sizeStyles.icon}
            color={iconColor || 'white'}
          />
        </Animated.View>
      </View>
      
      {(label || children) && (
        <View style={styles.labelContainer}>
          {label && (
            <Text 
              style={[
                styles.label,
                sizeStyles.label,
                disabled && styles.disabledLabel,
                labelStyle,
              ]}
            >
              {label}
              {required && <Text style={styles.requiredMark}>*</Text>}
            </Text>
          )}
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;
