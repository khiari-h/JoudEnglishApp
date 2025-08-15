// GrammarExerciseRenderer/index.js - CORRIGÉ pour éliminer les 23 violations SonarQube

import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import HeroCard from "../../../../components/ui/HeroCard";
import ContentSection from "../../../../components/ui/ContentSection";
import createStyles from "./style";
import { useCallback } from 'react';

// Fonction pour obtenir les styles d'une option
const getOptionStyles = (showFeedback, isCorrectOption, isSelectedOption, isCorrect, levelColor) => {
  if (showFeedback && isCorrectOption) {
    return ['#10B981', '#059669', '#047857']; // Vert pour correct
  }
  if (showFeedback && isSelectedOption && !isCorrectOption) {
    return ['#EF4444', '#DC2626', '#B91C1C']; // Rouge pour incorrect
  }
  if (isSelectedOption) {
    return [levelColor, `${levelColor}E6`, `${levelColor}CC`]; // Bleu pour sélectionné
  }
  return ['#FFFFFF', '#F8FAFC', '#F1F5F9']; // Neutre
};

// Fonction pour obtenir l'icône d'une option
const getOptionIcon = (showFeedback, isCorrectOption, isSelectedOption, isCorrect) => {
  if (showFeedback && isCorrectOption) {
    return <Ionicons name="checkmark-circle" size={20} color="white" />;
  }
  if (showFeedback && isSelectedOption && !isCorrectOption) {
    return <Ionicons name="close-circle" size={20} color="white" />;
  }
  if (isSelectedOption) {
    return <Ionicons name="radio-button-on" size={20} color="white" />;
  }
  return <Ionicons name="radio-button-off" size={20} color="#9CA3AF" />;
};

// Fonction pour obtenir les styles de texte d'une option
const getOptionTextStyles = (showFeedback, isCorrectOption, isSelectedOption, isCorrect, styles) => {
  const textStyles = [styles.optionText];
  
  if (showFeedback && isCorrectOption) {
    textStyles.push(styles.correctOptionText);
  }
  if (showFeedback && isSelectedOption && !isCorrectOption) {
    textStyles.push(styles.incorrectOptionText);
  }
  if (isSelectedOption && !showFeedback) {
    textStyles.push(styles.selectedOptionText);
  }
  
  return textStyles;
};

// Fonction pour obtenir les styles d'input
const getInputStyles = (showFeedback, inputText, exerciseAnswer, isCorrect, styles, baseStyle) => {
  const inputStyles = [baseStyle];
  
  if (showFeedback && inputText.trim().toLowerCase() === exerciseAnswer.toLowerCase()) {
    inputStyles.push(styles.correctInput);
  } else if (showFeedback && !isCorrect) {
    inputStyles.push(styles.incorrectInput);
  } else {
    inputStyles.push(styles.neutralInput);
  }
  
  return inputStyles;
};

