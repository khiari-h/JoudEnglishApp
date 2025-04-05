// src/components/ui/IconButton/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Tailles
  smallContainer: {
    width: 32,
    height: 32,
  },
  mediumContainer: {
    width: 40,
    height: 40,
  },
  largeContainer: {
    width: 48,
    height: 48,
  },
  
  // Formes
  circleShape: {
    borderRadius: 100,
  },
  squareShape: {
    borderRadius: 0,
  },
  roundedShape: {
    borderRadius: 8,
  },
});

export default styles;