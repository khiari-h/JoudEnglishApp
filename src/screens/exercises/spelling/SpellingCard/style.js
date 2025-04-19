// src/screens/exercises/spelling/SpellingCard/style.js
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  completedBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#10b981",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default styles;