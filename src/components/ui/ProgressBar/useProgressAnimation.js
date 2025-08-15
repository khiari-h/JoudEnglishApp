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

  // Méthode pour animer la progression
  const animateProgress = () => {
    Animated.timing(animatedValue, {
      toValue: clamped,
      duration,
      useNativeDriver: false,
    }).start();
  };

  // Méthode pour définir la valeur directement
  const setProgressDirectly = () => {
    animatedValue.setValue(clamped);
  };

  useEffect(() => {
    if (animated) {
      animateProgress();
    } else {
      setProgressDirectly();
    }
  }, [clamped, animated, duration, animatedValue]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return { width };
}


