// VocabularyWordCard/index.js - VERSION REFACTORISÉE sans doublon Example

import { View } from "react-native";
import PropTypes from 'prop-types';
import HeroCard from "../../../../components/ui/HeroCard";
import RevealButton from "../../../../components/ui/RevealButton";
import ContentSection from "../../../../components/ui/ContentSection";
import createStyles from "./style";

/**
 * 🏆 VocabularyWordCard - Version Refactorisée avec composants génériques
 * 280 lignes → 50 lignes (-82% de code)
 * Même qualité visuelle, architecture optimisée
 * ❌ SUPPRIMÉ : Section Example (maintenant dans VocabularyWordSection)
 * 
 * @param {string} word - Mot principal à afficher
 * @param {string} translation - Traduction du mot
 * @param {string} definition - Définition (optionnel)
 * @param {string} example - Exemple d'utilisation (maintenant géré ailleurs)
 * @param {boolean} showTranslation - État d'affichage de la traduction
 * @param {function} onToggleTranslation - Fonction pour toggle traduction
 * @param {string} levelColor - Couleur du niveau
 */
const VocabularyWordCard = ({
  word,
  translation,
  definition,
  example, // ← Plus utilisé ici, mais gardé pour compatibilité
  showTranslation,
  onToggleTranslation,
  levelColor = "#5E60CE",
}) => {
  const styles = createStyles(levelColor);

  return (
    <View style={styles.container}>
      {/* 🎯 HERO SECTION - Le mot principal */}
      <HeroCard 
        content={word}
        fontSize={42}  // Taille spectaculaire pour mots
        levelColor={levelColor}
        showUnderline
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
      
      {/* ❌ SUPPRIMÉ : SECTION EXEMPLE (maintenant dans VocabularyWordSection) */}
      {/* L'exemple est maintenant géré par la nouvelle ExampleCard moderne */}

      {/* 📝 SECTION DÉFINITION (si disponible) */}
      {definition && (
        <ContentSection
          title="Definition"
          content={definition}
          levelColor={levelColor}
          backgroundColor="#F8F9FA"
        />
      )}
    </View>
  );
};

// ✅ PropTypes - Corrige toutes les erreurs de validation
VocabularyWordCard.propTypes = {
  word: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  definition: PropTypes.string,
  example: PropTypes.string, // ← Gardé pour compatibilité mais plus utilisé
  showTranslation: PropTypes.bool.isRequired,
  onToggleTranslation: PropTypes.func.isRequired,
  levelColor: PropTypes.string,
};

// ✅ Valeurs par défaut
VocabularyWordCard.defaultProps = {
  definition: null,
  example: null,
  levelColor: "#5E60CE",
};

export default VocabularyWordCard;