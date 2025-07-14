// IdentifyErrorsMode/style.js - VERSION REFACTORISÉE (styles minimaux)

import { StyleSheet } from 'react-native';

/**
 * 🎯 Styles ultra-simplifiés pour IdentifyErrorsMode
 * Focus sur la logique de sélection des mots
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== SECTIONS ===================
    instructionSection: {
      marginBottom: 16,
    },
    helpSection: {
      marginTop: 16,
    },
    feedbackSection: {
      marginTop: 16,
    },

    // =================== HERO CARD ===================
    heroCard: {
      marginVertical: 8,
    },

    // =================== MOTS CONTAINER ===================
    wordsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 4,
    },

    // =================== MOTS INDIVIDUELS ===================
    word: {
      marginHorizontal: 4,
      marginVertical: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "transparent",
      backgroundColor: "transparent",
    },
    wordText: {
      fontSize: 16,
      color: "#334155",
      fontWeight: "500",
    },

    // =================== ÉTATS FEEDBACK ===================
    correctWord: {
      backgroundColor: "#f0fdf4",
      borderColor: "#10b981",
      borderWidth: 2,
    },
    correctWordText: {
      color: "#10b981",
      fontWeight: "700",
    },
    
    incorrectWord: {
      backgroundColor: "#fef2f2",
      borderColor: "#ef4444",
      borderWidth: 2,
    },
    incorrectWordText: {
      color: "#ef4444",
      fontWeight: "700",
    },

    missedErrorWord: {
      backgroundColor: "#fef3c7",
      borderColor: "#f59e0b",
      borderWidth: 2,
    },
    missedErrorWordText: {
      color: "#f59e0b",
      fontWeight: "700",
    },
  });

export default createStyles;