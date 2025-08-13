// src/components/ui/Button/ButtonSpinner.js
import { ActivityIndicator } from "react-native";
import PropTypes from 'prop-types';

export default function ButtonSpinner({ size, color }) {
  return (
    <ActivityIndicator testID="button-loader" size={size} color={color} />
  );
}

ButtonSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  color: PropTypes.string,
};


