// src/screens/Dashboard/index.js - VERSION AVEC SYSTÈME UNIFIÉ
import React, { useContext, useEffect, useCallback, useMemo, useState } from "react";
import { RefreshControl, Text, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Hooks personnalisés (existants)
import { useDashboardLevel } from "./hooks/useDashboardLevel";
import { useDashboardNavigation } from "./hooks/useDashboardNavigation";
import { useDashboardData } from "./hooks/useDashboardData";
import { useDashboardState } from "./hooks/useDashboardState";

// Hooks existants (gardés)
import useLastActivity from "../../hooks/useLastActivity";
import useStreak from "./hooks/useStreak";
import useExerciseTracking from "../../hooks/useExerciceTracking";

// 🆕 NOUVEAU SYSTÈME UNIFIÉ
import useUnifiedRevisionSystem from "../../hooks/useUnifiedRevisionSystem";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";

// Composants refactorisés
import ModernHeader from "./components/ModernHeader";
import HeroContinueSection from "./components/HeroContinueSection";
import QuickActions from "./components/QuickActions";
import SimpleMetrics from "./components/SimpleMetrics";
import LearningProgress from "./components/LearningProgress";

// 🆕 NOUVEAUX COMPOSANTS
import RevisionPopup from "./components/popup/RevisionPopup";
import RevisionPreferencesModal from "./components/QuickActions/RevisionPreferencesModal";

import styles from "./style";

// ========== COMPTAGE RÉEL DES MOTS (COMME QUICKACTIONS) ==========

/**
 * Compte les vrais mots appris depuis AsyncStorage
 * Même logique que QuickActions pour cohérence
 */
const countRealWordsLearned = async () => {
  try {
    console.log("🔍 Dashboard - Comptage mots réels...");
    
    let totalWords = 0;
    const levelDetails = {};
    const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
    const modes = ['classic', 'fast'];

    for (const level of levels) {
      let levelTotal = 0;
      const levelModes = {};

      for (const mode of modes) {
        const storageKey = `vocabulary_${level}_${mode}`;
        
        try {
          const stored = await AsyncStorage.getItem(storageKey);
          if (stored) {
            const data = JSON.parse(stored);
            const completedWords = data.completedWords || {};
            
            const wordsCount = Object.values(completedWords).reduce((sum, categoryWords) => {
              return sum + (Array.isArray(categoryWords) ? categoryWords.length : 0);
            }, 0);

            levelModes[mode] = { completedWords: wordsCount };
            levelTotal += wordsCount;
            totalWords += wordsCount;
          } else {
            levelModes[mode] = { completedWords: 0 };
          }
        } catch (error) {
          levelModes[mode] = { completedWords: 0, error: error.message };
        }
      }

      levelDetails[level] = {
        total: levelTotal,
        modes: levelModes
      };
    }

    return {
      totalWordsLearned: totalWords,
      levelDetails
    };
  } catch (error) {
    console.error("🔍 Dashboard - Erreur comptage:", error);
    return {
      totalWordsLearned: 0,
      levelDetails: {}
    };
  }
};

// ========== FONCTIONS HELPER POUR MÉTRIQUES ==========

/**
 * Calcule les mots appris cette semaine (estimé)
 */
const calculateWordsThisWeek = (progress) => {
  if (!progress?.stats?.exercisesCompleted) return 0;
  
  const recentExercises = progress.stats.exercisesCompleted || 0;
  return Math.min(recentExercises * 3, 20); // Max 20 mots cette semaine
};

/**
 * Calcule les métriques du dashboard
 */
const calculateDashboardMetrics = (progressContext, tracking, currentStreak, realWordsCount) => {
  if (!progressContext?.progress) return [];
  
  const { progress } = progressContext;
  const metrics = [];

  // 1. STREAK (priorité #1 pour motivation)
  if (currentStreak > 0) {
    let trend = null;
    if (currentStreak >= 7) trend = '🏆 Série incroyable!';
    else if (currentStreak >= 3) trend = '💪 En forme!';
    
    metrics.push({
      id: 'streak',
      icon: '🔥',
      value: currentStreak.toString(),
      label: 'Jours de suite',
      trend,
      priority: 1
    });
  }

  // 2. TEMPS AUJOURD'HUI (du tracking existant)
  const todayStats = tracking?.getTodayStats?.();
  if (todayStats?.timeSpent > 0) {
    metrics.push({
      id: 'time',
      icon: '⏱️',
      value: `${todayStats.timeSpent}min`,
      label: 'Temps aujourd\'hui',
      trend: todayStats.timeTrend || null,
      priority: 2
    });
  }

  // 3. MOTS APPRIS TOTAUX (comptage réel)
  if (realWordsCount > 0) {
    const wordsThisWeek = calculateWordsThisWeek(progress);
    let trend = null;
    if (wordsThisWeek > 0) {
      trend = `+${wordsThisWeek} cette semaine`;
    }

    metrics.push({
      id: 'words',
      icon: '📚',
      value: realWordsCount.toString(),
      label: 'Mots appris',
      trend,
      priority: 3
    });
  }

  return metrics.sort((a, b) => a.priority - b.priority);
};

const Dashboard = ({ route }) => {
  // ✅ PROTECTION: Vérifier que route existe
  if (!route) {
    console.warn('Route is undefined in Dashboard');
    return (
      <Container
        safeArea
        backgroundColor="#F8FAFC"
        statusBarStyle="light-content"
        withPadding
        style={styles.loadingContainer}
      >
        <Text style={styles.loadingText}>
          Chargement de la navigation...
        </Text>
      </Container>
    );
  }

  // ========== CONTEXTES ==========
  const themeContext = useContext(ThemeContext);
  const progressContext = useContext(ProgressContext);

  // ✅ CORRECTION: Vérification des contextes
  if (!progressContext) {
    console.warn('ProgressContext is undefined');
    return (
      <Container
        safeArea
        backgroundColor="#F8FAFC"
        statusBarStyle="light-content"
        withPadding
        style={styles.loadingContainer}
      >
        <Text style={styles.loadingText}>
          Chargement du contexte de progression...
        </Text>
      </Container>
    );
  }

  // Valeurs par défaut
  const colors = themeContext?.colors || {
    background: "#F8FAFC",
    primary: "#3B82F6",
    surface: "#FFFFFF",
    text: "#1F2937",
    textSecondary: "#6B7280",
    success: "#10B981",
  };

  // ========== ÉTAT COMPTAGE MOTS RÉELS ==========
  const [realWordsData, setRealWordsData] = useState({
    totalWordsLearned: 0,
    isLoading: true,
    levelDetails: {}
  });

  // ========== HOOKS EXISTANTS ==========
  const {
    getLastActivity,
    isLoading: isActivityLoading,
    loadLastActivities,
    formatProgressSubtitle,
  } = useLastActivity();

  const { currentStreak, updateStreak } = useStreak();
  const tracking = useExerciseTracking();

  // ========== HOOKS DASHBOARD ==========
  
  // 1. Hook de niveau (doit être appelé en premier car il définit currentLevel)
  const { currentLevel, handleChangeActiveLevel, levelColor } =
    useDashboardLevel(progressContext);

  // 2. Hook de données (utilise currentLevel du hook précédent)
  const dashboardData = useDashboardData(
    progressContext,
    currentLevel,
    getLastActivity(),
    currentStreak
  );

  // 3. Hook de navigation
  const {
    navigateToExercise,
    handleLevelSelect,
  } = useDashboardNavigation(updateStreak, tracking.startTracking);

  // 4. Hook d'état
  const {
    refreshing,
    onRefresh,
  } = useDashboardState(loadLastActivities);

  // ========== 🆕 NOUVEAU SYSTÈME UNIFIÉ DE RÉVISION ==========
  const {
    revisionData,
    revisionSettings,
    showPreferencesModal,
    handlePreferencesChoice,
    handleStartRevision,
    handleSnoozeLater,
    handlePostpone,
    handleIgnore,
    resetRevisionSystem,
    isAvailable: isRevisionAvailable,
    debugInfo: revisionDebugInfo
  } = useUnifiedRevisionSystem(realWordsData.totalWordsLearned);

  // ========== ÉTAT POPUP RÉVISION ==========
  const [showRevisionPopup, setShowRevisionPopup] = useState(false);

  // ========== CHARGEMENT COMPTAGE MOTS ==========
  useEffect(() => {
    const loadWordsData = async () => {
      setRealWordsData(prev => ({ ...prev, isLoading: true }));
      const data = await countRealWordsLearned();
      setRealWordsData({
        ...data,
        isLoading: false
      });
    };
    loadWordsData();
  }, [currentLevel]); // Recharger si niveau change

  // ========== DÉCLENCHEMENT POPUP INTELLIGENT ==========
  useEffect(() => {
    if (isRevisionAvailable && revisionData.triggerType === 'scheduled') {
      // Cooldown: ne pas montrer le popup plus d'une fois par heure
      const now = Date.now();
      const lastShown = revisionData.lastPopupShown || 0;
      
      if ((now - lastShown) > 3600000) { // 1 heure
        console.log("📢 Déclenchement popup révision:", revisionData);
        setShowRevisionPopup(true);
      } else {
        const timeLeft = Math.ceil((3600000 - (now - lastShown)) / (60 * 1000));
        console.log(`⏰ Popup en cooldown: ${timeLeft}min restantes`);
      }
    }
  }, [isRevisionAvailable, revisionData]);

  // ========== MÉTRIQUES CALCULÉES ==========
  const dashboardMetrics = useMemo(() => {
    return calculateDashboardMetrics(
      progressContext, 
      tracking, 
      currentStreak, 
      realWordsData.totalWordsLearned
    );
  }, [progressContext, tracking, currentStreak, realWordsData.totalWordsLearned]);

  // ========== BACKGROUND GRADIENT ==========
  const backgroundGradient = useMemo(() => {
    const gradientStart = levelColor + "03";
    const gradientMiddle = colors.background;
    const gradientEnd = levelColor + "08";

    return {
      colors: [gradientStart, gradientMiddle, gradientEnd],
      locations: [0, 0.6, 1],
    };
  }, [levelColor, colors.background]);

  // ========== DONNÉES USER ET ROUTE ==========
  const { name = "Utilisateur", level: routeLevel } = route?.params || {};

  // ========== GESTIONNAIRES RÉVISION ==========

  // Démarrer révision depuis popup
  const handlePopupReviseNow = async () => {
    setShowRevisionPopup(false);
    const revisionParams = await handleStartRevision();
    return revisionParams;
  };

  // Plus tard (+10 mots)
  const handlePopupSnoozeLater = async () => {
    await handleSnoozeLater();
    setShowRevisionPopup(false);
  };

  // Reporter (+15 mots)
  const handlePopupPostpone = async () => {
    await handlePostpone();
    setShowRevisionPopup(false);
  };

  // Ignorer cette fois
  const handlePopupIgnore = async () => {
    await handleIgnore();
    setShowRevisionPopup(false);
  };

  // Fermer popup sans action
  const handlePopupDismiss = () => {
    setShowRevisionPopup(false);
  };

  // ========== EFFETS ==========
  useEffect(() => {
    loadLastActivities();
  }, [loadLastActivities]);

  useFocusEffect(
    useCallback(() => {
      loadLastActivities();

      if (tracking?.isTracking) {
        const handleStopTracking = async () => {
          try {
            const result = await tracking.stopTracking();
            if (result?.saved && result?.timeSpent > 0) {
              console.log(`Session sauvée: ${result.timeSpent}s sur ${result.exerciseType}`);
            }
          } catch (error) {
            console.error('Erreur lors de l\'arrêt du tracking:', error);
          }
        };
        handleStopTracking();
      }
    }, [tracking?.isTracking, tracking?.stopTracking, loadLastActivities])
  );

  // ========== GESTIONNAIRES NAVIGATION ==========
  const handleLevelSelectWithNavigation = useCallback(
    (level) => {
      handleLevelSelect(level, handleChangeActiveLevel);
    },
    [handleLevelSelect, handleChangeActiveLevel]
  );

  const handleLevelVisualChange = useCallback(
    (level) => {
      handleChangeActiveLevel(level);
    },
    [handleChangeActiveLevel]
  );

  // ========== LOADING STATE ==========
  if (!tracking?.isLoaded || realWordsData.isLoading) {
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
        {tracking?.error && (
          <Text style={styles.errorText}>
            Erreur: {tracking.error}
          </Text>
        )}
      </Container>
    );
  }

  // ✅ CORRECTION: Vérification finale avant rendu
  if (!dashboardData) {
    return (
      <Container
        safeArea
        backgroundColor={colors.background}
        statusBarStyle="light-content"
        withPadding
        style={styles.loadingContainer}
      >
        <Text style={[styles.loadingText, { color: colors.primary }]}>
          Préparation des données...
        </Text>
      </Container>
    );
  }

  // ========== RENDU PRINCIPAL ==========
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
        {/* 1. HEADER MODERNE */}
        <ModernHeader
          level={currentLevel}
          levelColor={levelColor}
          userName={name || "Utilisateur"}
        />

        {/* 2. CONTENU SCROLLABLE */}
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
          {/* 3. HERO SECTION - Continue Learning */}
          <HeroContinueSection
            lastActivity={dashboardData.lastActivity}
            onPress={navigateToExercise}
            accentColor={levelColor}
            formatProgressSubtitle={formatProgressSubtitle}
            isLoading={isActivityLoading}
          />

          {/* 4. QUICK ACTIONS - AVEC SYSTÈME UNIFIÉ */}
          <QuickActions
            currentLevel={currentLevel}
            progressContext={progressContext}
            accentColor={levelColor}
          />

          {/* 5. MÉTRIQUES AVEC COMPTAGE RÉEL */}
          <SimpleMetrics
            metrics={dashboardMetrics}
            accentColor={levelColor}
          />

          {/* 6. PROGRESSION APPRENTISSAGE */}
          <LearningProgress
            globalProgress={dashboardData.globalProgress}
            levels={dashboardData.allLevels}
            currentLevel={currentLevel}
            onSelectLevel={handleLevelSelectWithNavigation}
            onChangeLevelVisual={handleLevelVisualChange}
            primaryColor={levelColor}
          />

          {/* 🆕 DEBUG SYSTÈME UNIFIÉ */}
          {__DEV__ && (
            <View style={styles.debugSection}>
              <Text style={styles.debugTitle}>🎯 Debug Système Unifié (Dashboard)</Text>
              <Text style={styles.debugText}>
                📊 Mots réels: {realWordsData.totalWordsLearned}
              </Text>
              <Text style={styles.debugText}>
                🎨 Style: {revisionSettings.styleId} ({revisionSettings.frequency} mots)
              </Text>
              <Text style={styles.debugText}>
                🔔 Disponible: {isRevisionAvailable ? 'OUI' : 'NON'}
              </Text>
              <Text style={styles.debugText}>
                📝 Raison: {revisionData.reason}
              </Text>
              <Text style={styles.debugText}>
                🚀 Trigger: {revisionData.triggerType}
              </Text>
            </View>
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* ========== 🆕 POPUP RÉVISION INTELLIGENT ========== */}
        <RevisionPopup
          visible={showRevisionPopup}
          wordsToReview={revisionData.questionsCount}
          questionsCount={revisionData.questionsCount}
          currentLevel="mixed"
          styleTitle={revisionSettings.styleId}
          onReviseNow={handlePopupReviseNow}
          onSnoozeLater={handlePopupSnoozeLater}
          onPostpone={handlePopupPostpone}
          onIgnore={handlePopupIgnore}
          onDismiss={handlePopupDismiss}
        />

        {/* ========== 🆕 MODAL CHOIX PRÉFÉRENCES ========== */}
        <RevisionPreferencesModal
          visible={showPreferencesModal}
          onChoice={handlePreferencesChoice}
          onSkip={(freq, count, style) => handlePreferencesChoice(freq, count, style)}
        />
      </LinearGradient>
    </Container>
  );
};

export default Dashboard;