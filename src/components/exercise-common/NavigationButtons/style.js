// NavigationButtons/style.js - Version Épurée & Cohérente

import { StyleSheet, Platform } from 'react-native';

/**
 * 🎯 Styles NavigationButtons - Épurés et cohérents
 * - Cohérent avec CategorySelector épuré
 * - Couleurs douces et professionnelles
 * - Pas de gradients excessifs
 * - Hiérarchie visuelle claire
 * - Focus sur l'utilisabilité
 */
const createStyles = (primaryColor = "#3B82F6") =>
  StyleSheet.create({
    
    // =================== CONTAINER SIMPLE ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 16,
    },

    // =================== ROW BOUTONS ===================
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'center', // Centré au lieu de space-between
      alignItems: 'center',
      paddingHorizontal: 4,
      gap: 16, // Espacement entre les boutons
    },

    // =================== BOUTON PRÉCÉDENT - STYLE ÉPURÉ ===================
    previousButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: '#F8FAFC', // Gris très doux
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E2E8F0', // Bordure subtile
      
      // Ombre discrète
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        android: {
          elevation: 1,
        },
      }),
    },

    previousText: {
      fontSize: 14,
      fontWeight: '500', // Moins gras
      color: '#64748B',  // Gris moderne
      letterSpacing: 0.1,
      marginLeft: 6,
    },

    // =================== BOUTON SUIVANT - ÉPURÉ SANS GRADIENT ===================
    nextButtonContainer: {
      borderRadius: 12,
      overflow: 'hidden',
      
      // Ombre subtile colorée
      ...Platform.select({
        ios: {
          shadowColor: primaryColor,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1, // Réduit de 0.2 à 0.1
          shadowRadius: 6,
        },
        android: {
          elevation: 3,
        },
      }),
    },

    nextButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      paddingHorizontal: 24,
      backgroundColor: primaryColor, // Couleur unie, pas de gradient
      borderRadius: 12,
    },

    nextText: {
      fontSize: 15,
      fontWeight: '600',
      color: 'white',
      letterSpacing: 0.2,
    },

    nextIcon: {
      marginLeft: 6,
    },

    // =================== BOUTON TERMINER - MÊME STYLE QUE SUIVANT ===================
    finishButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      paddingHorizontal: 24,
      backgroundColor: '#059669', // Vert uni, pas de gradient
      borderRadius: 12,
    },

    finishButtonContainer: {
      borderRadius: 12,
      overflow: 'hidden',
      
      ...Platform.select({
        ios: {
          shadowColor: '#059669',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        android: {
          elevation: 3,
        },
      }),
    },

    // =================== ÉTATS DISABLED ===================
    disabled: {
      opacity: 0.4, // Réduit de 0.6 à 0.4 pour plus de contraste
    },

    // =================== VARIANTS HOVER (pour web/desktop) ===================
    previousButtonHover: {
      backgroundColor: '#F1F5F9',
      borderColor: '#CBD5E1',
    },

    nextButtonHover: {
      backgroundColor: `${primaryColor}E6`, // Légèrement plus clair
    },

    // =================== ÉTATS DE FOCUS (accessibilité) ===================
    focused: {
      borderWidth: 2,
      borderColor: primaryColor,
    },
  });

export default createStyles;