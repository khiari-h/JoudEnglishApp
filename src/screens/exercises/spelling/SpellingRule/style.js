// SpellingRule/style.js - VERSION REFACTORISÉE (styles minimaux)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour SpellingRule
 * HeroCard pour la règle + ContentSection pour les instructions
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