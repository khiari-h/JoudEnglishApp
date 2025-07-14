// HomophoneChoices/style.js - VERSION NETTOYÉE (styles simplifiés)

import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles nettoyés pour HomophoneChoices
 * Design cohérent avec les autres composants
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginVertical: 16,
    },

    // =================== HERO CARD ===================
    heroCard: {
      marginBottom: 20,
    },

    // =================== CHOICES SECTION ===================
    choicesLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: "#374151",
      marginBottom: 16,
      textAlign: "center",
    },

    choicesGrid: {
      gap: 12,
    },

    // =================== CHOICE BUTTONS ===================
    choiceButton: {
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "#e2e8f0",
      borderRadius: 12,
      marginBottom: 8,
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

    disabledChoice: {
      opacity: 0.6,
    },

    choiceContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },

    // =================== CHOICE INDICATORS ===================
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
      color: '#64748b',
    },

    // =================== CHOICE TEXT ===================
    choiceText: {
      flex: 1,
      fontSize: 16,
      fontWeight: "500",
      color: "#374151",
    },
  });

export default createStyles;