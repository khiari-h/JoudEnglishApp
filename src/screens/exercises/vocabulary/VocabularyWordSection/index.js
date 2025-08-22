// VocabularyWordSection/index.js - VERSION MODERNISÉE avec WordCard

import { memo } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import WordCard from "../../../../components/ui/WordCard"; // ← NOUVELLE WordCard moderne
import createStyles from "./style";

/**
 * ⚡ VocabularyWordSection - Version modernisée
 * Garde toute la logique métier (compteur, mode, etc.)
 * Utilise la NOUVELLE WordCard moderne et réutilisable
 * NOUVELLE ExampleCard moderne avec style indigo
 * ❌ SUPPRIMÉ : CounterSection (maintenant intégré dans WordCard)
 * 
 * @param {object} currentWord - Mot actuel avec ses propriétés
 * @param {string} wordCounter - Compteur stylé (ex: "34 / 80")
 * @param {string} level - Niveau actuel
 * @param {string} levelColor - Couleur du niveau
 * @param {boolean} showTranslation - État d'affichage de la traduction
 * @param {function} onToggleTranslation - Fonction pour toggle traduction
 */
const VocabularyWordSection = memo(({
  currentWord,
  wordCounter,
  levelColor,
  showTranslation,
  onToggleTranslation,
}) => {
  const styles = createStyles(levelColor);
  
  return (
    <View style={styles.container}>
      {/* ❌ SUPPRIMÉ : CounterSection (maintenant intégré dans WordCard) */}
      {/* Le compteur est maintenant directement dans la WordCard */}

      {/* 🆕 NOUVELLE WORD CARD MODERNE - Remplace HeroCard + RevealButton */}
      <WordCard
        content={currentWord.word || ""}
        translation={currentWord.translation || ""}
        counter={wordCounter}
        showTranslation={showTranslation}
        onToggleTranslation={onToggleTranslation}
        levelColor={levelColor}
        type="word"
        revealText="Révéler la traduction"
        hideText="Masquer la traduction"
      />

      {/* 🆕 NOUVELLE EXAMPLE CARD MODERNE - Style indigo avec icône Volume2 */}
      {currentWord.example && (
        <ExampleCard example={currentWord.example} styles={styles} />
      )}
    </View>
  );
});

// 🆕 NOUVELLE EXAMPLE CARD MODERNE - Style indigo avec icône Volume2
const ExampleCard = ({ example, styles }) => (
  <View style={styles.exampleCard}>
    <View style={styles.exampleContent}>
      {/* Icône Volume2 dans un cercle indigo */}
      <View style={styles.exampleIconContainer}>
        <Ionicons name="volume-high" size={16} color="#6366F1" />
      </View>
      
      {/* Contenu texte */}
      <View style={styles.exampleTextContainer}>
        <Text style={styles.exampleTitle}>Example</Text>
        <Text style={styles.exampleText}>{example}</Text>
      </View>
    </View>
  </View>
);

// PropTypes pour ExampleCard
ExampleCard.propTypes = {
  example: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
};

// PropTypes pour le composant principal VocabularyWordSection
VocabularyWordSection.propTypes = {
  currentWord: PropTypes.shape({
    word: PropTypes.string,
    translation: PropTypes.string,
    definition: PropTypes.string,
    example: PropTypes.string,
  }),
  wordCounter: PropTypes.string.isRequired,
  levelColor: PropTypes.string.isRequired,
  showTranslation: PropTypes.bool.isRequired,
  onToggleTranslation: PropTypes.func.isRequired,
};

VocabularyWordSection.displayName = "VocabularyWordSection";

export default VocabularyWordSection;