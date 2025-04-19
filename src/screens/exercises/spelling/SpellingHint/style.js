// src/screens/exercises/spelling/SpellingHint/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  toggleButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 2,
    marginBottom: 8,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  hintContainer: {
    padding: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    borderLeftWidth: 3,
  },
  hintText: {
    fontSize: 14,
    color: "#64748b",
    fontStyle: "italic",
    lineHeight: 20,
  },
});

export default styles;