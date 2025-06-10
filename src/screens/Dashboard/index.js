// src/screens/Dashboard/index.js - VERSION REFONTE COMPLÈTE
import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { RefreshControl, Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Hooks personnalisés (simplifiés)
import { useDashboardLevel } from "./hooks/useDashboardLevel";
import { useDashboardNavigation } from "./hooks/useDashboardNavigation";
import { useDashboardData } from "./hooks/useDashboardData";
import { useDashboardState } from "./hooks/useDashboardState";

// Hooks existants (gardés)
import useLastActivity from "../../hooks/useLastActivity";
import useStreak from "./hooks/useStreak";
import useExerciseTracking from "../../hooks/useExerciceTracking";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";

// Composants refactorisés
import ModernHeader from "./components/ModernHeader";
import HeroContinueSection from "./components/HeroContinueSection";
import SimpleMetrics from "./components/SimpleMetrics";
import LearningProgress from "./components/LearningProgress";

import styles from "./style";

const Dashboard = ({ route }) => {
  // ========== CONTEXTES ==========
  const themeContext = useContext(ThemeContext);
  const progressContext = useContext(ProgressContext);

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
  const { currentLevel, handleChangeActiveLevel, levelColor } =
    useDashboardLevel(progressContext);

  const {
    navigateToExercise,
    handleLevelSelect,
  } = useDashboardNavigation(updateStreak, tracking.startTracking);

  const dashboardData = useDashboardData(
    progressContext,
    currentLevel,
    getLastActivity(),
    currentStreak
  );

  const {
    refreshing,
    onRefresh,
  } = useDashboardState(loadLastActivities);

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

  // ========== DONNÉES USER ==========
  const { name = "Utilisateur" } = route?.params || {};

  // ========== MÉTRIQUES INTELLIGENTES ==========
  const simpleMetrics = useMemo(() => {
    const todayStats = tracking.getTodayStats?.();
    const totalWords = dashboardData.totalWordsLearned;
    
    const metrics = [];
    
    // Seulement SI on a vraiment les données
    if (todayStats?.timeSpent > 0) {
      metrics.push({
        id: 'time',
        icon: '⏱️',
        value: `${todayStats.timeSpent} min`,
        label: 'Temps aujourd\'hui',
        trend: todayStats.timeTrend || null
      });
    }
    
    if (totalWords > 0) {
      metrics.push({
        id: 'words',
        icon: '📚',
        value: totalWords.toString(),
        label: 'Mots appris',
        trend: dashboardData.wordsThisWeek ? `+${dashboardData.wordsThisWeek}` : null
      });
    }
    
    if (todayStats?.exercisesCompleted > 0) {
      metrics.push({
        id: 'exercises',
        icon: '✅',
        value: todayStats.exercisesCompleted.toString(),
        label: 'Exercices terminés',
        trend: null
      });
    }
    
    // Retourne [] si pas de données = SimpleMetrics ne s'affiche pas
    return metrics;
  }, [tracking, dashboardData]);

  // ========== EFFETS ==========
  useEffect(() => {
    loadLastActivities();
  }, [loadLastActivities]);

  useFocusEffect(
    useCallback(() => {
      loadLastActivities();

      if (tracking.isTracking) {
        const handleStopTracking = async () => {
          try {
            const result = await tracking.stopTracking();
            if (result.saved && result.timeSpent > 0) {
              console.log(`Session sauvée: ${result.timeSpent}s sur ${result.exerciseType}`);
            }
          } catch (error) {
            console.error('Erreur lors de l\'arrêt du tracking:', error);
          }
        };
        handleStopTracking();
      }
    }, [tracking.isTracking, tracking.stopTracking, loadLastActivities])
  );

  // ========== GESTIONNAIRES ==========
  const handleLevelSelectWithNavigation = useCallback(
    (level) => {
      handleLevelSelect(level, handleChangeActiveLevel);
    },
    [handleLevelSelect, handleChangeActiveLevel]
  );

  // ========== LOADING STATE ==========
  if (!tracking.isLoaded) {
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
        {tracking.error && (
          <Text style={styles.errorText}>
            Erreur: {tracking.error}
          </Text>
        )}
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
        {/* 1. HEADER MODERNE */}
        <ModernHeader
          level={currentLevel}
          streak={currentStreak}
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

          {/* 4. MÉTRIQUES SIMPLES */}
          <SimpleMetrics
            metrics={simpleMetrics}
            accentColor={levelColor}
          />

          {/* 5. PROGRESSION APPRENTISSAGE */}
          <LearningProgress
            globalProgress={dashboardData.globalProgress}
            levels={dashboardData.allLevels}
            currentLevel={currentLevel}
            onSelectLevel={handleLevelSelectWithNavigation}
            primaryColor={levelColor}
          />

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};


export default Dashboard;