// GrammarRuleContent/style.js - VERSION REDESIGNÉE avec style "micro" 🎯

import { StyleSheet, Platform } from 'react-native';

/**
 * 🎯 Styles redesignés pour GrammarRuleContent
 * NOUVEAU : Style "micro" comme vocabulaire avec icônes dans cercles colorés
 * Header collapsible amélioré + sections ContentSection modernes
 * Focus sur la cohérence visuelle avec le reste de l'app
 */
const createStyles = () =>
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
      overflow: 'hidden',
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
      gap: 16, // Espacement entre les ContentSections
    },

    // =================== 🆕 STYLES POUR SECTIONS "MICRO" ===================
    // Ces styles viennent compléter ceux de ContentSection pour le style "micro"
    
    // Style pour la section Explanation (violet comme ampoule)
    explanationSection: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: 'rgba(168, 85, 247, 0.1)', // Bordure violette subtile
      // Background gradient violet très léger
      background: 'linear-gradient(135deg, #fef7ff 0%, #faf5ff 100%)',
      ...Platform.select({
        ios: {
          shadowColor: '#A855F7',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.03,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    // Style pour la section Examples (bleu comme crayon)
    examplesSection: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: 'rgba(14, 165, 233, 0.1)', // Bordure bleue subtile
      // Background gradient bleu très léger
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      ...Platform.select({
        ios: {
          shadowColor: '#0EA5E9',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.03,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    // Style pour la section Rules (vert comme check)
    rulesSection: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: 'rgba(34, 197, 94, 0.1)', // Bordure verte subtile
      // Background gradient vert très léger
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
      ...Platform.select({
        ios: {
          shadowColor: '#22C55E',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.03,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    // =================== 🆕 HEADER SECTIONS AVEC ICÔNES "MICRO" ===================
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 12,
    },

    // Icônes dans cercles colorés (style "micro")
    sectionIconContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },

    // Couleurs spécifiques pour chaque type d'icône
    explanationIcon: {
      backgroundColor: '#F3E8FF', // Violet très clair
      color: '#A855F7', // Violet
    },
    
    examplesIcon: {
      backgroundColor: '#E0F2FE', // Bleu très clair
      color: '#0EA5E9', // Bleu
    },
    
    rulesIcon: {
      backgroundColor: '#DCFCE7', // Vert très clair
      color: '#22C55E', // Vert
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

    // =================== STYLES SPÉCIFIQUES POUR EXEMPLES ===================
    exampleItem: {
      marginBottom: 12,
      paddingLeft: 16,
      borderLeftWidth: 2,
      borderLeftColor: '#E2E8F0',
    },
    
    exampleEnglish: {
      fontSize: 14,
      fontWeight: '500',
      color: '#374151',
      marginBottom: 4,
    },
    
    exampleFrench: {
      fontSize: 14,
      color: '#64748B',
      fontStyle: 'italic',
    },

    // =================== STYLES SPÉCIFIQUES POUR RÈGLES ===================
    ruleItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      marginBottom: 8,
    },
    
    ruleNumber: {
      backgroundColor: '#22C55E',
      color: 'white',
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: '600',
      flexShrink: 0,
      marginTop: 1,
    },
    
    ruleText: {
      fontSize: 14,
      color: '#374151',
      fontWeight: '500',
      flex: 1,
      lineHeight: 20,
    },
  });

export default createStyles;