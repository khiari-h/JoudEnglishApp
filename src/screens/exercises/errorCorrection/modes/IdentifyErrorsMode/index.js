// IdentifyErrorsMode/index.js - VERSION REFACTORISÉE (HeroCard + ContentSection)

import { View, Text, TouchableOpacity } from "react-native";
import HeroCard from "../../../../../components/ui/HeroCard";
import ContentSection from "../../../../../components/ui/ContentSection";
import createStyles from "./style";
import { useCallback } from "react";

/**
 * 🔍 IdentifyErrorsMode - Version Refactorisée avec composants génériques
 * Remplace Card par HeroCard + ContentSection + logique simplifiée
 * 
 * @param {Object} exercise - Exercice actuel
 * @param {Array} selectedErrorIndices - Indices des mots sélectionnés
 * @param {function} onToggleErrorIndex - Callback pour toggle un mot
 * @param {boolean} showFeedback - Afficher le feedback
 * @param {string} levelColor - Couleur du niveau
 */
const IdentifyErrorsMode = ({
  exercise,
  selectedErrorIndices = [],
  onToggleErrorIndex,
  showFeedback = false,
  levelColor = "#5E60CE",
}) => {
  const styles = createStyles(levelColor);

  if (!exercise) return null;

  // Diviser le texte en mots
  const words = exercise.text.split(" ");
  const expectedErrors = exercise.errorPositions?.length || 0;

  const handleWordPress = useCallback((index) => () => {
    if (!showFeedback) onToggleErrorIndex(index);
  }, [onToggleErrorIndex, showFeedback]);

  return (
    <View style={styles.container}>
      {/* 📝 SECTION INSTRUCTIONS */}
      <ContentSection
        title="Instructions"
        content={`Touchez les mots qui contiennent des erreurs. Vous devez trouver ${expectedErrors} erreur(s).`}
        levelColor={levelColor}
        backgroundColor="#F8F9FA"
        style={styles.instructionSection}
      />

      {/* 🎯 HERO SECTION - Zone de mots cliquables */}
      <HeroCard 
        levelColor={levelColor}
        showUnderline={false}
        style={styles.heroCard}
      >
        <View style={styles.wordsContainer}>
          {words.map((word, index) => {
            const isSelected = selectedErrorIndices.includes(index);
            const isError = showFeedback && (exercise.errorPositions || []).includes(index);
            const isCorrectSelection = showFeedback && isSelected && isError;
            const isIncorrectSelection = showFeedback && isSelected && !isError;

            return (
              <TouchableOpacity
                key={word + '-' + index}
                onPress={handleWordPress(index)}
                disabled={showFeedback}
                style={[
                  styles.word,
                  isSelected && !showFeedback && {
                    backgroundColor: `${levelColor}20`,
                    borderColor: levelColor,
                  },
                  isCorrectSelection && styles.correctWord,
                  isIncorrectSelection && styles.incorrectWord,
                  isError && !isSelected && showFeedback && styles.missedErrorWord,
                ]}
              >
                <Text
                  style={[
                    styles.wordText,
                    isSelected && !showFeedback && { 
                      color: levelColor, 
                      fontWeight: "600" 
                    },
                    isCorrectSelection && styles.correctWordText,
                    isIncorrectSelection && styles.incorrectWordText,
                    isError && !isSelected && showFeedback && styles.missedErrorWordText,
                  ]}
                >
                  {word}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </HeroCard>

      {/* 📊 AIDE CONTEXTUELLE */}
      {!showFeedback && (
        <ContentSection
          title="Aide"
          content={`Sélectionnés: ${selectedErrorIndices.length}/${expectedErrors} erreurs`}
          levelColor={levelColor}
          backgroundColor="#FAFBFC"
          style={styles.helpSection}
        />
      )}

      {/* 💡 FEEDBACK SI NÉCESSAIRE */}
      {showFeedback && exercise.explanation && (
        <ContentSection
          title="Explication"
          content={exercise.explanation}
          levelColor="#ef4444"
          backgroundColor="#fef2f2"
          style={styles.feedbackSection}
        />
      )}
    </View>
  );
};

export default IdentifyErrorsMode;