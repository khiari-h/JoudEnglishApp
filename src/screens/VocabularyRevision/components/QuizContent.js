// src/screens/VocabularyRevision/components/QuizContent.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const QuestionCard = ({ currentQuestion, colors, localStyles }) => (
  <View style={[localStyles.questionCard, { backgroundColor: colors.surface }]}>
    <Text style={localStyles.questionLabel}>Traduisez :</Text>
    <Text style={[localStyles.wordToTranslate, { color: colors.text }]}>
      {currentQuestion?.word}
    </Text>
    {currentQuestion?.fromLevel && (
      <Text style={[localStyles.levelInfo, { color: colors.textSecondary }]}>
        Niveau {currentQuestion.fromLevel} ({currentQuestion.fromMode})
      </Text>
    )}
  </View>
);

const ChoicesSection = ({ currentQuestion, selectedAnswer, showResult, handleAnswer, colors, localStyles }) => (
  <View style={localStyles.choicesSection}>
    {currentQuestion?.choices.map((choice) => {
      const isSelected = selectedAnswer === choice;
      const isCorrect = choice === currentQuestion.correctAnswer;
      const isWrong = showResult && isSelected && !isCorrect;
      const shouldHighlight = showResult && isCorrect;

      const buttonStyle = [localStyles.choiceButton, { backgroundColor: colors.surface }];
      const textStyle = [localStyles.choiceText, { color: colors.text }];
      let icon = null;

      if (shouldHighlight) {
        buttonStyle.push(localStyles.choiceCorrect);
        textStyle.push(localStyles.choiceTextCorrect);
        icon = <Text style={localStyles.choiceIcon}>✓</Text>;
      } else if (isWrong) {
        buttonStyle.push(localStyles.choiceWrong);
        textStyle.push(localStyles.choiceTextWrong);
        icon = <Text style={localStyles.choiceIcon}>✗</Text>;
      } else if (isSelected) {
        buttonStyle.push({ borderColor: colors.primary, borderWidth: 2 });
      }

      return (
        <TouchableOpacity
          key={choice}
          style={buttonStyle}
          onPress={() => handleAnswer(choice)}
          disabled={showResult}
          activeOpacity={0.7}
        >
          <Text style={textStyle}>{choice}</Text>
          {icon}
        </TouchableOpacity>
      );
    })}
  </View>
);

const QuizContent = ({
  currentQuestion,
  selectedAnswer,
  showResult,
  handleAnswer,
  colors,
  localStyles
}) => {
  return (
    <>
      <View style={localStyles.questionSection}>
        <QuestionCard
          currentQuestion={currentQuestion}
          colors={colors}
          localStyles={localStyles}
        />
      </View>

      <ChoicesSection
        currentQuestion={currentQuestion}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        handleAnswer={handleAnswer}
        colors={colors}
        localStyles={localStyles}
      />
    </>
  );
};

export default QuizContent;