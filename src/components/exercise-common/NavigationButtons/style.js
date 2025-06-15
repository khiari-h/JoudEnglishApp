// NavigationButtons/style.js - PROPRE & EFFICACE 🎯

import { StyleSheet, Platform } from 'react-native';

/**
 * 🎯 Styles Navigation - Simple mais léché
 * - Pas de délire glassmorphism 
 * - Juste propre et moderne
 * - Cohérent avec les cartes existantes
 */
const createStyles = (primaryColor = "#5E60CE") =>
  StyleSheet.create({
    
    // =================== CONTAINER SIMPLE ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 16,
    },

    // =================== ROW BOUTONS ===================
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 4, // Petit padding pour éviter les bords
    },

    // =================== BOUTON PRÉCÉDENT - GHOST PROPRE ===================
    previousButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 20,
      backgroundColor: 'white',
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: `${primaryColor}25`,
      
      // Ombre subtile mais présente
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },

    previousText: {
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: 0.2,
      marginLeft: 8,
    },

    // =================== BOUTON SUIVANT - GRADIENT PROPRE ===================
    nextButtonContainer: {
      borderRadius: 16,
      overflow: 'hidden',
      
      // Ombre colorée pour le CTA
      ...Platform.select({
        ios: {
          shadowColor: primaryColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    },

    nextButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 28,
      borderRadius: 16,
    },

    nextText: {
      fontSize: 16,
      fontWeight: '700',
      color: 'white',
      letterSpacing: 0.3,
    },

    nextIcon: {
      marginLeft: 8,
    },

    // =================== ÉTATS DISABLED ===================
    disabled: {
      opacity: 0.6,
    },
  });

export default createStyles;