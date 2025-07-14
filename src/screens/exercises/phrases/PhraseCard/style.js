// PhraseCard/style.js - VERSION ULTRA-NETTOYÉE
import { StyleSheet } from "react-native";

/**
 * 🧹 CSS Ultra-Simplifié pour PhraseCard
 * 
 * AVANT : 300+ lignes avec :
 * - heroSection, heroGradient, decorativeCircle
 * - revealButton, glassEffect, translationCard  
 * - exampleCard, contextCard, headers, shadows
 * 
 * MAINTENANT : 10 lignes
 * - Tout est géré par HeroCard et RevealButton
 * - On garde SEULEMENT le container
 */
const createStyles = () =>
  StyleSheet.create({
    // =================== CONTAINER SEULEMENT ===================
    container: {
      marginHorizontal: 16, // Espacement horizontal
      marginVertical: 8,    // Espacement vertical entre les composants
    },
    
    // 🗑️ SUPPRIMÉ : 290+ lignes de styles maintenant gérés par les composants génériques !
    // Plus besoin de styles pour :
    // - Hero section (dans HeroCard)
    // - Reveal button (dans RevealButton) 
    // - Example section (supprimé)
    // - Context section (supprimé)
    // - Toutes les animations, shadows, glassmorphism, etc.
  });

export default createStyles;