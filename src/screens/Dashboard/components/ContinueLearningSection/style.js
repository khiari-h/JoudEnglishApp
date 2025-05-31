import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  
  // Nouveau design avec emoji et badges
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  emoji: {
    fontSize: 18,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  exerciseTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  levelBadge: {
    backgroundColor: "#3b82f6",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
    marginRight: 4,
  },
  levelBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  positionText: {
    fontSize: 13,
    color: "#6B7280",
    marginLeft: 2,
  },
  timeText: {
    fontSize: 13,
    color: "#6B7280",
    marginLeft: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },

  // États vides et loading
  emptyStateDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    lineHeight: 20,
  },
  emptyStateContainer: {
    marginTop: 8,
  },
  emptyStateHint: {
    fontSize: 13,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  loadingContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 12,
  },
});

export default styles;