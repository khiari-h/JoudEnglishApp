// src/components/ui/RevealButton/style.js - DESIGN BABBEL 2025 🎯

import { StyleSheet, Platform } from "react-native";

/**
 * 🔘 Styles Babbel 2025 pour RevealButton
 * - Simple et cohérent avec NavigationButtons
 * - Pas de délire shimmer/glassmorphism
 * - Juste propre et efficace
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    
    // =================== CARD CONTAINER ===================
    card: {
      marginBottom: 20,
      backgroundColor: 'white',
    },
    cardContent: {
      padding: 20,
    },

    // =================== CONTENU RÉVÉLÉ ===================
    revealedContainer: {
      alignItems: 'center',
    },
    
    contentWrapper: {
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 8,
    },
    
    revealedText: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      lineHeight: 32,
      letterSpacing: 0.4,
    },

    // =================== BOUTON HIDE - Style ghost comme "Précédent" ===================
    hideButton: {
      paddingVertical: 12,
      paddingHorizontal: 18,
      backgroundColor: 'white',
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: `${levelColor}25`,
      alignSelf: 'center',
      
      // Ombre subtile comme les autres boutons
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    
    hideButtonText: {
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: 0.2,
    },

    // =================== BOUTON REVEAL - Style cohérent avec "Suivant" ===================
    revealButtonContainer: {
      borderRadius: 18,
      overflow: 'hidden',
      alignSelf: 'center',
      
      // Ombre colorée comme le bouton "Suivant"
      ...Platform.select({
        ios: {
          shadowColor: levelColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    },
    
    revealButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 28,
      borderRadius: 18,
    },
    
    revealButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: 'white',
      letterSpacing: 0.3,
    },
  });

export default createStyles;