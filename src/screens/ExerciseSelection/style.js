// src/screens/ExerciseSelection/style.js
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  // =================== HEADER RAFFINÉ ===================
  headerContainer: {
    position: "relative",
    overflow: "hidden",
    // Ombre subtile pour séparer du contenu
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerGradient: {
    paddingBottom: 12,
    borderBottomLeftRadius: 20, // Plus fluide
    borderBottomRightRadius: 20,
    // Dégradé plus subtil avec la nouvelle syntaxe
    overflow: "hidden",
  },
  headerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 60, // Plus d'air
  },
  headerTitleStyle: {
    fontSize: 26,
    fontWeight: "600", // Moins agressif que 700
    color: "rgba(255, 255, 255, 0.98)",
    letterSpacing: -0.6, // Typographie moderne
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    lineHeight: 30,
    // Police système plus élégante
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  bonusSubtitleContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 12,
    paddingTop: 6,
  },
  bonusSubtitle: {
    color: "rgba(255, 255, 255, 0.88)",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "400",
    letterSpacing: 0.2,
    // Pas d'italic, plus clean
  },

  // =================== CONTENU SCROLL ===================
  scrollView: {
    flex: 1,
    backgroundColor: "#FAFBFC", // Légèrement plus chaud que F9FAFB
  },
  scrollContent: {
    padding: 20,
    paddingTop: 16,
  },
  introText: {
    fontSize: 17,
    color: "#64748B", // Moins terne que 6B7280
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 24,
    fontWeight: "400",
    letterSpacing: 0.1,
  },

  // =================== CONTENEUR EXERCICES ===================
  exercisesContainer: {
    gap: 16, // Plus d'espace entre les cartes
  },

  // =================== CARTES SOPHISTIQUÉES ===================
  exerciseCard: {
    marginBottom: 4,
    borderRadius: 16, // Plus arrondi
    backgroundColor: "#FFFFFF",
    // Ombre plus sophistiquée
    ...Platform.select({
      ios: {
        shadowColor: "#1F2937",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
    // Bordure subtile pour plus de définition
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  cardContentStyle: {
    padding: 20, // Plus d'air
  },

  // =================== HEADER EXERCICE ===================
  exerciseHeader: {
    marginBottom: 16,
  },
  exerciseTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 52, // Légèrement plus grand
    height: 52,
    borderRadius: 16, // Plus arrondi
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    // Ombre subtile sur l'icône
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  exerciseIcon: {
    fontSize: 26,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "600", // Moins lourd que bold
    color: "#1E293B", // Plus sophistiqué que 1F2937
    marginBottom: 4,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  exerciseDescription: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  // =================== PROGRESSION AMÉLIORÉE ===================
  progressSection: {
    marginVertical: 16,
    paddingHorizontal: 2, // Léger padding pour aligner avec le contenu
  },
  exerciseProgressBar: {
    marginVertical: 0,
    // On peut ajouter des styles pour la ProgressBar ici
    borderRadius: 3,
    overflow: "hidden",
  },

  // =================== BOUTON RAFFINÉ ===================
  startButton: {
    marginTop: 12,
    borderRadius: 12, // Cohérent avec le design
    // Ombre subtile pour le bouton
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  // =================== ÉTATS INTERACTIFS ===================
  // Pour les cartes pressées (à ajouter dans le composant)
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  
  // =================== AMÉLIORATIONS BONUS ===================
  // Badge de progression pour les exercices terminés
  completedBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#10B981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  completedBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  // Indicateur de difficulté
  difficultyIndicator: {
    flexDirection: "row",
    marginTop: 8,
    gap: 3,
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E2E8F0",
  },
  difficultyDotActive: {
    backgroundColor: "#3B82F6",
  },
});

export default styles;