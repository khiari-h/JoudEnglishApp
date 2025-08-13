// src/components/ui/Button/BasePressable.js
import { Pressable } from "react-native";
import PropTypes from 'prop-types';

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

BasePressable.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  disabled: PropTypes.bool,
  androidRipple: PropTypes.object,
  children: PropTypes.node,
};


