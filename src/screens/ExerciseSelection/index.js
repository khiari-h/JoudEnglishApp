// src/screens/ExerciseSelection/index.js - VERSION SIMPLE QUI GARDE TON DESIGN
import { useContext, useMemo, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import PropTypes from 'prop-types';

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
// LANGUAGE_LEVELS supprimé car non utilisé

// Styles
import styles, { getBackgroundGradient } from "./style";
import useExerciseListData from "./hooks/useExerciseListData";

const DEFAULT_THEME = {
  colors: {
    background: "#F9FAFB",
    primary: "#5E60CE",
    text: "#1F2937",
    textSecondary: "#6B7280",
    surface: "#FFFFFF",
  },
};

// Sous-composant CardHeader
const CardHeader = ({ exercise, colors, localStyles }) => (
  <View style={localStyles.cardHeader}>
    <View style={localStyles.levelTitleContainer}>
      <Text style={[localStyles.levelMainTitle, { color: colors.text }]}>{exercise.title}</Text>
      <View style={[localStyles.levelBadge, { backgroundColor: exercise.color }]}>
        <Text style={localStyles.levelBadgeText}>{exercise.progress}%</Text>
      </View>
      {exercise.id === "vocabulary_fast" && (
        <View style={[localStyles.levelBadge, localStyles.fastBadge]}>
          <Text style={[localStyles.levelBadgeText, localStyles.fastBadgeText]}>FAST</Text>
        </View>
      )}
    </View>
    <Text style={localStyles.levelIcon}>{exercise.icon}</Text>
  </View>
);

// Sous-composant Progression
const Progression = ({ exercise, colors, localStyles }) => (
  exercise.hasProgress && (
    <View style={localStyles.progressContainer}>
      <View style={localStyles.progressBar}>
        <View 
          style={[
            localStyles.progressFill,
            { width: `${exercise.progress}%`, backgroundColor: exercise.color }
          ]} 
        />
      </View>
      <Text style={[localStyles.progressText, { color: colors.textSecondary }]}>{exercise.progress}%</Text>
    </View>
  )
);

// Sous-composant CardButton
const CardButton = ({ exercise, handleExercisePress, localStyles }) => (
  <Button
    title={exercise.hasProgress ? "Continuer" : "Commencer"}
    variant="filled"
    color={exercise.color}
    fullWidth
    onPress={handleExercisePress(exercise)}
    style={localStyles.startButton}
    rightIcon={exercise.hasProgress ? "play-outline" : "rocket-outline"}
    testID={`${exercise.id}-button`}
  />
);

// Refactor ExerciseCardContent pour utiliser les sous-composants
const ExerciseCardContent = ({ exercise, colors, localStyles, handleExercisePress }) => (
  <View style={localStyles.cardContentStyle}>
    <CardHeader exercise={exercise} colors={colors} localStyles={localStyles} />
    <Progression exercise={exercise} colors={colors} localStyles={localStyles} />
    <CardButton exercise={exercise} handleExercisePress={handleExercisePress} localStyles={localStyles} />
  </View>
);

// Sous-composant pour la section liste d'exercices
const ExerciseListSection = ({ colors, localStyles, exercises, renderExerciseCard }) => (
  <ScrollView
    testID="exercises-scroll"
    style={{ flex: 1 }}
    contentContainerStyle={[localStyles.scrollContent, { paddingBottom: 60 }]}
    showsVerticalScrollIndicator={false}
  >
    <View style={localStyles.introSection}>
      <Text style={[localStyles.introText, { color: colors.textSecondary }]}>Choisissez votre exercice</Text>
    </View>
    <View style={localStyles.levelsContainer}>
      {exercises.map(renderExerciseCard)}
    </View>
  </ScrollView>
);

const ExerciseSelection = ({ level }) => {
  // ✅ CORRECT : Tous les hooks AVANT tout return conditionnel
  const themeContext = useContext(ThemeContext) || DEFAULT_THEME;
  const { colors } = themeContext;

  // 🚀 JUSTE POUR RÉCUPÉRER LES VRAIS CHIFFRES
  const { getExerciseProgress, hasProgress, refresh } = useRealTimeProgress();
  const { levelInfo: computedLevelInfo, exercises } = useExerciseListData({ level, getExerciseProgress, hasProgress });

  // Infos du niveau
  const levelInfo = useMemo(() => {
    return (
      computedLevelInfo || {
        color: colors.primary,
        title: `Niveau ${level}`,
        icon: level === "bonus" ? "⭐" : "📚",
      }
    );
  }, [computedLevelInfo, level, colors.primary]);

  const levelColor = levelInfo.color;
  const backgroundGradient = getBackgroundGradient(levelColor, colors.background);

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

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  // ✅ MAINTENANT on peut faire le return conditionnel
  if (!level) {
    return null;
  }

  // ========== RENDU - TON DESIGN ORIGINAL ==========
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={[levelColor, `${levelColor}DD`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Header
          title={levelInfo.title}
          showBackButton
          onBackPress={() => router.push('/tabs/levelSelection')}
          backgroundColor="transparent"
          textColor="white"
          withStatusBar={false}
          withShadow={false}
          titleContainerStyle={styles.headerTitle}
          testID="exercises-header"
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
        testID={`${exercise.id}-exercise`}
        style={styles.levelCard}
        onPress={handleExercisePress(exercise)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`${exercise.title}`}
        accessibilityValue={{ min: 0, max: 100, now: exercise.progress ?? 0 }}
      >
        <ExerciseCardContent exercise={exercise} colors={colors} localStyles={styles} handleExercisePress={handleExercisePress} />
      </TouchableOpacity>
    );
  }, [handleExercisePress, colors.text, styles]);

  return (
    <Container
      testID="exercise-selection-container"
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
        <ExerciseListSection colors={colors} localStyles={styles} exercises={exercises} renderExerciseCard={renderExerciseCard} />
      </LinearGradient>
    </Container>
  );
};

// PropTypes pour tous les sous-composants
CardHeader.propTypes = {
  exercise: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
};

Progression.propTypes = {
  exercise: PropTypes.shape({
    hasProgress: PropTypes.bool,
    progress: PropTypes.number,
  }).isRequired,
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
};

CardButton.propTypes = {
  exercise: PropTypes.shape({
    hasProgress: PropTypes.bool,
    color: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleExercisePress: PropTypes.func.isRequired,
  localStyles: PropTypes.object.isRequired,
};

ExerciseCardContent.propTypes = {
  exercise: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
  handleExercisePress: PropTypes.func.isRequired,
};

ExerciseListSection.propTypes = {
  colors: PropTypes.object.isRequired,
  localStyles: PropTypes.object.isRequired,
  exercises: PropTypes.array.isRequired,
  renderExerciseCard: PropTypes.func.isRequired,
};

// PropTypes pour le composant principal
ExerciseSelection.propTypes = {
  level: PropTypes.string,
};

export default ExerciseSelection;