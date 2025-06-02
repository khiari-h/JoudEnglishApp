// src/screens/Dashboard/index.js - VERSION BEST PRACTICE
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
import useStreak from "./hooks/useStreak";
import useExerciseTracking from "../../hooks/useExerciseTracking"; // ✅ NOUVEAU hook

// Composants Dashboard
import CompactHeader from "./components/CompactHeader";
import ContinueLearningSection from "./components/ContinueLearningSection";
import DailyGoalSection from "./components/DailyGoalSection";
import RecommendationsSection from "./components/RecommendationsSection";
import LearningPathCompact from "./components/LearningPathCompact";
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

  const { currentStreak, updateStreak } = useStreak();
  
  // ✅ NOUVEAU hook cohérent avec RecommendationsSection
  const { 
    isTracking, 
    stopTracking, 
    startTracking,
    getFormattedStats,
    isLoaded: isTimeTrackingLoaded 
  } = useExerciseTracking();

  // ========== HOOKS PERSONNALISÉS DASHBOARD ==========
  const { currentLevel, handleChangeActiveLevel, levelColor } =
    useDashboardLevel(progressContext);

  const {
    navigateToExercise,
    handleLevelSelect,
    handleDailyChallengeStart,
    handleEvaluationStart,
  } = useDashboardNavigation(updateStreak, startTracking);

  // ✅ Plus besoin de passer exerciseTimeStats depuis dashboardData
  // RecommendationsSection récupère ses données directement
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
    onRefresh,
  } = useDashboardState(loadLastActivities);

  // ========== DONNÉES ==========
  const { name = "Utilisateur" } = route?.params || {};

  // ========== EFFETS OPTIMISÉS ==========
  useEffect(() => {
    loadLastActivities();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLastActivities();

      // ✅ Utiliser la nouvelle API stopTracking
      if (isTracking) {
        const result = stopTracking();
        // result contient: { exerciseType, timeSpent, saved }
        if (result.saved) {
          console.log(`Session sauvée: ${result.timeSpent}s sur ${result.exerciseType}`);
        }
      }
    }, [isTracking, stopTracking, loadLastActivities])
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
  // ✅ Attendre que le tracking soit chargé pour éviter les props undefined
  if (!isTimeTrackingLoaded) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" />
        {/* Loader ou skeleton screen ici si besoin */}
      </View>
    );
  }

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
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 100 }, // Espace pour les onglets Expo Router
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      >
        {/* 1. Continue Learning */}
        <ContinueLearningSection
          lastActivity={dashboardData.lastActivity}
          onPress={navigateToExercise}
          accentColor={levelColor}
          formatProgressSubtitle={formatProgressSubtitle}
          isLoading={isActivityLoading}
        />

        {/* 2. Défi du jour */}
        <DailyGoalSection
          currentLevel={currentLevel}
          progress={dashboardData.progress}
          accentColor={levelColor}
          onStartExercise={handleDailyChallengeStart}
          onStartEvaluation={handleEvaluationStart}
        />

        {/* 3. Suggestions intelligentes */}
        {/* ✅ PLUS de prop exerciseTimeStats - le composant récupère ses données */}
        <RecommendationsSection
          lastActivity={dashboardData.lastActivity}
          currentLevel={currentLevel}
          onSelectExercise={navigateToExercise}
          accentColor={levelColor}
          debugMode={__DEV__} // Voir les temps réels en développement
        />

        {/* 4. Parcours d'apprentissage */}
        <LearningPathCompact
          globalProgress={dashboardData.globalProgress}
          levels={dashboardData.allLevels}
          currentLevel={currentLevel}
          onSelectLevel={handleLevelSelectWithNavigation}
          onViewProgress={openLevelProgressModal}
          primaryColor={levelColor}
        />
      </ScrollView>

      {/* Modal progression niveaux */}
      <LevelProgressModal
        visible={showLevelProgress}
        levels={dashboardData.getAllLearningLevels}
        onClose={closeLevelProgressModal}
        onSelectLevel={handleLevelProgressSelect}
      />

      {/* ✅ Debug info temporaire en développement */}
      {__DEV__ && (
        <View style={{ 
          position: 'absolute', 
          top: 100, 
          right: 10, 
          backgroundColor: 'rgba(0,0,0,0.8)', 
          padding: 8, 
          borderRadius: 4 
        }}>
          <Text style={{ color: 'white', fontSize: 10 }}>
            🐛 Time Tracking: {isTracking ? 'ON' : 'OFF'}
          </Text>
          {isTracking && (
            <Text style={{ color: 'white', fontSize: 10 }}>
              📊 Stats: {JSON.stringify(getFormattedStats())}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default Dashboard;