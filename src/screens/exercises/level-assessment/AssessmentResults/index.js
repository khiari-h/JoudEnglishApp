// src/screens/exercises/levelAssessment/AssessmentResults/index.js
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./style";

/**
 * Composant moderne pour afficher les résultats de l'évaluation
 * Design complètement repensé pour être visuellement attrayant
 */
const AssessmentResults = ({ 
  level, 
  levelColor, 
  userScore,
  onContinue,
  onRetry 
}) => {
  
  // Fallback si pas de score
  if (!userScore) {
    return (
      <ScrollView style={styles.resultsContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.celebrationIcon}>🎯</Text>
          <Text style={styles.resultsTitle}>Assessment Complete!</Text>
          <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
            <Text style={styles.levelBadgeText}>Level {level}</Text>
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: levelColor }]}
            onPress={onContinue}
          >
            <Text style={styles.primaryButtonText}>Continue to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Calculs pour l'affichage
  const scoreOutOf20 = Math.round((userScore.percentage / 100) * 20);
  const wrongAnswers = userScore.totalQuestions - userScore.correctAnswers;
  
  // Déterminer le niveau de performance et les éléments visuels
  const getPerformanceData = (percentage) => {
    if (percentage >= 85) {
      return {
        icon: "🎉",
        title: "Outstanding!",
        subtitle: "You've mastered this level! Ready for the next challenge?",
        color: "#10b981",
        borderColor: "#10b981",
        glowStyle: styles.excellentGlow
      };
    } else if (percentage >= 70) {
      return {
        icon: "👏",
        title: "Well Done!",
        subtitle: "Great progress! You're showing solid understanding.",
        color: "#f59e0b",
        borderColor: "#f59e0b",
        glowStyle: styles.goodGlow
      };
    } else if (percentage >= 50) {
      return {
        icon: "💪",
        title: "Keep Going!",
        subtitle: "You're on the right track. A bit more practice will help!",
        color: "#f97316",
        borderColor: "#f97316",
        glowStyle: styles.goodGlow
      };
    } else {
      return {
        icon: "🎯",
        title: "Keep Practicing!",
        subtitle: "Every expert was once a beginner. You've got this!",
        color: "#ef4444",
        borderColor: "#ef4444",
        glowStyle: styles.needsImprovementGlow
      };
    }
  };

  const performance = getPerformanceData(userScore.percentage);

  return (
    <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
      {/* Éléments décoratifs flottants */}
      <View style={styles.decorativeElements}>
        <View style={[styles.floatingShape, { width: 80, height: 80, top: 100, right: 30 }]} />
        <View style={[styles.floatingShape, { width: 60, height: 60, top: 300, left: 20 }]} />
        <View style={[styles.floatingShape, { width: 40, height: 40, bottom: 200, right: 50 }]} />
      </View>

      {/* Header avec célébration */}
      <View style={styles.headerSection}>
        <Text style={styles.celebrationIcon}>{performance.icon}</Text>
        <Text style={styles.resultsTitle}>Assessment Complete!</Text>
        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelBadgeText}>Level {level}</Text>
        </View>
      </View>

      {/* Carte de score principale */}
      <View style={[styles.scoreCard, performance.glowStyle]}>
        <Text style={styles.scoreLabel}>Your Score</Text>
        
        {/* Cercle de score avec couleur dynamique */}
        <View style={[
          styles.scoreCircle, 
          { 
            borderColor: performance.color,
            backgroundColor: `${performance.color}15` // 15 = ~8% opacity
          }
        ]}>
          <Text style={[styles.mainScore, { color: performance.color }]}>
            {scoreOutOf20}/20
          </Text>
          <Text style={styles.percentageScore}>
            ({userScore.percentage.toFixed(1)}%)
          </Text>
        </View>

        {/* Statistiques détaillées */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#10b981" }]}>
              {userScore.correctAnswers}
            </Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#ef4444" }]}>
              {wrongAnswers}
            </Text>
            <Text style={styles.statLabel}>Wrong</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {userScore.totalQuestions}
            </Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </View>

      {/* Message de performance */}
      <View style={[styles.performanceSection, { borderColor: performance.borderColor }]}>
        <Text style={[styles.performanceMessage, { color: performance.color }]}>
          {performance.title}
        </Text>
        <Text style={styles.performanceSubtitle}>
          {performance.subtitle}
        </Text>
      </View>

      {/* Boutons d'action */}
      <View style={styles.buttonsContainer}>
        {/* Bouton Try Again pour les scores faibles */}
        {onRetry && userScore.percentage < 70 && (
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: performance.color }]}
            onPress={onRetry}
          >
            <Text style={[styles.secondaryButtonText, { color: performance.color }]}>
              🔄 Try Again
            </Text>
          </TouchableOpacity>
        )}
        
        {/* Bouton principal */}
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: levelColor }]}
          onPress={onContinue}
        >
          <Text style={styles.primaryButtonText}>
            {userScore.percentage >= 70 ? "🚀 Continue Journey" : "📚 Keep Learning"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AssessmentResults;