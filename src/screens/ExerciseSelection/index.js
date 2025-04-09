import React, { useContext, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
// Remplacer useNavigation par router d'Expo Router
import { router } from "expo-router";

// Contextes
import { ThemeContext } from "@/src/contexts/ThemeContext";
import { ProgressContext } from "@/src/contexts/ProgressContext";

// Composants UI
import Card from "@/src/components/ui/Card";
import Button from "@/src/components/ui/Button";
import ProgressBar from "@/src/components/ui/ProgressBar";
import Badge from "@/src/components/ui/Badge";

// Composants Layout
import Container from "@/src/components/layout/Container";
import Header from "@/src/components/layout/Header";

// Constantes et Helpers
import { EXERCISE_TYPES, LANGUAGE_LEVELS, ROUTES } from "@/src/utils/constants";
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

  // Récupérer la couleur du niveau
  const levelColor = useMemo(() => {
    const levelInfo = LANGUAGE_LEVELS[level];
    return levelInfo?.color || colors.primary;
  }, [level]);

  // Préparer les exercices
  const exercises = useMemo(() => {
    return Object.keys(EXERCISE_TYPES).map((exerciseKey) => {
      const exerciseInfo = EXERCISE_TYPES[exerciseKey];

      return {
        ...exerciseInfo,
        progress:
          progress?.exercises?.[`${level}_${exerciseKey}`]?.completed || 0,
        color: levelColor,
      };
    });
  }, [level, progress, levelColor]);

  // Naviguer vers l'exercice sélectionné avec Expo Router
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

  return (
    <Container
      safeArea
      statusBarColor={colors.background}
      statusBarStyle="dark-content"
      backgroundColor={colors.background}
    >
      <Header title={`Niveau ${level} - Exercices`} showBackButton />

      <ScrollView
        style={[styles.container, { backgroundColor: `${levelColor}05` }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>
            Sélectionnez une activité pour améliorer vos compétences
            linguistiques
          </Text>
        </View>

        <View style={styles.exercisesContainer}>
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              style={[
                styles.exerciseCard,
                { borderLeftColor: exercise.color, borderLeftWidth: 5 },
              ]}
              onPress={() => handleExerciseSelect(exercise)}
            >
              <View style={styles.exerciseContent}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: `${exercise.color}15` },
                  ]}
                >
                  <Text style={styles.exerciseIcon}>{exercise.icon}</Text>
                </View>

                <View style={styles.exerciseInfo}>
                  <View style={styles.exerciseHeader}>
                    <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                  </View>

                  <Text style={styles.exerciseDescription}>
                    {exercise.description}
                  </Text>

                  {exercise.progress > 0 ? (
                    <View style={styles.progressContainer}>
                      <ProgressBar
                        progress={exercise.progress}
                        fillColor={exercise.color}
                        height={6}
                        showPercentage
                      />
                    </View>
                  ) : (
                    <View style={styles.newBadgeWrapper}>
                      <Badge
                        label="Nouveau"
                        color={exercise.color}
                        variant="subtle"
                        size="small"
                      />
                    </View>
                  )}
                </View>
              </View>

              <Button
                title="Commencer"
                variant="filled"
                color={exercise.color}
                fullWidth
                onPress={() => handleExerciseSelect(exercise)}
                style={styles.startButton}
              />
            </Card>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
};

export default ExerciseSelection;
