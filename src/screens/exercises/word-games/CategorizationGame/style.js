// src/screens/exercises/wordGames/games/CategorizationGame/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gameContainer: {
    width: "100%",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  categorySubtitle: {
    fontSize: 16,
    color: "#475569",
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  wordTile: {
    margin: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  selectedWordTile: {
    borderWidth: 2,
  },
  wordTileText: {
    fontSize: 16,
    color: "#334155",
  },
});

export default styles;
