// SpellingRule/style.js - VERSION REFACTORISÉE (styles minimaux)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour SpellingRule
 * La majorité des styles est dans ContentSection
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== SECTIONS ===================
    ruleSection: {
      marginBottom: 16,
    },
    instructionSection: {
      marginBottom: 16,
    },
  });

export default createStyles;