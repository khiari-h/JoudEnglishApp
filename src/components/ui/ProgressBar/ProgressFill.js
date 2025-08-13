// src/components/ui/ProgressBar/ProgressFill.js
import { Animated } from "react-native";
import PropTypes from 'prop-types';

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

ProgressFill.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fillColor: PropTypes.string,
  borderRadius: PropTypes.number,
};


