// MultipleChoiceMode/style.js - VERSION REFACTORISÉE (styles minimaux)

import { StyleSheet, Platform } from 'react-native';

/**
 * 🎯 Styles ultra-simplifiés pour MultipleChoiceMode
 * Focus sur les choix multiples avec indicateurs
 */

  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== SECTIONS ===================
    heroCard: {
      marginBottom: 16,
    },
    instructionSection: {
      marginBottom: 16,
    },
    feedbackSection: {
      marginTop: 16,
    },

    // =================== CHOIX CONTAINER ===================
    choicesContainer: {
      marginVertical: 8,
    },

    // =================== CHOIX INDIVIDUELS ===================
    choiceOption: {
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#e2e8f0",
      borderRadius: 12,
      marginBottom: 12,
      ...Platform.select({
        ios: {
          shadowColor: '#64748b',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    choiceContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },

    // =================== INDICATEURS (A, B, C, D) ===================
    choiceIndicator: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#f1f5f9',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    choiceIndicatorText: {
      fontSize: 16,
      fontWeight: '700',
    },

    // =================== TEXTE CHOIX ===================
    choiceText: {
      flex: 1,
      fontSize: 16,
      color: "#334155",
      lineHeight: 24,
    },

    // =================== ÉTATS FEEDBACK ===================
    correctChoice: {
      backgroundColor: "#f0fdf4",
      borderWidth: 2,
      borderColor: "#10b981",
    },
    correctChoiceText: {
      color: "#10b981",
      fontWeight: "600",
    },
    correctIndicator: {
      backgroundColor: "#10b981",
    },

    incorrectChoice: {
      backgroundColor: "#fef2f2",
      borderWidth: 2,
      borderColor: "#ef4444",
    },
    incorrectChoiceText: {
      color: "#ef4444",
      fontWeight: "600",
    },
    incorrectIndicator: {
      backgroundColor: "#ef4444",
    },
  });

export default createStyles;