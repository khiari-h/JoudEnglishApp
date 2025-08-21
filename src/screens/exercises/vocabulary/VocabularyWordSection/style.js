// VocabularyWordSection/style.js - VERSION MODERNISÉE avec ExampleCard

import { StyleSheet, Platform } from "react-native";

/**
 * ⚡ Styles pour VocabularyWordSection
 * ❌ SUPPRIMÉ : Styles CounterSection (maintenant intégré dans WordCard)
 * NOUVELLE ExampleCard moderne avec style indigo
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      flex: 1,
      paddingBottom: 20,
    },

    // =================== 🆕 EXAMPLE CARD MODERNE ===================
    exampleCard: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: '#F1F5F9', // Gris très clair
      marginHorizontal: 16,
      marginTop: 16,
      // Ombre subtile et moderne
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
    exampleContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    exampleIconContainer: {
      width: 32,
      height: 32,
      backgroundColor: '#EEF2FF', // Indigo très clair
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0, // Empêche la compression
    },
    exampleTextContainer: {
      flex: 1,
      gap: 4,
    },
    exampleTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#6366F1', // Indigo vif
      letterSpacing: 0.2,
    },
    exampleText: {
      fontSize: 14,
      color: '#6B7280', // Gris moyen
      lineHeight: 20,
      fontStyle: 'italic',
      fontWeight: '500',
    },
  });

export default createStyles;