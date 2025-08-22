// AssessmentNavigation/style.js - VERSION MODERNISÉE PURE ✨

import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles modernisés pour AssessmentNavigation - STYLES PURS SEULEMENT
 * ✨ Design moderne sans JavaScript compliqué
 * 🚀 Juste de beaux styles qui marchent direct
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== CONTAINER PRINCIPAL ===================
    container: {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#f1f5f9',
      paddingHorizontal: 20,
      paddingVertical: 20,
      paddingBottom: Platform.OS === 'ios' ? 34 : 20,
      
      // 🎨 OMBRE MODERNE pour effet flottant
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        android: {
          elevation: 8,
        },
      }),
    },

    // =================== BOUTON CHECK ANSWER - MODERNISÉ ===================
    checkButton: {
      backgroundColor: '#3b82f6', // Couleur de base
      borderRadius: 16, // Plus arrondi
      paddingVertical: 18, // Plus généreux
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      
      // 🎨 OMBRE COLORÉE pour effet premium
      ...Platform.select({
        ios: {
          shadowColor: '#3b82f6',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
        },
        android: {
          elevation: 8,
        },
      }),
    },

    // ❌ ÉTAT DISABLED - Design soigné
    disabledButton: {
      backgroundColor: '#e2e8f0',
      
      // Ombre plus subtile pour disabled
      ...Platform.select({
        ios: {
          shadowColor: '#94a3b8',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    // 📝 TEXTE DU BOUTON - Typography premium
    checkButtonText: {
      fontSize: 17,
      fontWeight: '700',
      color: 'white',
      letterSpacing: 0.3,
    },

    checkButtonTextDisabled: {
      color: '#64748b',
      fontWeight: '600',
    },

    // =================== LAYOUT VERTICAL AMÉLIORÉ ===================
    
    // 🔄 LIGNE TRY AGAIN
    tryAgainRow: {
      alignItems: 'center',
      marginBottom: 16,
    },

    // ➡️ LIGNE NAVIGATION
    navigationRow: {
      alignItems: 'center',
    },

    // =================== BOUTON TRY AGAIN - MODERNISÉ ===================
    tryAgainButton: {
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: '#e2e8f0', // Couleur par défaut, sera override inline
      borderRadius: 14,
      paddingVertical: 16,
      paddingHorizontal: 28,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      minWidth: 140,
      
      // 🎨 OMBRE SUBTILE mais moderne
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
      }),
    },

    // 📝 TEXTE TRY AGAIN
    tryAgainButtonText: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 0.2,
      marginLeft: 6, // Espace après l'icône refresh
    },

    // =================== RESPONSIVE DESIGN ===================
    
    // 📱 PETITS ÉCRANS
    '@media (max-width: 350px)': {
      checkButton: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
      },
      checkButtonText: {
        fontSize: 16,
      },
      tryAgainButton: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        minWidth: 120,
      },
    },

    // =================== CONTAINER NAVIGATION ===================
    nextButtonContainer: {
      flex: 1,
      width: '100%',
    },
  });

export default createStyles;