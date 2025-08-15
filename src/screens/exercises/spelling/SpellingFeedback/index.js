// SpellingFeedback/index.js - VERSION REFACTORISÉE (ContentSection avec couleurs)

import { View } from "react-native";
import ContentSection from "../../../../components/ui/ContentSection";
import createStyles from "./style";
import PropTypes from 'prop-types';

/**
 * 💬 SpellingFeedback - Version Refactorisée avec ContentSection
 * Remplace le feedback custom par ContentSection avec couleurs dynamiques
 * * @param {boolean} isCorrect - Indique si la réponse est correcte
 * @param {string} correctAnswer - La réponse correcte
 * @param {string} explanation - Explication supplémentaire
 * @param {string} levelColor - Couleur associée au niveau
 */
const SpellingFeedback = ({ 
  isCorrect, 
  correctAnswer, 
  explanation,
  levelColor = "#3b82f6" 
}) => {
  const styles = createStyles(levelColor);

  const feedbackColor = isCorrect ? "#10b981" : "#ef4444";
  const backgroundColor = isCorrect ? "#f0fdf4" : "#fef2f2";
  const resultTitle = isCorrect ? "Correct !" : "Incorrect !";

  // Construire le contenu du feedback
  let feedbackContent = "";
  
  if (!isCorrect && correctAnswer) {
    feedbackContent = `La bonne réponse est : "${correctAnswer}"`;
    if (explanation) {
      feedbackContent += `\n\n${explanation}`;
    }
  } else if (explanation) {
    feedbackContent = explanation;
  }

  return (
    <View style={styles.container}>
      <ContentSection
        title={resultTitle}
        content={feedbackContent || (isCorrect ? "Bien joué !" : "Réessayez !")}
        levelColor={feedbackColor}
        backgroundColor={backgroundColor}
        style={styles.feedbackSection}
        isHighlighted
      />
    </View>
  );
};

// ✅ Définition de PropTypes pour la validation des props
SpellingFeedback.propTypes = {
  // 'isCorrect' est manquant dans la validation
  isCorrect: PropTypes.bool.isRequired,
  // 'correctAnswer' est manquant dans la validation
  correctAnswer: PropTypes.string,
  // 'explanation' est manquant dans la validation
  explanation: PropTypes.string,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default SpellingFeedback;