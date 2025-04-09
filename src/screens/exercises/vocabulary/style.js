// VocabularyExercise/styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
    width: 40,
    textAlign: "right",
  },
  cardContainer: {
    marginBottom: 25,
  }
});