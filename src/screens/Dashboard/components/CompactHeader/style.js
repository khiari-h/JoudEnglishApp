// src/screens/Dashboard/components/CompactHeader/style.js
import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
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

  // =================== LOGO SECTION ===================
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
  },

  // =================== SECTION DROITE ===================
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  // =================== BADGE NIVEAU ===================
  levelBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  levelText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  // =================== STREAK CONTAINER ===================
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
    fontSize: 14,
    fontWeight: "600",
  },
});