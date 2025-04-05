
// src/components/exercise-common/ExerciseFeedback/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  successContainer: {
    backgroundColor: '#ECFDF5',
    borderLeftColor: '#10B981',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderLeftColor: '#EF4444',
  },
  infoContainer: {
    backgroundColor: '#EFF6FF',
    borderLeftColor: '#3B82F6',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  explanation: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  dismissButton: {
    padding: 4,
    marginLeft: 8,
  },
});

export default styles;