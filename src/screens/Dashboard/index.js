// src/screens/Dashboard/index.js - VERSION CORRIGÉE - RAFRAÎCHISSEMENT COMPLET

import { useContext, useCallback, useState } from "react";
import { RefreshControl, Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { useProgress } from "../../contexts/ProgressContext";
import { useCurrentLevel } from '../../contexts/CurrentLevelContext';

// 🚀 HOOK PROGRESSION TEMPS RÉEL - JUSTE POUR LES CHIFFRES
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

const Dashboard = () => {
  
  // =================== ÉTAT LOCAL RAFRAÎCHISSEMENT ===================
  const [refreshKey, setRefreshKey] = useState(0); // Force le re-render des composants
  
  // =================== CONTEXTES ===================
  const themeContext = useContext(ThemeContext);
  const progressData = useProgress();

  // 🚀 PROGRESSION TEMPS RÉEL
  const { getLevelProgress, refresh: refreshProgress } = useRealTimeProgress();

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

  // 🔥 RAFRAÎCHISSEMENT COMPLET DE TOUTES LES SECTIONS
  const onRefresh = useCallback(async () => {
    await Promise.all([
      originalOnRefresh(),    // Recharge lastActivity
      refreshProgress()       // Recharge progression temps réel
    ]);
    
    // Force le re-render de tous les composants enfants
    setRefreshKey(prev => prev + 1);
  }, [originalOnRefresh, refreshProgress]);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [onRefresh])
  );

  // =================== NAVIGATION ===================
  
  const handleContinue = useCallback((activity) => {
    if (activity === "levelSelection") {
      router.push("/tabs/levelSelection");
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
    setCurrentLevel(levelId);
  }, [handleChangeActiveLevel, setCurrentLevel]);

  const handleLevelSelect = useCallback((level) => {
    setCurrentLevel(level);
    router.push(`/tabs/exerciseSelection?level=${level}`);
  }, [setCurrentLevel]);

  // =================== NIVEAUX ===================
  
  const allLevels = ['1', '2', '3', '4', '5', '6', 'bonus'].map(levelKey => {
    const levelInfo = LANGUAGE_LEVELS[levelKey];
    const progress = getLevelProgress(levelKey);
    
    return {
      id: levelKey,
      title: levelInfo.title,
      color: levelInfo.color,
      icon: levelInfo.icon,
      progress,
      isActive: levelKey === currentLevel,
      isCompleted: progress >= 100,
    };
  });

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
    colors: [`${levelColor}05`, colors.background, `${levelColor}08`],
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
            key={`continue-${refreshKey}`} // 🔥 Force le re-render
            lastActivity={lastActivity}
            onPress={handleContinue}
            accentColor={levelColor}
            isLoading={isActivityLoading}
          />

          {/* Actions rapides */}
          <QuickActions
            key={`actions-${refreshKey}`} // 🔥 Force le re-render
            currentLevel={currentLevel}
            progressContext={progressData}
            accentColor={levelColor}
          />

          {/* Métriques */}
          <SimpleMetrics 
            key={`metrics-${refreshKey}`} // 🔥 Force le re-render
            accentColor={levelColor} 
            refreshKey={refreshKey} // 🔥 Passe la clé de rafraîchissement
          />

          {/* Progression */}
          <LearningProgress
            key={`progress-${refreshKey}`} // 🔥 Force le re-render
            globalProgress={globalProgress}
            levels={allLevels}
            currentLevel={currentLevel}
            onSelectLevel={handleLevelSelect}
            onChangeLevelVisual={handleChangeLevelVisual}
            primaryColor={levelColor}
          />

          {/* Espace en bas */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Système de révision */}
        <RevisionOrchestrator 
          key={`revision-${refreshKey}`} // 🔥 Force le re-render
          currentLevel={currentLevel} 
          refreshKey={refreshKey} // 🔥 Passe la clé de rafraîchissement
        />
      </LinearGradient>
    </Container>
  );
};

export default Dashboard;