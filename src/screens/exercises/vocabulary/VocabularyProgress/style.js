// src/components/screens/exercises/vocabulary/VocabularyProgress/style.js
import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles Corrects pour VocabularyProgress
 * - Sans icône rouge
 * - Avec expansion pour catégories
 * - Sans labels progression inutiles
 * - Mobile-first et épuré
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

    // =================== HEADER SANS ICÔNE ===================
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
      gap: 4,
    },

    // =================== TYPOGRAPHY ===================
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: '#1F2937',
      letterSpacing: 0.2,
    },
    statsCount: {
      fontSize: 15,
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
      marginLeft: 8,
      marginRight: 8,
    },

    // =================== SECTION PROGRESSION ===================
    progressSection: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    progressBar: {
      // Simple
    },

    // =================== WRAPPER CATÉGORIES ===================
    categoriesWrapper: {
      overflow: 'hidden',
      backgroundColor: '#FAFBFC',
      marginTop: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#F1F5F9',
    },
    categoriesContainer: {
      padding: 16,
    },

    // =================== HEADER CATÉGORIES ===================
    categoriesHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    categoryDivider: {
      flex: 1,
      height: 1,
      opacity: 0.6,
    },
    categoriesTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: '#6B7280',
      marginHorizontal: 12,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },

    // =================== ITEM CATÉGORIE ===================
    categoryItem: {
      marginBottom: 12,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#F3F4F6',
    },
    categoryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    categoryLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    categoryDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 10,
      opacity: 0.8,
    },
    categoryTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: '#374151',
      flex: 1,
    },
    categoryStats: {
      fontSize: 13,
      fontWeight: '600',
      letterSpacing: 0.2,
    },
    categoryProgress: {
      // Minimal
    },
  });

export default createStyles;