// src/screens/exercises/levelAssessment/AssessmentResults/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // === CONTENEUR PRINCIPAL MODERNE ===
  resultsContainer: {
    flex: 1,
    backgroundColor: "#0f172a", // Fond sombre moderne
    padding: 20,
  },
  
  // === HEADER AVEC CONFETTI/ÉTOILES ===
  headerSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  
  celebrationIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  
  resultsTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  
  levelBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  
  levelBadgeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.8,
  },

  // === CARTE DE SCORE MODERNE ===
  scoreCard: {
    backgroundColor: "#1e293b",
    borderRadius: 24,
    padding: 32,
    marginVertical: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  
  scoreLabel: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  
  // Score avec effet de cercle
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  
  mainScore: {
    fontSize: 32,
    fontWeight: "900",
    color: "#ffffff",
  },
  
  percentageScore: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },
  
  // === STATISTIQUES DÉTAILLÉES ===
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  
  statItem: {
    alignItems: "center",
  },
  
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  
  // === MESSAGE DE PERFORMANCE AVEC STYLE ===
  performanceSection: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  
  performanceMessage: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  
  performanceSubtitle: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 20,
  },

  // === BOUTONS MODERNES ===
  buttonsContainer: {
    marginTop: "auto",
    paddingBottom: 20,
    gap: 12,
  },
  
  primaryButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.8,
  },

  // === STYLES POUR DIFFÉRENTS NIVEAUX DE PERFORMANCE ===
  excellentGlow: {
    shadowColor: "#10b981",
    shadowOpacity: 0.6,
  },
  
  goodGlow: {
    shadowColor: "#f59e0b",
    shadowOpacity: 0.6,
  },
  
  needsImprovementGlow: {
    shadowColor: "#ef4444",
    shadowOpacity: 0.6,
  },

  // === ÉLÉMENTS DÉCORATIFS ===
  decorativeElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  
  floatingShape: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 50,
  },
});

export default styles;