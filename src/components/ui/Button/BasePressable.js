// src/components/ui/Button/BasePressable.js
import { Pressable } from "react-native";

export default function BasePressable({
  style,
  onPress,
  onLongPress,
  disabled,
  androidRipple,
  children,
  ...props
}) {
  return (
    <Pressable
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      android_ripple={androidRipple}
      accessibilityRole="button"
      accessible
      {...props}
    >
      {children}
    </Pressable>
  );
}


