// src/screens/VocabularyRevision/components/QuizHeader.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QuizHeader = ({ onGoBack, currentIndex, totalQuestions, score, colors, localStyles }) => (
  <View style={localStyles.header}>
    <TouchableOpacity 
      onPress={onGoBack} 
      style={[localStyles.backButton, { backgroundColor: colors.surface }]}
    >
      <Icon name="arrow-left" size={24} color={colors.text} />
    </TouchableOpacity>
    
    <View style={localStyles.headerCenter}>
      <Text style={[localStyles.questionCounter, { color: colors.text }]}>
        Question {(currentIndex || 0) + 1}
      </Text>
      <Text style={[localStyles.totalQuestions, { color: colors.textSecondary }]}>
        sur {totalQuestions}
      </Text>
    </View>
    
    <View style={[localStyles.scoreChip, { backgroundColor: '#10B981' }]}>
      {/* ✅ Score en blanc sur fond vert pour une meilleure visibilité */}
      <Text style={[localStyles.scoreChipText, { color: 'white' }]}>{score}</Text>
    </View>
  </View>
);

export default QuizHeader;