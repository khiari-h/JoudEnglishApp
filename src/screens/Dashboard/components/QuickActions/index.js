// src/screens/Dashboard/components/QuickActions/index.js
import React, { useContext, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // ✅ CHANGÉ
import { ROUTES } from "../../../../navigation/routes"; // ✅ AJOUT
import { ThemeContext } from "../../../../contexts/ThemeContext";
import styles from "./style";

/**
 * Quick Actions - 3 modules principaux du niveau en cours
 * ✅ Vocabulaire de base, Révision vocabulaire, Test niveau
 */
const QuickActions = ({ 
  currentLevel = "1", 
  progressContext,
  accentColor = "#3B82F6" 
}) => {
  const navigation = useNavigation(); // ✅ CHANGÉ
  const themeContext = useContext(ThemeContext);
  const colors = themeContext?.colors || {
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // ========== LOGIQUE RÉVISION ==========
  
  // Calcul mots appris total (même logique que dashboard)
  const totalWordsLearned = useMemo(() => {
    if (!progressContext?.progress?.exercises?.vocabulary) return 0;
    
    let total = 0;
    ['1', '2', '3', '4', '5', '6', 'bonus'].forEach(level => {
      const classicProgress = progressContext.progress.exercises.vocabulary[level]?.completed || 0;
      if (classicProgress > 0) {
        const estimatedWordsPerLevel = 100;
        total += Math.round((classicProgress / 100) * estimatedWordsPerLevel);
      }
    });
    return total;
  }, [progressContext?.progress?.exercises?.vocabulary]);

  // Logique révision tous les 50 mots
  const revisionData = useMemo(() => {
    if (totalWordsLearned < 50) {
      return {
        needsRevision: false,
        wordsToReview: 0,
        nextMilestone: 50 - totalWordsLearned
      };
    }
    
    const reviewCycle = 50;
    const completedCycles = Math.floor(totalWordsLearned / reviewCycle);
    const wordsToReview = completedCycles * 10; // 10 mots par cycle de 50
    
    return {
      needsRevision: true,
      wordsToReview,
      nextMilestone: Math.ceil(totalWordsLearned / reviewCycle) * reviewCycle - totalWordsLearned
    };
  }, [totalWordsLearned]);

  // ========== CONFIGURATION ACTIONS ==========
  
  const actions = [
    {
      id: 'vocabulary',
      icon: '📖',
      label: 'Vocabulaire',
      subtitle: 'Exercice de base',
      action: () => navigation.navigate(ROUTES.VOCABULARY_EXERCISE, { // ✅ CHANGÉ
        level: currentLevel, 
        mode: "classic" 
      }),
      available: true,
      color: '#10B981' // Vert
    },
    {
      id: 'revision',
      icon: '🔄',
      label: 'Révision',
      subtitle: revisionData.needsRevision 
        ? `${revisionData.wordsToReview} mots à revoir`
        : `Dans ${revisionData.nextMilestone} mots`,
      action: () => {
        if (revisionData.needsRevision) {
          navigation.navigate(ROUTES.VOCABULARY_REVISION, { // ✅ CHANGÉ
            level: currentLevel,
            wordsToReview: revisionData.wordsToReview
          });
        }
      },
      available: revisionData.needsRevision,
      color: '#8B5CF6' // Violet
    },
    {
      id: 'test',
      icon: '🎯',
      label: 'Test niveau',
      subtitle: 'Évaluation',
      action: () => navigation.navigate(ROUTES.ASSESSMENT_EXERCISE, { // ✅ CHANGÉ
        level: currentLevel 
      }),
      available: true,
      color: '#F59E0B' // Orange
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        ⚡ Actions rapides
      </Text>

      <View style={styles.actionsRow}>
        {actions.map(action => (
          <ActionButton
            key={action.id}
            action={action}
            colors={colors}
            onPress={action.available ? action.action : null}
          />
        ))}
      </View>
    </View>
  );
};

/**
 * Bouton d'action individuel
 */
const ActionButton = ({ action, colors, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        { backgroundColor: colors.surface },
        !action.available && styles.actionButtonDisabled
      ]}
      onPress={onPress}
      activeOpacity={action.available ? 0.7 : 1}
    >
      {/* Icône avec background coloré */}
      <View style={[
        styles.actionIcon, 
        { backgroundColor: `${action.color}15` }
      ]}>
        <Text style={styles.actionIconText}>{action.icon}</Text>
      </View>
      
      {/* Contenu texte */}
      <View style={styles.actionContent}>
        <Text style={[styles.actionLabel, { color: colors.text }]}>
          {action.label}
        </Text>
        <Text style={[
          styles.actionSubtitle, 
          { color: action.available ? colors.textSecondary : '#9CA3AF' }
        ]}>
          {action.subtitle}
        </Text>
      </View>

      {/* Badge informatif pour révision */}
      {action.id === 'revision' && !action.available && (
        <View style={styles.infoBadge}>
          <Text style={styles.infoText}>Bientôt</Text>
        </View>
      )}

      {/* Flèche de navigation si disponible */}
      {action.available && (
        <View style={styles.arrowContainer}>
          <Text style={[styles.arrowText, { color: colors.textSecondary }]}>
            →
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default QuickActions;