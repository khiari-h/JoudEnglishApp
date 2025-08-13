// src/screens/VocabularyRevision/components/EmptyState.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';import PropTypes from 'prop-types';


const ProgressBar = ({ progress, goal, colors }) => {
  const percentage = Math.min((progress / goal) * 100, 100);
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressTrack, { backgroundColor: colors.surface }]}>
        <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${percentage}%` }]} />
      </View>
      <Text style={[styles.progressText, { color: colors.textSecondary }]}>{progress} / {goal}</Text>
    </View>
  );
};

const EmptyState = ({ type, message, onAction, colors, localStyles, progress, goal }) => {
  const config = {
    locked: {
      emoji: '🔒',
      title: 'Révision Verrouillée',
      buttonText: 'Retour',
    },
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

  const { emoji, title, buttonText } = config[type] || config.error;

  const lockedMessage = `Apprenez ${goal} mots pour débloquer le mode révision et tester vos connaissances !`;

  return (
    <View style={localStyles.emptyContainer} testID={type === 'loading' ? 'loading-indicator' : undefined}>
      <Text style={localStyles.emptyEmoji}>{emoji}</Text>
      <Text style={[localStyles.emptyTitle, { color: colors.text }]}>
        {title}
      </Text>
      {type === 'locked' && (
        <ProgressBar progress={progress} goal={goal} colors={colors} />
      )}
      <Text style={[localStyles.emptyMessage, { color: colors.textSecondary }]}>
        {type === 'locked' ? lockedMessage : message}
      </Text>
      {buttonText && onAction && (
        <TouchableOpacity style={[localStyles.emptyButton, { backgroundColor: colors.primary }]} onPress={onAction} activeOpacity={0.8}>
          <Text style={localStyles.emptyButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    width: '80%',
    alignItems: 'center',
    marginVertical: 16,
  },
  progressTrack: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontWeight: '600',
  },
});


ProgressBar.propTypes = {
  progress: PropTypes.any.isRequired,
  goal: PropTypes.any.isRequired,
  colors: PropTypes.any.isRequired,
};

export default EmptyState;