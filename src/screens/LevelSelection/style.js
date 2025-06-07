// src/screens/LevelSelection/style.js - VERSION MODERNE ÉPURÉE
import { StyleSheet, Platform } from 'react-native';

// =================== FONCTION BACKGROUND DYNAMIQUE ===================
export const getBackgroundGradient = (levelColor, backgroundColor) => ({
  colors: [
    levelColor + "03", // 1% - très subtil
    backgroundColor,
    levelColor + "05"  // 2% - très subtil
  ],
  locations: [0, 0.7, 1]
});

const styles = StyleSheet.create({
  // =================== HEADER MODERNE ÉPURÉ ===================
  headerContainer: {
    overflow: "hidden",
    // Ombre très subtile
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerGradient: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 12, // ✅ Réduit
    paddingHorizontal: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: -0.3,
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // =================== PROGRESSION SIMPLE ET ÉPURÉE ===================
  progressIndicator: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  levelDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8, // ✅ Espacement moderne
    marginBottom: 8, // ✅ AJOUTÉ : Espace avant les infos
  },
  progressDot: {
    width: 28, // ✅ Un peu plus grand pour mieux voir
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    // Ombre très subtile
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  progressDotText: {
    color: "white",
    fontSize: 11,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  // ✅ AJOUTÉ : Style pour les infos de progression
  progressInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  // =================== CONTENU MODERNE ===================
  modernScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12, // ✅ Réduit
  },

  // =================== INTRO ÉPURÉE ===================
  modernIntro: {
    marginBottom: 16, // ✅ Réduit
    alignItems: "center",
  },
  modernIntroText: {
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: -0.1,
  },

  // =================== CARDS MODERNES ÉPURÉES ===================
  modernLevelsContainer: {
    gap: 12, // ✅ Espacement moderne
  },
  modernCard: {
    borderRadius: 16, // ✅ Plus arrondi = plus moderne
    backgroundColor: "#FFFFFF",
    // Ombre moderne subtile
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  modernCardContent: {
    padding: 16, // ✅ Padding généreux mais pas excessif
  },

  // =================== HEADER CARD MODERNE ===================
  modernCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8, // ✅ Réduit
  },
  modernTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modernTitle: {
    fontSize: 17, // ✅ Légèrement plus grand
    fontWeight: "600",
    marginRight: 10,
    letterSpacing: -0.2,
  },
  modernBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10, // ✅ Plus arrondi
    minWidth: 32,
    alignItems: "center",
    // Ombre badge subtile
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  modernBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
  modernIcon: {
    fontSize: 24, // ✅ Plus grand = plus visible
  },

  // =================== DESCRIPTION ÉPURÉE ===================
  modernDescription: {
    fontSize: 14, // ✅ Un peu plus grand pour lisibilité
    lineHeight: 20,
    marginBottom: 12,
    fontWeight: "400",
  },

  // =================== PROGRESSION MODERNE ===================
  modernProgressContainer: {
    marginBottom: 12,
  },
  modernProgressBar: {
    height: 8, // ✅ Plus épais = plus visible
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
  modernProgressFill: {
    height: 8,
    borderRadius: 4,
  },
  modernProgressText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "right",
  },

  // =================== BOUTON MODERNE ===================
  modernButton: {
    paddingVertical: 12, // ✅ Un peu plus de padding
    borderRadius: 12, // ✅ Plus arrondi
    // Ombre bouton moderne
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

  // =================== ÉTATS INTERACTIFS ===================
  modernCardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },

  // =================== RESPONSIVE ===================
  '@media (max-height: 680)': {
    modernCardContent: {
      padding: 14,
    },
    modernScrollContent: {
      paddingTop: 8,
    },
  },
});

export default styles;