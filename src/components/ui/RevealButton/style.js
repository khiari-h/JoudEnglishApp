// src/components/ui/RevealButton/style.js
import { StyleSheet, Platform } from "react-native";

/**
 * 🔘 Styles génériques pour RevealButton
 * Glassmorphism et gradients pour tous les exercices
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== CARD CONTAINER ===================
    card: {
      marginBottom: 20,
      backgroundColor: 'white',
    },
    cardContent: {
      padding: 24,
    },

    // =================== CONTENU RÉVÉLÉ ===================
    revealedContainer: {
      alignItems: 'center',
    },
    contentWrapper: {
      alignItems: 'center',
      marginBottom: 20,
      position: 'relative',
      paddingHorizontal: 8,
    },
    revealedText: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 32,
    },
    contentDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },

    // =================== BOUTON HIDE ===================
    hideButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderWidth: 1.5,
      borderRadius: 20,
      backgroundColor: 'white',
      alignSelf: 'center',
    },
    hideButtonIcon: {
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    hideButtonText: {
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: 0.3,
    },

    // =================== BOUTON REVEAL ===================
    revealButtonContainer: {
      borderRadius: 20,
      overflow: 'hidden',
      alignSelf: 'center',
      maxWidth: '70%',
      // Ombre pour effet premium
      ...Platform.select({
        ios: {
          shadowColor: levelColor,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    revealButton: {
      borderRadius: 20,
      overflow: 'hidden',
    },
    glassEffect: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glassmorphism
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    revealIcon: {
      marginRight: 8,
    },
    revealButtonText: {
      color: 'white',
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: 0.3,
    },
    sparkle: {
      marginLeft: 6,
      fontSize: 14,
    },
  });

export default createStyles;