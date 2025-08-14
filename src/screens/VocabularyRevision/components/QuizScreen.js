// src/screens/VocabularyRevision/components/QuizScreen.js
import React from 'react';
import { View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import QuizHeader from './QuizHeader.js';
import QuizContent from './QuizContent';


const ProgressBar = ({ progress, colors, localStyles }) => {
  const displayProgress = !progress || isNaN(progress) ? 0 : Math.round(progress);
  return (
    <View style={localStyles.progressSection}>
      <View style={[localStyles.progressTrack, { backgroundColor: '#F3F4F6' }]}>
        <View
          style={[
            localStyles.progressBarQuiz,
            {
              backgroundColor: colors.primary,
              width: `${displayProgress}%`,
            },
          ]}
        />
      </View>
      <Text style={[localStyles.progressText, { color: colors.textSecondary }]}>
        {displayProgress}%
      </Text>
    </View>
  );
};

const QuizScreen = ({
  quizEngine,
  onGoBack,
  onAnswer,
  onContinue,
  slideAnim,
  shakeAnim,
  colors,
  localStyles
}) => {
  const {
    currentQuestionIndex: currentIndex,
    totalQuestions,
    score,
    progress,
    currentQuestion,
    selectedChoice: selectedAnswer,
    showResult,
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
      <Animated.View style={{
        flex: 1,
        transform: [
          { translateX: slideAnim },
          { translateX: shakeAnim }
        ]
      }}>
        <QuizContent
          currentQuestion={currentQuestion}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          handleAnswer={onAnswer}
          handleContinue={onContinue}
          colors={colors}
          localStyles={localStyles}
        />
      </Animated.View>
    </>
  );
};


// PropTypes corrigés pour ProgressBar
ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
};

// PropTypes pour le composant principal QuizScreen
QuizScreen.propTypes = {
  quizEngine: PropTypes.shape({
    currentQuestionIndex: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    currentQuestion: PropTypes.object.isRequired,
    selectedChoice: PropTypes.number,
    showResult: PropTypes.bool.isRequired,
  }).isRequired,
  onGoBack: PropTypes.func.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  slideAnim: PropTypes.object.isRequired,
  shakeAnim: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
};

export default QuizScreen;