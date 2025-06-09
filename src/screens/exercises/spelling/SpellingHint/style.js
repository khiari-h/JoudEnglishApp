// SpellingHint/style.js - VERSION REFACTORISÉE (styles minimaux)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour SpellingHint
 * La majorité des styles est dans RevealButton
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginVertical: 12,
    },

    // =================== REVEAL BUTTON ===================
    revealButton: {
      // RevealButton gère ses propres styles
    },
  });

export default createStyles;