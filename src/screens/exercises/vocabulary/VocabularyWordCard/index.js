// VocabularyWordCard/index.js - VERSION REFACTORISÉE (280 → 50 lignes)






import createStyles from "./style";

/**
 * 🏆 VocabularyWordCard - Version Refactorisée avec composants génériques
 * 280 lignes → 50 lignes (-82% de code)
 * Même qualité visuelle, architecture optimisée
 * 
 * @param {string} word - Mot principal à afficher
 * @param {string} translation - Traduction du mot
 * @param {string} definition - Définition (optionnel)
 * @param {string} example - Exemple d'utilisation
 * @param {boolean} showTranslation - État d'affichage de la traduction
 * @param {function} onToggleTranslation - Fonction pour toggle traduction
 * @param {string} levelColor - Couleur du niveau
 */
const VocabularyWordCard = ({
  word,
  translation,
  definition,
  example,
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
        showUnderline={true}
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
        />
      )}

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

export default VocabularyWordCard;