// WordGamesNavigation/style.js

import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles pour WordGamesNavigation
 * Mélange bouton Check Answer custom + NavigationButtons générique
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#f1f5f9',
      paddingHorizontal: 20,
      paddingVertical: 16,
      paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Safe area bottom
    },

    // =================== BOUTON CHECK ANSWER ===================
    checkButton: {
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      // Ombre
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
      }),
    },

    disabledButton: {
      opacity: 0.6,
    },

    checkButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: 'white',
      letterSpacing: 0.3,
    },

    // =================== INSTRUCTIONS MATCHING ===================
    instructionContainer: {
      backgroundColor: '#f8fafc',
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#e2e8f0',
    },

    instructionText: {
      fontSize: 15,
      color: '#64748b',
      fontStyle: 'italic',
      textAlign: 'center',
    },
  });

export default createStyles;