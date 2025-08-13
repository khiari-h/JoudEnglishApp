// src/components/ui/ProgressBar/ProgressTrack.js
import { View } from "react-native";
import PropTypes from 'prop-types';

export default function ProgressTrack({ style, backgroundColor, borderRadius }) {
  return <View style={[style, { backgroundColor, borderRadius }]} />;
}

ProgressTrack.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
};


