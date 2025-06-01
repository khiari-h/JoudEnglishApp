// src/components/screens/exercises/reading/ReadingProgressBar/style.js
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
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    flex: 1,
    marginRight: 8,
  },
  exerciseCounter: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
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
  completionInfo: {
    fontSize: 12,
    color: "#64748b",
  },
  progressBar: {
    marginTop: 4,
  },
});

export default styles;