// src/screens/VocabularyRevision/components/EmptyState.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const EmptyState = ({ type, message, onAction, colors, localStyles }) => {
  const config = {
    loading: {
      emoji: '🔄',
      title: 'Chargement...',
      buttonText: null,
    },
    error: {
      emoji: '⚠️',
      title: 'Erreur',
      buttonText: 'Retour',
    },
    noWords: {
      emoji: '📚',
      title: 'Aucun mot disponible',
      buttonText: 'Retour',
    },
  };

  const { emoji, title, buttonText } = config[type];

  return (
    <View style={localStyles.emptyContainer}>
      <Text style={localStyles.emptyEmoji}>{emoji}</Text>
      <Text style={[localStyles.emptyTitle, { color: colors.text }]}>
        {title}
      </Text>
      <Text style={[localStyles.emptyMessage, { color: colors.textSecondary }]}>
        {message}
      </Text>
      {buttonText && onAction && (
        <TouchableOpacity style={[localStyles.emptyButton, { backgroundColor: colors.primary }]} onPress={onAction} activeOpacity={0.8}>
          <Text style={localStyles.emptyButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;