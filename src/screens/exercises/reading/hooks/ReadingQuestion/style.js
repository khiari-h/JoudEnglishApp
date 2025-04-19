// src/components/screens/exercises/reading/ReadingQuestion/style.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#eff6ff",
    borderWidth: 2,
  },
  correctOption: {
    backgroundColor: "#f0fdf4",
    borderWidth: 2,
    borderColor: "#10b981",
  },
  incorrectOption: {
    backgroundColor: "#fef2f2",
    borderWidth: 2,
    borderColor: "#ef4444",
  },
  optionText: {
    fontSize: 16,
    color: "#334155",
  },
  correctOptionText: {
    color: "#10b981",
    fontWeight: "500",
  },
  incorrectOptionText: {
    color: "#ef4444",
    fontWeight: "500",
  },
});

export default styles;