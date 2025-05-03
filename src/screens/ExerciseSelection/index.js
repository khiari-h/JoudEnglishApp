import React, { useContext, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Contextes
import { ThemeContext } from "@/src/contexts/ThemeContext";
import { ProgressContext } from "@/src/contexts/ProgressContext";

// Composants UI
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";

// Composants Layout
import Container from "@/src/components/layout/Container";
import Header from "@/src/components/layout/Header";

// Constantes et Helpers
import { EXERCISE_TYPES, LANGUAGE_LEVELS, ROUTES } from "@/src/utils/constants";

// Styles
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

const ExerciseSelection = ({ route }) => {
  const { level } = route.params;
  console.log("Level received in ExerciseSelection:", level);

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
        icon: "📚",
      }
    );
  }, [level, colors.primary]);

  // Couleur du niveau
  const levelColor = levelInfo.color;

  // Préparer les exercices avec leur propre couleur si disponible
  const exercises = useMemo(() => {
    return Object.keys(EXERCISE_TYPES).map((exerciseKey) => {
      const exerciseInfo = EXERCISE_TYPES[exerciseKey];
      // Utiliser la couleur spécifique à l'exercice ou celle du niveau par défaut
      const exerciseColor = exerciseInfo.color || levelColor;

      // Récupérer la progression ou initialiser à 0 (mais pas null pour afficher la barre)
      const exerciseProgress = progress?.exercises?.[`${level}_${exerciseKey}`]?.completed || 0;

      return {
        ...exerciseInfo,
        progress: exerciseProgress,  // Toujours une valeur numérique (0 minimum)
        color: exerciseColor,
      };
    });
  }, [level, progress, levelColor]);

  // Naviguer vers l'exercice sélectionné
  const handleExerciseSelect = (exercise) => {
    // Convertir le nom de la route en format de chemin pour Expo Router
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
    // Exemple: "VocabularyExercise" -> "/(tabs)/vocabularyExercise"
    return `/(tabs)/${routeName.charAt(0).toLowerCase() + routeName.slice(1)}`;
  };

  // Calculer le nombre total d'exercices et le nombre complétés
  const exerciseStats = useMemo(() => {
    const total = exercises.length;
    const completed = exercises.filter((ex) => ex.progress > 80).length;
    const inProgress = exercises.filter(
      (ex) => ex.progress > 0 && ex.progress <= 80
    ).length;

    return { total, completed, inProgress };
  }, [exercises]);

  // Rendu d'une carte d'exercice
  const renderExerciseCard = (exercise) => {
    return (
      <Card
        key={exercise.id}
        style={styles.exerciseCard}
        withShadow={true}
        bordered={false}
        withSideBorder={true}
        sideBorderColor={exercise.color}
        onPress={() => handleExerciseSelect(exercise)}
        contentStyle={styles.cardContentStyle}
        // Option de progression intégrée dans la carte - affichée même à 0%
        progress={exercise.progress}
        progressColor={exercise.color}
        // N'afficher le pourcentage que si la progression est > 0
        showPercentage={exercise.progress > 0}
      >
        <View style={styles.exerciseHeader}>
          <View style={styles.exerciseTitleContainer}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${exercise.color}15` },
              ]}
            >
              <Text style={styles.exerciseIcon}>{exercise.icon}</Text>
            </View>

            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseTitle}>{exercise.title}</Text>
              <Text style={styles.exerciseDescription}>
                {exercise.description}
              </Text>
            </View>
          </View>
        </View>

        <Button
          title="Commencer"
          variant="filled"
          color={exercise.color}
          fullWidth
          onPress={() => handleExerciseSelect(exercise)}
          style={styles.startButton}
          rightIcon="arrow-forward-outline"
        />
      </Card>
    );
  };

  return (
    <Container
      safeArea
      backgroundColor={colors.background}
      withScrollView={false}
      statusBarColor={levelColor}
      statusBarStyle="light-content"
    >
      {/* Header compact avec dégradé */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={[levelColor, levelColor + "DD"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <Header
            title=""
            showBackButton={true}
            backgroundColor="transparent"
            textColor="white"
            withStatusBar={false}
            withShadow={false}
          />

          {/* Badge de niveau */}
          <View style={styles.levelBadgeContainer}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>{level}</Text>
            </View>
            <Text style={styles.levelTitle}>{levelInfo.title}</Text>
          </View>

          {/* Barre de statistiques */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{exerciseStats.total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{exerciseStats.completed}</Text>
              <Text style={styles.statLabel}>Complétés</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{exerciseStats.inProgress}</Text>
              <Text style={styles.statLabel}>En cours</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          Sélectionnez une activité pour améliorer vos compétences
        </Text>

        <View style={styles.exercisesContainer}>
          {exercises.map(renderExerciseCard)}
        </View>
      </ScrollView>
    </Container>
  );
};

export default ExerciseSelection;