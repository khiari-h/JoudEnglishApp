// src/screens/exercises/wordGames/games/AnagramGame/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gameContainer: {
    width: "100%",
  },
  answerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  lettersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  letterTile: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTile: {
    opacity: 0.5,
  },
  letterText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#334155",
  },
  hintContainer: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
  },
});

export default styles;