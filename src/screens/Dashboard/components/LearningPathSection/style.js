import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
    paddingHorizontal: 4,
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
  currentLevelText: {
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
  progressButton: {
    marginTop: 8,
  },
});

export default styles;