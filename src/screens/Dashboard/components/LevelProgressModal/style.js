// src/screens/Dashboard/components/LevelProgressModal/style.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  closeButton: {
    padding: 4,
  },
  activeInfoContainer: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  activeInfoText: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 4,
  },
  activeInfoBold: {
    fontWeight: "700",
    color: "#1F2937",
  },
  activeInfoDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  levelsScrollView: {
    flex: 1,
  },
  levelCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  levelCardContent: {
    flex: 1,
    marginRight: 12,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    marginBottom: 8,
  },
  activeIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  activeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  levelProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginRight: 12,
  },
  levelProgressFill: {
    height: 6,
    borderRadius: 3,
  },
  levelProgressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    minWidth: 40,
  },
  bonusInfoContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "rgba(147, 51, 234, 0.05)",
    borderRadius: 8,
  },
  bonusInfoText: {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  levelBadgeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  closeModalButton: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  closeModalButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
  },
});

