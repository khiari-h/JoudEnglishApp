// src/components/ui/Modal/useModalAnimation.js
import React from "react";
import { Animated } from "react-native";

export default function useModalAnimation({ visible, animationType, position, customAnimation }) {
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (animationType === "custom" && customAnimation) {
      Animated.timing(animation, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, animationType, customAnimation]);

  const style = React.useMemo(() => {
    if (animationType !== "custom" || !customAnimation) return {};

    switch (position) {
      case "bottom":
        return {
          transform: [
            {
              translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }),
            },
          ],
        };
      case "top":
        return {
          transform: [
            {
              translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [-300, 0] }),
            },
          ],
        };
      case "center":
      default:
        return {
          opacity: animation,
          transform: [
            {
              scale: animation.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }),
            },
          ],
        };
    }
  }, [animationType, customAnimation, position, animation]);

  return style;
}


