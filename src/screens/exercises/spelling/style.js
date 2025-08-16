// SpellingExercise/style.js - VERSION MODERNISÉE (cohérent avec PhrasesExercise et GrammarExercise)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles modernisés pour SpellingExercise
 * Ancien : Style détaillé avec errorContainer, errorTitle, etc.
 * Nouveau : Style ultra-simplifié, cohérent avec les autres modules
 * 
 * 🧹 SUPPRIMÉ :
 * - errorContainer, errorTitle, errorMessage, errorHint (gérés par les composants)
 * - Styles redondants et personnalisés
 * 
 * ✅ GARDÉ :
 * - loadingContainer (loading state)
 * - scrollContent (scroll props si nécessaire)
 * 
 * 🎨 APPROCHE : Les composants internes gèrent leurs propres styles
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

    // 🧹 SUPPRIMÉ : errorContainer, errorTitle, errorMessage, errorHint
    // Les composants internes gèrent maintenant leurs propres styles d'erreur
  });

export default createStyles;