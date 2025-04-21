// src/components/screens/exercises/vocabulary/VocabularyProgress/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
  },
  expandIcon: {
    fontSize: 16,
    color: "#64748b",
  },
  globalProgressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    marginVertical: 6,
  },
  categoriesContainer: {
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 10,
  },
  categoryContainer: {
    marginVertical: 8,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
  },
  categoryCount: {
    fontSize: 12,
    color: "#64748b",
  },
  categoryProgressBar: {
    marginTop: 2,
  },
});

export default styles;