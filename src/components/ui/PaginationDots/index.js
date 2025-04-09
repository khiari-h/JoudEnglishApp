// components/ui/PaginationDots/index.js
import React from 'react';
import { View, Pressable } from 'react-native';
import styles from './styles';

/**
 * Composant générique d'indicateurs de pagination sous forme de points
 * Utilisable pour toute séquence d'éléments (carrousel, pages, etc.)
 */
const PaginationDots = ({
  total = 0,
  active = 0,
  markedIndices = [],
  onDotPress,
  containerStyle,
  dotSize = { active: 12, inactive: 8 },
  dotStyle,
  activeColor = '#5E60CE',
  inactiveColor = '#E5E7EB',
  markedColor,
  spacing = 4,
  horizontal = true,
  maxVisible = null,
}) => {
  // Si la couleur des points marqués n'est pas spécifiée, utiliser une version plus claire de la couleur active
  const effectiveMarkedColor = markedColor || `${activeColor}50`;
  
  // Limiter le nombre de points affichés si nécessaire
  const visibleTotal = maxVisible ? Math.min(total, maxVisible) : total;
  
  // Générer les points
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < visibleTotal; i++) {
      // Déterminer si ce point est actif ou marqué
      const isActive = i === active;
      const isMarked = markedIndices?.includes(i);
      
      // Déterminer la couleur du point
      const dotColor = isActive 
        ? activeColor 
        : isMarked 
          ? effectiveMarkedColor 
          : inactiveColor;
          
      // Déterminer la taille du point
      const dotWidth = isActive ? dotSize.active : dotSize.inactive;
      const dotHeight = isActive ? dotSize.active : dotSize.inactive;
      
      dots.push(
        <Pressable
          key={i}
          style={({ pressed }) => [
            styles.dot,
            {
              width: dotWidth,
              height: dotHeight,
              backgroundColor: dotColor,
              margin: spacing,
              opacity: pressed ? 0.8 : 1,
            },
            dotStyle,
          ]}
          onPress={() => onDotPress && onDotPress(i)}
          disabled={!onDotPress}
        />
      );
    }
    return dots;
  };

  return (
    <View 
      style={[
        styles.container, 
        horizontal ? styles.horizontal : styles.vertical,
        containerStyle
      ]}
    >
      {renderDots()}
    </View>
  );
};

export default PaginationDots;