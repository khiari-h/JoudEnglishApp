// src/screens/Dashboard/components/LearningPathCompact/style.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    padding: 20,
  },
  activeInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  activeInfoLabel: {
    fontSize: 16,
    color: "#6B7280",
    marginRight: 8,
  },
  activeInfoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeInfoText: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
  levelDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 20,
  },
  levelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  levelButton: {
    alignItems: "center",
  },
  levelCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  activeLevelCircle: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  completedLevelCircle: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  futureLevelCircle: {
    backgroundColor: "#F3F4F6",
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  activeLevelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  completedLevelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  futureLevelText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#9CA3AF",
  },
  progressLineContainer: {
    position: "relative",
    height: 4,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  progressLineTrack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
  },
  progressLineFill: {
    height: 4,
    borderRadius: 2,
  },
  exploreButton: {
    marginTop: 4,
  },
});
