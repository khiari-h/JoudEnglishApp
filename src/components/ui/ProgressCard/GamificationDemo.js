// src/components/ui/ProgressCard/GamificationDemo.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useProgressGamification from '../../../hooks/useProgressGamification';

/**
 * 🎮 Composant de démonstration pour tester useProgressGamification
 * Permet de voir tous les effets en temps réel
 */
const GamificationDemo = () => {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [type, setType] = useState('vocabulary');
  
  const total = 40;
  
  // Utilisation du hook
  const gamification = useProgressGamification({
    progress: (completed / total) * 100,
    completed,
    total,
    type
  });
  
  // Fonctions de test
  const addProgress = () => {
    if (completed < total) {
      setCompleted(prev => prev + 1);
    }
  };
  
  const resetProgress = () => {
    setCompleted(0);
  };
  
  const changeType = () => {
    const types = ['vocabulary', 'grammar', 'phrases'];
    const currentIndex = types.indexOf(type);
    const nextIndex = (currentIndex + 1) % types.length;
    setType(types[nextIndex]);
  };
  
  return (
    <View style={styles.container}>
      {/* Contrôles de test */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={addProgress}>
          <Text style={styles.buttonText}>+1 Progression</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={resetProgress}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={changeType}>
          <Text style={styles.buttonText}>Type: {type}</Text>
        </TouchableOpacity>
      </View>
      
      {/* Affichage des données de gamification */}
      <View style={[styles.card, { backgroundColor: gamification.colors.secondary }]}>
        {/* Progression */}
        <View style={styles.progressSection}>
          <Text style={[styles.title, { color: gamification.colors.primary }]}>
            {gamification.messages.main}
          </Text>
          <Text style={styles.subtitle}>
            {gamification.messages.subtitle}
          </Text>
          
          {/* Barre de progression */}
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${gamification.progress}%`,
                  backgroundColor: gamification.colors.primary
                }
              ]} 
            />
          </View>
          
          <Text style={styles.progressText}>
            {gamification.completed} / {gamification.total} ({Math.round(gamification.progress)}%)
          </Text>
        </View>
        
        {/* Badges */}
        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>🏆 Badges</Text>
          <Text style={styles.badgeText}>
            Actuel: {gamification.badges.current}
          </Text>
          <Text style={styles.badgeText}>
            Prochain: {gamification.badges.next} ({gamification.badges.progressToNext}% restants)
          </Text>
        </View>
        
        {/* Effets visuels */}
        <View style={styles.effectsSection}>
          <Text style={styles.sectionTitle}>✨ Effets</Text>
          <Text style={styles.effectText}>
            Glow: {Math.round(gamification.visualEffects.glowIntensity * 100)}%
          </Text>
          <Text style={styles.effectText}>
            Pulse: {gamification.visualEffects.pulseActive ? '🟢 Actif' : '🔴 Inactif'}
          </Text>
          <Text style={styles.effectText}>
            Shadow: {Math.round(gamification.visualEffects.shadowDepth)}px
          </Text>
        </View>
        
        {/* Célébration */}
        {gamification.celebration && (
          <View style={[styles.celebration, { backgroundColor: gamification.celebration.color }]}>
            <Text style={styles.celebrationText}>
              {gamification.celebration.emoji} {gamification.celebration.message}
            </Text>
            <Text style={styles.celebrationType}>
              Type: {gamification.celebration.type}
            </Text>
          </View>
        )}
        
        {/* États spéciaux */}
        <View style={styles.statesSection}>
          <Text style={styles.sectionTitle}>🎯 États</Text>
          <Text style={styles.stateText}>
            {gamification.isComplete ? '✅ Terminé' : '🔄 En cours'}
          </Text>
          <Text style={styles.stateText}>
            {gamification.isNearComplete ? '🔥 Presque fini' : '📚 Encore du travail'}
          </Text>
          <Text style={styles.stateText}>
            {gamification.isStarting ? '🚀 Démarrage' : '💪 En progression'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  badgesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#374151',
  },
  badgeText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  effectsSection: {
    marginBottom: 16,
  },
  effectText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  celebration: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  celebrationText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  celebrationType: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  statesSection: {
    marginBottom: 16,
  },
  stateText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
});

export default GamificationDemo;
