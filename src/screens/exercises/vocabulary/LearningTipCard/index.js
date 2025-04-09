// VocabularyExercise/LearningTipCard/index.js
import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

/**
 * Carte de conseil d'apprentissage animée pour l'exercice de vocabulaire
 */
const LearningTipCard = ({ 
  tipText, 
  onDismiss,
  fadeAnim = new Animated.Value(1) 
}) => {
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.icon}>💡</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Learning Tip</Text>
          <Text style={styles.text}>{tipText}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={onDismiss}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Ionicons name="close" size={16} color="#9CA3AF" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default LearningTipCard;