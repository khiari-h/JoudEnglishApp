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
    marginBottom: 8,
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

  // Context utilisateur élargi
  userContext: {
    marginLeft: 34, // Aligné avec le texte JOUD
  },

  welcomeText: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.9,
    marginBottom: 2,
  },

  // NOUVEAU : Contexte niveau
  levelContext: {
    fontSize: 12,
    fontWeight: "400",
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // =================== SECTION DROITE SIMPLIFIÉE ===================
  rightSection: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Badge niveau (plus gros car seul élément)
  levelBadge: {
    width: 40, // +4px car plus de streak
    height: 40, // +4px
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
    fontSize: 17, // +1px car plus de place
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

    userContext: {
      marginLeft: 30,
    },

    welcomeText: {
      fontSize: 13,
    },

    levelContext: {
      fontSize: 11,
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