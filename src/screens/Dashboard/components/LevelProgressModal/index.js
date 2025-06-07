// src/screens/Dashboard/components/LevelProgressModal/index.js
import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

const { width: screenWidth } = Dimensions.get('window');

const LevelProgressModal = ({ 
  visible, 
  onClose, 
  currentLevel = 2, // Niveau actuel (0-based)
  levels = [
    {
      id: 1,
      level: 1,
      title: "Niveau 1 - Bases",
      description: "Maîtrisez les fondamentaux",
      requirement: "Complétez 10 exercices",
      totalExercises: 10,
      completedExercises: 10,
      bonus: { 
        description: "Mode pratique débloqué", 
        unlocked: true,
        icon: "🎯" 
      }
    },
    {
      id: 2,
      level: 2,
      title: "Niveau 2 - Intermédiaire",
      description: "Approfondissez vos connaissances",
      requirement: "Obtenez 80% de réussite sur 15 exercices",
      totalExercises: 15,
      completedExercises: 8,
      bonus: { 
        description: "Exercices avancés débloqués", 
        unlocked: false,
        icon: "🚀" 
      }
    },
    {
      id: 3,
      level: 3,
      title: "Niveau 3 - Avancé",
      description: "Techniques avancées et stratégies",
      requirement: "Réalisez 3 projets complets",
      totalExercises: 20,
      completedExercises: 0,
      bonus: { 
        description: "Certificat de compétence", 
        unlocked: false,
        icon: "🏆" 
      }
    },
    {
      id: 4,
      level: 4,
      title: "Niveau 4 - Expert",
      description: "Maîtrise experte du domaine",
      requirement: "Score parfait sur 5 défis",
      totalExercises: 25,
      completedExercises: 0,
      bonus: { 
        description: "Accès communauté Premium", 
        unlocked: false,
        icon: "👑" 
      }
    },
    {
      id: 5,
      level: 5,
      title: "Niveau 5 - Maître",
      description: "Devenez un référent",
      requirement: "Mentorer 3 autres utilisateurs",
      totalExercises: 30,
      completedExercises: 0,
      bonus: { 
        description: "Badge Mentor officiel", 
        unlocked: false,
        icon: "🎓" 
      }
    },
    {
      id: 6,
      level: 6,
      title: "Niveau 6 - Champion",
      description: "Le niveau ultime",
      requirement: "Créer du contenu pédagogique",
      totalExercises: 35,
      completedExercises: 0,
      bonus: { 
        description: "Statut Champion + Récompenses", 
        unlocked: false,
        icon: "⭐" 
      }
    }
  ],
  userStats = {
    totalXP: 1250,
    currentLevelXP: 250,
    nextLevelXP: 500,
    streak: 7
  },
  onNavigateToExercises
}) => {
  
  // 🎯 Fonction pour déterminer le statut d'un niveau
  const getLevelStatus = (level, index) => {
    if (index < currentLevel) return 'completed';
    if (index === currentLevel) return 'current';
    return 'locked';
  };

  // 📊 Calcul du pourcentage de progression pour chaque niveau
  const getProgressPercentage = (level, status) => {
    if (status === 'completed') return 100;
    if (status === 'locked') return 0;
    
    // Niveau actuel : calcul basé sur les exercices complétés
    return Math.round((level.completedExercises / level.totalExercises) * 100);
  };

  // 🎨 Styles selon le statut
  const getLevelStyles = (status) => {
    const baseStyle = [styles.levelCard];
    switch (status) {
      case 'completed':
        return [...baseStyle, styles.levelCardCompleted];
      case 'current':
        return [...baseStyle, styles.levelCardCurrent];
      case 'locked':
        return [...baseStyle, styles.levelCardLocked];
      default:
        return baseStyle;
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case 'completed': return '#22C55E';
      case 'current': return '#F59E0B';
      case 'locked': return '#94A3B8';
      default: return '#3B82F6';
    }
  };

  const getProgressColor = (status, progress) => {
    if (progress === 100) return '#22C55E';
    if (status === 'current') return '#3B82F6';
    return '#F59E0B';
  };

  const renderLevelCard = (level, index) => {
    const status = getLevelStatus(level, index);
    const progress = getProgressPercentage(level, status);
    const badgeColor = getBadgeColor(status);
    const progressColor = getProgressColor(status, progress);

    return (
      <View key={level.id} style={getLevelStyles(status)}>
        <View style={styles.levelCardContent}>
          {/* 📋 En-tête du niveau */}
          <View style={styles.levelHeader}>
            <Text style={styles.levelTitle}>{level.title}</Text>
            {status === 'current' && (
              <View style={styles.activeIndicatorContainer}>
                <View style={styles.activeIndicator} />
                <Text style={styles.activeText}>EN COURS</Text>
              </View>
            )}
            {status === 'completed' && (
              <View style={[styles.activeIndicatorContainer, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                <Text style={[styles.activeText, { color: '#059669', marginLeft: 4 }]}>
                  TERMINÉ
                </Text>
              </View>
            )}
          </View>

          {/* 📊 Détails de progression */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.activeInfoDescription}>{level.description}</Text>
            <Text style={[styles.requirementText, { marginTop: 4 }]}>
              📋 {level.requirement}
            </Text>
          </View>

          {/* 📊 Barre de progression avec détails */}
          <View style={styles.levelProgressContainer}>
            <View style={styles.levelProgressBar}>
              <View
                style={[
                  styles.levelProgressFill,
                  { 
                    width: `${progress}%`,
                    backgroundColor: progressColor
                  }
                ]}
              />
            </View>
            <Text style={styles.levelProgressText}>{progress}%</Text>
          </View>

          {/* 🎯 Progression détaillée */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={[styles.activeInfoDescription, { fontSize: 12 }]}>
              {level.completedExercises}/{level.totalExercises} exercices
            </Text>
            {status === 'current' && (
              <Text style={[styles.activeInfoDescription, { fontSize: 12, color: '#3B82F6' }]}>
                Encore {level.totalExercises - level.completedExercises} à faire
              </Text>
            )}
          </View>

          {/* 🎁 Bonus du niveau */}
          {level.bonus && (
            <View style={[
              styles.bonusInfoContainer,
              { backgroundColor: level.bonus.unlocked ? '#ECFDF5' : '#FEF3E2' }
            ]}>
              <Text style={[
                styles.bonusInfoText,
                { color: level.bonus.unlocked ? '#059669' : '#EA580C' }
              ]}>
                {level.bonus.icon || '🎁'} {level.bonus.description || 'Bonus disponible'}
                {level.bonus.unlocked ? ' ✓' : status === 'locked' ? ' 🔒' : ''}
              </Text>
            </View>
          )}
        </View>

        {/* 🏆 Badge du niveau */}
        <View style={[styles.levelBadge, { backgroundColor: badgeColor }]}>
          {status === 'completed' ? (
            <Ionicons name="trophy" size={24} color="white" />
          ) : status === 'locked' ? (
            <Ionicons name="lock-closed" size={20} color="white" />
          ) : (
            <Text style={styles.levelBadgeText}>{level.level}</Text>
          )}
        </View>
      </View>
    );
  };

  const currentLevelData = levels[currentLevel];
  const currentProgress = getProgressPercentage(currentLevelData, 'current');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={{ flex: 1 }} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={styles.modalContent}>
          {/* 🎯 En-tête avec stats globales */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Ma Progression</Text>
              <Text style={[styles.activeInfoDescription, { color: '#64748B' }]}>
                Niveau {currentLevel + 1}/6 • {userStats.totalXP} XP total
              </Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* 📊 Résumé niveau actuel */}
          <View style={styles.activeInfoContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.activeInfoText}>
                  🎯 <Text style={styles.activeInfoBold}>{currentLevelData.title}</Text>
                </Text>
                <Text style={styles.activeInfoDescription}>
                  Progression: {currentProgress}% • {currentLevelData.completedExercises}/{currentLevelData.totalExercises} exercices
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.levelProgressText, { fontSize: 18 }]}>{currentProgress}%</Text>
                <Text style={[styles.activeInfoDescription, { fontSize: 10 }]}>complété</Text>
              </View>
            </View>
            
            {/* Barre de progression principale */}
            <View style={[styles.levelProgressBar, { marginTop: 12, height: 8 }]}>
              <View style={[
                styles.levelProgressFill,
                { width: `${currentProgress}%`, backgroundColor: '#3B82F6', height: 8 }
              ]} />
            </View>
          </View>

          {/* 📜 Liste détaillée des niveaux */}
          <ScrollView 
            style={styles.levelsScrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {levels.map((level, index) => renderLevelCard(level, index))}
          </ScrollView>

          {/* 🚀 Actions */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity 
              style={[styles.closeModalButton, { flex: 1, backgroundColor: '#F1F5F9' }]} 
              onPress={onClose}
            >
              <Text style={styles.closeModalButtonText}>Fermer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.closeModalButton, { flex: 1, backgroundColor: '#3B82F6' }]}
              onPress={() => {
                onClose();
                onNavigateToExercises && onNavigateToExercises();
              }}
            >
              <Text style={[styles.closeModalButtonText, { color: 'white' }]}>
                Continuer les exercices
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LevelProgressModal;