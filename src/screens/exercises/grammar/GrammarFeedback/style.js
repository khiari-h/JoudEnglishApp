import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  feedbackContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  correctFeedback: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  incorrectFeedback: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
});

export default styles;