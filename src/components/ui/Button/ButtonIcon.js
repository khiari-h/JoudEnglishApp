// src/components/ui/Button/ButtonIcon.js
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";

export function LeftIcon({ name, size, color }) {
  if (!name) return null;
  return (
    <View style={styles.leftIconContainer}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

export function RightIcon({ name, size, color }) {
  if (!name) return null;
  return (
    <View style={styles.rightIconContainer}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

export function IconOnly({ name, size, color }) {
  if (!name) return null;
  return <Ionicons name={name} size={size} color={color} />;
}


