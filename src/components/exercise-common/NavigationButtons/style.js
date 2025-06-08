// src/components/exercise-common/NavigationButtons/style.js
import { StyleSheet, Platform } from 'react-native';

/**
 * 🏆 Styles niveau LDC (Paris Saint-Germain) pour NavigationButtons
 * - Glassmorphism effects premium
 * - Gradients dynamiques et modernes
 * - Typography hiérarchisée
 * - Ombres spectaculaires
 * - Micro-interactions élégantes
 */
const createStyles = (primaryColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== CONTAINER PRINCIPAL ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 12,
      borderRadius: 20,
      overflow: 'hidden',
      // Ombre spectaculaire pour l'ensemble
      ...Platform.select({
        ios: {
          shadowColor: primaryColor,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
        },
        android: {
          elevation: 6,
        },
      }),
    },
    backgroundGradient: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.95)', // Base glassmorphism
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },

    // =================== CONTAINER BOUTONS ===================
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },

    // =================== BOUTON PRÉCÉDENT - Glassmorphism ===================
    previousButton: {
      borderRadius: 16,
      overflow: 'hidden',
      // Ombre pour le bouton précédent
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    previousButtonInner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)', // Glassmorphism border
    },
    previousIconContainer: {
      width: 28,
      height: 28,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    previousButtonText: {
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: 0.3,
    },

    // =================== BOUTON SUIVANT - Hero CTA ===================
    nextButtonContainer: {
      borderRadius: 18,
      overflow: 'hidden',
      // Ombre spectaculaire pour le CTA
      ...Platform.select({
        ios: {
          shadowColor: primaryColor,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
        },
        android: {
          elevation: 8,
        },
      }),
    },
    nextButton: {
      borderRadius: 18,
      overflow: 'hidden',
    },
    nextButtonInner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassmorphism
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      minHeight: 52, // Touch-friendly
    },
    nextButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: 'white',
      letterSpacing: 0.4,
      marginRight: 8,
      // Ombre pour le texte
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
      }),
    },
    nextIconContainer: {
      marginLeft: 4,
    },

    // =================== EFFET SPARKLE POUR TERMINER ===================
    finishSparkle: {
      marginLeft: 8,
      opacity: 0.9,
    },
    sparkleText: {
      fontSize: 14,
    },

    // =================== INDICATEUR DE PROGRESSION ===================
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    progressDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      marginHorizontal: 8,
      opacity: 0.6,
    },
    progressText: {
      fontSize: 13,
      fontWeight: '600',
      letterSpacing: 0.5,
      textAlign: 'center',
    },

    // =================== ÉTATS DISABLED ===================
    disabledButton: {
      opacity: 0.5,
    },
    disabledButtonContainer: {
      opacity: 0.6,
    },

    // =================== VERSION COMPACTE ===================
    compactContainer: {
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 20,
      overflow: 'hidden',
    },
    compactGradient: {
      paddingVertical: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    compactButtonsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // =================== BOUTON PRÉCÉDENT COMPACT ===================
    compactPreviousButton: {
      borderRadius: 16,
      marginRight: 20,
      // Ombre compacte
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    compactButtonInner: {
      width: 48,
      height: 48,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },

    // =================== INDICATEUR COMPACT ===================
    compactProgressContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      marginHorizontal: 20,
    },
    compactProgressText: {
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 0.4,
    },

    // =================== BOUTON SUIVANT COMPACT ===================
    compactNextButtonContainer: {
      borderRadius: 16,
      marginLeft: 20,
      // Ombre spectaculaire compacte
      ...Platform.select({
        ios: {
          shadowColor: primaryColor,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    },
    compactNextButton: {
      borderRadius: 16,
    },
    compactNextInner: {
      width: 48,
      height: 48,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },

    // =================== ÉTATS DISABLED COMPACT ===================
    disabledCompactButton: {
      opacity: 0.5,
    },
  });

export default createStyles;