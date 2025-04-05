import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '@/src/contexts/ThemeContext';
import styles from './style';

/**
 * Composant Badge réutilisable pour afficher des étiquettes, états ou niveaux
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.label - Texte à afficher dans le badge
 * @param {string} props.color - Couleur du badge (si non fournie, utilise la couleur primaire du thème)
 * @param {string} props.variant - Variante du badge ('filled', 'outlined', 'subtle', 'dot')
 * @param {string} props.size - Taille du badge ('small', 'medium', 'large')
 * @param {Object} props.style - Styles additionnels pour le conteneur du badge
 * @param {Object} props.textStyle - Styles additionnels pour le texte du badge
 * @param {string} props.testID - ID pour les tests
 */
const Badge = ({
  label,
  color,
  variant = 'filled',
  size = 'medium',
  style,
  textStyle,
  testID,
}) => {
  // Récupération du contexte de thème
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || { primary: '#5E60CE' };
  
  // Utilise la couleur fournie ou la couleur primaire du thème
  const badgeColor = color || colors.primary;
  
  // Styles pour les différentes variantes
  const variantStyles = {
    filled: {
      backgroundColor: badgeColor,
      borderWidth: 0,
    },
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: badgeColor,
    },
    subtle: {
      backgroundColor: `${badgeColor}15`, // 15% d'opacité
      borderWidth: 0,
    },
    dot: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingLeft: 16, // Espace pour le point
    },
  };
  
  // Styles pour les différentes tailles
  const sizeStyles = {
    small: {
      height: 20,
      paddingHorizontal: 6,
      borderRadius: 6,
    },
    medium: {
      height: 24,
      paddingHorizontal: 8,
      borderRadius: 8,
    },
    large: {
      height: 28,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
  };
  
  // Styles pour le texte selon la variante et la taille
  const textVariantStyles = {
    filled: {
      color: 'white',
    },
    outlined: {
      color: badgeColor,
    },
    subtle: {
      color: badgeColor,
    },
    dot: {
      color: badgeColor,
    },
  };
  
  const textSizeStyles = {
    small: {
      fontSize: 10,
    },
    medium: {
      fontSize: 12,
    },
    large: {
      fontSize: 14,
    },
  };

  return (
    <View
      style={[
        styles.container,
        variantStyles[variant] || variantStyles.filled,
        sizeStyles[size] || sizeStyles.medium,
        style,
      ]}
      testID={testID}
    >
      {variant === 'dot' && (
        <View 
          style={[
            styles.dot, 
            { backgroundColor: badgeColor }
          ]} 
        />
      )}
      <Text
        style={[
          styles.label,
          textVariantStyles[variant] || textVariantStyles.filled,
          textSizeStyles[size] || textSizeStyles.medium,
          textStyle,
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
    </View>
  );
};

export default Badge;