// src/screens/exercises/wordGames/WordGamesCard/style.js
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  gameCardContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 16,
    textAlign: "center",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "600",
    textAlign: "center",
  },
  errorSubText: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
    textAlign: "center",
  },

  // ✅ AJOUTÉ : Styles pour le feedback
  feedbackContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  feedbackMessage: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    width: '100%',
  },

  successMessage: {
    backgroundColor: '#dcfce7',
    borderWidth: 2,
    borderColor: '#22c55e',
  },

  errorMessage: {
    backgroundColor: '#fef2f2',
    borderWidth: 2,
    borderColor: '#ef4444',
  },

  feedbackIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  feedbackTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },

  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },

  // ✅ AJOUTÉ : Styles pour l'info-bulle de feedback des paires
  pairFeedbackContainer: {
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    transform: [{ translateY: -25 }],
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    // ✅ AMÉLIORÉ : Ombre plus douce et moderne
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },

  // ✅ AMÉLIORÉ : Style moderne et attrayant pour l'info-bulle d'erreur
  successPairFeedback: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#ef4444',
    // ✅ AJOUTÉ : Dégradé subtil et effet de profondeur
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },

  pairFeedbackText: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: '#dc2626',
    // ✅ AJOUTÉ : Effet de texte moderne
    textShadowColor: 'rgba(239, 68, 68, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
});

export default styles;
