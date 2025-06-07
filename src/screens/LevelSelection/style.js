// src/screens/LevelSelection/style.js
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // =================== HEADER APP NATIVE (FULLWIDTH) ===================
  headerContainer: {
    overflow: "hidden",
    // Pas d'ombre excessive = plus app native
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerGradient: {
    // Pas de borderRadius = fullwidth app native
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 8, // Très réduit
    paddingHorizontal: 0, // Supprimé pour fullwidth
  },
  headerTitle: {
    fontSize: 20, // Plus adapté mobile
    fontWeight: "600",
    letterSpacing: -0.3,
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // =================== CHEMIN NIVEAUX APP NATIVE ===================
  compactPathContainer: {
    paddingVertical: 8, // Très compact
    paddingHorizontal: 16, // Réduit
    alignItems: "center",
  },
  levelPath: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Plus visible
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  smallLevelDot: {
    width: 24, // Plus petit = plus app native
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    // Ombre réduite
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  smallLevelDotText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  smallLevelLine: {
    height: 1.5,
    width: 12,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 1,
  },

  // =================== CONTENU APP NATIVE ===================
  scrollView: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Légèrement différent pour app native
  },
  scrollContent: {
    paddingHorizontal: 16, // Standard mobile
    paddingBottom: 20,
    paddingTop: 8, // Très réduit
  },

  // =================== INTRO ULTRA-COMPACTE ===================
  introSection: {
    marginBottom: 12, // Très réduit
    paddingHorizontal: 4,
  },
  introText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "400",
  },

  // =================== CARDS APP NATIVE ===================
  levelsContainer: {
    gap: 10, // Espacement app native
  },
  levelCard: {
    marginBottom: 2,
    borderRadius: 12, // App native standard
    backgroundColor: "#FFFFFF",
    // Ombre app native (plus subtile)
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.06)",
  },
  cardContentStyle: {
    padding: 14, // Compact mais respirable
  },

  // =================== HEADER CARD AVEC BADGE ===================
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  levelTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  levelMainTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginRight: 8, // Espace avant badge
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    minWidth: 28,
    alignItems: "center",
    // Ombre badge
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
  levelBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
  levelIcon: {
    fontSize: 22, // Plus adapté mobile
  },

  // =================== DESCRIPTION COMPACTE ===================
  levelDescription: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    marginBottom: 12,
  },

  // =================== PROGRESSION APP NATIVE ===================
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: "#64748B",
    textAlign: "right",
  },

  // =================== BOUTON APP NATIVE ===================
  startButton: {
    paddingVertical: 10, // Plus compact
    borderRadius: 8, // App native
    // Ombre bouton réduite
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },

  // =================== ÉTATS APP NATIVE ===================
  levelCardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.9,
  },
  
  // =================== NIVEAU VERROUILLÉ ===================
  lockedCard: {
    opacity: 0.6,
    backgroundColor: "#F8F9FA",
  },
  lockedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(248, 249, 250, 0.8)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  lockIcon: {
    fontSize: 24,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  lockedText: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default styles;