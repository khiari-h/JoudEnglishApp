// src/screens/exercises/levelAssessment/AssessmentQuestion/style.js
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  questionCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 12,
    textAlign: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
    lineHeight: 26,
    textAlign: "center",
  },
  answerOptions: {
    marginBottom: 10,
  },
  answerOption: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedAnswerOption: {
    backgroundColor: "#eff6ff",
    borderWidth: 2,
  },
  correctAnswerOption: {
    backgroundColor: "#f0fdf4",
    borderWidth: 2,
    borderColor: "#10b981",
  },
  answerOptionText: {
    fontSize: 16,
    color: "#334155",
    textAlign: "center",
  },
  correctAnswerText: {
    color: "#10b981",
    fontWeight: "500",
  },
});

export default styles;
