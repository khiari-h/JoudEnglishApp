// PhrasesExercise/style.js - VERSION REFACTORISÉE (cohérent avec Vocabulary + Grammar)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour PhrasesExercise
 * Ancien : 50+ lignes avec contentContainer custom et styles redondants
 * Nouveau : 20 lignes - les styles sont dans les composants génériques
 * Cohérent avec VocabularyExercise et GrammarExercise refactorisés
 * 
 * Plus besoin de :
 * - contentContainer avec padding custom → géré par les composants internes
 * - categoryTitleContainer styling complexe → simplifié
 * - Background colors custom → géré par Container layout
 * - Styles redondants → centralisés dans les composants génériques
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== LOADING STATE ===================
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      fontWeight: "500",
      textAlign: "center",
      letterSpacing: 0.3,
    },

    // =================== SCROLL CONTENT ===================
    scrollContent: {
      paddingBottom: 120, // Espace en bas pour navigation
      minHeight: '100%',  // Contenu prend toute la hauteur
    },

    // =================== CONTENT CONTAINER (SIMPLIFIÉ) ===================
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: '#f8fafc',
    },
    categoryTitleContainer: {
      marginBottom: 15,
    },
    categoryTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1e293b',
    },

    // =================== EMPTY STATE ===================
    emptyStateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    emptyStateText: {
      fontSize: 16,
      color: '#6B7280',
      textAlign: 'center',
      fontStyle: 'italic',
    },

    // =================== PHRASE PLACEHOLDER ===================
    phrasePlaceholder: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F3F4F6',
      borderRadius: 12,
      marginTop: 16,
    },

    // 🧹 SUPPRIMÉ : styles complexes maintenant dans les composants génériques
  });

export default createStyles;