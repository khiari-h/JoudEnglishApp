// src/components/ui/RevealButton/index.js - DESIGN BABBEL 2025 🎯

import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../Card";
import createStyles from "./style";

/**
 * 🔘 RevealButton - Version Babbel 2025
 * - Simple et efficace
 * - Cohérent avec NavigationButtons  
 * - Pas de délire shimmer/étoiles
 * - Juste propre et moderne
 * 
 * @param {boolean} isRevealed - État du bouton (révélé ou non)
 * @param {function} onToggle - Callback appelé lors du toggle
 * @param {string} revealText - Texte du bouton avant révélation
 * @param {string} hideText - Texte du bouton après révélation
 * @param {string} revealedContent - Contenu à afficher une fois révélé
 * @param {string} levelColor - Couleur principale du composant
 * @param {object} contentStyle - Style personnalisé pour le contenu révélé
 */
const RevealButton = ({
  isRevealed = false,
  onToggle,
  revealText = "Reveal Translation",
  hideText = "Hide Translation", 
  revealedContent = "",
  levelColor = "#5E60CE",
  contentStyle = {},
}) => {
  const styles = createStyles(levelColor);
  
  // Animations simples - pas de délire
  const [buttonScale] = useState(new Animated.Value(1));
  const [contentOpacity] = useState(new Animated.Value(0));

  // Animation du contenu révélé - simple
  React.useEffect(() => {
    if (isRevealed) {
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      contentOpacity.setValue(0);
    }
  }, [isRevealed, contentOpacity]);

  // Animation press simple pour reveal
  const handleRevealPress = useCallback(() => {
    Animated.sequence([
      Animated.spring(buttonScale, { 
        toValue: 0.96, 
        tension: 400,
        friction: 10,
        useNativeDriver: true 
      }),
      Animated.spring(buttonScale, { 
        toValue: 1, 
        tension: 300,
        friction: 8,
        useNativeDriver: true 
      })
    ]).start();
    setTimeout(() => onToggle(), 60);
  }, [buttonScale, onToggle]);

  // Animation press simple pour hide
  const handleHidePress = useCallback(() => {
    Animated.sequence([
      Animated.spring(buttonScale, { 
        toValue: 0.96, 
        tension: 400,
        friction: 10,
        useNativeDriver: true 
      }),
      Animated.spring(buttonScale, { 
        toValue: 1, 
        tension: 300,
        friction: 8,
        useNativeDriver: true 
      })
    ]).start();
    setTimeout(() => onToggle(), 60);
  }, [buttonScale, onToggle]);

  return (
    <Card
      withShadow
      borderRadius={18}
      style={styles.card}
      contentStyle={styles.cardContent}
    >
      {isRevealed ? (
        // État : Contenu révélé - Simple et propre
        <View style={styles.revealedContainer}>
          {/* Contenu révélé */}
          <Animated.View 
            style={[
              styles.contentWrapper,
              { opacity: contentOpacity }
            ]}
          >
            <Text style={[
              styles.revealedText, 
              { color: levelColor },
              contentStyle
            ]}>
              {revealedContent}
            </Text>
          </Animated.View>
          
          {/* Bouton Hide simple */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.hideButton}
              onPress={handleHidePress}
              activeOpacity={0.8}
              accessibilityRole="button"
            >
              <Text style={[styles.hideButtonText, { color: levelColor }]}>
                {hideText}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      ) : (
        // État : Bouton Reveal - Style cohérent avec NavigationButtons
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.revealButtonContainer}
            onPress={handleRevealPress}
            activeOpacity={0.9}
            accessibilityRole="button"
          >
            <LinearGradient
              colors={[levelColor, `${levelColor}E6`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.revealButton}
            >
              <Text style={styles.revealButtonText}>{revealText}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Card>
  );
};

// PropTypes pour la validation des props
RevealButton.propTypes = {
  isRevealed: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  revealText: PropTypes.string,
  hideText: PropTypes.string,
  revealedContent: PropTypes.string,
  levelColor: PropTypes.string,
  contentStyle: PropTypes.object,
};

// Valeurs par défaut
RevealButton.defaultProps = {
  isRevealed: false,
  revealText: "Reveal Translation",
  hideText: "Hide Translation",
  revealedContent: "",
  levelColor: "#5E60CE",
  contentStyle: {},
};

export default RevealButton;