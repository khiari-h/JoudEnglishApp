// GrammarExerciseRenderer/style.js - VERSION REFACTORISÉE (300 → 120 lignes)

import { StyleSheet, Platform } from 'react-native';

/**
 * 🎯 Styles optimisés pour GrammarExerciseRenderer
 * Ancien : 300 lignes avec hero section custom + glassmorphism dupliqué
 * Nouveau : 120 lignes - HeroCard et ContentSection gèrent le gros du travail
 * Focus sur les options et inputs spécifiques à Grammar
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== SECTION OPTIONS ===================
    optionsSection: {
      marginTop: 16,
      gap: 12, // Espace entre les options
    },

    // =================== OPTION AVEC GLASSMORPHISM ===================
    optionContainer: {
      borderRadius: 16,
      overflow: 'hidden',
      // Ombre pour chaque option (cohérent avec RevealButton)
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    optionGradient: {
      borderRadius: 16,
      overflow: 'hidden',
    },
    optionInner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Glassmorphism cohérent
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },

    // =================== ICÔNE OPTION ===================
    optionIconContainer: {
      marginRight: 12,
    },

    // =================== TEXTE OPTION ===================
    optionText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#374151',
      flex: 1,
      letterSpacing: 0.2,
    },
    selectedOptionText: {
      color: 'white',
      fontWeight: '600',
    },
    correctOptionText: {
      color: 'white',
      fontWeight: '600',
    },
    incorrectOptionText: {
      color: 'white',
      fontWeight: '600',
    },

    // =================== SECTION INPUT ===================
    inputSection: {
      marginTop: 16,
      borderRadius: 16,
      overflow: 'hidden',
      // Ombre cohérente avec les autres composants
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    // =================== INPUTS STYLÉS ===================
    fillBlankInput: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 16,
      fontSize: 16,
      color: '#374151',
      backgroundColor: 'white',
      fontWeight: '500',
      textAlign: 'center',
      minHeight: 56,
    },
    transformationInput: {
      borderWidth: 1,
      borderRadius: 16,
      padding: 16,
      fontSize: 16,
      color: '#374151',
      minHeight: 120,
      textAlignVertical: 'top',
      backgroundColor: 'white',
      fontWeight: '500',
      lineHeight: 24,
    },

    // =================== ÉTATS INPUT ===================
    neutralInput: {
      borderColor: '#CBD5E1',
      color: '#374151',
    },
    correctInput: {
      borderColor: '#10B981',
      backgroundColor: '#F0FDF4',
      color: '#10B981',
    },
    incorrectInput: {
      borderColor: '#EF4444',
      backgroundColor: '#FEF2F2',
      color: '#EF4444',
    },
  });

export default createStyles;