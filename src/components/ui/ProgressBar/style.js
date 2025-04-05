// src/components/ui/ProgressBar/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  topContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  progressBarContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  valuesContainer: {
    flexDirection: 'row',
  },
  inlineValuesContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  value: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  percentage: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default styles;