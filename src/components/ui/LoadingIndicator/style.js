// src/components/ui/LoadingIndicator/styles.js
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultContainer: {
    padding: 12,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
  },
  text: {
    marginTop: 8,
    textAlign: 'center',
  },
  
  // Styles de taille
  smallContainer: {
    minHeight: 40,
    minWidth: 40,
  },
  smallIndicator: {
    minHeight: 16,
    minWidth: 16,
  },
  smallText: {
    fontSize: 12,
  },
  
  mediumContainer: {
    minHeight: 60,
    minWidth: 60,
  },
  mediumIndicator: {
    minHeight: 24,
    minWidth: 24,
  },
  mediumText: {
    fontSize: 14,
  },
  
  largeContainer: {
    minHeight: 80,
    minWidth: 80,
  },
  largeIndicator: {
    minHeight: 32,
    minWidth: 32,
  },
  largeText: {
    fontSize: 16,
  },
  
  // Styles d'indicateurs personnalisés
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  dot1: {
    opacity: 0.3,
    animationName: 'dotAnimation',
    animationDuration: '1.4s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  dot2: {
    opacity: 0.5,
    animationName: 'dotAnimation',
    animationDuration: '1.4s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDelay: '0.2s',
  },
  dot3: {
    opacity: 0.7,
    animationName: 'dotAnimation',
    animationDuration: '1.4s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDelay: '0.4s',
  },
  pulseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  customContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;