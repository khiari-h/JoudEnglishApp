// ErrorCorrectionExercise/style.js - VERSION REFACTORISÉE (ultra-simplifié)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour ErrorCorrectionExercise
 * La majorité des styles est dans les composants génériques
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
  });

export default createStyles;