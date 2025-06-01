import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Logo section avec emoji
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoEmoji: {
    fontSize: 22,
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  // Section droite : niveau + streak
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // Espace entre niveau et streak
  },

  // Badge niveau
  levelBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  levelText: {
    fontSize: 15,
    fontWeight: "bold",
    // Couleur dynamique basée sur levelColor
  },

  // Streak container
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  streakEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  streakText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default styles;

