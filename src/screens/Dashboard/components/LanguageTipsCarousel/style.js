// style.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tipCard: {
    width: 300,
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default styles;