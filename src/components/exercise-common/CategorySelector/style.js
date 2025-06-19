// src/components/exercise-common/CategorySelector/style.js
import { StyleSheet, Platform } from 'react-native';

/**
 * 🏆 Styles niveau LDC (Paris Saint-Germain) pour CategorySelector
 * - Pills modernes avec glassmorphism
 * - Animations fluides et micro-interactions
 * - Gradients dynamiques
 * - Typography premium
 * - Ombres spectaculaires
 */
const createStyles = (primaryColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== CONTAINER PRINCIPAL ===================
    container: {
      marginVertical: 16,
      height: 60, // Hauteur fixe pour éviter les sauts de layout
    },
    backgroundGradient: {
      flex: 1,
      justifyContent: 'center',
    },

    // =================== SCROLL VIEW ===================
    scrollView: {
      flexGrow: 0,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      alignItems: 'center',
    },

    // =================== WRAPPER AVEC ANIMATION ===================
    categoryItemWrapper: {
      marginRight: 12,
      // Ombre pour l'effet de hover
      ...Platform.select({
        ios: {
          shadowColor: primaryColor,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    },

    // =================== TOUCHABLE ===================
    categoryTouchable: {
      borderRadius: 24,
      overflow: 'hidden',
    },

    // =================== PILL SÉLECTIONNÉE - Hero style ===================
    selectedCategoryItem: {
      borderRadius: 24,
      overflow: 'hidden',
      // Ombre spectaculaire pour l'état sélectionné
      ...Platform.select({
        ios: {
          shadowColor: primaryColor,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
        },
        android: {
          elevation: 8,
        },
      }),
    },
    selectedInner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassmorphism
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      minHeight: 44, // Touch-friendly
    },
    selectedCategoryText: {
      fontSize: 15,
      fontWeight: '700',
      color: 'white',
      letterSpacing: 0.3,
      // Ombre pour le texte sélectionné
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
      }),
    },

    // =================== EFFET SPARKLE ===================
    sparkleContainer: {
      marginLeft: 8,
      opacity: 0.9,
    },
    sparkle: {
      fontSize: 12,
    },

    // =================== PILL NON SÉLECTIONNÉE ===================
    categoryItem: {
      borderRadius: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Base glassmorphism
      overflow: 'hidden',
      // Ombre subtile pour l'état normal
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    categoryInner: {
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.4)', // Glassmorphism border
      minHeight: 40, // Légèrement plus petit que sélectionné
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '600',
      letterSpacing: 0.2,
      textAlign: 'center',
    },
  });

export default createStyles;