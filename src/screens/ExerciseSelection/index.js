// src/screens/ExerciseSelection/index.js - COMPACT STYLE LEVELSELECTION
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

// Constantes (tes constantes modifiées)
import { EXERCISE_TYPES, LANGUAGE_LEVELS } from "../../utils/constants";

// Styles réutilisés de LevelSelection
import styles from "./style";

// Valeurs par défaut pour les contextes
const DEFAULT_THEME = {
  colors: {
    background: "#F9FAFB",
    primary: "#5E60CE",
    text: "#1F2937",
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

  // =================== BACKGROUND DYNAMIQUE ===================
  
  const getExerciseBackground = (levelColor) => {
    const gradientStart = levelColor + "06"; // 2.5% opacity
    const gradientMiddle = "#FFFFFF";        // Blanc pur
    const gradientEnd = levelColor + "08";   // 3% opacity
    
    return {
      gradientColors: [gradientStart, gradientMiddle, gradientEnd],
      gradientLocations: [0, 0.4, 1]
    };
  };

  const backgroundSystem = getExerciseBackground(levelColor);

  // Préparer les exercices disponibles selon le niveau
  const exercises = useMemo(() => {
    return Object.keys(EXERCISE_TYPES)
      .map((exerciseKey) => {
        const exerciseInfo = EXERCISE_TYPES[exerciseKey];

        // Si c'est le niveau bonus, filtrer seulement les exercices autorisés
        if (level === "bonus" && !BONUS_EXERCISE_TYPES.includes(exerciseKey)) {
          return null;
        }

        // Utiliser la couleur spécifique à l'exercice ou celle du niveau par défaut
        const exerciseColor = exerciseInfo.color || levelColor;

        // Récupérer la progression selon la structure: exercises[exerciseType][level]
        const exerciseProgress =
          progress?.exercises?.[exerciseKey]?.[level]?.completed || 0;

        return {
          ...exerciseInfo,
          id: exerciseKey,
          progress: exerciseProgress,
          color: exerciseColor,
        };
      })
      .filter(Boolean); // Enlever les null (exercices non disponibles pour le niveau bonus)
  }, [level, progress, levelColor]);

  // Naviguer vers l'exercice sélectionné
  const handleExerciseSelect = (exercise) => {
    const routePath = convertRouteToPath(exercise.route);
    router.push({
      pathname: routePath,
      params: {
        level,
        exerciseType: exercise.id,
      },
    });
  };

  // Fonction pour convertir les noms de routes en chemins Expo Router
  const convertRouteToPath = (routeName) => {
    return `/(tabs)/${routeName.charAt(0).toLowerCase() + routeName.slice(1)}`;
  };

  // Obtenir le titre d'affichage du niveau
  const getLevelDisplayTitle = () => {
    if (level === "bonus") {
      return "Bonus";
    }
    return `Niveau ${level}`;
  };

  // =================== HEADER COMPACT ===================
  
  const renderCompactHeader = () => (
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

        {/* Indicateur exercices (style LevelSelection) */}
        <View style={styles.compactPathContainer}>
          <View style={styles.levelPath}>
            <Text style={{
              color: 'white',
              fontSize: 13,
              fontWeight: '600'
            }}>
              {exercises.length} exercices
            </Text>
            <Text style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: 11,
              marginLeft: 8
            }}>
              • {exercises.filter(ex => ex.progress > 0).length} en cours
            </Text>
          </View>
        </View>

        {level === "bonus" && (
          <View style={{ alignItems: "center", paddingBottom: 8 }}>
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

  // =================== CARDS COMPACT STYLE LEVELSELECTION ===================
  
  const renderCompactExerciseCard = (exercise) => {
    const hasProgress = exercise.progress > 0;
    
    return (
      <TouchableOpacity
        key={exercise.id}
        style={[
          styles.levelCard, // Même style que les niveaux !
          hasProgress && {
            borderWidth: 1,
            borderColor: exercise.color + "30",
            backgroundColor: exercise.color + "05"
          }
        ]}
        onPress={() => handleExerciseSelect(exercise)}
        activeOpacity={0.8}
      >
        <View style={styles.cardContentStyle}>
          {/* Header avec titre + badge (layout LevelSelection) */}
          <View style={styles.cardHeader}>
            <View style={styles.levelTitleContainer}>
              <Text style={styles.levelMainTitle}>{exercise.title}</Text>
              <View style={[styles.levelBadge, { backgroundColor: exercise.color }]}>
                <Text style={styles.levelBadgeText}>
                  {exercise.progress > 0 ? `${exercise.progress}%` : '0%'}
                </Text>
              </View>
              {hasProgress && (
                <View style={{
                  backgroundColor: '#10B981',
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 4,
                  marginLeft: 8
                }}>
                  <Text style={{ color: 'white', fontSize: 9, fontWeight: '600' }}>
                    EN COURS
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.levelIcon}>{exercise.icon}</Text>
          </View>

          {/* Description compacte */}
          <Text style={styles.levelDescription}>
            {exercise.description}
          </Text>

          {/* Progression (si > 0) */}
          {exercise.progress > 0 && (
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
              <Text style={styles.progressText}>{exercise.progress}%</Text>
            </View>
          )}

          {/* Bouton d'action */}
          <Button
            title={hasProgress ? "Continuer" : "Commencer"}
            variant="filled"
            color={exercise.color}
            fullWidth
            onPress={() => handleExerciseSelect(exercise)}
            style={styles.startButton}
            rightIcon={hasProgress ? "play-outline" : "arrow-forward-outline"}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // =================== INTRO COMPACTE ===================
  
  const renderCompactIntro = () => {
    const completedCount = exercises.filter(ex => ex.progress > 0).length;
    
    return (
      <View style={styles.introSection}>
        <Text style={styles.introText}>
          Choisissez votre exercice • {completedCount}/{exercises.length} en cours
        </Text>
      </View>
    );
  };

  // =================== RENDU PRINCIPAL ===================
  
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
      {/* Background Dynamique selon le niveau */}
      <LinearGradient
        colors={backgroundSystem.gradientColors}
        locations={backgroundSystem.gradientLocations}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        {renderCompactHeader()}
        
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 60 }]}
          showsVerticalScrollIndicator={false}
        >
          {renderCompactIntro()}
          
          {/* Liste des exercices (même layout que niveaux) */}
          <View style={styles.levelsContainer}>
            {exercises.map(renderCompactExerciseCard)}
          </View>
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};

export default ExerciseSelection;