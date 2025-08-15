// PhraseCard/index.js - VERSION ULTRA-NETTOYÉE avec PropTypes
import { View } from "react-native";
import PropTypes from 'prop-types';
import HeroCard from "../../../../components/ui/HeroCard";
import RevealButton from "../../../../components/ui/RevealButton";
import createStyles from "./style";

/**
 * 🎯 PhraseCard - Version Ultra-Simple avec PropTypes
 * Phrase anglaise + Reveal traduction française
 * SUPPRIMÉ : Example et Context (inutiles)
 * 
 * @param {Object} phraseData - Données de la phrase (english, translation)
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
        showUnderline
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

// ✅ PropTypes pour PhraseCard - Corrige toutes les erreurs
PhraseCard.propTypes = {
  phraseData: PropTypes.shape({
    english: PropTypes.string.isRequired,
    translation: PropTypes.string.isRequired,
  }),
  showTranslation: PropTypes.bool.isRequired,
  onToggleTranslation: PropTypes.func.isRequired,
  levelColor: PropTypes.string,
};

// ✅ Valeurs par défaut pour PhraseCard
PhraseCard.defaultProps = {
  phraseData: null,
  levelColor: "#5E60CE",
};

export default PhraseCard;
