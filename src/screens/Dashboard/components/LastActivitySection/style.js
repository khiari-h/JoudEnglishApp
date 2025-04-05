// src/components/sections/LastActivitySection/style.js
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // Pour l'info de temps
  timeInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  timeIcon: {
    marginRight: 6,
  },

  timeText: {
    fontSize: 12,
    color: "#6B7280",
  },

  // Pour le footer
  footerContainer: {
    flexDirection: "column",
  },

  progressContainer: {
    marginBottom: 10,
  },

  // Bouton Reprendre
  resumeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
    alignSelf: "stretch",
  },

  resumeIcon: {
    marginRight: 6,
  },

  resumeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default styles;
