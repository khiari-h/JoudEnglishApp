// ReadingText/index.js - VERSION SIMPLIFIÉE
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeroCard from "../../../../components/ui/HeroCard";
import RevealButton from "../../../../components/ui/RevealButton";
import createStyles from "./style";
import PropTypes from 'prop-types';

/**
 * 📖 ReadingText - Version Simple & Efficace
 * ✅ Fix bug "AA 88 words" 
 * ✅ Suppression "Reading Topics" redondant
 * ✅ Code simple, 60 lignes au lieu de 150+
 */
const ReadingText = ({
  exercise,
  textExpanded,
  onToggleExpand,
  levelColor = "#3b82f6",
}) => {
  const styles = createStyles(levelColor);
  
  if (!exercise) return null;

  const fullText = exercise.text || "";
  const wordCount = fullText.split(' ').filter(word => word.length > 0).length;
  const estimatedReadingTime = Math.ceil(wordCount / 200); // 200 mots/min

  return (
    <View style={styles.container}>
      {/* 🎯 TITLE */}
      <HeroCard 
        content={exercise.title || "Reading Text"}
        fontSize={24}
        levelColor={levelColor}
        showUnderline={false}
        icon="book-outline"
      />

      {/* 📊 READING INFO - VERSION CORRIGÉE */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={16} color={levelColor} />
          <Text style={[styles.infoText, { color: levelColor }]}>
            ~{estimatedReadingTime} min read
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="text-outline" size={16} color={levelColor} />
          <Text style={[styles.infoText, { color: levelColor }]}>
            {wordCount} words
          </Text>
        </View>
      </View>

      {/* 📖 TEXTE avec RevealButton */}
      <RevealButton
        isRevealed={textExpanded}
        revealedContent={fullText}
        revealText="📖 Read Full Text"
        hideText="📖 Collapse Text"
        onToggle={onToggleExpand}
        levelColor={levelColor}
        contentColor="#374151"
        contentStyle={{
          fontSize: 16,
          lineHeight: 24,
          textAlign: 'justify',
        }}
      />
    </View>
  );
};

// ✅ Définition de PropTypes pour valider les props
ReadingText.propTypes = {
  // 'exercise' est manquant dans la validation
  exercise: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  // 'textExpanded' est manquant dans la validation
  textExpanded: PropTypes.bool.isRequired,
  // 'onToggleExpand' est manquant dans la validation
  onToggleExpand: PropTypes.func.isRequired,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default ReadingText;