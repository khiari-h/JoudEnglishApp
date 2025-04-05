import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

// Constantes et utilitaires
import { LANGUAGE_LEVELS, EXERCISE_TYPES } from "@/src/utils/constants";
import { formatRelativeTime } from "@/src/utils/formatters";

const Dashboard = ({ route }) => {
  const navigation = useNavigation();

  // Récupération sécurisée des contextes
  const themeContext = useContext(ThemeContext);
  const progressContext = useContext(ProgressContext);

  // Valeurs par défaut sécurisées
  const colors = themeContext?.colors || {
    background: "#FFFFFF",
    primary: "#000000",
  };
  const progress = progressContext?.progress || {};
  const updateStreak = progressContext?.updateStreak || (() => {});

  // États
  const [showLevelProgress, setShowLevelProgress] = useState(false);

  // Paramètres du profil
  const { name = "User", streak = 0 } = route?.params || {};

  // Animation des sections
  const animationStyles = useStaggeredAnimation(5);

  // Mettre à jour le streak
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Dernière activité de l'utilisateur
  const getLastActivity = () => {
    if (!progress?.lastActivity?.type) {
      return {
        title: "Aucune activité récente",
        topic: "Commencer à apprendre",
        icon: "book-outline",
        progress: 0,
      };
    }

    const { type, level, timestamp } = progress.lastActivity;
    const exerciseInfo = EXERCISE_TYPES[type] || {};
    const levelInfo = LANGUAGE_LEVELS[level] || {};

    return {
      title: exerciseInfo.title || type,
      topic: `${levelInfo.title} (${level})`,
      icon: exerciseInfo.icon,
      progress: progress.exercises?.[type]?.[level]?.completed || 0,
      route: exerciseInfo.route,
      level,
    };
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

  // Gestionnaires de navigation
  const navigateToLastActivity = () => {
    const lastActivity = getLastActivity();
    if (lastActivity.route && lastActivity.level) {
      navigation.navigate(lastActivity.route, { level: lastActivity.level });
    }
  };

  const handleLevelSelect = (level) => {
    navigation.navigate("ExerciseSelection", { level });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />

      <DashboardHeader name={name} streak={streak} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={animationStyles[0]}>
          <LastActivitySection
            lastActivity={getLastActivity()}
            onPress={navigateToLastActivity}
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
            onSelectLevel={() => navigation.navigate("LevelSelection")}
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
