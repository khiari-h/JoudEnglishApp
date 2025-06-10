// src/screens/Dashboard/components/ModernHeader/style.js
import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 20, // +4px pour plus de respiration
    paddingHorizontal: 20, // +4px pour plus d'espace
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

  // =================== SECTION GAUCHE AMÉLIORÉE ===================
  leftSection: {
    flex: 1,
  },
  
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4, // Réduit car plus de levelContext (était 8)
  },
  
  logoEmoji: {
    fontSize: 24, // +2px pour plus d'impact
    marginRight: 10, // +2px
  },
  
  logoText: {
    fontSize: 22, // +2px pour plus d'impact (était 20px)
    fontWeight: "800", // Plus bold
    letterSpacing: -0.5, // Meilleure lisibilité
  },
  
  // Context utilisateur
  userContext: {
    marginLeft: 34, // Aligné avec le texte JOUD
  },
  
  welcomeText: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.9,
    // Supprimé marginBottom car plus de levelContext
  },

  // =================== SECTION DROITE AMÉLIORÉE ===================
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16, // +4px pour plus de respiration
  },

  // Badge niveau amélioré
  levelBadge: {
    width: 36, // +4px pour plus de présence
    height: 36, // +4px
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 }, // +1px shadow
        shadowOpacity: 0.15, // +0.05 pour plus de depth
        shadowRadius: 3, // +1px
      },
      android: {
        elevation: 3, // +1 pour plus de depth
      },
    }),
  },
  
  levelText: {
    fontSize: 16, // +1px pour meilleure lisibilité (était 15px)
    fontWeight: "800", // Plus bold
    letterSpacing: -0.2,
  },

  // Streak container amélioré
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)", // +0.05 opacity
    borderRadius: 18, // +2px pour plus moderne
    paddingHorizontal: 12, // +2px
    paddingVertical: 8, // +2px
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  
  streakEmoji: {
    fontSize: 16,
    marginRight: 6, // +2px
  },
  
  streakText: {
    fontSize: 15, // +1px pour meilleure lisibilité (était 14px)
    fontWeight: "700", // Plus bold
    letterSpacing: -0.2,
  },
  
  // =================== RESPONSIVE AMÉLIORATIONS ===================
  '@media (max-width: 350)': {
    container: {
      paddingHorizontal: 16,
    },
    
    logoText: {
      fontSize: 20,
    },
    
    levelBadge: {
      width: 32,
      height: 32,
    },
    
    userContext: {
      marginLeft: 30,
    },
  },
});