// Composant pour rendre une option individuelle
const OptionItem = ({ option, index, exercise, selectedOption, showFeedback, isCorrect, onPress, styles, levelColor }) => {
  const isCorrectOption = index === exercise.answer || option === exercise.answer;
  const isSelectedOption = selectedOption === index;
  
  const gradientColors = getOptionStyles(showFeedback, isCorrectOption, isSelectedOption, isCorrect, levelColor);
  const optionIcon = getOptionIcon(showFeedback, isCorrectOption, isSelectedOption, isCorrect);
  const textStyles = getOptionTextStyles(showFeedback, isCorrectOption, isSelectedOption, isCorrect, styles);
  
  return (
    <TouchableOpacity
      key={option}
      style={styles.optionContainer}
      onPress={onPress}
      disabled={showFeedback && isCorrect}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.optionGradient}
      >
        <View style={styles.optionInner}>
          <View style={styles.optionIconContainer}>
            {optionIcon}
          </View>
          <Text style={textStyles}>
            {option}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// PropTypes pour OptionItem
OptionItem.propTypes = {
  option: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  exercise: PropTypes.shape({
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  selectedOption: PropTypes.number,
  showFeedback: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  styles: PropTypes.shape({
    optionContainer: PropTypes.any,
    optionGradient: PropTypes.any,
    optionInner: PropTypes.any,
    optionIconContainer: PropTypes.any,
    optionText: PropTypes.any,
    correctOptionText: PropTypes.any,
    incorrectOptionText: PropTypes.any,
    selectedOptionText: PropTypes.any,
  }).isRequired,
  levelColor: PropTypes.string.isRequired,
};

// Composant pour le contenu commun des exercices
const ExerciseContent = ({ exercise, levelColor, title, content, isItalic = false }) => (
  <>
    <HeroCard 
      content={exercise.question}
      fontSize={24}
      levelColor={levelColor}
      showUnderline
    />
    
    {exercise.sentence && (
      <ContentSection
        title={title}
        content={content || exercise.sentence}
        levelColor={levelColor}
        backgroundColor="#F8FAFC"
        isItalic={isItalic}
        showIcon={false}
      />
    )}
  </>
);

// PropTypes pour ExerciseContent
ExerciseContent.propTypes = {
  exercise: PropTypes.shape({
    question: PropTypes.string.isRequired,
    sentence: PropTypes.string,
  }).isRequired,
  levelColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  isItalic: PropTypes.bool,
};

/**
 * 🎯 GrammarExerciseRenderer - Version Refactorisée avec composants génériques
 * Utilise HeroCard pour la question principale
 * Design cohérent avec VocabularyWordCard et PhraseCard
 * Complexité cognitive réduite de 19 à 15
 */
const GrammarExerciseRenderer = ({
  exercise,
  selectedOption,
  setSelectedOption,
  inputText,
  setInputText,
  showFeedback,
  isCorrect,
  exerciseIndex,
  attempts,
}) => {
  // ✅ CORRECTION : Déplacer TOUS les useCallback AVANT le return conditionnel
  const styles = createStyles();
  const levelColor = "#3b82f6"; // Couleur Grammar

  // Remplace les fonctions fléchées inline par des callbacks mémorisés
  const handleChangeText1 = useCallback((text) => {
    if (!showFeedback) setInputText(text);
  }, [showFeedback, setInputText]);

  const handleChangeText2 = useCallback((text) => {
    if (!showFeedback) setInputText(text);
  }, [showFeedback, setInputText]);

  const handleOptionPress = useCallback((index) => {
    if (!showFeedback) setSelectedOption(index);
  }, [showFeedback, setSelectedOption]);

  // Handler stable pour chaque option
  const getOptionPressHandler = useCallback(
    (index) => () => handleOptionPress(index),
    [handleOptionPress]
  );

  // ✅ MAINTENANT on peut faire le return conditionnel
  if (!exercise) return null;

  // Render pour un exercice à choix multiples
  const renderMultipleChoiceExercise = () => (
    <View style={styles.container}>
      <ExerciseContent 
        exercise={exercise}
        levelColor={levelColor}
        title="Complete the sentence"
        content={exercise.sentence?.replace("___", "______")}
      />

      <View style={styles.optionsSection}>
        {exercise.options.map((option, index) => (
          <OptionItem
            key={option}
            option={option}
            index={index}
            exercise={exercise}
            selectedOption={selectedOption}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            onPress={getOptionPressHandler(index)}
            styles={styles}
            levelColor={levelColor}
          />
        ))}
      </View>
    </View>
  );

  // Render pour un exercice à remplir les blancs
  const renderFillBlankExercise = () => (
    <View style={styles.container}>
      <ExerciseContent 
        exercise={exercise}
        levelColor={levelColor}
        title="Complete the sentence"
        content={exercise.sentence || "Fill in the blank"}
      />

      <View style={styles.inputSection}>
        <TextInput
          key={`fill-blank-input-${exerciseIndex}-${attempts}`}
          style={getInputStyles(showFeedback, inputText, exercise.answer, isCorrect, styles, styles.fillBlankInput)}
          value={inputText}
          onChangeText={handleChangeText1}
          placeholder="Type your answer..."
          editable={!showFeedback || !isCorrect}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );

  // Render pour un exercice de transformation
  const renderTransformationExercise = () => (
    <View style={styles.container}>
      <ExerciseContent 
        exercise={exercise}
        levelColor={levelColor}
        title="Transform this sentence"
        content={exercise.sentence}
        isItalic={true}
      />

      <View style={styles.inputSection}>
        <TextInput
          key={`transformation-input-${exerciseIndex}-${attempts}`}
          style={getInputStyles(showFeedback, inputText, exercise.answer, isCorrect, styles, styles.transformationInput)}
          value={inputText}
          onChangeText={handleChangeText2}
          placeholder="Write your transformed sentence..."
          editable={!showFeedback || !isCorrect}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );

  // Déterminer quel type d'exercice afficher
  if (exercise.type === "fillInTheBlank" && exercise.options) {
    return renderMultipleChoiceExercise();
  } else if (exercise.type === "fillInTheBlank") {
    return renderFillBlankExercise();
  } else if (exercise.type === "transformation") {
    return renderTransformationExercise();
  }

  return null;
};

// PropTypes pour le composant principal GrammarExerciseRenderer
GrammarExerciseRenderer.propTypes = {
  exercise: PropTypes.shape({
    question: PropTypes.string.isRequired,
    sentence: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['fillInTheBlank', 'transformation']).isRequired,
  }),
  selectedOption: PropTypes.number,
  setSelectedOption: PropTypes.func.isRequired,
  inputText: PropTypes.string,
  setInputText: PropTypes.func.isRequired,
  showFeedback: PropTypes.bool,
  isCorrect: PropTypes.bool,
  exerciseIndex: PropTypes.number,
  attempts: PropTypes.number,
};

export default GrammarExerciseRenderer;