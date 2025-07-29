// src/screens/VocabularyRevision/components/QuizContent.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const QuestionCard = ({ currentQuestion, colors, localStyles }) => (
  <View style={[localStyles.questionCard, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
    <View style={localStyles.questionLabelContainer}>
      <Text style={[localStyles.questionLabelIcon, { color: colors.primary }]}>?</Text>
      <Text style={localStyles.questionLabel}>Traduisez le mot :</Text>
    </View>
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

const ChoicesSection = ({ currentQuestion, selectedAnswer, showResult, handleAnswer, colors, localStyles }) => {
  return (
  <View style={localStyles.choicesSection}>
    {currentQuestion?.choices.map((choice, index) => {
      const isSelected = selectedAnswer === choice;
      const isCorrectAnswer = choice === currentQuestion.correctAnswer;

      // Styles de base
      const buttonStyle = [localStyles.choiceButton];
      const textStyle = [localStyles.choiceText, { color: colors.text }];
      const numberContainerStyle = [localStyles.choiceNumberContainer];
      const numberTextStyle = [localStyles.choiceNumberText];
      let icon = null;

      if (showResult) {
        if (isCorrectAnswer) {
          buttonStyle.push(localStyles.choiceCorrect);
          textStyle.push(localStyles.choiceTextCorrect);
          numberContainerStyle.push({ backgroundColor: '#10B981' });
          numberTextStyle.push({ color: '#FFFFFF' });
          icon = <Text style={[localStyles.choiceIcon, { color: '#10B981' }]}>✓</Text>;
        } else if (isSelected) { // isSelected and not isCorrectAnswer
          buttonStyle.push(localStyles.choiceWrong);
          textStyle.push(localStyles.choiceTextWrong);
          numberContainerStyle.push({ backgroundColor: '#EF4444' });
          numberTextStyle.push({ color: '#FFFFFF' });
          icon = <Text style={[localStyles.choiceIcon, { color: '#EF4444' }]}>✗</Text>;
        }
      } else if (isSelected) {
        buttonStyle.push(localStyles.choiceSelected);
        numberContainerStyle.push({ backgroundColor: colors.primary });
        numberTextStyle.push({ color: '#FFFFFF' });
      }

      return (
        <TouchableOpacity
          key={choice}
          style={buttonStyle}
          onPress={() => handleAnswer(choice)}
          disabled={showResult}
          activeOpacity={0.8}
        >
          <View style={localStyles.choiceButtonInner}>
            <View style={numberContainerStyle}>
              <Text style={numberTextStyle}>{index + 1}</Text>
            </View>
            <Text style={textStyle}>{choice}</Text>
            {icon}
          </View>
        </TouchableOpacity>
      );
    })}
  </View>);
};

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