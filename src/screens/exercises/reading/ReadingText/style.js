// src/components/screens/exercises/reading/ReadingText/style.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textContainer: {
    paddingVertical: 12,
  },

  // Nouveau style pour le texte complet (remplace le système word par word)
  fullText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
    textAlign: "justify",
  },

  collapsedText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#6b7280",
    fontStyle: "italic",
  },

  expandButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "transparent",
  },

  expandButtonText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default styles;

