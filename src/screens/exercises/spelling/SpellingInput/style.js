// SpellingInput/style.js - VERSION SIMPLIFIÉE (styles nettoyés)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles simplifiés pour SpellingInput
 * Focus sur l'essentiel, cohérence avec le design system
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginVertical: 16,
    },

    // =================== LABEL ===================
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: "#475569",
      marginBottom: 8,
    },

    // =================== INPUT ===================
    input: {
      height: 50,
      borderWidth: 2,
      borderColor: levelColor,
      borderRadius: 12,
      paddingHorizontal: 16,
      fontSize: 18,
      fontWeight: "500",
      color: "#1e293b",
      backgroundColor: "#f8fafc",
    },
    disabledInput: {
      backgroundColor: "#f1f5f9",
      opacity: 0.7,
      borderColor: "#e2e8f0",
    },
  });

export default createStyles;