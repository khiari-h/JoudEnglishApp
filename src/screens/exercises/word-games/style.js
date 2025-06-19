// src/screens/exercises/wordGames/style.js - VERSION ÉPURÉE

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour WordGamesExercise
 * Pattern identique à VocabularyExercise et LevelAssessment
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

    // =================== EMPTY STATE ===================
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
  });

export default createStyles;