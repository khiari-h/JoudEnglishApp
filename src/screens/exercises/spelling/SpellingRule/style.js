// src/screens/exercises/spelling/exercises/SpellingRule/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  ruleContainer: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  ruleText: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 22,
  },
  instruction: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 8,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default styles;
