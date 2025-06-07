import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { RefreshControl, Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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

  // ✅ FIX : Valeurs par défaut pour éviter le crash
  const colors = themeContext?.colors || {
    background: "#F9FAFB",
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

  // ========== HOOKS PERSONNALISÉS DASHBOARD ==========
  const { currentLevel, handleChangeActiveLevel, levelColor } =
    useDashboardLevel(progressContext);

  const {
    navigateToExercise,
    handleLevelSelect,
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

  // ========== BACKGROUND INTELLIGENT (optimisé avec useMemo) ==========
  const backgroundGradient = useMemo(() => {
    // Gradient vertical subtil basé sur la couleur du niveau
    const gradientStart = levelColor + "03"; // 1%
    const gradientMiddle = colors.background; // ✅ Plus d'opérateur optionnel car on a la fallback
    const gradientEnd = levelColor + "08"; // 3%
    
    return {
      colors: [gradientStart, gradientMiddle, gradientEnd],
      locations: [0, 0.6, 1],
    };
  }, [levelColor, colors.background]);

  // ========== DONNÉES ==========
  const { name = "Utilisateur" } = route?.params || {};

  // ========== EFFETS OPTIMISÉS ==========
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

  // ========== CONTENU SCROLLABLE ==========
  const renderScrollableContent = () => (
    <>
      <ContinueLearningSection
        lastActivity={dashboardData.lastActivity}
        onPress={navigateToExercise}
        accentColor={levelColor}
        formatProgressSubtitle={formatProgressSubtitle}
        isLoading={isActivityLoading}
      />

      <DailyGoalSection
        currentLevel={currentLevel}
        progress={dashboardData.progress}
        accentColor={levelColor}
        onStartEvaluation={handleEvaluationStart}
      />

      <RecommendationsSection
        lastActivity={dashboardData.lastActivity}
        currentLevel={currentLevel}
        onSelectExercise={navigateToExercise}
        accentColor={levelColor}
      />

      <LearningPathCompact
        globalProgress={dashboardData.globalProgress}
        levels={dashboardData.allLevels}
        currentLevel={currentLevel}
        onSelectLevel={handleLevelSelectWithNavigation}
        onViewProgress={openLevelProgressModal}
        primaryColor={levelColor}
      />

      <View style={styles.bottomSpacer} />
    </>
  );

  // ========== RENDU PRINCIPAL ==========
  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.NO_BOTTOM}
      withScrollView={false}
      backgroundColor="transparent" // ✅ Pour le gradient
      statusBarStyle="light-content"
      withPadding={false}
    >
      {/* ✅ Background Intelligent avec Gradient */}
      <LinearGradient
        colors={backgroundGradient.colors}
        locations={backgroundGradient.locations}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        {/* Header FIXE */}
        <CompactHeader
          level={currentLevel}
          streak={currentStreak}
          levelColor={levelColor}
        />

        {/* Contenu principal SCROLLABLE */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 100 } // ✅ Override minimal pour navigation
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[levelColor]} // ✅ Couleur du niveau
              tintColor={levelColor} // ✅ Couleur du niveau
            />
          }
        >
          {renderScrollableContent()}
        </ScrollView>

        {/* Modal de progression */}
        <LevelProgressModal
          visible={showLevelProgress}
          levels={dashboardData.getAllLearningLevels}
          onClose={closeLevelProgressModal}
          onSelectLevel={handleLevelProgressSelect}
        />
      </LinearGradient>
    </Container>
  );
};

export default Dashboard;