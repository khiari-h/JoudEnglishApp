// src/components/ui/IconButton/index.js
import React from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

/**
 * Composant IconButton pour les boutons circulaires avec une icône
 */
const IconButton = ({
  // Propriétés de base
  icon,
  onPress,
  
  // Apparence
  size = 'medium', // 'small', 'medium', 'large'
  color = 'primary', // 'primary', 'secondary', 'success', 'warning', 'danger', 'info'
  variant = 'filled', // 'filled', 'outlined', 'ghost'
  shape = 'circle', // 'circle', 'square', 'rounded'
  
  // États
  disabled = false,
  loading = false,
  
  // Style
  style,
  containerStyle,
  
  // Props pour TouchableOpacity
  activeOpacity = 0.7,
  hitSlop,
  
  // Autres
  testID,
  accessibilityLabel,
  ...restProps
}) => {
  // Définition des couleurs pour chaque type
  const colors = {
    primary: '#5E60CE',
    secondary: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  };
  
  // Couleur de base pour ce bouton
  const baseColor = colors[color] || colors.primary;
  
  // Tailles pour différentes variantes
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          iconSize: 16,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          iconSize: 24,
        };
      case 'medium':
      default:
        return {
          container: styles.mediumContainer,
          iconSize: 20,
        };
    }
  };
  
  // Styles pour différentes variantes
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: disabled ? '#D1D5DB' : baseColor,
          },
          iconColor: disabled ? '#9CA3AF' : baseColor,
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 0,
          },
          iconColor: disabled ? '#9CA3AF' : baseColor,
        };
      case 'filled':
      default:
        return {
          container: {
            backgroundColor: disabled ? '#E5E7EB' : baseColor,
            borderWidth: 0,
          },
          iconColor: 'white',
        };
    }
  };
  
  // Styles pour différentes formes
  const getShapeStyles = () => {
    switch (shape) {
      case 'square':
        return styles.squareShape;
      case 'rounded':
        return styles.roundedShape;
      case 'circle':
      default:
        return styles.circleShape;
    }
  };
  
  const sizeStyle = getSizeStyles();
  const variantStyle = getVariantStyles();
  const shapeStyle = getShapeStyles();
  
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.container,
          sizeStyle.container,
          variantStyle.container,
          shapeStyle,
          style,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={activeOpacity}
        hitSlop={hitSlop || { top: 10, right: 10, bottom: 10, left: 10 }}
        testID={testID}
        accessibilityLabel={accessibilityLabel || `Bouton ${icon}`}
        {...restProps}
      >
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={variantStyle.iconColor} 
          />
        ) : (
          <Ionicons 
            name={icon} 
            size={sizeStyle.iconSize} 
            color={variantStyle.iconColor} 
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;
