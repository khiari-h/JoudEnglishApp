
// src/components/ui/Checkbox/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  labelContainer: {
    flexDirection: 'column',
    marginLeft: 8,
    flex: 1,
  },
  label: {
    color: '#1F2937',
  },
  disabledLabel: {
    color: '#9CA3AF',
  },
  requiredMark: {
    color: '#EF4444',
    marginLeft: 2,
  },
  
  // Styles de taille
  smallContainer: {
    minHeight: 20,
  },
  smallBox: {
    width: 16,
    height: 16,
  },
  smallLabel: {
    fontSize: 12,
  },
  
  mediumContainer: {
    minHeight: 24,
  },
  mediumBox: {
    width: 20,
    height: 20,
  },
  mediumLabel: {
    fontSize: 14,
  },
  
  largeContainer: {
    minHeight: 28,
  },
  largeBox: {
    width: 24,
    height: 24,
  },
  largeLabel: {
    fontSize: 16,
  },
});

export default styles;