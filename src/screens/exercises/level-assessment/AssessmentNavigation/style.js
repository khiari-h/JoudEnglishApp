// AssessmentNavigation/style.js

import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles pour AssessmentNavigation
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

    // =================== ACTIONS FEEDBACK ===================
    feedbackActionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },

    // =================== BOUTON TRY AGAIN ===================
    tryAgainButton: {
      backgroundColor: 'white',
      borderWidth: 2,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 100,
      // Ombre subtile
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        },
        android: {
          elevation: 1,
        },
      }),
    },

    tryAgainButtonText: {
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: 0.2,
    },

    // =================== CONTAINER NEXT BUTTON ===================
    nextButtonContainer: {
      flex: 1,
    },
  });

export default createStyles;