// src/screens/exercises/wordGames/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#64748b",
  },
  emptyGamesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  emptyGamesText: {
    fontSize: 18,
    color: "#475569",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyGamesButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  emptyGamesButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;