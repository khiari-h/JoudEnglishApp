// ReadingQuestionCard/index.js - VERSION STYLE GRAMMAR avec design micro 🎯
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import createStyles from './style';

// Fonction pour obtenir les couleurs de gradient d'une option (copiée exactement de Grammar)
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

// Fonction pour obtenir l'icône d'une option (copiée exactement de Grammar)
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

// Fonction pour obtenir les styles de texte d'une option (copiée exactement de Grammar)
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

// Composant pour rendre une option individuelle (copié exactement de Grammar)
const OptionItem = ({ option, index, exercise, selectedOption, showFeedback, isCorrect, onPress, styles, levelColor }) => {
  // Dans Reading, exercise.answer est l'index de la bonne réponse (0, 1, 2)
  const isCorrectOption = index === exercise.answer;
  const isSelectedOption = selectedOption === index;
  
  // Log temporaire pour déboguer
  console.log(`Option ${index} (${option}):`, {
    exerciseAnswer: exercise.answer,
    selectedOption,
    isCorrectOption,
    isSelectedOption,
    showFeedback,
    isCorrect
  });
  
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

// PropTypes pour OptionItem (copié exactement de Grammar)
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
  styles: PropTypes.object.isRequired,
  levelColor: PropTypes.string.isRequired,
};

const ReadingQuestionCard = ({ 
  question, 
  options, 
  selectedOption, 
  onOptionSelect, 
  showFeedback, 
  isCorrect, 
  levelColor = '#3B82F6' 
}) => {
  const styles = createStyles(levelColor);
  
  return (
    <View style={styles.container}>
      {/* Question Header avec style "micro" */}
      <View style={styles.questionHeader}>
        <Text style={styles.questionTitle}>Question {question.id}</Text>
      </View>

      {/* Question Section avec style "micro" */}
      <View style={styles.questionSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="help-circle" size={20} color="white" />
          </View>
          <Text style={styles.sectionTitle}>Question</Text>
        </View>
        <Text style={styles.questionText}>{question.text}</Text>
      </View>

      {/* Options avec le même système que Grammar */}
      <View style={styles.optionsContainer}>
        <Text style={styles.optionsTitle}>Choisissez la bonne réponse :</Text>
        {options.map((option, index) => (
          <OptionItem
            key={option}
            option={option}
            index={index}
            exercise={{ answer: question.answer }}
            selectedOption={selectedOption}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            onPress={() => onOptionSelect(index)}
            styles={styles}
            levelColor={levelColor}
          />
        ))}
      </View>
    </View>
  );
};

ReadingQuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOption: PropTypes.number,
  onOptionSelect: PropTypes.func.isRequired,
  showFeedback: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  levelColor: PropTypes.string,
};

export default ReadingQuestionCard;