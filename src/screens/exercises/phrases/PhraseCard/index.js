// PhraseCard/index.js - VERSION ULTRA-NETTOYÉE
import React from "react";
import { View } from "react-native";
import HeroCard from "../../../../components/ui/HeroCard";
import RevealButton from "../../../../components/ui/RevealButton";
import createStyles from "./style";

/**
 * 🎯 PhraseCard - Version Ultra-Simple
 * Phrase anglaise + Reveal traduction française
 * SUPPRIMÉ : Example et Context (inutiles)
 */
const PhraseCard = ({
  phraseData,
  showTranslation,
  onToggleTranslation,
  levelColor = "#5E60CE",
}) => {
  const styles = createStyles(levelColor);

  // Validation des données
  if (!phraseData) {
    return (
      <View style={styles.container}>
        <HeroCard 
          content="Loading phrase..."
          fontSize={24}
          levelColor={levelColor}
          showUnderline={false}
        />
      </View>
    );
  }

  // 🎯 DONNÉES ESSENTIELLES SEULEMENT
  const phrase = phraseData.english;
  const translation = phraseData.translation;

  return (
    <View style={styles.container}>
      {/* 🎯 PHRASE ANGLAISE - Hero Section */}
      <HeroCard 
        content={phrase}
        fontSize={28} // Adapté pour phrases (plus longues que mots)
        levelColor={levelColor}
        showUnderline={true}
        lineHeight={36} // Pour phrases multi-lignes
      />
      
      {/* 🔘 BOUTON REVEAL TRADUCTION */}
      <RevealButton
        isRevealed={showTranslation}
        revealedContent={translation}
        revealText="Reveal Translation"
        hideText="Hide Translation"
        onToggle={onToggleTranslation}
        levelColor={levelColor}
      />
    </View>
  );
};

export default PhraseCard;