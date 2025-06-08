// VocabularyExercise/VocabularyWordCard/style.js
import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get('window');

/**
 * 🏆 Styles niveau LDC (Paris Saint-Germain) pour VocabularyWordCard
 * - Hero section spectaculaire
 * - Glassmorphism effects  
 * - Typography hiérarchisée
 * - Breathing room généreux
 * - Ombres et gradients modernes
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== CONTAINER PRINCIPAL ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== HERO SECTION - LE MOT PRINCIPAL ===================
    heroSection: {
      marginBottom: 24, // Breathing room généreux
      borderRadius: 24,
      overflow: 'hidden',
      // Ombre spectaculaire pour la hero section
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
      paddingVertical: 48, // Plus d'espace vertical
      paddingHorizontal: 32,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      minHeight: 140, // Hauteur minimum spectaculaire
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

    // =================== LE MOT - STAR ABSOLUE ===================
    wordContainer: {
      alignItems: 'center',
      zIndex: 2, // Au-dessus des cercles décoratifs
    },
    wordText: {
      fontSize: 42, // Taille spectaculaire
      fontWeight: '800', // Ultra bold
      letterSpacing: 1.2, // Espacement élégant
      textAlign: 'center',
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
    wordUnderline: {
      width: 60,
      height: 4,
      borderRadius: 2,
      opacity: 0.6,
    },

    // =================== CARD TRADUCTION ===================
    translationCard: {
      marginBottom: 20,
      backgroundColor: 'white',
      // Ombre moderne
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    translationContent: {
      padding: 24, // Padding généreux
    },

    // =================== TRADUCTION VISIBLE ===================
    translationVisible: {
      alignItems: 'center',
    },
    translationWrapper: {
      alignItems: 'center',
      marginBottom: 20,
      position: 'relative',
    },
    translationText: {
      fontSize: 32, // Augmenté pour rester dominant
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 20, // Plus d'espace
      lineHeight: 40,
    },
    translationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },

    // =================== BOUTON HIDE - VERSION DISCRÈTE ===================
    hideButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10, // Légèrement réduit
      paddingHorizontal: 16, // Légèrement réduit
      borderWidth: 1.5,
      borderRadius: 20, // Plus petit
      backgroundColor: 'white',
      alignSelf: 'center', // Centré
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

    // =================== BOUTON REVEAL - VERSION DISCRÈTE ===================
    revealButtonContainer: {
      borderRadius: 20, // Plus petit
      overflow: 'hidden',
      alignSelf: 'center',
      maxWidth: '70%', // Limite la largeur
      // Ombre réduite pour moins d'impact
      ...Platform.select({
        ios: {
          shadowColor: levelColor,
          shadowOffset: { width: 0, height: 3 }, // Réduit
          shadowOpacity: 0.15, // Réduit
          shadowRadius: 8, // Réduit
        },
        android: {
          elevation: 3, // Réduit
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
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 16,
      paddingVertical: 12, // Réduit de 18 à 12
      paddingHorizontal: 20, // Réduit de 32 à 20
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    revealIcon: {
      marginRight: 8, // Réduit
    },
    revealButtonText: {
      color: 'white',
      fontSize: 15, // Réduit de 18 à 15
      fontWeight: '600', // Réduit de 700 à 600
      letterSpacing: 0.3, // Réduit
    },
    sparkle: {
      marginLeft: 6, // Réduit
      fontSize: 14, // Réduit
    },

    // =================== CARD EXEMPLE ===================
    exampleCard: {
      backgroundColor: '#FAFBFC', // Background légèrement différent
      borderWidth: 1,
      borderColor: '#F1F3F4',
    },
    exampleContent: {
      padding: 20,
    },

    // =================== HEADER EXEMPLE ===================
    exampleHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    exampleDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 12,
    },
    exampleTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#374151',
      letterSpacing: 0.3,
    },
    exampleLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#E5E7EB',
      marginLeft: 12,
    },

    // =================== TEXTE EXEMPLE ===================
    exampleText: {
      fontSize: 16,
      color: '#4B5563',
      lineHeight: 26, // Line height généreux pour la lisibilité
    },
    exampleItalic: {
      fontStyle: 'italic',
      fontWeight: '500',
    },
  });

export default createStyles;