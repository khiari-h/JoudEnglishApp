// VocabularyExercise/style.js - VERSION REFACTORISÉE (nettoyage complet)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour VocabularyExercise
 * Ancien fichier : 50+ lignes avec progressContainer, progressFill, etc.
 * Nouveau fichier : 15 lignes - les styles sont dans les composants génériques
 * 
 * Plus besoin de :
 * - progressContainer, progressBarContainer, progressFill → dans ProgressCard
 * - cardContainer → dans HeroCard, RevealButton, ContentSection
 * - container avec padding → géré par Container layout
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
  });

export default createStyles;