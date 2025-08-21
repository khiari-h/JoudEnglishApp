// src/components/exercise-common/CategorySelector/style.js
import { StyleSheet, Platform } from 'react-native';

/**
 * 🎯 Styles épurés et professionnels pour CategorySelector
 * - Design moderne et sobre
 * - Couleurs douces et cohérentes
 * - Animations subtiles
 * - Focus sur l'utilisabilité
 * - Fini les effets excessifs
 */
const createStyles = (primaryColor = "#3B82F6") =>
  StyleSheet.create({
    // =================== CONTAINER PRINCIPAL ===================
    container: {
      marginVertical: 16,
      height: 60,
    },
    backgroundGradient: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent', // Plus de gradient de fond
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
      // Ombre très subtile
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    // =================== TOUCHABLE ===================
    categoryTouchable: {
      borderRadius: 20,
      overflow: 'hidden',
    },

    // =================== PILL SÉLECTIONNÉE - Style épuré ===================
    selectedCategoryItem: {
      backgroundColor: primaryColor, // Couleur unie, pas de gradient
      borderRadius: 20,
      // Ombre douce pour la sélection
      ...Platform.select({
        ios: {
          shadowColor: primaryColor,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    selectedInner: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: 'transparent', // Plus d'effet glassmorphism
      minHeight: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedCategoryText: {
      fontSize: 14,
      fontWeight: '600', // Moins gras qu'avant
      color: 'white',
      letterSpacing: 0.2,
      textAlign: 'center',
    },

    // =================== SUPPRESSION DE L'ÉTOILE ===================
    // sparkleContainer et sparkle complètement supprimés

    // =================== PILL NON SÉLECTIONNÉE ===================
    categoryItem: {
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#E2E8F0', // Gris très doux
      // Ombre minimale
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
        },
        android: {
          elevation: 1,
        },
      }),
    },
    categoryInner: {
      paddingHorizontal: 18,
      paddingVertical: 10,
      backgroundColor: 'transparent', // Plus de couleur de fond
      minHeight: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '500', // Poids moyen
      color: '#64748B', // Gris moderne
      letterSpacing: 0.1,
      textAlign: 'center',
    },

    // =================== ÉTATS HOVER (si nécessaire) ===================
    categoryItemHover: {
      borderColor: '#CBD5E1', // Bordure légèrement plus foncée au hover
      backgroundColor: '#F8FAFC', // Fond très légèrement gris
    },

    // =================== ÉTATS DISABLED (optionnel) ===================
    categoryItemDisabled: {
      opacity: 0.5,
      backgroundColor: '#F1F5F9',
    },
    categoryTextDisabled: {
      color: '#94A3B8',
    },
  });

export default createStyles;