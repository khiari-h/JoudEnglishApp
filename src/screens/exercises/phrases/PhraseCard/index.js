// PhraseCard/index.js - VERSION REFACTORISÉE avec composants génériques (300 → 50 lignes)

import React from "react";
import { View } from "react-native";
import HeroCard from "../../../../components/ui/HeroCard";
import RevealButton from "../../../../components/ui/RevealButton";
import ContentSection from "../../../../components/ui/ContentSection";
import createStyles from "./style";

/**
 * 🏆 PhraseCard - Version Refactorisée avec composants génériques
 * 300 lignes → 50 lignes (-83% de code)
 * Même qualité visuelle que VocabularyWordCard refactorisé
 * Design cohérent avec Grammar et Vocabulary
 * 
 * @param {object} phraseData - Données de la phrase (structure existante)
 * @param {boolean} showTranslation - État d'affichage de la traduction
 * @param {function} onToggleTranslation - Fonction pour toggle traduction
 * @param {string} levelColor - Couleur du niveau
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

  // 🎯 MAPPING des données existantes (aucun changement requis)
  const phrase = phraseData.english;
  const translation = phraseData.translation;
  const example = phraseData.examples?.[0]?.english || "";
  const context = phraseData.context || "";

  return (
    <View style={styles.container}>
      {/* 🎯 HERO SECTION - La phrase principale */}
      <HeroCard 
        content={phrase}
        fontSize={28} // Adapté pour phrases (plus longues que mots)
        levelColor={levelColor}
        showUnderline={true}
        lineHeight={36} // Pour phrases multi-lignes
      />
      
      {/* 🔘 BOUTON REVEAL/HIDE avec glassmorphism */}
      <RevealButton
        isRevealed={showTranslation}
        revealedContent={translation}
        revealText="Reveal Translation"
        hideText="Hide Translation"
        onToggle={onToggleTranslation}
        levelColor={levelColor}
      />
      
      {/* 📝 SECTION EXEMPLE */}
      {example && (
        <ContentSection
          title="Example"
          content={example}
          levelColor={levelColor}
          isItalic={true}
          backgroundColor="#FAFBFC"
          showIcon={true}
        />
      )}

      {/* 📝 SECTION CONTEXTE (spécifique aux phrases) */}
      {context && (
        <ContentSection
          title="Context"
          content={context}
          levelColor={levelColor}
          backgroundColor="#F8F9FA"
          showIcon={true}
          isItalic={false}
        />
      )}
    </View>
  );
};

export default PhraseCard;