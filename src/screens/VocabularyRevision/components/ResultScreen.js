// src/screens/VocabularyRevision/components/ResultScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ScoreCard = ({ score, totalQuestions, percentage, resultConfig, colors, localStyles }) => (
  <View style={[localStyles.scoreCard, { backgroundColor: colors.surface }]}>
    <View style={localStyles.scoreRow}>
      <Text style={[localStyles.scoreNumber, { color: resultConfig.color }]}>
        {score}
      </Text>
      <Text style={[localStyles.scoreSlash, { color: colors.textSecondary }]}>/{totalQuestions}</Text>
    </View>
    <View style={[localStyles.progressBar, { backgroundColor: '#F3F4F6' }]}>
      <View
        style={[
          localStyles.progressFill,
          { backgroundColor: resultConfig.color, width: `${percentage}%` }
        ]}
      />
    </View>
    <Text style={[localStyles.percentageText, { color: resultConfig.color }]}> {percentage}% de réussite </Text>
  </View>
);

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
      <ScoreCard
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

export default ResultScreen;