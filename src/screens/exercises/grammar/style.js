// GrammarExercise/style.js - VERSION REFACTORISÉE (cohérent avec VocabularyExercise)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour GrammarExercise
 * Ancien : 30+ lignes avec contentContainer padding custom
 * Nouveau : 15 lignes - les styles sont dans les composants génériques
 * Cohérent avec VocabularyExercise refactorisé
 * 
 * Plus besoin de :
 * - contentContainer avec padding → géré par les composants internes
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

    // 🧹 SUPPRIMÉ : safeArea, scrollView, contentContainer avec padding
    // Les composants génériques gèrent maintenant leurs propres marges/paddings
  });

export default createStyles;