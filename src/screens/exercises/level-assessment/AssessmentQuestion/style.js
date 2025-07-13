// AssessmentQuestion/style.js - VERSION SIMPLIFIÉE

import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles simplifiés pour AssessmentQuestion
 * La plupart des styles sont dans HeroCard et ContentSection
 */

  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== OPTIONS DE RÉPONSE ===================
    optionsContainer: {
      marginTop: 16,
      gap: 12,
    },

    optionButton: {
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: '#e2e8f0',
      borderRadius: 12,
      padding: 16,
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

    selectedOption: {
      borderWidth: 2,
      // borderColor et backgroundColor sont définies inline
    },

    correctOption: {
      borderWidth: 2,
      // borderColor et backgroundColor sont définies inline
    },

    optionText: {
      fontSize: 16,
      color: '#334155',
      textAlign: 'center',
      lineHeight: 22,
    },
  });

export default createStyles;