import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, StatusBar, RefreshControl } from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';

// Contextes
import { ThemeContext } from "@/src/contexts/ThemeContext";
import { ProgressContext } from "@/src/contexts/ProgressContext";

// Composants Dashboard révisés
import CompactHeader from "./components/CompactHeader";
import ContinueLearningSection from "./components/ContinueLearningSection";
import DailyGoalSection from "./components/DailyGoalSection";
import RecommendationsSection from "./components/RecommendationsSection";
import LearningPathCompact from "./components/LearningPathCompact";
import BottomNavigation from "./components/BottomNavigation";
import LevelProgressModal from "./components/LevelProgressModal";

// Hooks personnalisés
import useLastActivity from "@/src/hooks/useLastActivity";

// Constantes et utilitaires
import { LANGUAGE_LEVELS, EXERCISE_TYPES } from "@/src/utils/constants";
import styles from "./style";

const Dashboard = ({ route }) => {
  // Récupération sécurisée des contextes
  const themeContext = useContext(ThemeContext);
  const progressContext = useContext(ProgressContext);

  // Valeurs par défaut sécurisées
  const colors = themeContext?.colors || {
    background: "#F9FAFB",
    primary: "#3B82F6", // Nouvelle couleur principale (bleu)
  };
  const progress = progressContext?.progress || {};
  const updateStreak = progressContext?.updateStreak || (() => {});

  // Utilisation du hook useLastActivity
  const { 
    getLastActivity, 
    isLoading: isActivityLoading, 
    loadLastActivities,
    formatProgressSubtitle
  } = useLastActivity();
  
  const lastActivity = getLastActivity();

  // États
  const [showLevelProgress, setShowLevelProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Paramètres du profil
  const { name = "Utilisateur", streak = 0 } = route?.params || {};

  // Déterminer le niveau actuel
  const currentLevel = progress?.currentLevel || "A1";
  const levelColor = LANGUAGE_LEVELS[currentLevel]?.color || colors.primary;
  const levelProgress = progress?.levels?.[currentLevel]?.completed || 0;

  // Mettre à jour le streak
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Recharger les données au montage initial
  useEffect(() => {
    loadLastActivities();
  }, []);

  // Recharger les données à chaque fois que l'écran revient au focus
  useFocusEffect(
    React.useCallback(() => {
      console.log('Dashboard en focus, rechargement des activités');
      loadLastActivities();
      return () => {};
    }, [loadLastActivities])
  );

  // Fonction de rafraîchissement
  const onRefresh = async () => {
    setRefreshing(true);
    await loadLastActivities();
    setRefreshing(false);
  };

  // Données de l'objectif quotidien
  const dailyGoal = {
    completed: 2,
    total: 5
  };

  // Exercices recommandés basés sur le niveau actuel
  const recommendations = React.useMemo(() => {
    return Object.keys(EXERCISE_TYPES)
      .slice(0, 3) // Limiter à 3 recommandations pour la lisibilité
      .map((key, index) => {
        const exerciseInfo = EXERCISE_TYPES[key];
        return {
          id: index + 1,
          title: exerciseInfo.title,
          description: exerciseInfo.description,
          type: key,
          level: currentLevel,
          icon: exerciseInfo.icon,
        };
      });
  }, [currentLevel]);

  // Naviguer vers un exercice spécifique
  const handleLastActivityPress = (activity) => {
    if (activity === "levelSelection") {
      router.push("/(tabs)/levelSelection");
      return;
    }
    
    if (!activity) return;
    
    // Naviguer vers l'exercice spécifique avec ses paramètres
    const { type, level, position } = activity;
    let pathname;
    let params = { level };
    
    switch (type) {
      case "vocabulary":
        pathname = "/(tabs)/vocabularyExercise";
        params.initialCategoryIndex = position.categoryIndex;
        params.initialWordIndex = position.wordIndex;
        break;
      case "grammar":
        pathname = "/(tabs)/grammarExercise";
        params.initialRuleIndex = position.ruleIndex;
        params.initialExerciseIndex = position.exerciseIndex;
        break;
      case "reading":
        pathname = "/(tabs)/readingExercise";
        params.initialExerciseIndex = position.exerciseIndex;
        params.initialQuestionIndex = position.questionIndex;
        break;
      case "error_correction":
        pathname = "/(tabs)/errorCorrectionExercise";
        params.initialCategoryIndex = position.categoryIndex;
        params.initialExerciseIndex = position.exerciseIndex;
        break;
      case "chatbot":
        pathname = "/(tabs)/chatbotExercise";
        params.initialScenarioIndex = position.scenarioIndex;
        params.initialStepIndex = position.stepIndex;
        break;
      case "phrases":
        pathname = "/(tabs)/phrasesExercise";
        params.initialCategoryIndex = position.categoryIndex;
        params.initialPhraseIndex = position.phraseIndex;
        break;
      case "spelling":
        pathname = "/(tabs)/spellingExercise";
        params.exerciseType = position.exerciseType || "correction";
        params.initialExerciseIndex = position.exerciseIndex;
        break;
      default:
        pathname = "/(tabs)/levelSelection";
        break;
    }
    
    router.push({
      pathname,
      params
    });
  };

  // Naviguer vers un exercice recommandé
  const handleRecommendedExercisePress = (exercise) => {
    let pathname;
    
    switch (exercise.type) {
      case "vocabulary":
        pathname = "/(tabs)/vocabularyExercise";
        break;
      case "grammar":
        pathname = "/(tabs)/grammarExercise";
        break;
      case "chatbot":
        pathname = "/(tabs)/chatbotExercise";
        break;
      // Autres types d'exercices...
      default:
        pathname = "/(tabs)/levelSelection";
    }
    
    router.push({
      pathname,
      params: { level: exercise.level }
    });
  };

  // Niveaux CECRL pour le parcours d'apprentissage
  const allLevels = Object.keys(LANGUAGE_LEVELS).map(levelKey => ({
    id: levelKey,
    color: LANGUAGE_LEVELS[levelKey].color
  }));

  // Gérer la navigation vers un niveau
  const handleLevelSelect = (level) => {
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level },
    });
  };

  // Gérer la navigation vers le profil
  const handleProfilePress = () => {
    router.push("/(tabs)/profile");
  };

  // Récupérer tous les niveaux avec leur progression
  const getAllLearningLevels = () =>
    Object.keys(LANGUAGE_LEVELS).map((levelKey) => {
      const levelInfo = LANGUAGE_LEVELS[levelKey];
      return {
        id: levelKey.toLowerCase(),
        title: `${levelKey} - ${levelInfo.title}`,
        color: levelInfo.color,
        progress: progress?.levels?.[levelKey]?.completed || 0,
      };
    });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Header compact avec niveau actuel */}
      <CompactHeader
        level={currentLevel}
        progress={levelProgress}
        streak={streak}
        levelColor={levelColor}
        onProfilePress={handleProfilePress}
      />

      {/* Contenu principal scrollable */}
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
        {/* Section pour continuer l'apprentissage */}
        <ContinueLearningSection
          lastActivity={lastActivity}
          onPress={handleLastActivityPress}
          accentColor={levelColor}
          formatProgressSubtitle={formatProgressSubtitle}
          isLoading={isActivityLoading}
        />

        {/* Objectif quotidien */}
        <DailyGoalSection
          completed={dailyGoal.completed}
          total={dailyGoal.total}
          accentColor={levelColor}
        />

        {/* Exercices recommandés */}
        <RecommendationsSection
          recommendations={recommendations}
          onSelectExercise={handleRecommendedExercisePress}
          accentColor={levelColor}
        />

        {/* Parcours d'apprentissage compact */}
        <LearningPathCompact
          levels={allLevels}
          currentLevel={currentLevel}
          onSelectLevel={handleLevelSelect}
          onViewProgress={() => setShowLevelProgress(true)}
          primaryColor={levelColor}
        />
        
        {/* Espace en bas pour éviter que le contenu soit caché par la navigation */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Navigation en bas */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        accentColor={levelColor}
      />

      {/* Modal de progression des niveaux */}
      <LevelProgressModal
        visible={showLevelProgress}
        levels={getAllLearningLevels()}
        onClose={() => setShowLevelProgress(false)}
        onSelectLevel={handleLevelSelect}
      />
    </View>
  );
};

export default Dashboard;