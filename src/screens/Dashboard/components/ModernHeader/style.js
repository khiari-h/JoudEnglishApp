// src/screens/Dashboard/components/ModernHeader/style.js
import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },

  // Pattern décoratif subtil
  backgroundPattern: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 40,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: 'relative',
    zIndex: 2,
  },

  // =================== SECTION GAUCHE ===================
  leftSection: {
    flex: 1,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoEmoji: {
    fontSize: 24,
    marginRight: 10,
  },

  logoText: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  // =================== SECTION DROITE ===================
  rightSection: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Badge niveau
  levelBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  levelText: {
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.2,
  },

  // =================== RESPONSIVE ===================
  '@media (max-width: 350)': {
    container: {
      paddingHorizontal: 16,
    },

    logoText: {
      fontSize: 20,
    },

    levelBadge: {
      width: 36,
      height: 36,
      borderRadius: 18,
    },

    levelText: {
      fontSize: 16,
    },
  },

  // =================== ACCESSIBILITY ===================
  focusable: {
    // Outline sera géré par le système natif
  },

  // =================== ANIMATIONS ===================
  fadeIn: {
    opacity: 1,
  },

  scaleNormal: {
    transform: [{ scale: 1 }],
  },
});