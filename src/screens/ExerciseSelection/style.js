// src/screens/ExerciseSelection/style.js - VERSION ÉPURÉE
import { StyleSheet, Platform } from 'react-native';

// =================== FONCTION BACKGROUND DYNAMIQUE ===================
export const getBackgroundGradient = (levelColor, backgroundColor) => ({
  colors: [
    levelColor + "06", // 2.5% opacity
    backgroundColor,   // Blanc pur
    levelColor + "08"  // 3% opacity
  ],
  locations: [0, 0.4, 1]
});

const styles = StyleSheet.create({
  // =================== HEADER ÉPURÉ ===================
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
    paddingBottom: 8,
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

  // =================== CONTENU MODERNE ===================
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12, // ✅ Réduit
  },

  // =================== INTRO ÉPURÉE ===================
  introSection: {
    marginBottom: 16, // ✅ Réduit
    alignItems: "center",
  },
  introText: {
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: -0.1,
    // ✅ SUPPRIMÉ : color hardcodée - maintenant injectée via ThemeContext
  },

  // =================== CARDS MODERNES ÉPURÉES ===================
  levelsContainer: {
    gap: 12, // ✅ Espacement moderne
  },
  levelCard: {
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
  cardContentStyle: {
    padding: 16, // ✅ Padding généreux mais pas excessif
  },

  // =================== HEADER CARD MODERNE ===================
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8, // ✅ Réduit
  },
  levelTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  levelMainTitle: {
    fontSize: 17, // ✅ Légèrement plus grand
    fontWeight: "600",
    marginRight: 10,
    letterSpacing: -0.2,
    // ✅ SUPPRIMÉ : color hardcodée - maintenant injectée via ThemeContext
  },
  levelBadge: {
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
  levelBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
  levelIcon: {
    fontSize: 24, // ✅ Plus grand = plus visible
  },

  // =================== DESCRIPTION ÉPURÉE ===================
  levelDescription: {
    fontSize: 14, // ✅ Un peu plus grand pour lisibilité
    lineHeight: 20,
    marginBottom: 12,
    fontWeight: "400",
    // ✅ SUPPRIMÉ : color hardcodée - maintenant injectée via ThemeContext
  },

  // =================== PROGRESSION MODERNE ===================
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8, // ✅ Plus épais = plus visible
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "right",
    // ✅ SUPPRIMÉ : color hardcodée - maintenant injectée via ThemeContext
  },

  // =================== BOUTON MODERNE ===================
  startButton: {
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
  levelCardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },

  // =================== RESPONSIVE ===================
  '@media (max-height: 680)': {
    cardContentStyle: {
      padding: 14,
    },
    scrollContent: {
      paddingTop: 8,
    },
  },
});

export default styles;