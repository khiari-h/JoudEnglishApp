// PhraseCard/style.js - VERSION LDC suivant exactement VocabularyWordCard

import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get('window');

/**
 * 🏆 Styles niveau LDC pour PhraseCard
 * Suit exactement le pattern de VocabularyWordCard :
 * - Hero section spectaculaire
 * - Glassmorphism effects  
 * - Typography hiérarchisée
 * - Breathing room généreux
 * Adapté pour phrases (plus longues que mots simples)
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== CONTAINER PRINCIPAL ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== HERO SECTION - LA PHRASE PRINCIPALE ===================
    heroSection: {
      marginBottom: 24, // Breathing room généreux (même que VocabularyWordCard)
      borderRadius: 24,
      overflow: 'hidden',
      // Ombre spectaculaire pour la hero section (identique)
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
      paddingVertical: 40, // Légèrement réduit pour phrases (vs 48 pour mots)
      paddingHorizontal: 28, // Légèrement réduit (vs 32)
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      minHeight: 120, // Légèrement réduit (vs 140)
    },

    // =================== CERCLES DÉCORATIFS (IDENTIQUES) ===================
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

    // =================== LA PHRASE - STAR ABSOLUE (ADAPTÉ) ===================
    phraseContainer: {
      alignItems: 'center',
      zIndex: 2, // Au-dessus des cercles décoratifs
      paddingHorizontal: 12, // Ajouté pour phrases plus longues
    },
    phraseText: {
      fontSize: 28, // Réduit de 42 à 28 pour phrases plus longues
      fontWeight: '800', // Ultra bold (même que VocabularyWordCard)
      letterSpacing: 0.8, // Réduit de 1.2 à 0.8
      textAlign: 'center',
      marginBottom: 8,
      lineHeight: 36, // Ajouté pour phrases multi-lignes
      // Ombre pour le texte (identique)
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      }),
    },
    phraseUnderline: {
      width: 60, // Même taille que VocabularyWordCard
      height: 4,
      borderRadius: 2,
      opacity: 0.6,
    },

    // =================== CARD TRADUCTION (IDENTIQUE) ===================
    translationCard: {
      marginBottom: 20,
      backgroundColor: 'white',
      // Ombre moderne (identique)
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
      padding: 24, // Padding généreux (identique)
    },

    // =================== TRADUCTION VISIBLE (IDENTIQUE) ===================
    translationVisible: {
      alignItems: 'center',
    },
    translationWrapper: {
      alignItems: 'center',
      marginBottom: 20,
      position: 'relative',
      paddingHorizontal: 8, // Ajouté pour traductions longues
    },
    translationText: {
      fontSize: 24, // Réduit de 32 à 24 pour phrases
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 32, // Ajouté pour phrases multi-lignes
    },
    translationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },

    // =================== BOUTON HIDE (IDENTIQUE) ===================
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

    // =================== BOUTON REVEAL (IDENTIQUE) ===================
    revealButtonContainer: {
      borderRadius: 20,
      overflow: 'hidden',
      alignSelf: 'center',
      maxWidth: '70%',
      // Ombre réduite (identique)
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
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glassmorphism (identique)
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

    // =================== CARD EXEMPLE (IDENTIQUE) ===================
    exampleCard: {
      backgroundColor: '#FAFBFC',
      borderWidth: 1,
      borderColor: '#F1F3F4',
      marginBottom: 16, // Ajouté pour espacement avec contexte
    },
    exampleContent: {
      padding: 20,
    },

    // =================== HEADER EXEMPLE (IDENTIQUE) ===================
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

    // =================== TEXTE EXEMPLE (IDENTIQUE) ===================
    exampleText: {
      fontSize: 16,
      color: '#4B5563',
      lineHeight: 26,
    },
    exampleItalic: {
      fontStyle: 'italic',
      fontWeight: '500',
    },

    // =================== CARD CONTEXTE (NOUVELLE SECTION) ===================
    contextCard: {
      backgroundColor: '#F8F9FA', // Légèrement différent de l'exemple
      borderWidth: 1,
      borderColor: '#E9ECEF',
    },
    contextContent: {
      padding: 20,
    },

    // =================== HEADER CONTEXTE ===================
    contextHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    contextDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 12,
    },
    contextTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#374151',
      letterSpacing: 0.3,
    },
    contextLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#E5E7EB',
      marginLeft: 12,
    },

    // =================== TEXTE CONTEXTE ===================
    contextText: {
      fontSize: 16,
      color: '#4B5563',
      lineHeight: 26,
      fontWeight: '500',
    },

    // =================== LOADING (IDENTIQUE) ===================
    loadingCard: {
      marginHorizontal: 16,
      marginVertical: 8,
    },
    loadingContainer: {
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: '#6b7280',
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });

export default createStyles;