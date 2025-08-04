// __mocks__/expo-linear-gradient.js
import React from 'react';
import { View } from 'react-native';

export const LinearGradient = ({ children, colors, start, end, style, ...props }) => {
  return (
    <View 
      style={[
        style,
        { backgroundColor: colors ? colors[0] : 'transparent' }
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

// Export par défaut aussi pour plus de compatibilité
const LinearGradientComponent = LinearGradient;
export default LinearGradientComponent;