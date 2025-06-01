// src/screens/exercises/wordGames/WordGamesCard/style.js
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  gameCardContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
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
  gameTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
    textAlign: "center",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "600",
    textAlign: "center",
  },
  errorSubText: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
    textAlign: "center",
  },
});

export default styles;
