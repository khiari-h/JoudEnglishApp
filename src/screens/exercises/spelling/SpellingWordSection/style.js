// SpellingWordSection/style.js - Garde styles compteur et exercice

import { StyleSheet, Platform } from "react-native";

/**
 * ⚡ Styles pour SpellingWordSection
 * Pattern identique à VocabularyWordSection et ErrorCorrectionWordSection
 */
const createStyles = (levelColor = "#3b82f6") =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      flex: 1,
      paddingBottom: 20,
    },
    
    // =================== COMPTEUR SECTION ===================
    counterSection: {
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 20,
      overflow: 'hidden',
    },
    counterGradient: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    
    // =================== BADGE COMPLETED ===================
    completedBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: '#10b981',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    completedText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '700',
    },
    
    // =================== BADGE COMPTEUR ===================
    counterBadge: {
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 16,
      borderWidth: 1,
      // Ombre subtile
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    counterText: {
      fontSize: 18,
      fontWeight: '800',
      letterSpacing: 0.5,
    },

    // =================== EXERCISE CONTENT ===================
    exerciseContent: {
      backgroundColor: 'white',
      marginHorizontal: 16,
      borderRadius: 16,
      padding: 20,
      ...Platform.select({
        ios: {
          shadowColor: '#64748b',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
      }),
    },

    // =================== HOMOPHONES SPECIFIC ===================
    homophoneContainer: {
      marginBottom: 16,
    },
    instruction: {
      fontSize: 18,
      fontWeight: "600",
      color: "#1e293b",
      textAlign: "center",
      marginBottom: 8,
      lineHeight: 24,
    },
  });

export default createStyles;