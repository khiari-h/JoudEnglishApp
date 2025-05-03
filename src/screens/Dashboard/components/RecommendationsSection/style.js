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
  listContainer: {
    gap: 8,
  },
  recommendationCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 12,
  },
  emoji: {
    fontSize: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  exerciseTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeTag: {
    marginRight: 8,
  },
  typeText: {
    fontSize: 12,
    color: "#6B7280",
  },
  levelTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "500",
  },
  arrowContainer: {
    paddingHorizontal: 16,
  },
});

export default styles;