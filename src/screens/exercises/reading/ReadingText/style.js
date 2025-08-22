// ReadingText/style.js - VERSION MODERNISÉE avec style Grammar 🎯

import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles modernisés pour ReadingText
 * HARMONISÉ : Même style que GrammarRuleContent moderne
 * SUPPRIMÉ : Styles pour estimation de temps et compteur de mots
 * ✅ Design épuré et cohérent
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== STYLES POUR CONTENT SECTION ===================
    // Ces styles complètent ceux de ContentSection pour le style moderne
    
    // Style pour la section de lecture (bleu comme livre)
    readingSection: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: 'rgba(59, 130, 246, 0.1)', // Bordure bleue subtile
      // Background gradient bleu très léger
      ...Platform.select({
        ios: {
          shadowColor: '#3B82F6',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.03,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    // =================== HEADER SECTIONS AVEC ICÔNES "MICRO" ===================
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 12,
    },

    // Icônes dans cercles colorés (style "micro" comme Grammar)
    sectionIconContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },

    // Couleurs spécifiques pour l'icône de lecture
    readingIcon: {
      backgroundColor: '#E0F2FE', // Bleu très clair
      color: '#0EA5E9', // Bleu
    },

    // =================== TEXTES DES SECTIONS ===================
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#1E293B',
      marginBottom: 4,
      letterSpacing: 0.2,
    },
    
    sectionContent: {
      fontSize: 14,
      color: '#64748B',
      lineHeight: 20,
      fontWeight: '500',
    },

    // =================== STYLES POUR LE TEXTE DE LECTURE ===================
    readingText: {
      fontSize: 16,
      color: '#374151',
      lineHeight: 24,
      textAlign: 'justify',
      fontWeight: '500',
      letterSpacing: 0.2,
    },
  });

export default createStyles;