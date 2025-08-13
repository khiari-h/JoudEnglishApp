// src/components/ui/Button/ButtonLabel.js
import { Text } from "react-native";
import styles from "./style";

export default function ButtonLabel({
  title,
  sizeStyles,
  variantStyles,
  uppercase,
  textStyle,
}) {
  if (!title) return null;
  return (
    <Text
      style={[
        styles.text,
        sizeStyles.text,
        variantStyles.text,
        uppercase && styles.uppercase,
        textStyle,
      ]}
      numberOfLines={1}
    >
      {title}
    </Text>
  );
}


