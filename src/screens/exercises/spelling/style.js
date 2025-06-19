// SpellingExercise/style.js - VERSION CORRIGÉE AVEC GESTION D'ERREUR

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles corrigés pour SpellingExercise
 * ✅ Ajout des styles d'erreur manquants
 * ✅ Amélioration de l'état de chargement
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

    loadingText: {
      fontSize: 16,
      color: '#64748b',
      marginTop: 16,
      fontWeight: '500',
    },

    // =================== ERROR STATE ===================
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 32,
    },

    errorTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#ef4444',
      marginBottom: 16,
      textAlign: 'center',
    },

    errorMessage: {
      fontSize: 16,
      color: '#475569',
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 12,
    },

    errorHint: {
      fontSize: 14,
      color: '#64748b',
      textAlign: 'center',
      fontStyle: 'italic',
      lineHeight: 20,
    },
  });

export default createStyles;