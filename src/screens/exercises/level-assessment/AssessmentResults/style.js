// src/screens/exercises/levelAssessment/AssessmentResults/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // === STYLES EXISTANTS (conservés) ===
  resultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
  },
  resultsFeedback: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 24,
  },
  continueButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  // === NOUVEAUX STYLES POUR LA NOTATION ===
  
  // Section du score
  scoreSection: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Label "Your Score"
  scoreLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
    fontWeight: "500",
  },
  
  // Score principal (ex: 15/20)
  mainScore: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 4,
  },
  
  // Pourcentage
  percentageScore: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 16,
  },
  
  // Détails du score
  scoreDetails: {
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: "100%",
  },
  scoreDetailText: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    fontWeight: "500",
  },
  
  // Message de performance (Excellent, Great job, etc.)
  performanceMessage: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  
  // Conteneur des boutons
  buttonContainer: {
    width: "100%",
    maxWidth: 320,
    gap: 12,
  },
  
  // Bouton "Try Again"
  retryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: "center",
    marginBottom: 12,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;