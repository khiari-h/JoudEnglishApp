// src/screens/VocabularyRevision/components/QuizScreen.js
import React from 'react';
import { View, Text, Animated } from 'react-native';
import QuizHeader from './QuizHeader.js';
import QuizContent from './QuizContent';

const ProgressBar = ({ progress, colors, localStyles }) => (
  <View style={localStyles.progressSection}>
    <View style={[localStyles.progressTrack, { backgroundColor: '#F3F4F6' }]}>
      <View
        style={[
          localStyles.progressBarQuiz,
          {
            backgroundColor: colors.primary,
            width: `${progress}%`
          }
        ]}
      />
    </View>
    <Text style={[localStyles.progressText, { color: colors.textSecondary }]}>
      {Math.round(progress)}%
    </Text>
  </View>
);

const QuizScreen = ({
  quizEngine,
  onGoBack,
  slideAnim,
  colors,
  localStyles
}) => {
  const {
    currentIndex,
    totalQuestions,
    score,
    progress,
    currentQuestion,
    selectedAnswer,
    showResult,
    handleAnswer,
  } = quizEngine;

  return (
    <>
      <QuizHeader
        onGoBack={onGoBack}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        score={score}
        colors={colors}
        localStyles={localStyles}
      />
      <ProgressBar progress={progress} colors={colors} localStyles={localStyles} />
      <Animated.View style={{ flex: 1, transform: [{ translateX: slideAnim }] }}>
        <QuizContent
          currentQuestion={currentQuestion}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          handleAnswer={handleAnswer}
          colors={colors}
          localStyles={localStyles}
        />
      </Animated.View>
    </>
  );
};

export default QuizScreen;