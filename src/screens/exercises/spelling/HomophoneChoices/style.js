// src/screens/exercises/spelling/HomophoneChoices/style.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginVertical: 16,
  },

  sentenceContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  sentenceText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1e293b",
    textAlign: "center",
    lineHeight: 26,
  },

  choicesContainer: {
    marginTop: 8,
  },

  choicesLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
    textAlign: "center",
  },

  choicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },

  choiceButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    minWidth: 80,
    alignItems: "center",
    marginHorizontal: 4,
    marginVertical: 4,
  },

  selectedChoice: {
    backgroundColor: "#f0f9ff",
    borderWidth: 2,
    // borderColor will be set dynamically with levelColor
  },

  disabledChoice: {
    opacity: 0.6,
  },

  choiceText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },

  selectedChoiceText: {
    fontWeight: "600",
    // color will be set dynamically with levelColor
  },
});