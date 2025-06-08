// src/components/ui/HeroCard/style.js
import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles génériques pour HeroCard
 * Optimisés pour tous les types d'exercices
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== HERO SECTION ===================
    heroSection: {
      marginBottom: 24,
      borderRadius: 24,
      overflow: 'hidden',
      // Ombre spectaculaire
      ...Platform.select({
        ios: {
          shadowColor: levelColor,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
        },
        android: {
          elevation: 8,
        },
      }),
    },

    heroGradient: {
      paddingVertical: 40,
      paddingHorizontal: 28,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      minHeight: 120,
    },

    // =================== CERCLES DÉCORATIFS ===================
    decorativeCircle: {
      position: 'absolute',
      borderRadius: 999,
    },
    circle1: {
      width: 120,
      height: 120,
      top: -60,
      right: -40,
      opacity: 0.3,
    },
    circle2: {
      width: 80,
      height: 80,
      bottom: -40,
      left: -20,
      opacity: 0.2,
    },

    // =================== CONTENU PRINCIPAL ===================
    contentContainer: {
      alignItems: 'center',
      zIndex: 2,
      paddingHorizontal: 12,
    },

    contentText: {
      fontWeight: '800',
      letterSpacing: 0.8,
      marginBottom: 8,
      // Ombre pour le texte
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      }),
    },

    underline: {
      width: 60,
      height: 4,
      borderRadius: 2,
      opacity: 0.6,
    },
  });

export default createStyles;