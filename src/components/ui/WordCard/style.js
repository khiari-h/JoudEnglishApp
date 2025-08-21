// src/components/ui/WordCard/style.js - STYLES MODERNES 2025 🎨

import { StyleSheet, Platform } from "react-native";

/**
 * 🎨 Styles modernes pour WordCard
 * Design épuré avec effets visuels subtils
 * Inspiré des meilleures apps 2025
 * ✅ ADAPTÉ : Gère mots, phrases, exercices de grammaire, questions de lecture, jeux de mots ET évaluations
 */
const createStyles = (levelColor, type = "word") =>
  StyleSheet.create({
    // =================== CONTAINER PRINCIPAL ===================
    container: {
      backgroundColor: 'white',
      borderRadius: 24,
      padding: 32,
      borderWidth: 1,
      borderColor: '#F1F5F9',
      marginHorizontal: 16,
      marginVertical: 16,
      // Ombre moderne et subtile
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

    // =================== COMPTEUR AVANCEMENT ===================
    counterSection: {
      alignItems: 'center',
      marginBottom: 24,
    },
    counterBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F8FAFC',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      gap: 8,
    },
    counterDot: {
      width: 8,
      height: 8,
      backgroundColor: levelColor,
      borderRadius: 4,
    },
    counterText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#475569',
      letterSpacing: 0.2,
    },

    // =================== CONTENU PRINCIPAL ===================
    contentSection: {
      alignItems: 'center',
      marginBottom: 32,
    },
    contentText: {
      fontSize: type === "assessment" ? 28 : type === "game" ? 32 : type === "reading" ? 18 : type === "grammar" ? 20 : type === "phrase" ? 24 : 48, // Adapté selon le type
      fontWeight: type === "assessment" ? '600' : type === "game" ? '700' : type === "reading" ? '600' : type === "grammar" ? '500' : type === "phrase" ? '400' : '300', // Plus gras pour évaluation
      color: '#1E293B',
      letterSpacing: type === "assessment" ? 0.4 : type === "game" ? 0.5 : type === "reading" ? 0.3 : type === "grammar" ? 0.2 : type === "phrase" ? 0 : -0.5, // LetterSpacing adapté
      lineHeight: type === "assessment" ? 36 : type === "game" ? 40 : type === "reading" ? 24 : type === "grammar" ? 28 : type === "phrase" ? 32 : 56, // LineHeight adapté
      textAlign: 'center',
      marginBottom: type === "assessment" ? 12 : type === "game" ? 8 : 16, // Espace adapté
      paddingHorizontal: type === "assessment" ? 28 : type === "game" ? 16 : type === "reading" ? 24 : type === "grammar" ? 20 : type === "phrase" ? 16 : 0, // Padding adapté
    },
    subtitleText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#64748B',
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 22,
    },
    contentUnderline: {
      width: type === "assessment" ? 80 : type === "game" ? 60 : type === "reading" ? 90 : type === "grammar" ? 100 : type === "phrase" ? 120 : 80, // Largeur adaptée
      height: 4,
      backgroundColor: levelColor,
      borderRadius: 2,
    },

    // =================== BOUTON REVEAL ===================
    revealButton: {
      borderRadius: 16,
      overflow: 'hidden',
      // Ombre du bouton
      ...Platform.select({
        ios: {
          shadowColor: levelColor,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
        },
        android: {
          elevation: 8,
        },
      }),
    },
    revealButtonGradient: {
      paddingHorizontal: 32,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    revealButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
      letterSpacing: 0.3,
    },

    // =================== CONTENU RÉVÉLÉ ===================
    translationContainer: {
      marginTop: 24,
      padding: 20,
      backgroundColor: '#F8FAFC',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#E2E8F0',
    },
    translationText: {
      fontSize: 18,
      color: '#475569',
      textAlign: 'center',
      lineHeight: 26,
      fontWeight: '500',
    },
  });

export default createStyles;
