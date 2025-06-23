// src/screens/Dashboard/index.js - VERSION SIMPLE QUI GARDE TON DESIGN

import React, { useContext, useCallback } from "react";
import { RefreshControl, Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { useProgress } from "../../contexts/ProgressContext";

// 🚀 HOOK PROGRESSION TEMPS RÉEL - JUSTE POUR LES VRAIS CHIFFRES
import useRealTimeProgress from "../../hooks/useRealTimeProgress";

// Hooks
import { useDashboardLevel } from "./hooks/useDashboardLevel";
import { useDashboardState } from "./hooks/useDashboardState";
import useLastActivity from "../../hooks/useLastActivity";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";

// Composants Dashboard - TES COMPOSANTS ORIGINAUX
import ModernHeader from "./components/ModernHeader";
import HeroContinueSection from "./components/HeroContinueSection";
import QuickActions from "./components/QuickActions";
import SimpleMetrics from "./components/SimpleMetrics";
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

  // 🚀 JUSTE POUR RÉCUPÉRER LES VRAIS CHIFFRES
  const { getLevelProgress, refresh: refreshProgress } = useRealTimeProgress();

  const colors = themeContext?.colors || {
    background: "#F8FAFC",
    primary: "#3B82F6", 
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // =================== HOOKS DASHBOARD - TES HOOKS ORIGINAUX ===================
  const { currentLevel, handleChangeActiveLevel, levelColor } = useDashboardLevel({ 
    progress: progressData.progress 
  });
  
  const { lastActivity, isLoading: isActivityLoading, reload: reloadActivity } = useLastActivity();
  
  // ✅ REFRESH AMÉLIORÉ - Inclut la progression temps réel
  const { refreshing, onRefresh: originalOnRefresh } = useDashboardState(reloadActivity);

  const onRefresh = useCallback(async () => {
    await Promise.all([
      originalOnRefresh(),
      refreshProgress() // ✅ Refresh aussi la progression temps réel
    ]);
  }, [originalOnRefresh, refreshProgress]);

  // =================== NAVIGATION - TES FONCTIONS ORIGINALES ===================
  
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

  // =================== NIVEAUX AVEC VRAIE PROGRESSION ===================
  
  const allLevels = Object.keys(LANGUAGE_LEVELS).map(key => ({
    id: key,
    title: LANGUAGE_LEVELS[key].title,
    color: LANGUAGE_LEVELS[key].color,
    icon: LANGUAGE_LEVELS[key].icon,
    progress: getLevelProgress(key), // ✅ SEUL CHANGEMENT : vrai chiffre
    isActive: key === currentLevel,
    isCompleted: getLevelProgress(key) >= 100, // ✅ Vraie completion
  }));

  // ✅ PROGRESSION GLOBALE TEMPS RÉEL
  const globalProgress = () => {
    const validLevels = allLevels.filter(level => level.id !== 'bonus');
    if (validLevels.length === 0) return 0;
    const totalProgress = validLevels.reduce((sum, level) => sum + level.progress, 0);
    return Math.round(totalProgress / validLevels.length);
  };

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

  // =================== RENDER PRINCIPAL - TON DESIGN ORIGINAL ===================
  
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
        {/* Header - TON COMPOSANT ORIGINAL */}
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
              onRefresh={onRefresh} // ✅ Refresh amélioré
              colors={[levelColor]}
              tintColor={levelColor}
            />
          }
        >
          {/* Section Continue - TON COMPOSANT ORIGINAL */}
          <HeroContinueSection
            lastActivity={lastActivity}
            onPress={handleContinue}
            accentColor={levelColor}
            isLoading={isActivityLoading}
          />

          {/* Actions rapides - TON COMPOSANT ORIGINAL */}
          <QuickActions
            currentLevel={currentLevel}
            progressContext={progressData}
            accentColor={levelColor}
          />

          {/* Métriques - TON COMPOSANT ORIGINAL */}
          <SimpleMetrics accentColor={levelColor} />

          {/* ✅ PROGRESSION AVEC VRAIES DONNÉES - TON COMPOSANT ORIGINAL */}
          <LearningProgress
            globalProgress={globalProgress()} // ✅ Calculé depuis vraies données
            levels={allLevels} // ✅ Avec vraie progression dans chaque niveau
            currentLevel={currentLevel}
            onSelectLevel={handleLevelSelect}
            onChangeLevelVisual={handleChangeLevelVisual}
            primaryColor={levelColor}
          />

          {/* Espace en bas */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* 🚀 SYSTÈME DE RÉVISION INTELLIGENT */}
        <RevisionOrchestrator currentLevel={currentLevel} />
      </LinearGradient>
    </Container>
  );
};

export default Dashboard;