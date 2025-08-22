// ReadingExercise/style.js - VERSION MODERNISÉE avec style Grammar 🎯

import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles modernisés pour ReadingExercise
 * HARMONISÉ : Même style que GrammarRuleContent moderne
 * ✅ Design redesigné et cohérent
 * ✅ Suppression des styles inutiles
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== LOADING STATE MODERNE ===================
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },

    // =================== SCROLL CONTENT OPTIMISÉ ===================
    scrollContent: {
      paddingBottom: 140, // Plus d'espace pour les animations
      minHeight: '100%',
      paddingTop: 10, // Respiration en haut
    },

    // =================== STYLES POUR COMPOSANTS COMMUNS ===================
    // Ces styles complètent ceux des composants communs pour le style moderne
    
    // Style pour les sections de contenu (cohérent avec Grammar)
    contentSection: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: '#F1F5F9',
      marginHorizontal: 16,
      marginVertical: 8,
      // Ombre moderne et subtile
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
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