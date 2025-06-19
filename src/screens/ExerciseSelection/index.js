// src/screens/ExerciseSelection/index.js - VERSION RÉPARÉE
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

// Constantes SIMPLIFIÉES
import { EXERCISES, LANGUAGE_LEVELS, BONUS_EXERCISES } from "../../utils/constants";

// Styles
import styles, { getBackgroundGradient } from "./style";

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

const ExerciseSelection = ({ route }) => {
  const { level } = route.params;

  const themeContext = useContext(ThemeContext) || DEFAULT_THEME;
  const progressContext = useContext(ProgressContext) || DEFAULT_PROGRESS;

  const { colors } = themeContext;
  const { progress } = progressContext;

  // Infos du niveau
  const levelInfo = useMemo(() => {
    return LANGUAGE_LEVELS[level] || {
      color: colors.primary,
      title: `Niveau ${level}`,
      icon: level === "bonus" ? "⭐" : "📚",
    };
  }, [level, colors.primary]);

  const levelColor = levelInfo.color;
  const backgroundGradient = getBackgroundGradient(levelColor, colors.background);

  // ========== EXERCICES AVEC NOUVELLES CONSTANTES ==========
  const exercises = useMemo(() => {
    const exercisesList = [];

    Object.values(EXERCISES).forEach((exercise) => {
      // Filtrer niveau bonus
      if (level === "bonus" && !BONUS_EXERCISES.includes(exercise.id)) {
        return;
      }

      // Récupérer progression (TODO: brancher sur vraies données)
      let exerciseProgress = 0;
      if (exercise.id === 'vocabulary') {
        exerciseProgress = progress?.exercises?.vocabulary?.[level]?.classic || 0;
      } else if (exercise.id === 'vocabulary_fast') {
        exerciseProgress = progress?.exercises?.vocabulary?.[level]?.fast || 0;
      } else {
        exerciseProgress = progress?.exercises?.[exercise.id]?.[level]?.completed || 0;
      }

      exercisesList.push({
        ...exercise,
        progress: exerciseProgress,
        hasProgress: exerciseProgress > 0,
      });
    });

    return exercisesList;
  }, [level, progress]);

  // ========== NAVIGATION EXPO ROUTER SIMPLIFIÉE ==========
  const handleExerciseSelect = (exercise) => {
    const params = { level };
    
    // Ajouter le mode pour vocabulary
    if (exercise.id === 'vocabulary') {
      params.mode = 'classic';
    } else if (exercise.id === 'vocabulary_fast') {
      params.mode = 'fast';
    }
    
    router.push({
      pathname: exercise.route,
      params
    });
  };

  // ========== RENDU ==========
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={[levelColor, levelColor + "DD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Header
          title={levelInfo.title}
          showBackButton
          backgroundColor="transparent"
          textColor="white"
          withStatusBar={false}
          withShadow={false}
          titleContainerStyle={styles.headerTitle}
        />

        {level === "bonus" && (
          <View style={{ alignItems: "center", paddingBottom: 12 }}>
            <Text style={styles.bonusText}>
              Contenu exclusif débloqué !
            </Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );

  const renderExerciseCard = (exercise) => {
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
              {/* Badge FAST */}
              {exercise.id === "vocabulary_fast" && (
                <View style={[styles.levelBadge, styles.fastBadge]}>
                  <Text style={[styles.levelBadgeText, styles.fastBadgeText]}>FAST</Text>
                </View>
              )}
            </View>
            <Text style={styles.levelIcon}>{exercise.icon}</Text>
          </View>

          {/* Progression */}
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

          {/* Bouton */}
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
        {renderHeader()}
        
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 60 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.introSection}>
            <Text style={[styles.introText, { color: colors.textSecondary }]}>
              Choisissez votre exercice
            </Text>
          </View>
          
          <View style={styles.levelsContainer}>
            {exercises.map(renderExerciseCard)}
          </View>
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};

export default ExerciseSelection;