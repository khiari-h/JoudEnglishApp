// GrammarRuleContent/style.js - VERSION REFACTORISÉE (200 → 80 lignes)

import { StyleSheet, Platform } from 'react-native';

/**
 * 📚 Styles optimisés pour GrammarRuleContent
 * Ancien : 200 lignes avec sections custom dupliquées
 * Nouveau : 80 lignes - ContentSection gère explication, exemples, règles
 * Focus sur le header collapsible unique à Grammar
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== HEADER COLLAPSIBLE (garde le custom) ===================
    headerContainer: {
      borderRadius: 12,
      overflow: 'hidden',
      // Ombre subtile pour le header
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        android: {
          elevation: 1,
        },
      }),
    },
    headerGradient: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#F1F5F9',
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },

    // =================== HEADER LEFT ===================
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    ruleIcon: {
      width: 24,
      height: 24,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    ruleTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#374151',
      flex: 1,
      letterSpacing: 0.2,
    },

    // =================== HEADER RIGHT ===================
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    hintText: {
      fontSize: 12,
      fontWeight: '500',
      marginRight: 6,
      letterSpacing: 0.3,
    },

    // =================== CONTENU EXPANSIBLE ===================
    contentWrapper: {
      overflow: 'hidden',
      backgroundColor: '#FAFBFC',
      marginTop: 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#F1F5F9',
    },
    contentContainer: {
      padding: 16,
      gap: 16, // Espacement entre les ContentSections
    },

    // 🧹 SUPPRIMÉ : explanationSection, section, sectionHeader, etc.
    // Tous ces styles sont maintenant dans ContentSection générique !
  });

export default createStyles;