// src/screens/Dashboard/components/LevelProgressModal/style.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Plus sombre pour plus de contraste
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24, // Plus arrondi
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: "85%",
    // Ombre plus sophistiquée
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: -20,
    // Gradient subtle
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
  },
  activeInfoContainer: {
    backgroundColor: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)", // Gradient bleu subtil
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activeInfoText: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 6,
    fontWeight: "500",
  },
  activeInfoBold: {
    fontWeight: "800",
    color: "#1E293B",
  },
  activeInfoDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
    fontWeight: "400",
  },
  levelsScrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  levelCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    flexDirection: "row",
    alignItems: "center",
    // Ombre moderne
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    // Bordure subtile
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  levelCardContent: {
    flex: 1,
    marginRight: 16,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  levelTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
    flex: 1,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  activeIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: "#10B981", // Vert moderne
  },
  activeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#059669",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  levelProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  levelProgressBar: {
    flex: 1,
    height: 8, // Plus épais
    backgroundColor: "#F1F5F9",
    borderRadius: 6,
    marginRight: 16,
    overflow: "hidden",
  },
  levelProgressFill: {
    height: 8,
    borderRadius: 6,
    // Gradient pour la barre de progression
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  levelProgressText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#475569",
    minWidth: 45,
  },
  bonusInfoContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#FEF3E2", // Orange doux
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  bonusInfoText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "#EA580C",
  },
  levelBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    // Ombre pour le badge
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  levelBadgeText: {
    fontSize: 19,
    fontWeight: "800",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  closeModalButton: {
    backgroundColor: "#F8FAFC",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  closeModalButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#475569",
    letterSpacing: -0.2,
  },
  
  // 🎨 NOUVEAUX STYLES pour des variantes de couleurs
  levelCardCompleted: {
    backgroundColor: "#F0FDF4",
    borderLeftColor: "#22C55E",
  },
  levelCardCurrent: {
    backgroundColor: "#FEF3E2",
    borderLeftColor: "#F59E0B",
  },
  levelCardLocked: {
    backgroundColor: "#F8FAFC",
    borderLeftColor: "#94A3B8",
    opacity: 0.7,
  },
  
  // 🌟 Couleurs pour les badges selon le statut
  badgeCompleted: {
    backgroundColor: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
  },
  badgeCurrent: {
    backgroundColor: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  },
  badgeLocked: {
    backgroundColor: "linear-gradient(135deg, #94A3B8 0%, #64748B 100%)",
  },
  
  // 🎯 Couleurs pour les barres de progression
  progressCompleted: {
    backgroundColor: "linear-gradient(90deg, #22C55E 0%, #16A34A 100%)",
  },
  progressCurrent: {
    backgroundColor: "linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%)",
  },
  progressPartial: {
    backgroundColor: "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)",
  },
  
  // 🎯 Styles pour les objectifs et requirements
  requirementContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 8,
    borderRadius: 8,
  },
  requirementText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '600',
  },
  
  // 🏆 Style pour les icônes dans les badges
  badgeIcon: {
    textAlign: 'center',
  },
});