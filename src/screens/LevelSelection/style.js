// src/screens/LevelSelection/style.js
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // =================== HEADER SOPHISTIQUÉ ===================
  headerContainer: {
    overflow: "hidden",
    // Ombre pour séparer visuellement
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  headerGradient: {
    borderBottomLeftRadius: 24, // Plus fluide qu'avant
    borderBottomRightRadius: 24,
    paddingBottom: 20,
    // Dégradé plus riche visuellement
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600", // Moins agressif que bold
    letterSpacing: -0.7, // Typographie moderne
    color: "rgba(255, 255, 255, 0.98)",
    lineHeight: 32,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // =================== CHEMIN DE NIVEAUX RAFFINÉ ===================
  compactPathContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  levelPath: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)", // Fond subtil
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    // Effet de verre dépoli
    backdropFilter: "blur(10px)",
  },
  smallLevelDot: {
    width: 34, // Plus grand pour être plus lisible
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    // Ombre plus sophistiquée
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
    // Bordure subtile pour plus de définition
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  smallLevelDotText: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  smallLevelLine: {
    height: 3, // Plus épais
    width: 20, // Plus long
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 1.5,
  },

  // =================== CONTENU SCROLL ===================
  scrollView: {
    flex: 1,
    backgroundColor: "#FAFBFC", // Cohérent avec ExerciseSelection
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 20,
  },

  // =================== SECTION INTRO ===================
  introSection: {
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  introText: {
    fontSize: 17,
    color: "#64748B", // Cohérent avec ExerciseSelection
    lineHeight: 25,
    textAlign: "center",
    letterSpacing: 0.1,
    fontWeight: "400",
  },

  // =================== CONTENEUR NIVEAUX ===================
  levelsContainer: {
    gap: 20, // Plus d'espace entre les cartes
  },

  // =================== CARTES DE NIVEAU SOPHISTIQUÉES ===================
  levelCard: {
    marginBottom: 6,
    borderRadius: 18, // Plus arrondi pour être premium
    backgroundColor: "#FFFFFF",
    // Ombre multicouche plus sophistiquée
    ...Platform.select({
      ios: {
        shadowColor: "#1F2937",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
    }),
    // Bordure subtile
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.04)",
    // Effet de survol pour le futur
    transform: [{ scale: 1 }],
  },
  cardContentStyle: {
    padding: 24, // Plus d'air que les 16px de base
  },

  // =================== HEADER CARTE NIVEAU ===================
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Meilleur alignement
    marginBottom: 16,
  },
  titleBadgeContainer: {
    flexDirection: "column",
    flex: 1,
    marginRight: 16,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14, // Plus arrondi
    marginBottom: 10,
    minWidth: 36,
    alignItems: "center",
    // Ombre subtile sur le badge
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
  badgeText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: "600", // Moins lourd que avant
    color: "#1E293B", // Plus sophistiqué
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  iconContainer: {
    width: 50, // Légèrement plus grand
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.02)", // Fond très subtil
    // Ombre douce
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconText: {
    fontSize: 30,
  },

  // =================== DESCRIPTION NIVEAU ===================
  levelDescription: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
    marginBottom: 20,
    letterSpacing: 0.1,
  },

  // =================== BARRE DE PROGRESSION ===================
  progressBar: {
    marginBottom: 20,
    // Style pour une progression plus premium
    borderRadius: 6,
    overflow: "hidden",
  },

  // =================== BOUTON DÉMARRAGE ===================
  startButton: {
    marginTop: 6,
    borderRadius: 14, // Cohérent avec le design
    // Ombre pour le bouton
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  // =================== ÉTATS INTERACTIFS ===================
  // Pour les cartes pressées
  levelCardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.95,
  },

  // =================== AMÉLIORATIONS BONUS ===================
  // Badge de recommandation
  recommendedBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#10B981",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  recommendedBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  // Indicateur de difficulté par étoiles
  difficultyStars: {
    flexDirection: "row",
    marginTop: 8,
    gap: 3,
  },
  star: {
    fontSize: 14,
    color: "#FCD34D",
  },
  starEmpty: {
    fontSize: 14,
    color: "#E5E7EB",
  },

  // Badge de niveau débloqué
  unlockedBadge: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  unlockedBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // État de niveau verrouillé
  lockedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  lockIcon: {
    fontSize: 32,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  lockedText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});