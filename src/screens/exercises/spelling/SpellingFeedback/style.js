// SpellingFeedback/style.js - VERSION REFACTORISÉE (styles minimaux)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour SpellingFeedback
 * La majorité des styles est dans ContentSection
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginVertical: 12,
    },

    // =================== SECTIONS ===================
    feedbackSection: {
      // ContentSection gère ses propres styles
    },
  });

export default createStyles;