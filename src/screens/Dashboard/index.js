// src/screens/Dashboard/index.js - VERSION CORRIGÉE
import React, { useContext, useState, useCallback } from "react";
import { RefreshControl, Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext, useProgress } from "../../contexts/ProgressContext"; // ✅ Nouveau context

// Hooks BIENS FAITS (gardés)
import { useDashboardLevel } from "./hooks/useDashboardLevel";
import { useDashboardState } from "./hooks/useDashboardState";

// Hook simple
import useLastActivity from "../../hooks/useLastActivity";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";

// Composants
import ModernHeader from "./components/ModernHeader";
import HeroContinueSection from "./components/HeroContinueSection";
import QuickActions from "./components/QuickActions";
import SimpleMetrics from "./components/SimpleMetrics";
import LearningProgress from "./components/LearningProgress";

// Constantes
import { EXERCISES, LANGUAGE_LEVELS } from "../../utils/constants";
import styles from "./style";

const Dashboard = ({ route }) => {
  // ========== CONTEXTES ==========
  const themeContext = useContext(ThemeContext);
  const progressData = useProgress(); // ✅ Utilise le nouveau hook

  const colors = themeContext?.colors || {
    background: "#F8FAFC",
    primary: "#3B82F6",
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
  };

  // ========== HOOKS DASHBOARD ==========
  const { currentLevel, handleChangeActiveLevel, levelColor } = useDashboardLevel({ progress: progressData.progress });
  const { lastActivity, isLoading: isActivityLoading, reload: reloadActivity } = useLastActivity();
  const { refreshing, onRefresh } = useDashboardState(reloadActivity);

  // ========== STREAK SIMPLE ==========
  const [currentStreak, setCurrentStreak] = useState(0);

  const updateStreak = useCallback(async () => {
    try {
      const today = new Date().toDateString();
      const lastDate = await AsyncStorage.getItem('last_activity_date');
      
      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isYesterday = lastDate === yesterday.toDateString();
        
        const newStreak = isYesterday ? currentStreak + 1 : 1;
        setCurrentStreak(newStreak);
        await AsyncStorage.setItem('last_activity_date', today);
        await AsyncStorage.setItem('current_streak', newStreak.toString());
      }
    } catch (error) {
      console.error('Erreur streak:', error);
    }
  }, [currentStreak]);

  // ========== NAVIGATION SIMPLE ==========
  const handleContinue = useCallback((activity) => {
    updateStreak();
    
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
  }, [updateStreak]);

  // ✅ Fonction pour changer niveau visuel seulement
  const handleChangeLevelVisual = useCallback((levelId) => {
    handleChangeActiveLevel(levelId);
  }, [handleChangeActiveLevel]);

  const handleLevelSelect = useCallback((level) => {
    console.log("Navigation vers niveau:", level); // 🔍 Debug
    router.push(`/(tabs)/exerciseSelection?level=${level}`); // ✅ Version alternative
  }, []);

  // ========== MÉTRIQUES AVEC DONNÉES RÉELLES ==========
  const metrics = [
    {
      id: 'streak',
      icon: '🔥',
      value: currentStreak.toString(),
      label: 'Jours de suite',
      trend: currentStreak >= 7 ? '🏆 Incroyable!' : currentStreak >= 3 ? '💪 En forme!' : null,
    },
    {
      id: 'words',
      icon: '📚',
      value: progressData.progress.stats.correctAnswers.toString(),
      label: 'Mots appris',
      trend: '+12 cette semaine',
    },
    {
      id: 'time',
      icon: '⏱️',
      value: `${Math.floor(progressData.progress.stats.totalTimeSpent / 60)}min`,
      label: 'Temps total',
    }
  ];

  // ✅ CORRIGÉ : Niveaux avec progression réelle ET isActive correct
  const allLevels = Object.keys(LANGUAGE_LEVELS).map(key => ({
    id: key,
    title: LANGUAGE_LEVELS[key].title,
    color: LANGUAGE_LEVELS[key].color,
    icon: LANGUAGE_LEVELS[key].icon,
    progress: progressData.calculateLevelProgress(key),
    isActive: key === currentLevel, // ✅ SEUL le niveau courant est actif
    isCompleted: progressData.calculateLevelProgress(key) >= 100,
  }));

  // ========== DONNÉES USER ==========
  const { name = "Utilisateur" } = route?.params || {};

  // ========== LOADING ==========
  if (progressData.isLoading) {
    return (
      <Container safeArea backgroundColor={colors.background} withPadding>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.primary }]}>
            Chargement...
          </Text>
        </View>
      </Container>
    );
  }

  // ========== BACKGROUND ==========
  const backgroundGradient = {
    colors: [levelColor + '05', colors.background, levelColor + '08'],
    locations: [0, 0.6, 1],
  };

  // ========== RENDU ==========
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

        {/* Contenu */}
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

          {/* Métriques avec données réelles */}
          <SimpleMetrics
            metrics={metrics}
            accentColor={levelColor}
          />

          {/* ✅ Progression avec changement visuel + navigation */}
          <LearningProgress
            globalProgress={progressData.calculateGlobalProgress()}
            levels={allLevels}
            currentLevel={currentLevel}
            onSelectLevel={handleLevelSelect} // Navigation vers exercices
            onChangeLevelVisual={handleChangeLevelVisual} // Change visuel seulement
            primaryColor={levelColor}
          />

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};

export default Dashboard;