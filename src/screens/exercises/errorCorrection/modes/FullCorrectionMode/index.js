// FullCorrectionMode/index.js - VERSION REFACTORISÉE (HeroCard + ContentSection)

import { View, TextInput } from "react-native";
import PropTypes from "prop-types";
import HeroCard from "../../../../../components/ui/HeroCard";
import ContentSection from "../../../../../components/ui/ContentSection";
import createStyles from "./style";

/**
 * 🔧 FullCorrectionMode - Version Refactorisée avec composants génériques
 * Remplace Card par HeroCard + ContentSection
 * 
 * @param {Object} exercise - Exercice actuel avec text, explanation, correctedText
 * @param {string} userCorrection - Texte corrigé par l'utilisateur
 * @param {function} onChangeUserCorrection - Callback pour changer le texte
 * @param {boolean} showFeedback - Afficher le feedback
 * @param {boolean} isCorrect - Réponse correcte ou non
 * @param {string} levelColor - Couleur du niveau
 */
const FullCorrectionMode = ({
  exercise,
  userCorrection,
  onChangeUserCorrection,
  showFeedback = false,
  isCorrect = false,
  levelColor = "#5E60CE",
}) => {
  const styles = createStyles(levelColor);

  if (!exercise) return null;

  return (
    <View style={styles.container}>
      {/* 🎯 HERO SECTION - Texte original */}
      <HeroCard 
        content={exercise.text}
        fontSize={24}
        levelColor={levelColor}
        showUnderline={false}
        style={styles.heroCard}
      />
      
      {/* 📝 SECTION INSTRUCTIONS */}
      <ContentSection
        title="Instructions"
        content="Corrigez toutes les erreurs dans le texte ci-dessus en réécrivant la phrase complète."
        levelColor={levelColor}
        backgroundColor="#F8F9FA"
        style={styles.instructionSection}
      />

      {/* ✏️ ZONE DE CORRECTION */}
      <View style={styles.correctionContainer}>
        <TextInput
          style={[
            styles.correctionInput,
            showFeedback && (isCorrect ? styles.correctInput : styles.incorrectInput),
          ]}
          value={userCorrection}
          onChangeText={onChangeUserCorrection}
          multiline
          placeholder="Tapez le texte corrigé ici..."
          placeholderTextColor="#94a3b8"
          editable={!showFeedback}
        />
      </View>

      {/* 💡 FEEDBACK SI NÉCESSAIRE */}
      {showFeedback && exercise.explanation && (
        <ContentSection
          title={isCorrect ? "Correct !" : "Explication"}
          content={exercise.explanation}
          levelColor={isCorrect ? "#10b981" : "#ef4444"}
          backgroundColor={isCorrect ? "#f0fdf4" : "#fef2f2"}
          style={styles.feedbackSection}
        />
      )}
    </View>
  );
};

// PropTypes pour la validation des props
FullCorrectionMode.propTypes = {
  exercise: PropTypes.shape({
    text: PropTypes.string.isRequired,
    explanation: PropTypes.string,
    correctedText: PropTypes.string,
  }).isRequired,
  userCorrection: PropTypes.string.isRequired,
  onChangeUserCorrection: PropTypes.func.isRequired,
  showFeedback: PropTypes.bool,
  isCorrect: PropTypes.bool,
  levelColor: PropTypes.string,
};

// Valeurs par défaut
FullCorrectionMode.defaultProps = {
  showFeedback: false,
  isCorrect: false,
  levelColor: "#5E60CE",
};

export default FullCorrectionMode;