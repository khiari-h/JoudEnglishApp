// SpellingCorrection/style.js - VERSION REFACTORISÉE (styles minimaux)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour SpellingCorrection
 * La majorité des styles est dans HeroCard et ContentSection
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== HERO CARD ===================
    heroCard: {
      marginBottom: 16,
    },

    // =================== SECTIONS ===================
    instructionSection: {
      marginBottom: 16,
    },
  });

export default createStyles;