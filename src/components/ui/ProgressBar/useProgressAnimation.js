// src/components/ui/ProgressBar/useProgressAnimation.js
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function useProgressAnimation({
  progress = 0,
  animated = true,
  duration = 600,
}) {
  const clamped = Math.min(Math.max(progress, 0), 100);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Sépare la logique d'animation dans une fonction dédiée
  const handleAnimatedUpdate = (value) => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: false,
    }).start();
  };

  // Sépare la logique de mise à jour instantanée dans une autre fonction
  const handleInstantUpdate = (value) => {
    animatedValue.setValue(value);
  };

  // Le hook gère les deux cas en appelant la fonction appropriée
  useEffect(() => {
    if (animated) {
      handleAnimatedUpdate(clamped);
    } else {
      handleInstantUpdate(clamped);
    }
  }, [clamped, animated, duration, animatedValue]);

  // Interpolation de la valeur animée en pourcentage de largeur
  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return { width };
}