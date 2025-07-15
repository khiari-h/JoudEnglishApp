// GrammarFeedback/index.js - VERSION REFACTORISÉE avec ContentSection (75 → 15 lignes)

import ContentSection from "../../../../components/ui/ContentSection";

/**
 * 💬 GrammarFeedback - Version Refactorisée avec ContentSection générique
 * 75 lignes → 15 lignes (-80% de code)
 * Design moderne et cohérent avec le reste de l'app
 * États visuels élégants (correct/incorrect)
 * 
 * @param {boolean} isVisible - Si le feedback est visible
 * @param {boolean} isCorrect - Si la réponse est correcte
 * @param {string} explanation - Explication de la règle
 * @param {string|number} correctAnswer - Réponse correcte
 * @param {number} attempts - Nombre de tentatives
 */
const GrammarFeedback = ({
  isVisible,
  isCorrect,
  explanation,
  correctAnswer,
  attempts,
}) => {
  if (!isVisible) return null;

  // Formater la réponse correcte pour l'affichage
  const formatCorrectAnswer = () => {
    if (!correctAnswer) return "";

    // Si la réponse contient des alternatives (séparées par des /)
    if (typeof correctAnswer === "string" && correctAnswer.includes("/")) {
      return correctAnswer
        .split("/")
        .map((ans) => ans.trim())
        .join(" ou ");
    }

    return correctAnswer;
  };

  // Déterminer le titre selon le contexte
  const getTitle = () => {
    if (isCorrect) return "Correct!";
    return attempts === 1 ? "Try Again!" : "Incorrect!";
  };

  // Déterminer le contenu selon le contexte
  const getContent = () => {
    if (isCorrect) {
      return explanation || "Well done! 🎉";
    }
    
    if (attempts > 1) {
      return `The correct answer is: ${formatCorrectAnswer()}`;
    }
    
    return "You can try once more. Check spelling and punctuation or try another formulation.";
  };

  // Couleur selon l'état
  const levelColor = isCorrect ? "#10B981" : "#EF4444";
  const backgroundColor = isCorrect ? "#F0FDF4" : "#FEF2F2";

  return (
    <ContentSection
      title={getTitle()}
      content={getContent()}
      levelColor={levelColor}
      backgroundColor={backgroundColor}
      showIcon
      isItalic={false}
    />
  );
};

export default GrammarFeedback;