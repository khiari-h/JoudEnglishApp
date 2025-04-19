// src/screens/exercises/levelAssessment/AssessmentActions/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  actionContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    flex: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tryAgainButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    marginRight: 8,
  },
});

export default styles;