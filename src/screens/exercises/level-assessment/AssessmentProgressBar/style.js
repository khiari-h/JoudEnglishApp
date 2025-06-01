// src/components/screens/exercises/levelAssessment/AssessmentProgressBar/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6", // Sera overridé par levelColor
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 2,
  },
  sectionCounter: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 3,
    alignSelf: "flex-start",
  },
  assessmentLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  questionCounterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  questionCounter: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
  },
  progressInfo: {
    fontSize: 12,
    color: "#64748b",
  },
  progressBar: {
    marginTop: 4,
    marginBottom: 8,
  },
  globalIndicator: {
    alignItems: "center",
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  globalProgress: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "500",
  },
});

export default styles;