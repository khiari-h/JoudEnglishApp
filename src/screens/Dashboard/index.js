// src/screens/Dashboard/index.js - VERSION CORRIGÉE AVEC RÉVISION INTÉGRÉE

import React, { useContext, useCallback } from "react";
import { RefreshControl, Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { useProgress } from "../../contexts/ProgressContext";

// Hooks
import { useDashboardLevel } from "./hooks/useDashboardLevel";
import { useDashboardState } from "./hooks/useDashboardState";
import useLastActivity from "../../hooks/useLastActivity";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";

// Composants Dashboard
import ModernHeader from "./components/ModernHeader";
import HeroContinueSection from "./components/HeroContinueSection";
import QuickActions from "./components/QuickActions";
import SimpleMetrics from "./components/SimpleMetrics"; // ✅ COMPOSANT AUTONOME
import LearningProgress from "./components/LearningProgress";

// 🚀 RÉVISION - Composant d'orchestration
import RevisionOrchestrator from "../VocabularyRevision/RevisionOrchestrator";

// Constantes
import { EXERCISES, LANGUAGE_LEVELS } from "../../utils/constants";
import styles from "./style";

const Dashboard = ({ route }) => {
  
  // =================== CONTEXTES ===================
  const themeContext = useContext(ThemeContext);
  const progressData = useProgress();

  const colors = themeContext?.colors || {
    background: "#F8FAFC",
    primary: "#3B82F6", 
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // =================== HOOKS DASHBOARD ===================
  const { currentLevel, handleChangeActiveLevel, levelColor } = useDashboardLevel({ 
    progress: progressData.progress 
  });
  
  const { lastActivity, isLoading: isActivityLoading, reload: reloadActivity } = useLastActivity();
  const { refreshing, onRefresh } = useDashboardState(reloadActivity);

  // =================== NAVIGATION ===================
  
  const handleContinue = useCallback((activity) => {
    if (activity === "levelSelection") {
      router.push("/(tabs)/levelSelection");
      return;
    }

    const { type, level, mode } = activity;
    const exercise = Object.values(EXERCISES).find(ex => ex.id === type);
    
    if (exercise) {
      const params = { level };
      if (mode && type === "vocabulary") params.mode = mode;
      
      router.push({
        pathname: exercise.route,
        params
      });
    }
  }, []);

  const handleChangeLevelVisual = useCallback((levelId) => {
    handleChangeActiveLevel(levelId);
  }, [handleChangeActiveLevel]);

  const handleLevelSelect = useCallback((level) => {
    router.push(`/(tabs)/exerciseSelection?level=${level}`);
  }, []);

  // =================== NIVEAUX AVEC PROGRESSION ===================
  
  const allLevels = Object.keys(LANGUAGE_LEVELS).map(key => ({
    id: key,
    title: LANGUAGE_LEVELS[key].title,
    color: LANGUAGE_LEVELS[key].color,
    icon: LANGUAGE_LEVELS[key].icon,
    progress: progressData.calculateLevelProgress(key),
    isActive: key === currentLevel,
    isCompleted: progressData.calculateLevelProgress(key) >= 100,
  }));

  // =================== LOADING GLOBAL ===================
  
  if (progressData.isLoading) {
    return (
      <Container safeArea backgroundColor={colors.background} withPadding>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.primary }]}>
            Chargement du tableau de bord...
          </Text>
        </View>
      </Container>
    );
  }

  // =================== BACKGROUND ===================
  
  const backgroundGradient = {
    colors: [levelColor + '05', colors.background, levelColor + '08'],
    locations: [0, 0.6, 1],
  };

  // =================== RENDER PRINCIPAL ===================
  
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
        {/* Header */}
        <ModernHeader
          level={currentLevel}
          levelColor={levelColor}
        />

        {/* Contenu principal */}
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
          {/* Section Continue */}
          <HeroContinueSection
            lastActivity={lastActivity}
            onPress={handleContinue}
            accentColor={levelColor}
            isLoading={isActivityLoading}
          />

          {/* Actions rapides */}
          <QuickActions
            currentLevel={currentLevel}
            progressContext={progressData}
            accentColor={levelColor}
          />

          {/* ✅ MÉTRIQUES AUTONOMES - Simple et Clean */}
          <SimpleMetrics accentColor={levelColor} />

          {/* Progression par niveaux */}
          <LearningProgress
            globalProgress={progressData.calculateGlobalProgress()}
            levels={allLevels}
            currentLevel={currentLevel}
            onSelectLevel={handleLevelSelect}
            onChangeLevelVisual={handleChangeLevelVisual}
            primaryColor={levelColor}
          />

          {/* Espace en bas */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* 🚀 SYSTÈME DE RÉVISION INTELLIGENT - UNE SEULE LIGNE ! */}
        <RevisionOrchestrator currentLevel={currentLevel} />
      </LinearGradient>
    </Container>
  );
};

export default Dashboard;