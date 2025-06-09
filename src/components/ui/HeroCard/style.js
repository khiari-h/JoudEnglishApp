// src/components/ui/HeroCard/style.js - VERSION MOBILE-FRIENDLY
import { StyleSheet, Platform } from "react-native";

/**
 * 🎯 Styles Mobile-Friendly Premium pour HeroCard
 * - Ombres neutres (grises) au lieu de colorées
 * - Backgrounds blancs avec bordures colorées
 * - Opacités optimisées pour mobile (15-20% au lieu de 4-12%)
 * - Performance mobile optimisée
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== HERO SECTION ===================
    heroSection: {
      marginBottom: 20, // Réduit : 24 → 20
      borderRadius: 20, // Réduit : 24 → 20 (cohérence avec header)
      overflow: 'hidden',
      backgroundColor: 'white', // Background solide
      borderWidth: 1,
      borderColor: `${levelColor}25`, // Bordure colorée visible
      // OMBRE NEUTRE - Plus de shadowColor colorée !
      ...Platform.select({
        ios: {
          shadowColor: '#000', // ✅ Noir au lieu de levelColor
          shadowOffset: { width: 0, height: 4 }, // Réduit : 8 → 4
          shadowOpacity: 0.08, // Réduit : 0.2 → 0.08
          shadowRadius: 8, // Réduit : 16 → 8
        },
        android: {
          elevation: 3, // Réduit : 8 → 3
        },
      }),
    },

    heroGradient: {
      paddingVertical: 32, // Réduit : 40 → 32
      paddingHorizontal: 24, // Réduit : 28 → 24
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      minHeight: 100, // Réduit : 120 → 100
    },

    // =================== CERCLES DÉCORATIFS - Plus visibles ===================
    decorativeCircle: {
      position: 'absolute',
      borderRadius: 999,
    },
    circle1: {
      width: 100, // Réduit : 120 → 100
      height: 100,
      top: -50, // Ajusté : -60 → -50
      right: -35, // Ajusté : -40 → -35
      opacity: 0.5, // Augmenté : 0.3 → 0.5
    },
    circle2: {
      width: 65, // Réduit : 80 → 65
      height: 65,
      bottom: -32, // Ajusté : -40 → -32
      left: -18, // Ajusté : -20 → -18
      opacity: 0.4, // Augmenté : 0.2 → 0.4
    },

    // =================== CONTENU PRINCIPAL ===================
    contentContainer: {
      alignItems: 'center',
      zIndex: 2,
      paddingHorizontal: 12,
    },

    contentText: {
      fontWeight: '700', // Réduit : 800 → 700 (plus lisible mobile)
      letterSpacing: 0.5, // Réduit : 0.8 → 0.5
      marginBottom: 8,
      // OMBRE TEXTE NEUTRE
      ...Platform.select({
        ios: {
          shadowColor: '#000', // ✅ Noir au lieu de coloré
          shadowOffset: { width: 0, height: 1 }, // Réduit : 2 → 1
          shadowOpacity: 0.08, // Réduit : 0.1 → 0.08
          shadowRadius: 2, // Réduit : 4 → 2
        },
      }),
    },

    underline: {
      width: 50, // Réduit : 60 → 50
      height: 3, // Réduit : 4 → 3
      borderRadius: 1.5, // Ajusté : 2 → 1.5
      opacity: 0.7, // Augmenté : 0.6 → 0.7 (plus visible)
    },
  });

export default createStyles;