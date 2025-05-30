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

// Hooks
import useLastActivity from "../../hooks/useLastActivity";

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
    updateStreak = () => {},
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

  // ========== DONNÉES ==========
  const { name = "Utilisateur", streak = 0 } = route?.params || {};
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

  // ========== NAVIGATION ==========
  const navigateToExercise = useCallback((activity) => {
    if (!activity) return;

    try {
      if (activity === "levelSelection") {
        router.push("/(tabs)/levelSelection");
        return;
      }

      const { type, level } = activity;
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
      router.push({ pathname, params: { level } });
    } catch (error) {
      console.error("Erreur navigation:", error);
    }
  }, []);

  // ========== GESTIONNAIRES ==========
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadLastActivities();
    setRefreshing(false);
  }, [loadLastActivities]);

  const handleLevelSelect = useCallback(
    (level) => {
      handleChangeActiveLevel(level);
      router.push({
        pathname: "/(tabs)/exerciseSelection",
        params: { level },
      });
    },
    [handleChangeActiveLevel]
  );

  const handleProfilePress = useCallback(() => {
    router.push("/(tabs)/profile");
  }, []);

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
    updateStreak();
  }, []);

  useEffect(() => {
    loadLastActivities();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLastActivities();
    }, [])
  );

  // ========== DEBUG ==========
  console.log("DEBUG Dashboard - lastActivity:", lastActivity);
  console.log("DEBUG Dashboard - isActivityLoading:", isActivityLoading);
  console.log("DEBUG Dashboard - currentLevel:", currentLevel);

  // ========== DONNÉES NIVEAUX ==========
  const allLevels = Object.keys(LANGUAGE_LEVELS).map((levelKey) => ({
    id: levelKey,
    color: LANGUAGE_LEVELS[levelKey].color,
    isActive: levelKey === currentLevel,
  }));

  const getAllLearningLevels = useCallback(
    () =>
      Object.keys(LANGUAGE_LEVELS).map((levelKey) => ({
        id: levelKey,
        title: LANGUAGE_LEVELS[levelKey].title,
        color: LANGUAGE_LEVELS[levelKey].color,
        progress: calculateLevelProgress(levelKey),
        isActive: levelKey === currentLevel,
      })),
    [calculateLevelProgress, currentLevel]
  );

  // ========== RENDU ==========
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <CompactHeader
        level={currentLevel}
        progress={levelProgress}
        streak={streak}
        levelColor={levelColor}
        onProfilePress={handleProfilePress}
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
        {/* 1. Continue Learning */}
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
          onStartExercise={(type, level) => navigateToExercise({ type, level })}
          onStartEvaluation={(level) =>
            router.push({
              pathname: "/(tabs)/levelAssessment",
              params: { level },
            })
          }
        />

        {/* 3. Suggestions/Recommandations */}
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
