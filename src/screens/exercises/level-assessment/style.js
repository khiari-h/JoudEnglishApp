// src/screens/exercises/levelAssessment/style.js - VERSION ÉPURÉE

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour LevelAssessment
 * Pattern identique à VocabularyExercise/style.js
 * La majorité des styles est déléguée aux composants génériques
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