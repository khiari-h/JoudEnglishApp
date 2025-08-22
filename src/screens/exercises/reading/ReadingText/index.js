// ReadingText/index.js - VERSION NETTOYÉE avec style moderne 🎯
import { View } from "react-native";
import PropTypes from 'prop-types';
import WordCard from "../../../../components/ui/WordCard"; // ← NOUVELLE WordCard harmonisée
import ContentSection from "../../../../components/ui/ContentSection";
import createStyles from "./style";

/**
 * 📖 ReadingText - Version nettoyée et modernisée
 * ✅ SUPPRIMÉ : Estimation de temps et compteur de mots (inutiles)
 * ✅ SUPPRIMÉ : Props textExpanded et onToggleExpand (plus utilisées)
 * ✅ HARMONISÉ : Même style que GrammarRuleContent moderne
 * ✅ SIMPLIFIÉ : Structure épurée et efficace
 */
const ReadingText = ({
  exercise,
  levelColor = "#3b82f6",
}) => {
  const styles = createStyles(levelColor);
  
  if (!exercise) return null;

  const fullText = exercise.text || "";

  return (
    <View style={styles.container}>
      {/* 🆕 NOUVELLE WORD CARD HARMONISÉE - Même design que vocabulaire/expressions/grammaire */}
      <WordCard
        content={exercise.title || "Reading Text"}
        translation=""
        counter=""
        showTranslation={false}
        onToggleTranslation={() => {}} // Pas de toggle pour lecture
        levelColor={levelColor}
        type="reading"
        showCounter={false} // Pas de compteur pour lecture
        showRevealButton={false} // Pas de bouton reveal pour lecture
      />

      {/* 📖 TEXTE avec ContentSection moderne */}
      <ContentSection
        title="📖 Reading Content"
        content={fullText}
        levelColor={levelColor}
        backgroundColor="#F8FAFC"
        contentStyle={{
          fontSize: 16,
          lineHeight: 24,
          textAlign: 'justify',
          color: '#374151',
        }}
        showIcon={false}
      />
    </View>
  );
};

// ✅ PropTypes simplifiés
ReadingText.propTypes = {
  exercise: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  levelColor: PropTypes.string,
};

export default ReadingText;