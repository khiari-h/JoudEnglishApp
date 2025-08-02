import React from 'react';
import { View, Text, TouchableOpacity, AccessibilityInfo } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QuizHeader = ({
  onGoBack,
  currentIndex = 0,
  totalQuestions = 0,
  score = 0,
  colors = {},
  localStyles = {},
}) => {
  // Texte en français homogène
  return (
    <View style={localStyles.header}>
      <TouchableOpacity
        onPress={onGoBack}
        style={[localStyles.backButton, { backgroundColor: colors.surface || '#fff' }]}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Retour"
        accessibilityHint="Retour à l'écran précédent"
      >
        <Icon name="arrow-left" size={24} color={colors.text || '#000'} />
      </TouchableOpacity>

      <View style={localStyles.headerCenter}>
        <Text style={[localStyles.questionCounter, { color: colors.text || '#000' }]}>
          Question {currentIndex + 1}
        </Text>
        <Text style={[localStyles.totalQuestions, { color: colors.textSecondary || '#666' }]}>
          sur {totalQuestions}
        </Text>
      </View>

      <View style={[localStyles.scoreChip, { backgroundColor: colors.success || '#10B981' }]}>
        <Text style={[localStyles.scoreChipText, { color: 'white' }]}>{score}</Text>
      </View>
    </View>
  );
};

export default QuizHeader;
