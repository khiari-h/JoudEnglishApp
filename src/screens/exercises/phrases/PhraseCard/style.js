// PhraseCard/style.js - VERSION REFACTORISÉE (300 → 15 lignes)

import { StyleSheet } from "react-native";

/**
 * 🎯 Styles ultra-simplifiés pour PhraseCard
 * Ancien : 300 lignes avec hero + glassmorphism + sections custom
 * Nouveau : 15 lignes - les composants génériques gèrent tout
 * 
 * Plus besoin de :
 * - heroSection, heroGradient, decorativeCircle → dans HeroCard
 * - revealButton, glassEffect, translationCard → dans RevealButton
 * - exampleCard, contextCard, headers → dans ContentSection
 * - Platform.select, shadows → centralisés dans les composants génériques
 */
const createStyles = (levelColor = "#5E60CE") =>
  StyleSheet.create({
    // =================== CONTAINER SIMPLE ===================
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
    },

    // 🧹 SUPPRIMÉ : 285 lignes de styles maintenant dans les composants génériques !
  });

export default createStyles;