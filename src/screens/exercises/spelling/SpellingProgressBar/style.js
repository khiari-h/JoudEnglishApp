// src/screens/exercises/spelling/SpellingProgressBar/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#e2e8f0",
    borderRadius: 3,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressTextContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  progressText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  completedText: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 2,
  },
});

export default styles;