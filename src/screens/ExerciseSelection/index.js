// src/screens/ExerciseSelection/index.js - VERSION SIMPLE QUI GARDE TON DESIGN
import { useContext, useMemo, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";

// 🚀 HOOK PROGRESSION TEMPS RÉEL - JUSTE POUR LES CHIFFRES
import useRealTimeProgress from "../../hooks/useRealTimeProgress";

// Composants UI
import Button from "../../components/ui/Button";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../components/layout/Container";
import Header from "../../components/layout/Header";

// Constantes
import { EXERCISES, LANGUAGE_LEVELS, BONUS_EXERCISES } from "../../utils/constants";

// Styles
import styles, { getBackgroundGradient } from "./style";

const DEFAULT_THEME = {
  colors: {
    background: "#F9FAFB",
    primary: "#5E60CE",
    text: "#1F2937",
    textSecondary: "#6B7280",
    surface: "#FFFFFF",
  },
};

const ExerciseCardContent = ({ exercise, colors, styles, handleExercisePress }) => (
  <View style={styles.cardContentStyle}>
    {/* Header - TON DESIGN ORIGINAL */}
    <View style={styles.cardHeader}>
      <View style={styles.levelTitleContainer}>
        <Text style={[styles.levelMainTitle, { color: colors.text }]}>
          {exercise.title}
        </Text>
        {/* ✅ TON BADGE ORIGINAL avec VRAI CHIFFRE */}
        <View style={[styles.levelBadge, { backgroundColor: exercise.color }]}>
          <Text style={styles.levelBadgeText}>
            {exercise.progress}% {/* ✅ VRAI CHIFFRE (même Fast aura le sien) */}
          </Text>
        </View>
        {/* Badge FAST - TON DESIGN ORIGINAL */}
        {exercise.id === "vocabulary_fast" && (
          <View style={[styles.levelBadge, styles.fastBadge]}>
            <Text style={[styles.levelBadgeText, styles.fastBadgeText]}>FAST</Text>
          </View>
        )}
      </View>
      <Text style={styles.levelIcon}>{exercise.icon}</Text>
    </View>

    {/* Progression - TON DESIGN ORIGINAL */}
    {exercise.hasProgress && (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${exercise.progress}%`, // ✅ Vrai chiffre
                backgroundColor: exercise.color
              }
            ]} 
          />
        </View>
        <Text style={[styles.progressText, { color: colors.textSecondary }]}>
          {exercise.progress}% {/* ✅ Vrai chiffre */}
        </Text>
      </View>
    )}

    {/* Bouton - TON DESIGN ORIGINAL */}
    <Button
      title={exercise.hasProgress ? "Continuer" : "Commencer"}
      variant="filled"
      color={exercise.color}
      fullWidth
      onPress={handleExercisePress(exercise)}
      style={styles.startButton}
      rightIcon={exercise.hasProgress ? "play-outline" : "rocket-outline"}
    />
  </View>
);

const ExerciseSelection = ({ level }) => {
  if (!level) {
    return null;
  }

  const themeContext = useContext(ThemeContext) || DEFAULT_THEME;
  const { colors } = themeContext;

  // 🚀 JUSTE POUR RÉCUPÉRER LES VRAIS CHIFFRES
  const { getExerciseProgress, hasProgress } = useRealTimeProgress();

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

  // ✅ EXERCICES - TON DESIGN ORIGINAL + VRAIES DONNÉES
  const exercises = useMemo(() => {
    const exercisesList = [];

    Object.values(EXERCISES).forEach((exercise) => {
      // Filtrer niveau bonus
      if (level === "bonus" && !BONUS_EXERCISES.includes(exercise.id)) {
        return;
      }

      // ✅ FAST VOCABULARY - A SON PROPRE POURCENTAGE
      if (exercise.id === 'vocabulary_fast') {
        const fastProgress = getExerciseProgress('vocabulary_fast', level); // ✅ Vraie progression Fast
        
        exercisesList.push({
          ...exercise,
          progress: fastProgress, // ✅ Son vrai %
          hasProgress: fastProgress > 0,
          isFast: true,
        });
        return;
      }

      // ✅ EXERCICES NORMAUX avec VRAIE PROGRESSION
      const exerciseProgress = getExerciseProgress(exercise.id, level);
      const exerciseHasProgress = hasProgress(exercise.id, level);

      exercisesList.push({
        ...exercise,
        progress: exerciseProgress, // ✅ Vrai chiffre
        hasProgress: exerciseHasProgress, // ✅ Vraie détection
        isFast: false,
      });
    });

    return exercisesList;
  }, [level, getExerciseProgress, hasProgress]);

  // Navigation
  const handleExerciseSelect = useCallback((exercise) => {
    const params = { level };
    
    if (exercise.id === 'vocabulary') {
      params.mode = 'classic';
    } else if (exercise.id === 'vocabulary_fast') {
      params.mode = 'fast';
    }
    
    router.push({
      pathname: exercise.route,
      params
    });
  }, [level]);

  const handleExercisePress = useCallback(
    (exercise) => () => handleExerciseSelect(exercise),
    [handleExerciseSelect]
  );

  // ========== RENDU - TON DESIGN ORIGINAL ==========
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

  const renderExerciseCard = useCallback((exercise) => {
    return (
      <TouchableOpacity
        key={exercise.id}
        style={styles.levelCard}
        onPress={handleExercisePress(exercise)}
        activeOpacity={0.8}
      >
        <ExerciseCardContent exercise={exercise} colors={colors} styles={styles} handleExercisePress={handleExercisePress} />
      </TouchableOpacity>
    );
  }, [handleExercisePress, colors.text, styles]);

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