// src/screens/ExerciseSelection/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Conteneur principal optimisé
  headerContainer: {
    position: "relative",
    overflow: "hidden",
  },
  headerGradient: {
    paddingBottom: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  // Header redesigné avec proportions équilibrées
  headerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 50,
  },
  headerTitleStyle: {
    fontSize: 22,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.95)",
    letterSpacing: 0.3,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    lineHeight: 26,
  },
  bonusSubtitleContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 8,
    paddingTop: 4,
  },
  bonusSubtitle: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 13,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "400",
  },

  // Contenu scrollable
  scrollView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
  },
  introText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },

  // Conteneur des exercices
  exercisesContainer: {
    gap: 12,
  },

  // Cartes d'exercices
  exerciseCard: {
    marginBottom: 4,
  },
  cardContentStyle: {
    padding: 16,
  },
  exerciseHeader: {
    marginBottom: 12,
  },
  exerciseTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  exerciseIcon: {
    fontSize: 24,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  exerciseDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 18,
  },

  // Section de progression - STYLES MANQUANTS AJOUTÉS !
  progressSection: {
    marginVertical: 12,
    paddingHorizontal: 0,
  },
  exerciseProgressBar: {
    marginVertical: 0,
  },

  // Bouton de démarrage
  startButton: {
    marginTop: 8,
  },
});

export default styles;
