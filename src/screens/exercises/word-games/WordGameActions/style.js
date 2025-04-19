// src/screens/exercises/wordGames/WordGamesActions/style.js
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
  },
  disabledButton: {
    backgroundColor: "#e2e8f0",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;