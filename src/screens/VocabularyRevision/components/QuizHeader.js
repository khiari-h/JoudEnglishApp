// src/screens/VocabularyRevision/components/QuizHeader.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const QuizHeader = ({ onGoBack, currentIndex, totalQuestions, score, colors, localStyles }) => (
  <View style={localStyles.header}>
    <TouchableOpacity 
      onPress={onGoBack} 
      style={[localStyles.backButton, { backgroundColor: colors.surface }]}
    >
      <Text style={[localStyles.backButtonText, { color: colors.text }]}>←</Text>
    </TouchableOpacity>
    
    <View style={localStyles.headerCenter}>
      <Text style={[localStyles.questionCounter, { color: colors.text }]}>
        Question {currentIndex + 1}
      </Text>
      <Text style={[localStyles.totalQuestions, { color: colors.textSecondary }]}>
        sur {totalQuestions}
      </Text>
    </View>
    
    <View style={[localStyles.scoreChip, { backgroundColor: colors.primary }]}>
      <Text style={localStyles.scoreChipText}>{score}</Text>
    </View>
  </View>
);

export default QuizHeader;