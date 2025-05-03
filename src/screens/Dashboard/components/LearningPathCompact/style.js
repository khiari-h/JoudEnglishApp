import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  card: {
    borderRadius: 12,
    backgroundColor: "white",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activeInfoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    marginRight: 8,
  },
  activeInfoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  activeInfoText: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
  levelDescription: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 16,
    lineHeight: 20,
  },
  levelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  levelButton: {
    alignItems: "center",
  },
  levelCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  futureLevelCircle: {
    backgroundColor: "#F3F4F6",
  },
  activeLevelText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  completedLevelText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  futureLevelText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#9CA3AF",
  },
  progressLineContainer: {
    height: 4,
    marginVertical: 16,
    position: "relative",
  },
  progressLineTrack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#F3F4F6",
    borderRadius: 2,
  },
  progressLineFill: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 4,
    borderRadius: 2,
  },
  exploreButton: {
    marginTop: 8,
  },
});

export default styles;