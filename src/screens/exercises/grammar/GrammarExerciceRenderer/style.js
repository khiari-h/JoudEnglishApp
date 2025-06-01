import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  sentenceContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sentence: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  correctOption: {
    backgroundColor: '#f0fdf4',
    borderColor: '#10b981',
  },
  incorrectOption: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
  },
  optionText: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  correctOptionText: {
    color: '#10b981',
    fontWeight: '500',
  },
  incorrectOptionText: {
    color: '#ef4444',
    fontWeight: '500',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    minWidth: 60,
    textAlign: 'center',
    fontSize: 16,
    padding: 4,
    color: '#334155',
  },
  correctTextInput: {
    borderBottomColor: '#10b981',
    color: '#10b981',
  },
  incorrectTextInput: {
    borderBottomColor: '#ef4444',
    color: '#ef4444',
  },
  transformationContainer: {
    marginTop: 10,
  },
  transformationInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#334155',
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

export default styles;
