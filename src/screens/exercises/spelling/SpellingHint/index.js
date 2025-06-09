// SpellingHint/index.js - VERSION REFACTORISÉE (RevealButton générique)

import React from "react";
import { View } from "react-native";
import RevealButton from "../../../../components/ui/RevealButton";
import createStyles from "./style";

/**
 * 💡 SpellingHint - Version Refactorisée avec RevealButton générique
 * Pattern identique à VocabularyWordCard
 * 
 * @param {string} hint - Texte de l'indice
 * @param {boolean} showHint - Indique si l'indice est affiché
 * @param {function} onToggle - Fonction pour afficher/masquer l'indice
 * @param {string} levelColor - Couleur associée au niveau
 */
const SpellingHint = ({ 
  hint, 
  showHint, 
  onToggle, 
  levelColor = "#3b82f6" 
}) => {
  const styles = createStyles(levelColor);

  if (!hint) return null;

  return (
    <View style={styles.container}>
      <RevealButton
        isRevealed={showHint}
        revealedContent={hint}
        revealText="Afficher l'indice"
        hideText="Masquer l'indice"
        onToggle={onToggle}
        levelColor={levelColor}
        style={styles.revealButton}
      />
    </View>
  );
};

export default SpellingHint;