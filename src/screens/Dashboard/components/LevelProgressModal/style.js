// src/components/modals/LevelProgressModal/style.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  scrollView: {
    maxHeight: 500,
  },
  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  levelCard: {
    width: "48%",
    padding: 12,
    borderLeftWidth: 4,
  },
  emptyCard: {
    width: "48%",
  },
  levelHeader: {
    marginBottom: 8,
  },
  levelTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
    flex: 1,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 4,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  levelDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
    lineHeight: 16,
  },
  progressContainer: {
    marginBottom: 8,
  },
  hoursContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hoursText: {
    fontSize: 11,
    color: "#6B7280",
    marginLeft: 4,
  },
  footer: {
    marginTop: 16,
  },
});

export default styles;