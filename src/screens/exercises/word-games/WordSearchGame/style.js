// src/screens/exercises/wordGames/games/WordSearchGame/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gameContainer: {
    width: "100%",
  },
  wordSearchGrid: {
    marginBottom: 20,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  gridCell: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCell: {
    borderWidth: 2,
  },
  gridCellText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
  },
  wordsToFindContainer: {
    marginBottom: 16,
  },
  wordsToFindTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  wordsToFindList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wordToFind: {
    fontSize: 14,
    color: "#64748b",
    marginRight: 10,
    marginBottom: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
  },
  foundWord: {
    textDecorationLine: "line-through",
  },
});

export default styles;