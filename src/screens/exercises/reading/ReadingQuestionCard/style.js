// ReadingQuestionCard/style.js - VERSION HARMONISÉE avec Grammar 🎯
import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles harmonisés avec GrammarExerciseRenderer
 * Même design moderne pour les options/radio buttons
 * ✅ Cohérence visuelle globale
 * ✅ Design redesigné et moderne
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== OPTIONS SECTION (RADIO BUTTONS) ===================
    optionsContainer: {
      marginTop: 20,
      gap: 16, // Plus d'espace entre les options pour respirer
    },
    
    optionsTitle: {
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 16,
      paddingHorizontal: 4,
      textAlign: 'center',
      color: levelColor,
    },

    // =================== OPTION REDESIGNÉE (RADIO BUTTON) ===================
    optionContainer: {
      borderRadius: 20, // Plus arrondi pour un look moderne
      overflow: 'hidden',
      // Ombre plus subtile et élégante
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    
    optionGradient: {
      borderRadius: 20,
      overflow: 'hidden',
    },
    
    optionInner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 18, // Plus de padding vertical
      paddingHorizontal: 24, // Plus de padding horizontal
      backgroundColor: 'white', // Background blanc propre
      borderWidth: 2, // Bordure plus épaisse
      borderColor: '#E2E8F0', // Couleur de bordure neutre
      borderRadius: 20,
      // Transition iOS simulée avec l'ombre qui change
      ...Platform.select({
        ios: {
          shadowColor: '#3B82F6',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
        },
      }),
    },

    // =================== RADIO BUTTON REDESIGNÉ ===================
    optionIconContainer: {
      marginRight: 16, // Plus d'espace après l'icône
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#CBD5E1',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },

    // =================== TEXTE OPTION AMÉLIORÉ ===================
    optionText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#374151',
      flex: 1,
      letterSpacing: 0.3,
    },
    
    // États de texte avec couleurs cohérentes du prototype
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

    // =================== LETTRE DE L'OPTION (A, B, C, D) ===================
    optionLetterContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.05)',
      backgroundColor: '#F8FAFC',
    },

    optionLetter: {
      fontSize: 16,
      fontWeight: "800",
      color: '#64748B',
    },

    // =================== ÉTATS DES OPTIONS AMÉLIORÉS ===================
    optionSelected: {
      backgroundColor: levelColor,
      borderColor: levelColor,
      transform: [{ scale: 1.02 }],
      // Ombre plus prononcée pour la sélection
      ...Platform.select({
        ios: {
          shadowColor: levelColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        },
        android: {
          elevation: 4,
        },
      }),
    },

    optionCorrect: {
      backgroundColor: '#10B981', // Vert cohérent
      borderColor: '#10B981',
      borderWidth: 2,
      // Ombre verte pour succès
      ...Platform.select({
        ios: {
          shadowColor: '#10B981',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    },

    optionIncorrect: {
      backgroundColor: '#EF4444', // Rouge cohérent
      borderColor: '#EF4444',
      borderWidth: 2,
      // Ombre rouge pour erreur
      ...Platform.select({
        ios: {
          shadowColor: '#EF4444',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    },

    // =================== TEXTES DES ÉTATS ===================
    optionCorrectText: {
      color: 'white',
      fontWeight: '600',
    },

    optionIncorrectText: {
      color: 'white',
      fontWeight: '600',
    },
  });

export default createStyles;