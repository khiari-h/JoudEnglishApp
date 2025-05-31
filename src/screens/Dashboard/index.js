import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, ScrollView, StatusBar, RefreshControl } from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Composants Dashboard
import CompactHeader from "./components/CompactHeader";
import ContinueLearningSection from "./components/ContinueLearningSection";
import DailyGoalSection from "./components/DailyGoalSection";
import RecommendationsSection from "./components/RecommendationsSection";
import LearningPathCompact from "./components/LearningPathCompact";
import BottomNavigation from "./components/BottomNavigation";
import LevelProgressModal from "./components/LevelProgressModal";

// Hooks Dashboard
import useLastActivity from "../../hooks/useLastActivity";
import useStreak from "./hooks/useStreak"; // Hook dashboard local
import useExerciseTimeTracking from "./hooks/useExerciseTimeTracking"; // NOUVEAU hook

// Constantes
import { LANGUAGE_LEVELS } from "../../utils/constants";
import styles from "./style";

const ACTIVE_LEVEL_KEY = "user_active_level";

const Dashboard = ({ route }) => {
  // ========== CONTEXTES ==========
  const themeContext = useContext(ThemeContext);
  const progressContext = useContext(ProgressContext);

  const colors = themeContext?.colors || {
    background: "#F9FAFB",
    primary: "#3B82F6",
  };

  const {
    progress = {},
    calculateGlobalProgress = () => 0,
    calculateLevelProgress = () => 0,
  } = progressContext || {};

  // ========== ÉTATS ==========
  const [currentLevel, setCurrentLevel] = useState("1");
  const [showLevelProgress, setShowLevelProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // ========== HOOKS ==========
  const {
    getLastActivity,
    isLoading: isActivityLoading,
    loadLastActivities,
    formatProgressSubtitle,
  } = useLastActivity();

  // Hook streak - nouvelle logique
  const { currentStreak, updateStreak } = useStreak();

  // ========== DONNÉES ==========
  const { name = "Utilisateur" } = route?.params || {}; // Plus de streak dans params
  const lastActivity = getLastActivity();
  const globalProgress = calculateGlobalProgress();
  const levelProgress = calculateLevelProgress(currentLevel);
  const levelColor = LANGUAGE_LEVELS[currentLevel]?.color || colors.primary;

  // Stats temps exercices (simulation pour maintenant)
  const exerciseTimeStats = {
    vocabulary: 20,
    phrases: 12,
    grammar: 25,
    reading: 8,
    conversations: 18,
    spelling: 0,
    errorCorrection: 5,
    wordGames: 0,
    assessment: 0,
  };

  // ========== NIVEAU MANAGEMENT ==========
  const mapOldToNewLevel = (level) => {
    const mapping = {
      A1: "1",
      A2: "2", 
      B1: "3",
      B2: "4",
      C1: "5",
      C2: "6",
      bonus: "bonus",
    };
    return mapping[level] || level;
  };

  const handleChangeActiveLevel = useCallback(async (newLevel) => {
    if (!LANGUAGE_LEVELS[newLevel]) return;

    setCurrentLevel(newLevel);
    try {
      await AsyncStorage.setItem(ACTIVE_LEVEL_KEY, newLevel);
    } catch (error) {
      console.error("Erreur sauvegarde niveau:", error);
    }
  }, []);

  // ========== NAVIGATION AVEC STREAK ==========
  const navigateToExercise = useCallback((activity) => {
    if (!activity) return;

    try {
      // 🔥 METTRE À JOUR LE STREAK À CHAQUE ACTIVITÉ
      updateStreak();
      
      if (activity === "levelSelection") {
        router.push("/(tabs)/levelSelection");
        return;
      }

      const { type, level, mode } = activity;
      const routes = {
        vocabulary: "/(tabs)/vocabularyExercise",
        grammar: "/(tabs)/grammarExercise",
        reading: "/(tabs)/readingExercise",
        conversations: "/(tabs)/conversationsExercise",
        phrases: "/(tabs)/phrasesExercise",
        spelling: "/(tabs)/spellingExercise",
        wordGames: "/(tabs)/wordGamesExercise",
        assessment: "/(tabs)/levelAssessment",
      };

      const pathname = routes[type] || "/(tabs)/levelSelection";
      
      // Passer le mode pour vocabulary
      const params = { level };
      if (mode && type === 'vocabulary') {
        params.mode = mode;
      }
      
      router.push({ pathname, params });
    } catch (error) {
      console.error("Erreur navigation:", error);
    }
  }, [updateStreak]);

  // ========== AUTRES GESTIONNAIRES ==========
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadLastActivities();
    setRefreshing(false);
  }, [loadLastActivities]);

  const handleLevelSelect = useCallback((level) => {
    handleChangeActiveLevel(level);
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level },
    });
  }, [handleChangeActiveLevel]);

  // ========== EFFETS ==========
  useEffect(() => {
    const loadActiveLevel = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem(ACTIVE_LEVEL_KEY);
        if (savedLevel && LANGUAGE_LEVELS[savedLevel]) {
          setCurrentLevel(mapOldToNewLevel(savedLevel));
        } else if (progress?.currentLevel) {
          setCurrentLevel(mapOldToNewLevel(progress.currentLevel));
        }
      } catch (error) {
        console.error("Erreur chargement niveau:", error);
      }
    };
    loadActiveLevel();
  }, []);

  useEffect(() => {
    loadLastActivities();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLastActivities();
      
      // ⏹️ ARRÊTER LE TRACKING SI EN COURS (retour au Dashboard)
      if (isTracking) {
        const timeSpent = stopAndSave();
        console.log(`📊 Session terminée: ${timeSpent}s`);
      }
    }, [loadLastActivities, isTracking, stopAndSave])
  );

  // ========== DEBUG ==========
  console.log("🎯 DEBUG Dashboard - lastActivity:", lastActivity);
  console.log("🎯 DEBUG Dashboard - currentStreak:", currentStreak);
  console.log("🎯 DEBUG Dashboard - currentLevel:", currentLevel);
  console.log("📊 DEBUG Dashboard - exerciseTimeStats:", exerciseTimeStats);
  console.log("⏱️ DEBUG Dashboard - isTracking:", isTracking);

  // ========== DONNÉES NIVEAUX ==========
  const allLevels = Object.keys(LANGUAGE_LEVELS).map((levelKey) => ({
    id: levelKey,
    color: LANGUAGE_LEVELS[levelKey].color,
    isActive: levelKey === currentLevel,
  }));

  const getAllLearningLevels = useCallback(() =>
    Object.keys(LANGUAGE_LEVELS).map((levelKey) => ({
      id: levelKey,
      title: LANGUAGE_LEVELS[levelKey].title,
      color: LANGUAGE_LEVELS[levelKey].color,
      progress: calculateLevelProgress(levelKey),
      isActive: levelKey === currentLevel,
    })), [calculateLevelProgress, currentLevel]);

  // ========== RENDU ==========
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Header simplifié avec vraie logique streak */}
      <CompactHeader
        level={currentLevel}
        streak={currentStreak}
        levelColor={levelColor}
      />

      {/* Contenu scrollable */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      >
        {/* 1. Continue Learning - Design revu */}
        <ContinueLearningSection
          lastActivity={lastActivity}
          onPress={navigateToExercise}
          accentColor={levelColor}
          formatProgressSubtitle={formatProgressSubtitle}
          isLoading={isActivityLoading}
        />

        {/* 2. Défi du jour */}
        <DailyGoalSection
          currentLevel={currentLevel}
          progress={progress}
          accentColor={levelColor}
          onStartExercise={(type, level) => {
            updateStreak(); // Streak pour défi du jour aussi
            
            // Démarrer tracking pour défi du jour
            let trackingKey = type;
            if (type === 'vocabulary') {
              trackingKey = 'vocabulary_classic'; // Par défaut classic pour défi
            }
            startTracking(trackingKey);
            
            navigateToExercise({ type, level });
          }}
          onStartEvaluation={(level) => {
            updateStreak(); // Streak pour évaluation aussi
            startTracking('assessment'); // Tracking pour évaluations
            router.push({
              pathname: "/(tabs)/levelAssessment",
              params: { level },
            });
          }}
        />

        {/* 3. Suggestions intelligentes */}
        <RecommendationsSection
          lastActivity={lastActivity}
          exerciseTimeStats={exerciseTimeStats}
          currentLevel={currentLevel}
          onSelectExercise={navigateToExercise}
          accentColor={levelColor}
        />

        {/* 4. Parcours d'apprentissage */}
        <LearningPathCompact
          globalProgress={globalProgress}
          levels={allLevels}
          currentLevel={currentLevel}
          onSelectLevel={handleLevelSelect}
          onViewProgress={() => setShowLevelProgress(true)}
          primaryColor={levelColor}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Navigation bottom */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        accentColor={levelColor}
        currentLevel={currentLevel}
      />

      {/* Modal progression niveaux */}
      <LevelProgressModal
        visible={showLevelProgress}
        levels={getAllLearningLevels()}
        onClose={() => setShowLevelProgress(false)}
        onSelectLevel={(level) => {
          handleChangeActiveLevel(level);
          setShowLevelProgress(false);
          router.push({
            pathname: "/(tabs)/exerciseSelection",
            params: { level },
          });
        }}
      />
    </View>
  );
};

export default Dashboard;