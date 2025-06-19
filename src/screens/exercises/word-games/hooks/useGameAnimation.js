// src/screens/exercises/wordGames/hooks/useGameAnimation.js
import { useRef } from 'react';
import { Animated } from 'react-native';

/**
 * 🎮 Hook personnalisé pour gérer les animations des Word Games
 * Animations spécialisées pour le gameplay (feedback, rebond, etc.)
 * Hook séparé car logique d'animation spécifique aux jeux
 */
const useGameAnimation = () => {
  // Références pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  // Animation de feedback (fondu)
  const animateFeedback = (success = true) => {
    const toValue = success ? 0.5 : 0.3;
    const duration = success ? 200 : 150;

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animation de rebond
  const animateBounce = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    fadeAnim,
    bounceAnim,
    animateFeedback,
    animateBounce
  };
};

export default useGameAnimation;