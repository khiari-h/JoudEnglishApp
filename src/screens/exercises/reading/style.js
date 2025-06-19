// ReadingExercise/style.js - VERSION DYNAMIQUE

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles dynamiques pour ReadingExercise
 * Support pour animations, micro-interactions, UX premium
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== LOADING STATE PREMIUM ===================
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    loadingText: {
      marginTop: 20,
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      letterSpacing: 0.5,
      lineHeight: 24,
    },

    // =================== SCROLL CONTENT OPTIMISÉ ===================
    scrollContent: {
      paddingBottom: 140, // Plus d'espace pour les animations
      minHeight: '100%',
      paddingTop: 10, // Respiration en haut
    },

    // =================== ANIMATIONS HELPER ===================
    animatedContainer: {
      flex: 1,
    },
    
    // Support pour les micro-interactions
    interactiveElement: {
      borderRadius: 12,
      overflow: 'hidden',
    },
    
    // Espacement dynamique
    dynamicSpacing: {
      marginVertical: 8,
      marginHorizontal: 4,
    },
  });

export default createStyles;