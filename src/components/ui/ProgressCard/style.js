// src/components/ui/ProgressCard/style.js - VERSION ÉPURÉE SANS DOTS
import { StyleSheet, Platform } from "react-native";

/**
 * 📊 Styles Épurés pour ProgressCard
 * ✨ Design moderne et clean
 * 🚫 Suppression des categoryDot et éléments visuels superflus
 * 🎯 Focus sur la lisibilité et la simplicité
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== CONTAINER PRINCIPAL ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== CARD PRINCIPALE ===================
    cardGradient: {
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#F1F5F9',
      // Ombre subtile
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

    // =================== HEADER ===================
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      paddingBottom: 12,
    },
    headerLeft: {
      flex: 1,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },

    // =================== TYPOGRAPHY ===================
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: '#1F2937',
      letterSpacing: 0.2,
    },
    subtitle: {
      fontSize: 13,
      fontWeight: '500',
      color: '#6B7280',
      letterSpacing: 0.1,
      marginTop: 2,
    },

    // =================== STATS ÉPURÉES ===================
    statsContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    statsCount: {
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 0.3,
    },
    statsTotal: {
      fontSize: 14,
      color: '#6B7280',
      fontWeight: '500',
    },
    statsPercentage: {
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 0.3,
    },

    // =================== CHEVRON D'EXPANSION ===================
    chevronContainer: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      backgroundColor: `${levelColor}10`,
      transform: [{ rotate: '0deg' }],
    },
    chevronExpanded: {
      transform: [{ rotate: '180deg' }],
    },

    // =================== SECTION PROGRESSION ===================
    progressSection: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },

    // =================== EXPANSION ÉPURÉE ===================
    expansionWrapper: {
      marginTop: 8,
      backgroundColor: '#FAFBFC',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#F1F5F9',
      overflow: 'hidden',
    },
    expansionContainer: {
      padding: 16,
    },

    // =================== HEADER EXPANSION ===================
    expansionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    expansionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#374151',
      letterSpacing: 0.2,
    },
    expansionSubtitle: {
      fontSize: 12,
      fontWeight: '500',
      color: '#6B7280',
    },

    // =================== LISTE DES CATÉGORIES ===================
    categoriesList: {
      gap: 12,
    },

    // =================== ITEM CATÉGORIE ÉPURÉ ===================
    categoryItem: {
      padding: 12,
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#F3F4F6',
      // Ombre très subtile
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.03,
          shadowRadius: 2,
        },
        android: {
          elevation: 1,
        },
      }),
    },

    // =================== ROW CATÉGORIE ===================
    categoryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    categoryTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: '#374151',
      flex: 1,
      letterSpacing: 0.1,
    },
    categoryStats: {
      fontSize: 13,
      fontWeight: '600',
      letterSpacing: 0.2,
    },

    // =================== PROGRESS CATÉGORIE ===================
    categoryProgressContainer: {
      // Le ProgressBar gère ses propres styles
    },
  });

export default createStyles;