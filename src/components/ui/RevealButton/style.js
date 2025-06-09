// src/components/ui/RevealButton/style.js - VERSION DYNAMIQUE
import { StyleSheet, Platform } from "react-native";

/**
 * 🔘 Styles dynamiques pour RevealButton
 * Micro-interactions, glassmorphism, animations premium
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== CARD CONTAINER ===================
    card: {
      marginBottom: 20,
      backgroundColor: 'white',
      overflow: 'hidden', // Pour les animations
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
      letterSpacing: 0.5,
    },
    
    // Dots animés
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 3,
    },

    // =================== BOUTON HIDE ===================
    hideButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderWidth: 1.5,
      borderRadius: 25,
      backgroundColor: 'white',
      alignSelf: 'center',
      // Ombre subtile animée
      ...Platform.select({
        ios: {
          shadowColor: levelColor,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    hideButtonIcon: {
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    hideButtonText: {
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: 0.3,
    },

    // =================== BOUTON REVEAL PREMIUM ===================
    revealButtonContainer: {
      borderRadius: 25,
      overflow: 'hidden',
      alignSelf: 'center',
      maxWidth: '80%',
      position: 'relative',
      // Ombre premium avec couleur du niveau
      ...Platform.select({
        ios: {
          shadowColor: levelColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    },
    revealButton: {
      borderRadius: 25,
      overflow: 'hidden',
      position: 'relative',
    },
    
    // Effet shimmer animé
    shimmerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      transform: [{ skewX: '-20deg' }],
    },
    
    // Glassmorphism amélioré
    glassEffect: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: 20,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(10px)', // Web only
    },
    revealIcon: {
      marginRight: 10,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    revealButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 0.5,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    sparkle: {
      marginLeft: 8,
      fontSize: 16,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
  });

export default createStyles;