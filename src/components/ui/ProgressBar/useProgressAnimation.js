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

  // On stocke les méthodes de mise à jour dans un objet.
  const updateMethods = {
    animated: (value) => {
      Animated.timing(animatedValue, {
        toValue: value,
        duration,
        useNativeDriver: false,
      }).start();
    },
    instant: (value) => {
      animatedValue.setValue(value);
    },
  };

  useEffect(() => {
    // On choisit la méthode à exécuter en dehors du 'if'.
    const updateMethod = animated ? updateMethods.animated : updateMethods.instant;
    
    // On l'exécute, le 'if' a disparu du hook.
    updateMethod(clamped);
  }, [clamped, animated, duration, animatedValue]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return { width };
}