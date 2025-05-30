import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, StatusBar, RefreshControl } from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Composants Dashboard révisés
import CompactHeader from "./components/CompactHeader";
import ContinueLearningSection from "./components/ContinueLearningSection";
import DailyGoalSection from "./components/DailyGoalSection";
import RecommendationsSection from "./components/RecommendationsSection";
import LearningPathCompact from "./components/LearningPathCompact";
import BottomNavigation from "./components/BottomNavigation";
import LevelProgressModal from "./components/LevelProgressModal";

// Hooks personnalisés
import useLastActivity from "../../hooks/useLastActivity";

// Constantes et utilitaires
import { LANGUAGE_LEVELS, EXERCISE_TYPES } from "../../utils/constants";
import styles from "./style";

// Clé pour stocker le niveau actif choisi par l'utilisateur
const ACTIVE_LEVEL_KEY = "user_active_level";

const Dashboard = ({ route }) => {
  // Récupération sécurisée des contextes
  const themeContext = useContext(ThemeContext);
  const progressContext = useContext(ProgressContext);

  // Valeurs par défaut sécurisées pour le thème
  const colors = themeContext?.colors || {
    background: "#F9FAFB",
    primary: "#3B82F6", // Nouvelle couleur principale (bleu)
  };

  // Récupération des données et fonctions de progression avec valeurs par défaut
  const { 
    progress = {}, 
    calculateGlobalProgress = () => 0,
    calculateLevelProgress = () => 0,
    updateStreak = () => {}
  } = progressContext || {};

  // Calculer la progression globale maintenant que la fonction est disponible
  const globalProgress = calculateGlobalProgress();

  // Utilisation du hook useLastActivity
  const {
    getLastActivity,
    isLoading: isActivityLoading,
    loadLastActivities,
    formatProgressSubtitle,
  } = useLastActivity();

  const lastActivity = getLastActivity();

  // États
  const [showLevelProgress, setShowLevelProgress] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [currentLevel, setCurrentLevel] = useState("1"); // Niveau par défaut mis à jour

  // Paramètres du profil
  const { name = "Utilisateur", streak = 0 } = route?.params || {};

  // Récupérer le niveau actif de l'utilisateur au chargement
  useEffect(() => {
    const loadActiveLevel = async () => {
      try {
        // Essayer de charger le niveau actif depuis le stockage
        const savedLevel = await AsyncStorage.getItem(ACTIVE_LEVEL_KEY);

        if (savedLevel) {
          // Mapper les anciens niveaux vers les nouveaux si nécessaire
          const mappedLevel = mapOldToNewLevel(savedLevel);
          setCurrentLevel(mappedLevel);
        } else {
          // Si pas de niveau sauvegardé, utiliser celui du contexte de progression
          const contextLevel = progress?.currentLevel;
          if (contextLevel && LANGUAGE_LEVELS[contextLevel]) {
            const mappedLevel = mapOldToNewLevel(contextLevel);
            setCurrentLevel(mappedLevel);
          }
          // Sinon, on garde le niveau par défaut (1)
        }
      } catch (error) {
        console.error("Erreur lors du chargement du niveau actif:", error);
      }
    };

    loadActiveLevel();
  }, [progress?.currentLevel]);

  // Fonction pour mapper les anciens niveaux vers les nouveaux
  const mapOldToNewLevel = (level) => {
    const mapping = {
      'A1': '1',
      'A2': '2',
      'B1': '3', 
      'B2': '4',
      'C1': '5',
      'C2': '6',
      'bonus': 'bonus'
    };
    return mapping[level] || level;
  };

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
      console.log("Dashboard en focus, rechargement des activités");
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

  // Fonction pour changer le niveau actif
  const handleChangeActiveLevel = async (newLevel) => {
    if (LANGUAGE_LEVELS[newLevel]) {
      setCurrentLevel(newLevel);
      try {
        await AsyncStorage.setItem(ACTIVE_LEVEL_KEY, newLevel);
      } catch (error) {
        console.error("Erreur lors de la sauvegarde du niveau actif:", error);
      }
    }
  };

  // Calculer la couleur du niveau actuel
  const levelColor = LANGUAGE_LEVELS[currentLevel]?.color || colors.primary;
  const levelProgress = calculateLevelProgress(currentLevel);

  // Données de l'objectif quotidien
  const dailyGoal = React.useMemo(() => {
    // Ici, vous pourriez implémenter une logique qui récupère
    // dynamiquement les objectifs quotidiens depuis AsyncStorage
    // ou un autre système de persistance

    return {
      completed: 2,
      total: 5,
    };
  }, []);

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
          level: currentLevel, // Utilise le niveau actif
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
      params,
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
      case "phrases":
        pathname = "/(tabs)/phrasesExercise";
        break;
      case "reading":
        pathname = "/(tabs)/readingExercise";
        break;
      case "errorCorrection":
        pathname = "/(tabs)/errorCorrectionExercise";
        break;
      case "spelling":
        pathname = "/(tabs)/spellingExercise";
        break;
      case "wordGames":
        pathname = "/(tabs)/wordGamesExercise";
        break;
      case "assessment":
        pathname = "/(tabs)/levelAssessment";
        break;
      // Autres types d'exercices...
      default:
        pathname = "/(tabs)/levelSelection";
    }

    router.push({
      pathname,
      params: { level: exercise.level },
    });
  };

  // Niveaux pour le parcours d'apprentissage (nouveau système 1-6+B)
  const allLevels = Object.keys(LANGUAGE_LEVELS).map((levelKey) => ({
    id: levelKey,
    color: LANGUAGE_LEVELS[levelKey].color,
    isActive: levelKey === currentLevel, // Indique le niveau actif
  }));

  // Gérer la sélection d'un niveau
  const handleLevelSelect = (level) => {
    // Mettre à jour le niveau actif
    handleChangeActiveLevel(level);

    // Naviguer vers les exercices de ce niveau
    router.push({
      pathname: "/(tabs)/exerciseSelection",
      params: { level },
    });
  };

  // Gérer la navigation vers le profil
  const handleProfilePress = () => {
    router.push("/(tabs)/profile");
  };

  // Récupérer tous les niveaux avec leur progression pour la modale
  const getAllLearningLevels = () =>
    Object.keys(LANGUAGE_LEVELS).map((levelKey) => {
      const levelInfo = LANGUAGE_LEVELS[levelKey];
      return {
        id: levelKey,
        title: levelInfo.title,
        color: levelInfo.color,
        progress: calculateLevelProgress(levelKey),
        isActive: levelKey === currentLevel, // Indique le niveau actif
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
  lastActivity={lastActivity}
  exerciseTimeStats={exerciseTimeStats} // ← À ajouter
  currentLevel={currentLevel}
  onSelectExercise={handleRecommendedExercisePress}
  accentColor={levelColor}
/>

        {/* Parcours d'apprentissage compact avec progression globale */}
        <LearningPathCompact
          globalProgress={globalProgress}
          levels={allLevels}
          currentLevel={currentLevel}
          onSelectLevel={handleLevelSelect}
          onViewProgress={() => setShowLevelProgress(true)}
          primaryColor={levelColor}
        />

        {/* Espace en bas pour éviter que le contenu soit caché par la navigation */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Navigation en bas avec le niveau actuel */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        accentColor={levelColor}
        currentLevel={currentLevel} // Passer le niveau actuel pour la redirection du chatbot
      />

      {/* Modal de progression des niveaux */}
      <LevelProgressModal
        visible={showLevelProgress}
        levels={getAllLearningLevels()}
        onClose={() => setShowLevelProgress(false)}
        onSelectLevel={(level) => {
          // Mettre à jour le niveau actif et fermer la modal
          handleChangeActiveLevel(level);
          setShowLevelProgress(false);

          // Optionnel : naviguer vers les exercices de ce niveau
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