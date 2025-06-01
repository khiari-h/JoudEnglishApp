// src/screens/Dashboard/index.js - REFACTORISÉ
import React, { useContext, useEffect, useCallback } from "react";
import { View, ScrollView, StatusBar, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Hooks personnalisés Dashboard
import { useDashboardLevel } from "./hooks/useDashboardLevel";
import { useDashboardNavigation } from "./hooks/useDashboardNavigation";
import { useDashboardData } from "./hooks/useDashboardData";
import { useDashboardState } from "./hooks/useDashboardState";

// Hooks existants
import useLastActivity from "../../hooks/useLastActivity";
import useStreak from "./hooks/useStreak"; // Hook existant
import useExerciseTimeTracking from "../../hooks/useExerciceTimeTracking";

// Composants Dashboard
import CompactHeader from "./components/CompactHeader";
import ContinueLearningSection from "./components/ContinueLearningSection";
import DailyGoalSection from "./components/DailyGoalSection";
import RecommendationsSection from "./components/RecommendationsSection";
import LearningPathCompact from "./components/LearningPathCompact";
import BottomNavigation from "./components/BottomNavigation";
import LevelProgressModal from "./components/LevelProgressModal";

import styles from "./style";

const Dashboard = ({ route }) => {
  // ========== CONTEXTES ==========
  const themeContext = useContext(ThemeContext);
  const progressContext = useContext(ProgressContext);

  const colors = themeContext?.colors || {
    background: "#F9FAFB",
    primary: "#3B82F6",
  };

  // ========== HOOKS EXISTANTS ==========
  const {
    getLastActivity,
    isLoading: isActivityLoading,
    loadLastActivities,
    formatProgressSubtitle,
  } = useLastActivity();

  const { currentStreak, updateStreak } = useStreak(); // Hook existant
  const { isTracking, stopAndSave, startTracking } = useExerciseTimeTracking();

  // ========== HOOKS PERSONNALISÉS DASHBOARD ==========
  const { currentLevel, handleChangeActiveLevel, levelColor } =
    useDashboardLevel(progressContext);

  const {
    navigateToExercise,
    handleLevelSelect,
    handleDailyChallengeStart,
    handleEvaluationStart,
  } = useDashboardNavigation(updateStreak, startTracking);

  const dashboardData = useDashboardData(
    progressContext,
    currentLevel,
    getLastActivity(),
    currentStreak
  );

  const {
    showLevelProgress,
    openLevelProgressModal,
    closeLevelProgressModal,
    refreshing,
    activeTab,
    setActiveTab,
    onRefresh,
  } = useDashboardState(loadLastActivities);

  // ========== DONNÉES ==========
  const { name = "Utilisateur" } = route?.params || {};

  // ========== EFFETS OPTIMISÉS ==========
  useEffect(() => {
    loadLastActivities();
  }, []); // Une seule fois au montage

  // useFocusEffect optimisé - évite les boucles infinies
  useFocusEffect(
    useCallback(() => {
      loadLastActivities();

      // Arrêter le tracking si en cours (retour au Dashboard)
      if (isTracking) {
        const timeSpent = stopAndSave();
        // Supprimé le console.log pour optimiser
      }
    }, []) // Dépendances vides pour éviter les re-exécutions
  );

  // ========== GESTIONNAIRES OPTIMISÉS ==========
  const handleLevelSelectWithNavigation = useCallback(
    (level) => {
      handleLevelSelect(level, handleChangeActiveLevel);
    },
    [handleLevelSelect, handleChangeActiveLevel]
  );

  const handleLevelProgressSelect = useCallback(
    (level) => {
      handleChangeActiveLevel(level);
      closeLevelProgressModal();
      handleLevelSelectWithNavigation(level);
    },
    [
      handleChangeActiveLevel,
      closeLevelProgressModal,
      handleLevelSelectWithNavigation,
    ]
  );

  // ========== RENDU OPTIMISÉ ==========
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Header avec données optimisées */}
      <CompactHeader
        level={currentLevel}
        streak={currentStreak}
        levelColor={levelColor}
      />

      {/* Contenu scrollable avec RefreshControl */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      >
        {/* 1. Continue Learning - Données mémorisées */}
        <ContinueLearningSection
          lastActivity={dashboardData.lastActivity}
          onPress={navigateToExercise}
          accentColor={levelColor}
          formatProgressSubtitle={formatProgressSubtitle}
          isLoading={isActivityLoading}
        />

        {/* 2. Défi du jour - Handlers optimisés */}
        <DailyGoalSection
          currentLevel={currentLevel}
          progress={dashboardData.progress}
          accentColor={levelColor}
          onStartExercise={handleDailyChallengeStart}
          onStartEvaluation={handleEvaluationStart}
        />

        {/* 3. Suggestions intelligentes - Stats mémorisées */}
        <RecommendationsSection
          lastActivity={dashboardData.lastActivity}
          exerciseTimeStats={dashboardData.exerciseTimeStats}
          currentLevel={currentLevel}
          onSelectExercise={navigateToExercise}
          accentColor={levelColor}
        />

        {/* 4. Parcours d'apprentissage - Niveaux mémorisés */}
        <LearningPathCompact
          globalProgress={dashboardData.globalProgress}
          levels={dashboardData.allLevels}
          currentLevel={currentLevel}
          onSelectLevel={handleLevelSelectWithNavigation}
          onViewProgress={openLevelProgressModal}
          primaryColor={levelColor}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Navigation bottom */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        accentColor={levelColor}
        currentLevel={currentLevel}
      />

      {/* Modal progression niveaux - Données mémorisées */}
      <LevelProgressModal
        visible={showLevelProgress}
        levels={dashboardData.getAllLearningLevels}
        onClose={closeLevelProgressModal}
        onSelectLevel={handleLevelProgressSelect}
      />
    </View>
  );
};

export default Dashboard;

