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

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: clamped,
        duration,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(clamped);
    }
  }, [clamped, animated, duration, animatedValue]);

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return { width };
}


