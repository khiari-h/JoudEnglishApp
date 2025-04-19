// src/components/screens/exercises/reading/ReadingText/style.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  wordContainer: {
    flexDirection: "row",
  },
  word: {
    fontSize: 16,
    lineHeight: 24,
    color: "#334155",
  },
  highlightedWord: {
    color: "#3b82f6",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
  collapsedText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#334155",
    marginBottom: 16,
  },
  expandButton: {
    alignSelf: "center",
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
  },
  expandButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default styles;