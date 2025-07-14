// ReadingText/style.js - VERSION SIMPLIFIÉE
import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles simples pour ReadingText
 * Pas de complexité inutile, juste l'essentiel
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== INFO SECTION ===================
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      marginVertical: 10,
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
    
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    infoText: {
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 6,
    },
  });

export default createStyles;