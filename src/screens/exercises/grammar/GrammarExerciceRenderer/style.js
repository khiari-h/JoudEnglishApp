// GrammarExerciseRenderer/style.js - VERSION REDESIGNÉE 🎯

import { StyleSheet, Platform } from 'react-native';

/**
 * 🎯 Styles redesignés pour GrammarExerciseRenderer
 * Focus sur des inputs et radio buttons plus propres et modernes
 * Cohérent avec le design prototype validé
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== SECTION OPTIONS (RADIO BUTTONS) ===================
    optionsSection: {
      marginTop: 20,
      gap: 16, // Plus d'espace entre les options pour respirer
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

    // =================== SECTION INPUT REDESIGNÉE ===================
    inputSection: {
      marginTop: 20, // Plus d'espace au-dessus
    },

    // =================== INPUTS REDESIGNÉS ===================
    fillBlankInput: {
      borderWidth: 2, // Bordure plus épaisse
      borderRadius: 16, // Coins arrondis
      padding: 18, // Plus de padding
      fontSize: 16,
      color: '#374151',
      backgroundColor: 'white',
      fontWeight: '500',
      textAlign: 'center',
      minHeight: 56,
      letterSpacing: 0.2,
      // Ombre moderne
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
    
    transformationInput: {
      borderWidth: 2, // Bordure plus épaisse
      borderRadius: 16, // Coins arrondis
      padding: 18, // Plus de padding
      fontSize: 16,
      color: '#374151',
      minHeight: 120,
      textAlignVertical: 'top',
      backgroundColor: 'white',
      fontWeight: '500',
      lineHeight: 24,
      letterSpacing: 0.2,
      // Ombre moderne
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

    // =================== ÉTATS INPUT AMÉLIORÉS ===================
    neutralInput: {
      borderColor: '#E2E8F0', // Couleur neutre plus douce
      backgroundColor: 'white',
      color: '#374151',
    },
    
    correctInput: {
      borderColor: '#10B981', // Vert cohérent
      backgroundColor: '#F0FDF4', // Background vert très léger
      color: '#10B981',
      // Ombre verte subtile
      ...Platform.select({
        ios: {
          shadowColor: '#10B981',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    
    incorrectInput: {
      borderColor: '#EF4444', // Rouge cohérent
      backgroundColor: '#FEF2F2', // Background rouge très léger
      color: '#EF4444',
      // Ombre rouge subtile
      ...Platform.select({
        ios: {
          shadowColor: '#EF4444',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },

    // =================== STYLES SPÉCIAUX POUR LES GRADIENTS ===================
    // Ces classes seront utilisées par les gradients pour les couleurs de fond
    // Pas de changement ici car les gradients sont gérés dans le composant
  });

export default createStyles;