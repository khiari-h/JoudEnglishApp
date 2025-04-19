// src/screens/exercises/spelling/SpellingActions/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  button: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  disabledButton: {
    backgroundColor: "#e2e8f0",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondaryButton: {
    backgroundColor: "white",
    borderWidth: 1,
    marginRight: 10,
    flex: 1,
  },
});

export default styles;