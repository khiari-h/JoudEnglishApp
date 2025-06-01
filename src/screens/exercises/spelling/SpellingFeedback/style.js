// src/screens/exercises/spelling/SpellingFeedback/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderRadius: 8,
  },
  correctContainer: {
    backgroundColor: "#f0fdf4",
  },
  incorrectContainer: {
    backgroundColor: "#fef2f2",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1e293b",
  },
  correctAnswerText: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 8,
  },
  answerHighlight: {
    fontWeight: "600",
    color: "#334155",
  },
  explanationText: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
    lineHeight: 20,
  },
});

export default styles;
