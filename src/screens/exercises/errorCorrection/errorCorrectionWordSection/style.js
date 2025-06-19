// ErrorCorrectionWordSection/style.js - Garde styles compteur

import { StyleSheet, Platform } from "react-native";

/**
 * ⚡ Styles pour ErrorCorrectionWordSection
 * Garde les styles du compteur, le reste est dans les modes refactorisés
 */
const createStyles = (levelColor = "#5E60CE") =>
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

    // =================== ERROR STATE ===================
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: '#ef4444',
      textAlign: 'center',
      fontWeight: '500',
    },
  });

export default createStyles;