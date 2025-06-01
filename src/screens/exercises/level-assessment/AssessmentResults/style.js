// src/screens/exercises/levelAssessment/AssessmentResults/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // === CONTENEUR PRINCIPAL - FOND GRIS COHÉRENT ===
  resultsContainer: {
    flex: 1,
    backgroundColor: "#e2e8f0", // Gris plus cohérent, ni trop clair ni trop foncé
    padding: 20,
  },

  // === HEADER MODERNE ===
  headerSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },

  resultsTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a", // Texte encore plus foncé pour bien contraster avec le nouveau gris
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: 0.5,
  },

  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  levelBadgeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  // === CARTE DE SCORE CLAIRE ===
  scoreCard: {
    backgroundColor: "#ffffff", // Fond blanc pur
    borderRadius: 20,
    padding: 32,
    marginVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  scoreLabel: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 20,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // Cercle de score plus grand et impactant
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  mainScore: {
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -1,
  },

  percentageScore: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 4,
    fontWeight: "500",
  },

  // === STATISTIQUES COLORÉES ===
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 2,
    borderTopColor: "#e2e8f0",
  },

  statItem: {
    alignItems: "center",
    flex: 1,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },

  statLabel: {
    fontSize: 12,
    color: "#64748b",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // === SECTION PERFORMANCE AVEC COULEURS DE FOND ===
  performanceSection: {
    borderRadius: 16,
    padding: 24,
    marginVertical: 20,
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  performanceMessage: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },

  performanceSubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "500",
    opacity: 0.8,
  },

  // === BOUTONS MODERNES ===
  buttonsContainer: {
    marginTop: "auto",
    paddingBottom: 30,
    gap: 16,
  },

  primaryButton: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  primaryButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  secondaryButton: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;

