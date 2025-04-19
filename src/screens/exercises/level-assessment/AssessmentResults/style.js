// src/screens/exercises/levelAssessment/AssessmentResults/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
  },
  resultsFeedback: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 24,
  },
  continueButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;