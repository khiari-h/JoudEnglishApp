import React, { useContext, useEffect } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Composants Dashboard
import DashboardHeader from "./components/DashboardHeader";
import LastActivitySection from "./components/LastActivitySection";
import DailyChallengeSection from "./components/DailyChallengeSection";
import LearningPathSection from "./components/LearningPathSection";
import LanguageTipsCarousel from "./components/LanguageTipsCarousel";
import LevelProgressModal from "./components/LevelProgressModal";

// Hooks personnalisés
import { useStaggeredAnimation } from "../../hooks/useAnimation";

// Constantes et utilitaires
import { LANGUAGE_LEVELS, EXERCISE_TYPES } from "../../utils/constants";
import { formatRelativeTime } from "../../utils/formatters";

// Styles
import styles from "./style";

const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const { progress, updateStreak } = useContext(ProgressContext);

  // Paramètres du profil
  const { name = "User", streak = 0 } = route?.params || {};

  // Animation des sections
  const animationStyles = useStaggeredAnimation(5);

  // Mettre à jour le streak
  useEffect(() => {
    updateStreak();
  }, []);

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
    // Autres défis...
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
    // Autres astuces...
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

  // États pour la modal de progression
  const [showLevelProgress, setShowLevelProgress] = React.useState(false);

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* En-tête du Dashboard */}
      <DashboardHeader name={name} streak={streak} />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Dernière activité */}
        <View style={[styles.sectionSpacing, animationStyles[0]]}>
          <LastActivitySection
            lastActivity={getLastActivity()}
            onPress={navigateToLastActivity}
          />
        </View>

        {/* Défi quotidien */}
        <View style={[styles.sectionSpacing, animationStyles[1]]}>
          <DailyChallengeSection
            challenge={todaysChallenge}
            onStartChallenge={() => {
              /* Logique de démarrage du défi */
            }}
          />
        </View>

        {/* Parcours d'apprentissage */}
        <View style={[styles.sectionSpacing, animationStyles[2]]}>
          <LearningPathSection
            onSelectLevel={() => navigation.navigate("LevelSelection")}
            onViewProgress={() => setShowLevelProgress(true)}
          />
        </View>

        {/* Astuces linguistiques */}
        <View style={[styles.sectionSpacing, animationStyles[3]]}>
          <LanguageTipsCarousel tips={languageTips} />
        </View>

        {/* Espace en bas */}
        <View style={styles.bottomPadding} />
      </ScrollView>

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
