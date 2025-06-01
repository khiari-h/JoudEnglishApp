// src/components/screens/exercises/errorCorrection/modes/IdentifyErrorsMode/style.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 12,
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
  },
  word: {
    marginHorizontal: 4,
    marginVertical: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedWord: {
    borderWidth: 1,
  },
  highlightedWord: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  wordText: {
    fontSize: 16,
    color: "#334155",
  },
  highlightedWordText: {
    color: "#ef4444",
    fontWeight: "600",
  },
  identifyHelp: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
    marginTop: 12,
    textAlign: "center",
  },
});

export default styles;
