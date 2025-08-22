// ReadingText/style.js - VERSION STYLE GRAMMAR avec texte pepsy 🎯

import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles style Grammar pour ReadingText avec texte pepsy
 * Même design que GrammarRuleContent : header collapsible + section reading pepsy
 * ✅ Header collapsible avec gradient et icône livre
 * ✅ Section Reading avec style pepsy et texte plus gros
 * ❌ SUPPRIMÉ : Section Instructions
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== HEADER COLLAPSIBLE AMÉLIORÉ ===================
    headerContainer: {
      borderRadius: 16, // Plus arrondi
      overflow: 'hidden',
      marginBottom: 8,
      // Ombre plus moderne
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
    
    headerGradient: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#F1F5F9',
      // Gradient subtil pour effet premium
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)',
    },
    
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16, // Plus de padding
      paddingHorizontal: 20, // Plus de padding horizontal
    },

    // =================== HEADER LEFT AMÉLIORÉ ===================
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: 12, // Plus d'espace entre icône et titre
    },
    
    ruleIcon: {
      width: 28, // Plus grand
      height: 28,
      borderRadius: 8, // Coins plus arrondis
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 0, // Gap gère l'espacement maintenant
    },
    
    ruleTitle: {
      fontSize: 16, // Plus grand
      fontWeight: '600',
      color: '#1E293B', // Couleur plus foncée
      flex: 1,
      letterSpacing: 0.2,
    },

    // =================== HEADER RIGHT AMÉLIORÉ ===================
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8, // Plus d'espace
    },
    
    hintText: {
      fontSize: 12,
      fontWeight: '500',
      marginRight: 0, // Gap gère l'espacement
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },

    // =================== CONTENU EXPANSIBLE AMÉLIORÉ ===================
    contentWrapper: {
      overflow: 'hidden', // Important pour l'animation
      backgroundColor: '#FAFBFC',
      marginTop: 4,
      borderRadius: 16, // Plus arrondi
      borderWidth: 1,
      borderColor: '#F1F5F9',
      // Ombre subtile pour la profondeur
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
        },
        android: {
          elevation: 1,
        },
      }),
    },
    
    contentContainer: {
      padding: 20, // Plus de padding
    },

    // =================== 🆕 STYLES POUR SECTION READING "PEPSY" ===================
    // Style pour la section Reading (bleue comme livre) - PLUS PEPSY
    readingSection: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 24, // Plus de padding pour plus d'espace
      borderWidth: 1,
      borderColor: 'rgba(14, 165, 233, 0.15)', // Bordure bleue plus visible
      // Background gradient bleu plus prononcé pour plus de peps
      ...Platform.select({
        ios: {
          shadowColor: '#0EA5E9',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
        android: {
          elevation: 4,
        },
      }),
    },

    // =================== HEADER SECTIONS AVEC ICÔNES "MICRO" ===================
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 16, // Plus d'espace
      marginBottom: 20, // Plus d'espace avant le texte
    },

    // Icônes dans cercles colorés (style "micro") - PLUS PEPSY
    sectionIconContainer: {
      width: 40, // Plus grand pour plus de peps
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },

    // Couleurs spécifiques pour l'icône de lecture - PLUS PEPSY
    readingIcon: {
      backgroundColor: '#DBEAFE', // Bleu plus prononcé
      color: '#0EA5E9', // Bleu
    },

    // =================== TEXTES DES SECTIONS - PLUS PEPSY ===================
    sectionTitle: {
      fontSize: 18, // Plus gros
      fontWeight: '700', // Plus gras
      color: '#0EA5E9', // Couleur bleue pour plus de peps
      marginBottom: 4,
      letterSpacing: 0.3,
    },

    // =================== STYLES SPÉCIFIQUES POUR LE TEXTE DE LECTURE - PEPSY ===================
    readingText: {
      fontSize: 18, // PLUS GROS pour plus de visibilité
      color: '#1E293B', // Couleur plus foncée pour plus de contraste
      lineHeight: 28, // Plus d'espacement entre lignes
      textAlign: 'justify',
      fontWeight: '500',
      letterSpacing: 0.3, // Plus d'espacement entre lettres
      // Style pepsy avec padding et background
      backgroundColor: '#F8FAFC',
      padding: 20,
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: '#0EA5E9', // Bordure gauche bleue pour plus de peps
    },
  });

export default createStyles;