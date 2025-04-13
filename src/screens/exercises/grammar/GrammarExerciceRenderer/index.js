import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './style';

/**
 * Composant pour afficher différents types d'exercices de grammaire
 */
const GrammarExerciseRenderer = ({
  exercise,
  selectedOption,
  setSelectedOption,
  inputText,
  setInputText,
  showFeedback,
  isCorrect,
}) => {
  if (!exercise) return null;
  
  // Render pour un exercice à choix multiples
  const renderMultipleChoiceExercise = () => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.question}>{exercise.question}</Text>
      
      {exercise.sentence && (
        <View style={styles.sentenceContainer}>
          <Text style={styles.sentence}>
            {exercise.sentence.replace('___', '______')}
          </Text>
        </View>
      )}
      
      <View style={styles.optionsContainer}>
        {exercise.options.map((option, index) => {
          const isCorrectOption = index === exercise.answer || option === exercise.answer;
          const isSelectedOption = selectedOption === index;
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isSelectedOption && styles.selectedOption,
                showFeedback && isCorrectOption && styles.correctOption,
                showFeedback && isSelectedOption && !isCorrectOption && styles.incorrectOption
              ]}
              onPress={() => !showFeedback && setSelectedOption(index)}
              disabled={showFeedback && isCorrect}
            >
              <Text style={[
                styles.optionText,
                isSelectedOption && styles.selectedOptionText,
                showFeedback && isCorrectOption && styles.correctOptionText,
                showFeedback && isSelectedOption && !isCorrectOption && styles.incorrectOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  // Render pour un exercice à remplir les blancs
  const renderFillBlankExercise = () => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.question}>{exercise.question}</Text>
      
      <View style={styles.sentenceContainer}>
        <Text style={styles.sentence}>
          {exercise.sentence?.split('___')[0]}
          <TextInput
            style={[
              styles.textInput,
              showFeedback && inputText.trim().toLowerCase() === exercise.answer.toLowerCase() 
                ? styles.correctTextInput 
                : showFeedback && !isCorrect ? styles.incorrectTextInput : null
            ]}
            value={inputText}
            onChangeText={text => !showFeedback && setInputText(text)}
            placeholder="..."
            editable={!showFeedback || !isCorrect}
          />
          {exercise.sentence?.split('___')[1]}
        </Text>
      </View>
    </View>
  );

  // Render pour un exercice de transformation
  const renderTransformationExercise = () => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.question}>{exercise.question}</Text>
      
      {exercise.sentence && (
        <View style={styles.sentenceContainer}>
          <Text style={styles.sentence}>{exercise.sentence}</Text>
        </View>
      )}
      
      <View style={styles.transformationContainer}>
        <TextInput
          style={[
            styles.transformationInput,
            showFeedback && inputText.trim().toLowerCase() === exercise.answer.toLowerCase() 
              ? styles.correctTextInput 
              : showFeedback && !isCorrect ? styles.incorrectTextInput : null
          ]}
          value={inputText}
          onChangeText={text => !showFeedback && setInputText(text)}
          placeholder="Your answer..."
          editable={!showFeedback || !isCorrect}
          multiline
        />
      </View>
    </View>
  );
  
  // Déterminer quel type d'exercice afficher
  if (exercise.type === 'fillInTheBlank' && exercise.options) {
    return renderMultipleChoiceExercise();
  } else if (exercise.type === 'fillInTheBlank') {
    return renderFillBlankExercise();
  } else if (exercise.type === 'transformation') {
    return renderTransformationExercise();
  }
  
  return null;
};

export default GrammarExerciseRenderer;