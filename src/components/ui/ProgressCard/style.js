// src/components/ui/ProgressCard/style.js - VERSION RÉORGANISÉE
import { StyleSheet, Platform } from "react-native";

/**
 * 📊 Styles Réorganisés pour ProgressCard
 * ✨ Header avec icônes et titre
 * 🎯 Section principale avec message motivant et score
 * 📈 Barre de progression en dessous
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
      borderWidth: 0,
      // Ombre plus marquée pour la profondeur
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    },

    // =================== HEADER AVEC ICÔNES ===================
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      paddingBottom: 12,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },

    // Bouton retour
    backButton: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      backgroundColor: '#F3F4F6',
    },

    // Titre principal
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: levelColor,
      letterSpacing: 0.2,
    },

    // =================== SECTION PRINCIPALE ===================
    mainContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    mainContentLeft: {
      flex: 1,
    },
    mainContentRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },

    // Message principal
    mainTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#1F2937',
      letterSpacing: 0.2,
    },
    mainSubtitle: {
      fontSize: 13,
      fontWeight: '500',
      color: '#6B7280',
      letterSpacing: 0.1,
      marginTop: 2,
    },

    // Container du score
    scoreContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    scoreDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#EF4444',
    },
    scoreText: {
      fontSize: 18,
      fontWeight: '700',
      color: '#EF4444',
      letterSpacing: 0.5,
    },

    // Bouton d'expansion
    expandButton: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      backgroundColor: '#FCE7F3',
    },

    // =================== SECTION PROGRESSION ===================
    progressSection: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    progressHeader: {
      marginBottom: 8,
    },
    percentageText: {
      fontSize: 14,
      fontWeight: '600',
      letterSpacing: 0.2,
    },
    
    // Barre de progression simplifiée
    simpleProgressBar: {
      height: 12,
      backgroundColor: '#F3F4F6',
      borderRadius: 6,
      overflow: 'hidden',
    },
    simpleProgressFill: {
      height: '100%',
      borderRadius: 6,
    },

    // =================== EXPANSION ===================
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

    // =================== ITEM CATÉGORIE ===================
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