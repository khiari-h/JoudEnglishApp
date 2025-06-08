// src/screens/ExerciseSelection/index.js - VERSION SIMPLE SANS SÉLECTEUR
import React, { useContext, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Composants UI
import Button from "../../components/ui/Button";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";
import Header from "../../components/layout/Header";

// Constantes
import { EXERCISE_TYPES, LANGUAGE_LEVELS } from "../../utils/constants";

// Styles
import styles, { getBackgroundGradient } from "./style";

// Valeurs par défaut pour les contextes
const DEFAULT_THEME = {
  colors: {
    background: "#F9FAFB",
    primary: "#5E60CE",
    text: "#1F2937",
    surface: "#FFFFFF",
  },
};

const DEFAULT_PROGRESS = {
  exercises: {},
  isLoading: false,
};

// Exercices qui ont accès au niveau bonus
const BONUS_EXERCISE_TYPES = ["reading", "vocabulary", "phrases"];

const ExerciseSelection = ({ route }) => {
  const { level } = route.params;

  // Récupération sécurisée des contextes
  const themeContext = useContext(ThemeContext) || DEFAULT_THEME;
  const progressContext = useContext(ProgressContext) || DEFAULT_PROGRESS;

  const { colors } = themeContext;
  const { progress } = progressContext;

  // Récupérer les infos du niveau
  const levelInfo = useMemo(() => {
    return (
      LANGUAGE_LEVELS[level] || {
        color: colors.primary,
        title: `Niveau ${level}`,
        icon: level === "bonus" ? "⭐" : "📚",
      }
    );
  }, [level, colors.primary]);

  const levelColor = levelInfo.color;
  const backgroundGradient = getBackgroundGradient(levelColor, colors.background);

  // 🎯 EXERCICES AVEC VOCABULAIRE CLASSIC + FAST SÉPARÉS
  const exercises = useMemo(() => {
    const baseExercises = [];

    // === VOCABULAIRE CLASSIQUE (PRINCIPAL) ===
    const vocabularyInfo = EXERCISE_TYPES.vocabulary;
    if (level !== "bonus" || BONUS_EXERCISE_TYPES.includes("vocabulary")) {
      // TODO: Récupérer la progression du mode CLASSIC
      const vocabularyClassicProgress = 
        progress?.exercises?.vocabulary?.[level]?.completed || 0;

      baseExercises.push({
        ...vocabularyInfo,
        id: "vocabulary_classic",
        title: "Vocabulaire",
        progress: vocabularyClassicProgress,
        color: vocabularyInfo.color || levelColor,
        hasProgress: vocabularyClassicProgress > 0,
        mode: "classic", // ✅ Mode défini
      });
    }

    // === FAST VOCABULARY (BONUS) ===
    if (level !== "bonus" || BONUS_EXERCISE_TYPES.includes("vocabulary")) {
      // TODO: Récupérer la progression du mode FAST
      const fastProgress = 0; // À calculer avec les hooks vocabulary

      baseExercises.push({
        id: "vocabulary_fast",
        title: "Fast Vocabulary",
        description: "Les 1000 mots les plus utilisés",
        icon: "⚡",
        progress: fastProgress,
        color: "#F59E0B", // Couleur orange
        hasProgress: fastProgress > 0,
        mode: "fast", // ✅ Mode défini
      });
    }

    // === AUTRES EXERCICES NORMAUX ===
    Object.keys(EXERCISE_TYPES).forEach((exerciseKey) => {
      // Skip vocabulary car déjà traité ci-dessus
      if (exerciseKey === "vocabulary") return;

      const exerciseInfo = EXERCISE_TYPES[exerciseKey];

      // Filtrage niveau bonus
      if (level === "bonus" && !BONUS_EXERCISE_TYPES.includes(exerciseKey)) {
        return;
      }

      // Progression normale
      const exerciseProgress =
        progress?.exercises?.[exerciseKey]?.[level]?.completed || 0;

      baseExercises.push({
        ...exerciseInfo,
        id: exerciseKey,
        progress: exerciseProgress,
        color: exerciseInfo.color || levelColor,
        hasProgress: exerciseProgress > 0,
      });
    });

    return baseExercises;
  }, [level, progress, levelColor]);

  // 🎯 NAVIGATION EXPO ROUTER - NOMS DE FICHIERS CORRECTS
  const handleExerciseSelect = (exercise) => {
    if (exercise.id === "vocabulary_classic") {
      // Navigation vers vocabulaire classic
      router.push({
        pathname: "/(tabs)/vocabularyExercise",
        params: {
          level,
          mode: "classic",
        },
      });
    } else if (exercise.id === "vocabulary_fast") {
      // Navigation vers vocabulaire fast
      router.push({
        pathname: "/(tabs)/vocabularyExercise",
        params: {
          level,
          mode: "fast", 
        },
      });
    } else {
      // Autres exercices - routes Expo Router CORRECTES
      const routeMap = {
        grammar: "/(tabs)/grammarExercise",
        phrases: "/(tabs)/phrasesExercise", 
        reading: "/(tabs)/readingExercise",
        conversations: "/(tabs)/conversationsExercise",
        spelling: "/(tabs)/spellingExercise",
        errorCorrection: "/(tabs)/errorCorrectionExercise", 
        wordGames: "/(tabs)/wordGamesExercise",
        assessment: "/(tabs)/levelAssessment",
      };
      
      const routePath = routeMap[exercise.id] || "/(tabs)/vocabularyExercise";
      router.push({
        pathname: routePath,
        params: {
          level,
          exerciseType: exercise.id,
        },
      });
    }
  };

  // Obtenir le titre d'affichage du niveau
  const getLevelDisplayTitle = () => {
    if (level === "bonus") {
      return "Bonus";
    }
    return `Niveau ${level}`;
  };

  // Header épuré
  const renderCleanHeader = () => (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={[levelColor, levelColor + "DD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Header
          title={getLevelDisplayTitle()}
          showBackButton
          backgroundColor="transparent"
          textColor="white"
          withStatusBar={false}
          withShadow={false}
          titleContainerStyle={styles.headerTitle}
        />

        {level === "bonus" && (
          <View style={{ alignItems: "center", paddingBottom: 12 }}>
            <Text style={{
              color: "rgba(255, 255, 255, 0.88)",
              fontSize: 12,
              textAlign: "center",
              fontWeight: "400",
            }}>
              Contenu exclusif débloqué !
            </Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );

  // Cards d'exercices
  const renderCleanExerciseCard = (exercise) => {
    return (
      <TouchableOpacity
        key={exercise.id}
        style={styles.levelCard}
        onPress={() => handleExerciseSelect(exercise)}
        activeOpacity={0.8}
      >
        <View style={styles.cardContentStyle}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.levelTitleContainer}>
              <Text style={[styles.levelMainTitle, { color: colors.text }]}>
                {exercise.title}
              </Text>
              <View style={[styles.levelBadge, { backgroundColor: exercise.color }]}>
                <Text style={styles.levelBadgeText}>
                  {exercise.hasProgress ? `${exercise.progress}%` : '0%'}
                </Text>
              </View>
              {/* Badge FAST pour identifier visuellement */}
              {exercise.id === "vocabulary_fast" && (
                <View style={[styles.levelBadge, { backgroundColor: "#FED7AA", marginLeft: 6 }]}>
                  <Text style={[styles.levelBadgeText, { color: "#F59E0B" }]}>FAST</Text>
                </View>
              )}
            </View>
            <Text style={styles.levelIcon}>{exercise.icon}</Text>
          </View>

          {/* Description */}
          <Text style={[styles.levelDescription, { color: colors.textSecondary }]}>
            {exercise.description}
          </Text>

          {/* Progression (si > 0) */}
          {exercise.hasProgress && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { 
                      width: `${exercise.progress}%`,
                      backgroundColor: exercise.color
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                {exercise.progress}%
              </Text>
            </View>
          )}

          {/* Bouton intelligent */}
          <Button
            title={exercise.hasProgress ? "Continuer" : "Commencer"}
            variant="filled"
            color={exercise.color}
            fullWidth
            onPress={() => handleExerciseSelect(exercise)}
            style={styles.startButton}
            rightIcon={exercise.hasProgress ? "play-outline" : "rocket-outline"}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // Intro
  const renderCleanIntro = () => (
    <View style={styles.introSection}>
      <Text style={[styles.introText, { color: colors.textSecondary }]}>
        Choisissez votre exercice
      </Text>
    </View>
  );

  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.NO_BOTTOM}
      withScrollView={false}
      backgroundColor="transparent"
      statusBarColor={levelColor}
      statusBarStyle="light-content"
      withPadding={false}
    >
      <LinearGradient
        colors={backgroundGradient.colors}
        locations={backgroundGradient.locations}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        {renderCleanHeader()}
        
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 60 }]}
          showsVerticalScrollIndicator={false}
        >
          {renderCleanIntro()}
          
          <View style={styles.levelsContainer}>
            {exercises.map(renderCleanExerciseCard)}
          </View>
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};

export default ExerciseSelection;