// AssessmentQuestion/style.js - VERSION MODERNISÉE PURE ✨

import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles modernisés pour AssessmentQuestion - STYLES PURS SEULEMENT
 * ✨ Design moderne sans JavaScript compliqué
 * 🚀 Juste de beaux styles qui marchent direct
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== CONTAINER ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // =================== OPTIONS DE RÉPONSE - MODERNISÉES ===================
    optionsContainer: {
      marginTop: 20,
      gap: 16, // Plus d'espace entre les options
    },

    optionButton: {
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: '#e2e8f0',
      borderRadius: 16, // Plus arrondi
      padding: 20, // Plus de padding
      
      // 🎨 OMBRE MODERNE
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
        android: {
          elevation: 4,
        },
      }),
    },

    // ✨ ÉTAT SÉLECTIONNÉ - Plus d'impact visuel
    selectedOption: {
      borderWidth: 3, // Border plus épaisse
      backgroundColor: '#f8faff', // Background subtil
      // borderColor définie inline avec levelColor
      
      // 🎨 OMBRE PLUS FORTE pour l'état sélectionné
      ...Platform.select({
        ios: {
          shadowColor: '#3b82f6',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
        },
        android: {
          elevation: 8,
        },
      }),
    },

    // ✅ OPTION CORRECTE - Feedback visuel fort
    correctOption: {
      borderWidth: 3,
      backgroundColor: '#f0fdf4', // Vert très subtil
      borderColor: '#10b981',
      
      // 🎨 OMBRE VERTE
      ...Platform.select({
        ios: {
          shadowColor: '#10b981',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.2,
          shadowRadius: 16,
        },
        android: {
          elevation: 8,
        },
      }),
    },

    // 📝 TEXTE DES OPTIONS - Typography améliorée
    optionText: {
      fontSize: 17, // Plus lisible
      color: '#334155',
      textAlign: 'center',
      lineHeight: 24,
      fontWeight: '500',
      letterSpacing: 0.2, // Espacement moderne
    },

    // 🎨 VARIATIONS DE COULEUR pour le texte sélectionné
    selectedOptionText: {
      fontWeight: '600',
      // color définie inline avec levelColor
    },

    correctOptionText: {
      fontWeight: '600',
      color: '#10b981',
    },

    // =================== RESPONSIVE ===================
    // Adaptations pour petits écrans
    '@media (max-width: 350px)': {
      optionButton: {
        padding: 16,
        borderRadius: 12,
      },
      optionText: {
        fontSize: 16,
      },
    },
  });

export default createStyles;