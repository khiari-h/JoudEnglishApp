// LevelAssessment/style.js - VERSION MODERNISÉE PURE ✨

import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles modernisés pour LevelAssessment - STYLES PURS SEULEMENT
 * ✨ Design moderne sans JavaScript compliqué
 * 🚀 Juste de beaux styles qui marchent direct
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== LOADING STATE - MODERNISÉ ===================
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: 'transparent', // Laisse passer le gradient du Container
    },

    // 🎨 CONTAINER DE LOADING AVEC STYLE MODERNE
    loadingWrapper: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 20,
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 200,
      
      // 🎨 OMBRE MODERNE
      ...Platform.select({
        ios: {
          shadowColor: '#3b82f6',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
        },
        android: {
          elevation: 8,
        },
      }),

      // Border subtile pour effet glass
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },

    // 📝 TEXTE DE LOADING
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      fontWeight: '600',
      color: '#475569',
      textAlign: 'center',
      letterSpacing: 0.2,
    },

    loadingSubtext: {
      marginTop: 8,
      fontSize: 14,
      color: '#64748b',
      textAlign: 'center',
      fontStyle: 'italic',
    },

    // =================== SCROLL CONTENT - OPTIMISÉ ===================
    scrollContent: {
      paddingBottom: 140, // Plus d'espace pour navigation flottante
      minHeight: '100%',
    },

    // =================== RESPONSIVE DESIGN ===================
    
    // 📱 PETITS ÉCRANS
    '@media (max-width: 350px)': {
      loadingWrapper: {
        padding: 24,
        minWidth: 180,
      },
      loadingText: {
        fontSize: 15,
      },
      scrollContent: {
        paddingBottom: 120,
      },
    },

    // 📱 GRANDS ÉCRANS  
    '@media (min-width: 400px)': {
      loadingWrapper: {
        padding: 40,
        minWidth: 240,
      },
      loadingText: {
        fontSize: 17,
      },
      scrollContent: {
        paddingBottom: 160,
      },
    },
  });

export default createStyles;