// PhraseCard/index.js - VERSION HARMONISÉE avec WordCard moderne 🎯
import { View } from "react-native";
import PropTypes from 'prop-types';
import WordCard from "../../../../components/ui/WordCard"; // ← NOUVELLE WordCard harmonisée
import createStyles from "./style";

/**
 * 🎯 PhraseCard - Version harmonisée avec WordCard moderne
 * Utilise la même WordCard que le vocabulaire pour une cohérence globale
 * ✅ HARMONISÉ : Même design, même comportement, même qualité
 * 
 * @param {Object} phraseData - Données de la phrase (english, translation)
 * @param {boolean} showTranslation - État d'affichage de la traduction
 * @param {function} onToggleTranslation - Fonction pour toggle traduction
 * @param {string} levelColor - Couleur du niveau
 * @param {string} counter - Compteur stylé (ex: "1 / 10")
 */
const PhraseCard = ({
  phraseData,
  showTranslation,
  onToggleTranslation,
  levelColor = "#5E60CE",
  counter = "1 / 1",
}) => {
  const styles = createStyles(levelColor);

  // Validation des données
  if (!phraseData) {
    return (
      <View style={styles.container}>
        <WordCard
          content="Loading phrase..."
          translation="Chargement..."
          counter="..."
          showTranslation={false}
          onToggleTranslation={() => {}}
          levelColor={levelColor}
          type="phrase"
        />
      </View>
    );
  }

  // 🎯 DONNÉES ESSENTIELLES SEULEMENT
  const phrase = phraseData.english;
  const translation = phraseData.translation;

  return (
    <View style={styles.container}>
      {/* 🆕 NOUVELLE WORD CARD HARMONISÉE - Même design que vocabulaire */}
      <WordCard
        content={phrase}
        translation={translation}
        counter={counter}
        showTranslation={showTranslation}
        onToggleTranslation={onToggleTranslation}
        levelColor={levelColor}
        type="phrase" // ← Type "phrase" pour styles adaptés
        revealText="Révéler la traduction"
        hideText="Masquer la traduction"
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
  counter: PropTypes.string,
};

// ✅ Valeurs par défaut pour PhraseCard
PhraseCard.defaultProps = {
  phraseData: null,
  levelColor: "#5E60CE",
  counter: "1 / 1",
};

export default PhraseCard;
