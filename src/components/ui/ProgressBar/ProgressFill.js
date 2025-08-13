// src/components/ui/ProgressBar/ProgressFill.js
import { Animated } from "react-native";

export default function ProgressFill({ style, width, fillColor, borderRadius }) {
  return (
    <Animated.View
      style={[
        style,
        {
          width,
          backgroundColor: fillColor,
          borderRadius,
        },
      ]}
    />
  );
}


