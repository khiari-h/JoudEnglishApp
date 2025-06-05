// src/screens/Dashboard/index.js
import React, { useContext, useEffect, useCallback } from "react";
import { View, ScrollView, StatusBar, RefreshControl, Text } from "react-native";
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
import useExerciseTracking from "../../hooks/useExerciceTracking"; // ✅ Corrigé sans faute

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
  
  // ✅ Hook de tracking corrigé
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

  // ========== RENDU CONDITIONNEL ==========
  
  // Écran de chargement si le tracking n'est pas prêt
  if (!tracking.isLoaded) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" />
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          paddingHorizontal: 20 
        }}>
          <Text style={{ 
            color: colors.primary, 
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 8 
          }}>
            Chargement de votre progression...
          </Text>
          {tracking.error && (
            <Text style={{ 
              color: '#EF4444', 
              fontSize: 14,
              textAlign: 'center' 
            }}>
              Erreur: {tracking.error}
            </Text>
          )}
        </View>
      </View>
    );
  }

  // ========== RENDU PRINCIPAL ==========
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Header avec données utilisateur */}
      <CompactHeader
        level={currentLevel}
        streak={currentStreak}
        levelColor={levelColor}
      />

      {/* Contenu principal scrollable */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 100 }, // Espace pour les onglets de navigation
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
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
          debugMode={false}
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

        {/* Espacement final */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Modal de progression des niveaux */}
      <LevelProgressModal
        visible={showLevelProgress}
        levels={dashboardData.getAllLearningLevels}
        onClose={closeLevelProgressModal}
        onSelectLevel={handleLevelProgressSelect}
      />

      {/* Debug overlay (seulement en développement) */}
      {__DEV__ && (
        <View style={{ 
          position: 'absolute', 
          top: 100, 
          right: 10, 
          backgroundColor: 'rgba(0,0,0,0.8)', 
          padding: 8, 
          borderRadius: 4,
          maxWidth: 200
        }}>
          <Text style={{ color: 'white', fontSize: 10, marginBottom: 2 }}>
            🐛 Debug Dashboard
          </Text>
          <Text style={{ color: 'white', fontSize: 9 }}>
            Tracking: {tracking.isTracking ? 'ON' : 'OFF'}
          </Text>
          <Text style={{ color: 'white', fontSize: 9 }}>
            Chargé: {tracking.isLoaded ? 'Oui' : 'Non'}
          </Text>
          {tracking.error && (
            <Text style={{ color: '#FF6B6B', fontSize: 9 }}>
              Erreur: {tracking.error}
            </Text>
          )}
          <Text style={{ color: 'white', fontSize: 9 }}>
            Niveau: {currentLevel}
          </Text>
          <Text style={{ color: 'white', fontSize: 9 }}>
            Streak: {currentStreak}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Dashboard;