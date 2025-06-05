// src/screens/Dashboard/index.js
import React, { useContext, useEffect, useCallback } from "react";
import { RefreshControl, Text } from "react-native";
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
import useExerciseTracking from "../../hooks/useExerciceTracking";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";

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
  const tracking = useExerciseTracking();

  // ========== HOOKS PERSONNALISÉS DASHBOARD ==========
  const { currentLevel, handleChangeActiveLevel, levelColor } =
    useDashboardLevel(progressContext);

  const {
    navigateToExercise,
    handleLevelSelect,
    handleDailyChallengeStart,
    handleEvaluationStart,
  } = useDashboardNavigation(updateStreak, tracking.startTracking);

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
  }, [loadLastActivities]);

  useFocusEffect(
    useCallback(() => {
      loadLastActivities();

      // Arrêter le tracking si nécessaire
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

  // ========== RENDU CONDITIONNEL CHARGEMENT ==========
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

  // ========== CONTENU PRINCIPAL ==========
  const renderMainContent = () => (
    <>
      {/* Header avec données utilisateur */}
      <CompactHeader
        level={currentLevel}
        streak={currentStreak}
        levelColor={levelColor}
      />

      {/* 1. Section Continuer l'apprentissage */}
      <ContinueLearningSection
        lastActivity={dashboardData.lastActivity}
        onPress={navigateToExercise}
        accentColor={levelColor}
        formatProgressSubtitle={formatProgressSubtitle}
        isLoading={isActivityLoading}
      />

      {/* 2. Section Défi du jour */}
      <DailyGoalSection
        currentLevel={currentLevel}
        progress={dashboardData.progress}
        accentColor={levelColor}
        onStartExercise={handleDailyChallengeStart}
        onStartEvaluation={handleEvaluationStart}
      />

      {/* 3. Section Recommandations intelligentes */}
      <RecommendationsSection
        lastActivity={dashboardData.lastActivity}
        currentLevel={currentLevel}
        onSelectExercise={navigateToExercise}
        accentColor={levelColor}
      />

      {/* 4. Section Parcours d'apprentissage */}
      <LearningPathCompact
        globalProgress={dashboardData.globalProgress}
        levels={dashboardData.allLevels}
        currentLevel={currentLevel}
        onSelectLevel={handleLevelSelectWithNavigation}
        onViewProgress={openLevelProgressModal}
        primaryColor={levelColor}
      />

      {/* Modal de progression des niveaux */}
      <LevelProgressModal
        visible={showLevelProgress}
        levels={dashboardData.getAllLearningLevels}
        onClose={closeLevelProgressModal}
        onSelectLevel={handleLevelProgressSelect}
      />
    </>
  );

  // ========== RENDU PRINCIPAL ==========
  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.NO_BOTTOM} // Garde la navigation bottom
      withScrollView
      backgroundColor={colors.background}
      statusBarStyle="light-content"
      withPadding={false} // Le padding sera géré par les composants internes
      scrollViewProps={{
        style: styles.scrollView,
        contentContainerStyle: [
          styles.scrollContent,
          { paddingBottom: 100 } // Espace pour les onglets de navigation
        ],
        showsVerticalScrollIndicator: false,
        refreshControl: (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        ),
      }}
    >
      {renderMainContent()}
    </Container>
  );
};

export default Dashboard;