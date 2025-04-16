// src/components/screens/exercises/errorCorrection/modes/MultipleChoiceMode/style.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
  },
  originalTextContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  originalTextLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 8,
  },
  originalText: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 24,
  },
  choicesLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 12,
  },
  choicesContainer: {
    marginBottom: 16,
  },
  choiceOption: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedChoiceOption: {
    backgroundColor: "#eff6ff",
    borderWidth: 2,
  },
  correctChoiceOption: {
    backgroundColor: "#f0fdf4",
    borderWidth: 2,
    borderColor: "#10b981",
  },
  incorrectChoiceOption: {
    backgroundColor: "#fef2f2",
    borderWidth: 2,
    borderColor: "#ef4444",
  },
  choiceOptionText: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 24,
  },
  correctChoiceOptionText: {
    color: "#10b981",
    fontWeight: "600",
  },
  incorrectChoiceOptionText: {
    color: "#ef4444",
    fontWeight: "600",
  },
});

export default styles;