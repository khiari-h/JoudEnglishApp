// FullCorrectionMode/style.js - VERSION REFACTORISÉE (styles minimaux)

import { StyleSheet } from 'react-native';

/**
 * 🎯 Styles ultra-simplifiés pour FullCorrectionMode
 * La majorité des styles est dans HeroCard et ContentSection
 */
const createStyles = (levelColor = "#5E60CE") =>
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
    feedbackSection: {
      marginTop: 16,
    },

    // =================== CORRECTION INPUT ===================
    correctionContainer: {
      marginVertical: 8,
    },
    correctionInput: {
      backgroundColor: "#f8fafc",
      borderWidth: 1,
      borderColor: "#e2e8f0",
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: "#334155",
      minHeight: 120,
      textAlignVertical: "top",
      lineHeight: 24,
    },
    correctInput: {
      borderColor: "#10b981",
      backgroundColor: "#f0fdf4",
    },
    incorrectInput: {
      borderColor: "#ef4444",
      backgroundColor: "#fef2f2",
    },
  });

export default createStyles;