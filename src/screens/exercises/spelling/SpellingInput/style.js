// src/screens/exercises/spelling/SpellingInput/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#1e293b",
    backgroundColor: "#f8fafc",
  },
  disabledInput: {
    backgroundColor: "#f1f5f9",
    opacity: 0.8,
  },
});

export default styles;