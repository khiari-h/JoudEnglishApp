// src/screens/VocabularyRevision/components/ResultScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';


const AnimatedScoreCard = ({ score, totalQuestions, percentage, resultConfig, colors, localStyles }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scoreAnim = useRef(new Animated.Value(0)).current;
  const [displayedScore, setDisplayedScore] = useState(0);

  useEffect(() => {
    // ✅ CORRECTION: Séparer les animations pour éviter les conflits
    // Animation de la barre de progression
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 800,
      delay: 300,
      useNativeDriver: false, // ✅ 'width' nécessite useNativeDriver: false
    }).start();

    // Animation du score séparément pour éviter les conflits
    Animated.timing(scoreAnim, {
      toValue: score,
      duration: 800,
      delay: 300,
      useNativeDriver: true, // ✅ Safe pour les listeners
    }).start();

    // Listener to update the score text as the animation runs
    const scoreListenerId = scoreAnim.addListener(({ value }) => {
      setDisplayedScore(Math.floor(value));
    });

    return () => {
      // Cleanup listener on component unmount
      scoreAnim.removeListener(scoreListenerId);
    };
  }, [score, percentage]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[localStyles.scoreCard, { backgroundColor: colors.surface }]}>
      <View style={localStyles.scoreRow}>
        <Text style={[localStyles.scoreNumber, { color: resultConfig.color }]}>
          {displayedScore}
        </Text>
        <Text style={[localStyles.scoreSlash, { color: colors.textSecondary }]}>/{totalQuestions}</Text>
      </View>
      <View style={[localStyles.progressBar, { backgroundColor: '#F3F4F6' }]}>
        <Animated.View
          style={[localStyles.progressFill, { backgroundColor: resultConfig.color, width: progressWidth }]}
        />
      </View>
      <Text style={[localStyles.percentageText, { color: resultConfig.color }]}> {percentage}% de réussite </Text>
    </View>
  );
};

const ResultButtons = ({ colors, resultConfig, handleRestartPress, handleFinishPress, localStyles }) => (
  <View style={localStyles.buttonsContainer}>
    <TouchableOpacity
      style={[localStyles.restartButton, { backgroundColor: colors.surface }]}
      onPress={handleRestartPress}
      activeOpacity={0.8}
    >
      <View style={localStyles.buttonContent}>
        <Text style={localStyles.restartIcon}>🔄</Text>
        <Text style={[localStyles.restartText, { color: colors.text }]}>Rejouer</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={[localStyles.finishButton, { backgroundColor: resultConfig.color }]}
      onPress={handleFinishPress}
      activeOpacity={0.8}
    >
      <View style={localStyles.buttonContent}>
        <Text style={localStyles.finishIcon}>✓</Text>
        <Text style={localStyles.finishText}>Terminer</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const ResultScreen = ({ score, totalQuestions, source, handleRestart, handleFinish, localStyles, colors }) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  let resultConfig;
  if (percentage >= 80) {
    resultConfig = { emoji: "🎉", title: "Excellent !", message: "Vous maîtrisez parfaitement ces mots !", color: "#10B981" };
  } else if (percentage >= 60) {
    resultConfig = { emoji: "👍", title: "Bien joué !", message: "Bonne progression, continuez !", color: "#3B82F6" };
  } else {
    resultConfig = { emoji: "📖", title: "À améliorer", message: "Révisez encore ces mots pour progresser", color: "#F59E0B" };
  }

  return (
    <View style={localStyles.resultContainer}>
      <Text style={localStyles.resultEmoji}>{resultConfig.emoji}</Text>
      <Text style={[localStyles.resultTitle, { color: colors.text }]}>{resultConfig.title}</Text>
      <Text style={[localStyles.resultMessage, { color: colors.textSecondary }]}>{resultConfig.message}</Text>
      <AnimatedScoreCard
        score={score}
        totalQuestions={totalQuestions}
        percentage={percentage}
        resultConfig={resultConfig}
        colors={colors}
        localStyles={localStyles}
      />
      {source && (
        <Text style={[localStyles.sourceText, { color: colors.textSecondary }]}>
          {source === 'popup_trigger' ? '🤖 Révision automatique' : '👤 Révision manuelle'}
        </Text>
      )}
      <ResultButtons
        colors={colors}
        resultConfig={resultConfig}
        handleRestartPress={handleRestart}
        handleFinishPress={handleFinish}
        localStyles={localStyles}
      />
    </View>
  );
};


// PropTypes corrigés pour AnimatedScoreCard
AnimatedScoreCard.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
  resultConfig: PropTypes.shape({
    emoji: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
};

// PropTypes pour ResultButtons
ResultButtons.propTypes = {
  colors: PropTypes.object.isRequired,
  resultConfig: PropTypes.shape({
    color: PropTypes.string.isRequired,
  }).isRequired,
  handleRestartPress: PropTypes.func.isRequired,
  handleFinishPress: PropTypes.func.isRequired,
  localStyles: PropTypes.object.isRequired,
};

// PropTypes pour le composant principal ResultScreen
ResultScreen.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  source: PropTypes.string,
  handleRestart: PropTypes.func.isRequired,
  handleFinish: PropTypes.func.isRequired,
  localStyles: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
};

export default ResultScreen;