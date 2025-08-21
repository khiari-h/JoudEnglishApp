// PhrasesExercise/style.js - VERSION ULTRA-NETTOYÉE

import { StyleSheet } from "react-native";

/**
 * 🧹 Styles ultra-nettoyés pour PhrasesExercise
 * Garde SEULEMENT les styles utilisés dans le composant :
 * - loadingContainer ✅ (loading state)
 * - scrollContent ✅ (scroll props)
 * - emptyStateContainer ✅ (empty state)
 * 
 * 🗑️ SUPPRIMÉ tout le reste :
 * - loadingText (pas de texte dans loading)
 * - contentContainer (pas utilisé dans render)
 * - categoryTitleContainer (pas utilisé)
 * - categoryTitle (pas utilisé)
 * - emptyStateText (pas utilisé dans empty state)
 * - phrasePlaceholder (pas utilisé)
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

    // =================== SCROLL CONTENT ===================
    scrollContent: {
      paddingBottom: 120, // Espace en bas pour navigation
      minHeight: '100%',  // Contenu prend toute la hauteur
    },

    // =================== EMPTY STATE ===================
    emptyStateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },


  });

export default createStyles;