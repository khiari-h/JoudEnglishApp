// src/screens/Dashboard/index.js - VERSION CORRIGÉE - MÊME LOGIQUE QUE LEVELSELECTION

import React, { useContext, useCallback, useEffect } from "react";
import { subscribe } from '../../utils/eventBus';
import { RefreshControl, Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { useProgress } from "../../contexts/ProgressContext";
import { useCurrentLevel } from '../../contexts/CurrentLevelContext';

// 🚀 HOOK PROGRESSION TEMPS RÉEL
import useRealTimeProgress from "../../hooks/useRealTimeProgress";

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
import SimpleMetrics from "./components/SimpleMetrics";
import LearningProgress from "./components/LearningProgress";

// 🚀 RÉVISION
import RevisionOrchestrator from "../VocabularyRevision/RevisionOrchestrator";

// Constantes
import { EXERCISES, LANGUAGE_LEVELS } from "../../utils/constants";
import styles from "./style";

const Dashboard = ({ route }) => {
  
  // =================== CONTEXTES ===================
  const themeContext = useContext(ThemeContext);
  const progressData = useProgress();

  // 🚀 PROGRESSION TEMPS RÉEL
  const { getLevelProgress, getExerciseProgress, refresh: refreshProgress } = useRealTimeProgress();

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
  const { setCurrentLevel } = useCurrentLevel();
  
  const { lastActivity, isLoading: isActivityLoading, reload: reloadActivity } = useLastActivity();
  
  const { refreshing, onRefresh: originalOnRefresh } = useDashboardState(reloadActivity);

  const onRefresh = useCallback(async () => {
    await Promise.all([
      originalOnRefresh(),
      refreshProgress()
    ]);
  }, [originalOnRefresh, refreshProgress]);

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
    setCurrentLevel(levelId); // Synchronise le contexte global
  }, [handleChangeActiveLevel, setCurrentLevel]);

  const handleLevelSelect = useCallback((level) => {
    setCurrentLevel(level); // Synchronise le contexte global
    router.push(`/tabs/exerciseSelection?level=${level}`);
  }, [setCurrentLevel]);

  // =================== NIVEAUX - MÊME LOGIQUE QUE LEVELSELECTION ===================
  
  // ✅ EXACTEMENT comme LevelSelection - progression individuelle par niveau
  const allLevels = ['1', '2', '3', '4', '5', '6', 'bonus'].map(levelKey => {
    const levelInfo = LANGUAGE_LEVELS[levelKey];
    const progress = getLevelProgress(levelKey); // ✅ Progression réelle de ce niveau
    
    return {
      id: levelKey,
      title: levelInfo.title,
      color: levelInfo.color,
      icon: levelInfo.icon,
      progress, // ✅ % réel de ce niveau spécifique
      isActive: levelKey === currentLevel,
      isCompleted: progress >= 100,
    };
  });

  // ✅ PROGRESSION GÉNÉRALE = PROGRESSION DU NIVEAU EN COURS (pas moyenne!)
  const globalProgress = getLevelProgress(currentLevel);

  // =================== LOADING ===================
  
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

  // =================== RENDER ===================
  
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

          {/* Métriques */}
          <SimpleMetrics accentColor={levelColor} />

          {/* ✅ PROGRESSION - MÊME LOGIQUE QUE LEVELSELECTION */}
          <LearningProgress
            globalProgress={globalProgress} // ✅ Progression du niveau en cours
            levels={allLevels} // ✅ Chaque niveau avec sa vraie progression
            currentLevel={currentLevel}
            onSelectLevel={handleLevelSelect}
            onChangeLevelVisual={handleChangeLevelVisual}
            primaryColor={levelColor}
          />

          {/* Espace en bas */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Système de révision */}
        <RevisionOrchestrator currentLevel={currentLevel} />
      </LinearGradient>
    </Container>
  );
};

export default Dashboard;