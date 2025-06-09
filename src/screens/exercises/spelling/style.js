// SpellingExercise/style.js - VERSION REFACTORISÉE (ultra-simplifié)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour SpellingExercise
 * La majorité des styles est dans les composants génériques
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      flex: 1,
      backgroundColor: "white",
    },

    // =================== LOADING STATE ===================
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
  });

export default createStyles;