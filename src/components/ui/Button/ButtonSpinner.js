// src/components/ui/Button/ButtonSpinner.js
import { ActivityIndicator } from "react-native";

export default function ButtonSpinner({ size, color }) {
  return (
    <ActivityIndicator testID="button-loader" size={size} color={color} />
  );
}


