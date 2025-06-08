// NavigationButtons/style.js - VERSION OPTIMISÉE (300 → 80 lignes)

import { StyleSheet, Platform } from 'react-native';

/**
 * 🎯 Styles optimisés pour NavigationButtons
 * Ancien : 300 lignes avec standard/compact dupliqué
 * Nouveau : 80 lignes avec une seule variante élégante
 * Cohérent avec HeroCard/RevealButton/ContentSection
 */
const createStyles = (primaryColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 12,
      borderRadius: 16,
      overflow: 'hidden',
      // Ombre modérée et cohérente
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

    gradient: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },

    // =================== ROW BOUTONS ===================
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    // =================== BOUTON PRÉCÉDENT ===================
    previousButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: `${primaryColor}20`,
      // Ombre légère
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    previousText: {
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: 0.2,
      marginLeft: 6,
    },

    // =================== BOUTON SUIVANT ===================
    nextButtonContainer: {
      borderRadius: 16,
      overflow: 'hidden',
      // Ombre pour CTA principal (même niveau que RevealButton)
      ...Platform.select({
        ios: {
          shadowColor: primaryColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    nextButton: {
      borderRadius: 16,
    },
    nextButtonInner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      paddingHorizontal: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassmorphism cohérent
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
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
    sparkle: {
      fontSize: 14,
      marginLeft: 6,
    },
  });

export default createStyles;