// src/screens/Dashboard/index.js - VERSION CORRIGÉE GESTION PROGRESSCONTEXT
import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { RefreshControl, Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Hooks personnalisés (existants)
import { useDashboardLevel } from "./hooks/useDashboardLevel";
import { useDashboardNavigation } from "./hooks/useDashboardNavigation";
import { useDashboardData } from "./hooks/useDashboardData";
import { useDashboardState } from "./hooks/useDashboardState";

// Hooks existants (gardés)
import useLastActivity from "../../hooks/useLastActivity";
import useStreak from "./hooks/useStreak";
import useExerciseTracking from "../../hooks/useExerciceTracking";
import useRevisionTrigger from "../../hooks/useRevisionTrigger";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";

// Composants refactorisés
import ModernHeader from "./components/ModernHeader";
import HeroContinueSection from "./components/HeroContinueSection";
import QuickActions from "./components/QuickActions";
import SimpleMetrics from "./components/SimpleMetrics";
import LearningProgress from "./components/LearningProgress";

// Composants popup
import RevisionPopup from "./components/popup/RevisionPopup";

import styles from "./style";

// ========== FONCTIONS HELPER POUR MÉTRIQUES ==========

/**
 * Calcule le total des mots appris depuis ProgressContext + données vocabulary
 */
const calculateTotalLearnedWords = (progress) => {
  // ✅ CORRECTION: Vérification défensive
  if (!progress?.exercises?.vocabulary) return 0;
  
  let total = 0;
  
  // Pour chaque niveau (1, 2, 3, 4, 5, 6, bonus)
  ['1', '2', '3', '4', '5', '6', 'bonus'].forEach(level => {
    // Mode classic - progression en pourcentage
    const classicProgress = progress.exercises.vocabulary[level]?.completed || 0;
    
    if (classicProgress > 0) {
      // Estimer le nombre de mots basé sur la progression
      // En moyenne ~100 mots par niveau (17 catégories × ~6 mots)
      const estimatedWordsPerLevel = 100;
      total += Math.round((classicProgress / 100) * estimatedWordsPerLevel);
    }
  });
  
  return total;
};

/**
 * Calcule les mots appris cette semaine
 */
const calculateWordsThisWeek = (progress) => {
  // ✅ CORRECTION: Vérification défensive
  if (!progress?.stats?.exercisesCompleted) return 0;
  
  // Estimer basé sur exercices complétés récemment
  const recentExercises = progress.stats.exercisesCompleted || 0;
  return Math.min(recentExercises * 3, 20); // Max 20 mots cette semaine
};

/**
 * Calcule les métriques du dashboard
 */
const calculateDashboardMetrics = (progressContext, tracking, currentStreak) => {
  // ✅ CORRECTION: Vérification défensive
  if (!progressContext?.progress) return [];
  
  const { progress } = progressContext;
  const metrics = [];

  // 1. STREAK (priorité #1 pour motivation)
  if (currentStreak > 0) {
    let trend = null;
    if (currentStreak >= 7) trend = '🏆 Série incroyable!';
    else if (currentStreak >= 3) trend = '💪 En forme!';
    
    metrics.push({
      id: 'streak',
      icon: '🔥',
      value: currentStreak.toString(),
      label: 'Jours de suite',
      trend,
      priority: 1
    });
  }

  // 2. TEMPS AUJOURD'HUI (du tracking existant)
  const todayStats = tracking?.getTodayStats?.();
  if (todayStats?.timeSpent > 0) {
    metrics.push({
      id: 'time',
      icon: '⏱️',
      value: `${todayStats.timeSpent}min`,
      label: 'Temps aujourd\'hui',
      trend: todayStats.timeTrend || null,
      priority: 2
    });
  }

  // 3. MOTS APPRIS TOTAUX (calculé depuis les données)
  const totalWordsLearned = calculateTotalLearnedWords(progress);
  if (totalWordsLearned > 0) {
    const wordsThisWeek = calculateWordsThisWeek(progress);
    let trend = null;
    if (wordsThisWeek > 0) {
      trend = `+${wordsThisWeek} cette semaine`;
    }

    metrics.push({
      id: 'words',
      icon: '📚',
      value: totalWordsLearned.toString(),
      label: 'Mots appris',
      trend,
      priority: 3
    });
  }

  return metrics.sort((a, b) => a.priority - b.priority);
};

const Dashboard = ({ route }) => {
  // ✅ PROTECTION: Vérifier que route existe
  if (!route) {
    console.warn('Route is undefined in Dashboard');
    return (
      <Container
        safeArea
        backgroundColor="#F8FAFC"
        statusBarStyle="light-content"
        withPadding
        style={styles.loadingContainer}
      >
        <Text style={styles.loadingText}>
          Chargement de la navigation...
        </Text>
      </Container>
    );
  }

  // ========== CONTEXTES ==========
  const themeContext = useContext(ThemeContext);
  const progressContext = useContext(ProgressContext);

  // ✅ CORRECTION: Vérification des contextes
  if (!progressContext) {
    console.warn('ProgressContext is undefined');
    return (
      <Container
        safeArea
        backgroundColor="#F8FAFC"
        statusBarStyle="light-content"
        withPadding
        style={styles.loadingContainer}
      >
        <Text style={styles.loadingText}>
          Chargement du contexte de progression...
        </Text>
      </Container>
    );
  }

  // Valeurs par défaut
  const colors = themeContext?.colors || {
    background: "#F8FAFC",
    primary: "#3B82F6",
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
    success: "#10B981",
  };

  // ========== HOOKS EXISTANTS ==========
  const {
    getLastActivity,
    isLoading: isActivityLoading,
    loadLastActivities,
    formatProgressSubtitle,
  } = useLastActivity();

  const { currentStreak, updateStreak } = useStreak();
  const tracking = useExerciseTracking();

  // ========== HOOKS DASHBOARD ==========
  
  // 1. Hook de niveau (doit être appelé en premier car il définit currentLevel)
  const { currentLevel, handleChangeActiveLevel, levelColor } =
    useDashboardLevel(progressContext);

  // 2. Hook de données (utilise currentLevel du hook précédent)
  const dashboardData = useDashboardData(
    progressContext,
    currentLevel,
    getLastActivity(),
    currentStreak
  );

  // 3. Hook de navigation
  const {
    navigateToExercise,
    handleLevelSelect,
  } = useDashboardNavigation(updateStreak, tracking.startTracking);

  // 4. Hook d'état
  const {
    refreshing,
    onRefresh,
  } = useDashboardState(loadLastActivities);

  // ========== MÉTRIQUES CALCULÉES ==========
  const dashboardMetrics = useMemo(() => {
    return calculateDashboardMetrics(progressContext, tracking, currentStreak);
  }, [progressContext, tracking, currentStreak]);

  // ========== TOTAL MOTS APPRIS POUR RÉVISION ==========
  const totalWordsLearned = useMemo(() => {
    // ✅ CORRECTION: Vérification défensive
    if (!progressContext?.progress) return 0;
    return calculateTotalLearnedWords(progressContext.progress);
  }, [progressContext?.progress]);

  // ========== SYSTÈME RÉVISION AUTOMATIQUE ==========
  const {
    showRevisionPopup,
    handleReviseNow,
    handleSnoozeLater,
    handleDismiss,
    getRevisionInfo,
  } = useRevisionTrigger(totalWordsLearned);

  // ========== BACKGROUND GRADIENT ==========
  const backgroundGradient = useMemo(() => {
    const gradientStart = levelColor + "03";
    const gradientMiddle = colors.background;
    const gradientEnd = levelColor + "08";

    return {
      colors: [gradientStart, gradientMiddle, gradientEnd],
      locations: [0, 0.6, 1],
    };
  }, [levelColor, colors.background]);

  // ========== DONNÉES USER ET ROUTE ==========
  const { name = "Utilisateur", level: routeLevel } = route?.params || {};

  // ========== EFFETS ==========
  useEffect(() => {
    loadLastActivities();
  }, [loadLastActivities]);

  useFocusEffect(
    useCallback(() => {
      loadLastActivities();

      if (tracking?.isTracking) {
        const handleStopTracking = async () => {
          try {
            const result = await tracking.stopTracking();
            if (result?.saved && result?.timeSpent > 0) {
              console.log(`Session sauvée: ${result.timeSpent}s sur ${result.exerciseType}`);
            }
          } catch (error) {
            console.error('Erreur lors de l\'arrêt du tracking:', error);
          }
        };
        handleStopTracking();
      }
    }, [tracking?.isTracking, tracking?.stopTracking, loadLastActivities])
  );

  // ========== GESTIONNAIRES ==========
  const handleLevelSelectWithNavigation = useCallback(
    (level) => {
      // Navigation vers exerciceSelection
      handleLevelSelect(level, handleChangeActiveLevel);
    },
    [handleLevelSelect, handleChangeActiveLevel]
  );

  const handleLevelVisualChange = useCallback(
    (level) => {
      // Change juste le niveau actif visuel, pas de navigation
      handleChangeActiveLevel(level);
    },
    [handleChangeActiveLevel]
  );

  // ========== LOADING STATE ==========
  if (!tracking?.isLoaded) {
    return (
      <Container
        safeArea
        backgroundColor={colors.background}
        statusBarStyle="light-content"
        withPadding
        style={styles.loadingContainer}
      >
        <Text style={[styles.loadingText, { color: colors.primary }]}>
          Chargement de votre progression...
        </Text>
        {tracking?.error && (
          <Text style={styles.errorText}>
            Erreur: {tracking.error}
          </Text>
        )}
      </Container>
    );
  }

  // ✅ CORRECTION: Vérification finale avant rendu
  if (!dashboardData) {
    return (
      <Container
        safeArea
        backgroundColor={colors.background}
        statusBarStyle="light-content"
        withPadding
        style={styles.loadingContainer}
      >
        <Text style={[styles.loadingText, { color: colors.primary }]}>
          Préparation des données...
        </Text>
      </Container>
    );
  }

  // ========== RENDU PRINCIPAL ==========
  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.NO_BOTTOM}
      withScrollView={false}
      backgroundColor="transparent"
      statusBarStyle="light-content"
      withPadding={false}
    >
      <LinearGradient
        colors={backgroundGradient.colors}
        locations={backgroundGradient.locations}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        {/* 1. HEADER MODERNE SIMPLIFIÉ (sans streak) */}
        <ModernHeader
          level={currentLevel}
          levelColor={levelColor}
          userName={name || "Utilisateur"}
        />

        {/* 2. CONTENU SCROLLABLE */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[levelColor]}
              tintColor={levelColor}
            />
          }
        >
          {/* 3. HERO SECTION - Continue Learning */}
          <HeroContinueSection
            lastActivity={dashboardData.lastActivity}
            onPress={navigateToExercise}
            accentColor={levelColor}
            formatProgressSubtitle={formatProgressSubtitle}
            isLoading={isActivityLoading}
          />

          {/* 4. QUICK ACTIONS - VERSION FINALE */}
          <QuickActions
            currentLevel={currentLevel}
            progressContext={progressContext}
            accentColor={levelColor}
          />

          {/* 5. MÉTRIQUES SIMPLES (avec streak migré) */}
          <SimpleMetrics
            metrics={dashboardMetrics}
            accentColor={levelColor}
          />

          {/* 6. PROGRESSION APPRENTISSAGE */}
          <LearningProgress
            globalProgress={dashboardData.globalProgress}
            levels={dashboardData.allLevels}
            currentLevel={currentLevel}
            onSelectLevel={handleLevelSelectWithNavigation} // Navigation vers exercices
            onChangeLevelVisual={handleLevelVisualChange} // Change visuel seulement
            primaryColor={levelColor}
          />

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* ========== POPUP RÉVISION AUTOMATIQUE ========== */}
        <RevisionPopup
          visible={showRevisionPopup}
          wordsToReview={(getRevisionInfo()?.totalRevisionsTriggered || 0) * 10} // 10 mots par cycle
          currentLevel={currentLevel}
          onReviseNow={handleReviseNow}
          onSnoozeLater={handleSnoozeLater}
          onDismiss={handleDismiss}
        />
      </LinearGradient>
    </Container>
  );
};

export default Dashboard;