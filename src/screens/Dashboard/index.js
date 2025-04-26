import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, StatusBar, RefreshControl } from "react-native";
import { router } from "expo-router";

// Contextes
import { ThemeContext } from "@/src/contexts/ThemeContext";
import { ProgressContext } from "@/src/contexts/ProgressContext";

// Composants Dashboard
import DashboardHeader from "./components/DashboardHeader";
import LastActivitySection from "./components/LastActivitySection";
import DailyChallengeSection from "./components/DailyChallengeSection";
import LearningPathSection from "./components/LearningPathSection";
import LanguageTipsCarousel from "./components/LanguageTipsCarousel";
import LevelProgressModal from "./components/LevelProgressModal";

// Hooks personnalisés
import { useStaggeredAnimation } from "@/src/hooks/useAnimation";
import useLastActivity from "@/src/hooks/useLastActivity";

// Constantes et utilitaires
import { LANGUAGE_LEVELS, EXERCISE_TYPES } from "@/src/utils/constants";

const Dashboard = ({ route }) => {
  // Récupération sécurisée des contextes
  const themeContext = useContext(ThemeContext);
  const progressContext = useContext(ProgressContext);

  // Valeurs par défaut sécurisées
  const colors = themeContext?.colors || {
    background: "#FFFFFF",
    primary: "#5E60CE", // Couleur par défaut
  };
  const progress = progressContext?.progress || {};
  const updateStreak = progressContext?.updateStreak || (() => {});

  // Utilisation du hook useLastActivity
  const { getLastActivity, isLoading, loadLastActivities } = useLastActivity();
  const lastActivity = getLastActivity();

  // États
  const [showLevelProgress, setShowLevelProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Paramètres du profil
  const { name = "User", streak = 0 } = route?.params || {};

  // Animation des sections
  const animationStyles = useStaggeredAnimation(5);

  // Mettre à jour le streak
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Recharger les données au focus de l'écran
  useEffect(() => {
    loadLastActivities();
  }, []);

  // Fonction de rafraîchissement
  const onRefresh = async () => {
    setRefreshing(true);
    await loadLastActivities();
    setRefreshing(false);
  };

  // Données des défis quotidiens
  const dailyChallenges = [
    {
      id: "1",
      title: "Vocabulary Builder",
      description: "Master 10 new words today",
      icon: "book-outline",
      progress: 4,
      total: 10,
      color: "#6930C3",
    },
    {
      id: "2",
      title: "Pronunciation Practice",
      description: "Complete 5 speaking exercises",
      icon: "mic-outline",
      progress: 2,
      total: 5,
      color: "#5390D9",
    },
  ];

  // Sélection du défi du jour
  const todaysChallengeIndex = new Date().getDate() % dailyChallenges.length;
  const todaysChallenge = dailyChallenges[todaysChallengeIndex];

  // Astuces linguistiques
  const languageTips = [
    {
      id: "1",
      title: "Practice Makes Perfect",
      description:
        "Speaking out loud helps improve pronunciation and builds confidence.",
      icon: "bulb-outline",
    },
  ];

  // Niveaux d'apprentissage
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

  // Gérer la navigation vers la dernière activité
  const handleLastActivityPress = (activity) => {
    if (activity === "all") {
      // Naviguer vers l'écran de toutes les activités
      router.push("/(tabs)/activityHistory");
      return;
    }
    
    if (!lastActivity) return;
    
    // Naviguer vers l'exercice spécifique avec ses paramètres
    const { type, level, position } = lastActivity;
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

  const handleLevelSelect = (level) => {
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level },
    });
  };

  // Si aucune activité n'est trouvée, utiliser une valeur par défaut
  const getDefaultActivity = () => {
    return {
      title: "Aucune activité récente",
      topic: "Commencer à apprendre",
      icon: "book-outline",
      progress: 0,
      timeElapsed: "Jamais"
    };
  };

  const activityToDisplay = lastActivity || getDefaultActivity();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />

      <DashboardHeader name={name} streak={streak} />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[colors.primary]} 
          />
        }
      >
        <View style={animationStyles[0]}>
          <LastActivitySection
            lastActivity={activityToDisplay}
            onPress={handleLastActivityPress}
          />
        </View>

        <View style={animationStyles[1]}>
          <DailyChallengeSection
            challenge={todaysChallenge}
            onStartChallenge={() => {
              /* Logique de démarrage du défi */
            }}
          />
        </View>

        <View style={animationStyles[2]}>
          <LearningPathSection
            onSelectLevel={() => router.push("/(tabs)/levelSelection")}
            onViewProgress={() => setShowLevelProgress(true)}
          />
        </View>

        <View style={animationStyles[3]}>
          <LanguageTipsCarousel tips={languageTips} />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

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