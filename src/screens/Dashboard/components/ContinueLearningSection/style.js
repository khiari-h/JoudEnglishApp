import { StyleSheet } from "react-native";

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

  // Nouveau layout simplifié
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  levelText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "400",
  },
  separator: {
    fontSize: 13,
    color: "#6B7280",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  buttonIcon: {
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
