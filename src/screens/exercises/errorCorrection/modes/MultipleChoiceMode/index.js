// MultipleChoiceMode/index.js - VERSION REFACTORISÉE (HeroCard + ContentSection)

import { View, Text, TouchableOpacity } from "react-native";
import HeroCard from "../../../../../components/ui/HeroCard";
import ContentSection from "../../../../../components/ui/ContentSection";
import createStyles from "./style";
import { useCallback } from "react";
import PropTypes from 'prop-types';

/**
 * ✅ MultipleChoiceMode - Version Refactorisée avec composants génériques
 * Remplace Card par HeroCard + ContentSection + choix simplifiés
 * * @param {Object} exercise - Exercice actuel
 * @param {number} selectedChoiceIndex - Index du choix sélectionné
 * @param {function} onSelectChoice - Callback pour sélectionner un choix
 * @param {boolean} showFeedback - Afficher le feedback
 * @param {string} levelColor - Couleur du niveau
 */
const MultipleChoiceMode = ({
  exercise,
  selectedChoiceIndex,
  onSelectChoice,
  showFeedback = false,
  levelColor = "#5E60CE",
}) => {
  const styles = createStyles(levelColor);

  if (!exercise) return null;

  const choices = exercise.choices || [];
  const correctChoiceIndex = exercise.correctChoiceIndex;

  const handleChoicePress = useCallback((index) => () => {
    if (!showFeedback) onSelectChoice(index);
  }, [onSelectChoice, showFeedback]);

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
        content="Choisissez la version correcte parmi les options ci-dessous."
        levelColor={levelColor}
        backgroundColor="#F8F9FA"
        style={styles.instructionSection}
      />

      {/* ✅ CHOIX MULTIPLES */}
      <View style={styles.choicesContainer}>
        {choices.map((choice, index) => {
          const isSelected = selectedChoiceIndex === index;
          const isCorrect = showFeedback && index === correctChoiceIndex;
          const isIncorrect = showFeedback && isSelected && index !== correctChoiceIndex;

          return (
            <TouchableOpacity
              key={index} // Utilisez l'index si la clé n'est pas unique
              style={[
                styles.choiceOption,
                isSelected && !showFeedback && {
                  borderColor: levelColor,
                  backgroundColor: `${levelColor}10`,
                },
                isCorrect && styles.correctChoice,
                isIncorrect && styles.incorrectChoice,
              ]}
              onPress={handleChoicePress(index)}
              disabled={showFeedback}
            >
              <View style={styles.choiceContent}>
                <View style={[
                  styles.choiceIndicator,
                  isSelected && !showFeedback && { backgroundColor: levelColor },
                  isCorrect && styles.correctIndicator,
                  isIncorrect && styles.incorrectIndicator,
                ]}>
                  <Text style={[
                    styles.choiceIndicatorText,
                    (isSelected && !showFeedback) || isCorrect || isIncorrect 
                      ? { color: 'white' } 
                      : { color: '#64748b' }
                  ]}>
                    {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                  </Text>
                </View>
                
                <Text style={[
                  styles.choiceText,
                  isSelected && !showFeedback && { color: levelColor, fontWeight: '600' },
                  isCorrect && styles.correctChoiceText,
                  isIncorrect && styles.incorrectChoiceText,
                ]}>
                  {choice}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 💡 FEEDBACK SI NÉCESSAIRE */}
      {showFeedback && exercise.explanation && (
        <ContentSection
          title="Explication"
          content={exercise.explanation}
          levelColor={selectedChoiceIndex === correctChoiceIndex ? "#10b981" : "#ef4444"}
          backgroundColor={selectedChoiceIndex === correctChoiceIndex ? "#f0fdf4" : "#fef2f2"}
          style={styles.feedbackSection}
        />
      )}
    </View>
  );
};

// ✅ Définition de PropTypes pour valider les props
MultipleChoiceMode.propTypes = {
  // 'exercise' est manquant dans la validation, ainsi que ses sous-propriétés
  exercise: PropTypes.shape({
    text: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctChoiceIndex: PropTypes.number.isRequired,
    explanation: PropTypes.string,
  }).isRequired,
  // 'selectedChoiceIndex' est manquant
  selectedChoiceIndex: PropTypes.number,
  // 'onSelectChoice' est manquant
  onSelectChoice: PropTypes.func.isRequired,
  // 'showFeedback' est manquant
  showFeedback: PropTypes.bool,
  // 'levelColor' est manquant
  levelColor: PropTypes.string,
};

export default MultipleChoiceMode;