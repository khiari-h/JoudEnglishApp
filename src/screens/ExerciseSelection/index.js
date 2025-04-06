import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Contextes
import { ThemeContext } from '@/src/contexts/ThemeContext';
import { ProgressContext } from '@/src/contexts/ProgressContext';

// Composants UI
import Card from '@/src/components/ui/Card';
import Button from '@/src/components/ui/Button';
import ProgressBar from '@/src/components/ui/ProgressBar';
import Badge from '@/src/components/ui/Badge';

// Composants Layout
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';

// Constantes et Helpers
import { EXERCISE_TYPES, EXERCISE_TYPES_LIST } from '@/src/utils/constants';
import styles from './style';

// Valeurs par défaut pour les contextes
const DEFAULT_THEME = {
  colors: {
    background: '#F9FAFB',
    primary: '#5E60CE',
    text: '#1F2937',
  }
};

const DEFAULT_PROGRESS = {
  exercises: {},
  isLoading: false,
};

const ExerciseSelection = ({ route }) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const level = params.level; // Récupère le niveau depuis les paramètres de route
  
  // Récupération sécurisée des contextes
  const themeContext = useContext(ThemeContext) || DEFAULT_THEME;
  const progressContext = useContext(ProgressContext) || DEFAULT_PROGRESS;

  const { colors } = themeContext;
  const { progress, isLoading } = progressContext;

  // Définir la couleur en fonction du niveau
  const getLevelColor = () => {
    const colors = {
      A1: "#3b82f6",
      A2: "#8b5cf6",
      B1: "#10b981",
      B2: "#f59e0b",
      C1: "#ef4444",
      C2: "#6366f1",
    };
    return colors[level] || colors.primary;
  };

  const levelColor = getLevelColor();

  // Construire le tableau des exercices avec la progression
  const exercises = Object.keys(EXERCISE_TYPES).map(exerciseKey => {
    const exerciseInfo = EXERCISE_TYPES[exerciseKey];
    return {
      id: exerciseKey,
      name: exerciseInfo.title,
      title: exerciseInfo.title,
      description: exerciseInfo.description,
      progress: progress?.exercises?.[`${level}_${exerciseKey}`]?.completed || 0,
      color: levelColor,
      icon: exerciseInfo.icon,
      route: exerciseInfo.route,
    };
  });

  // Naviguer vers l'exercice sélectionné
  const handleExerciseSelect = (exercise) => {
    router.push({
      pathname: `/${exercise.route.toLowerCase()}`,
      params: { level, exerciseId: exercise.id }
    });
  };

  return (
    <Container
      safeArea
      statusBarColor={colors.background}
      statusBarStyle="dark-content"
      backgroundColor={colors.background}
    >
      <Header 
        title={`${level} - Exercises`}
        showBackButton 
      />
      
      <ScrollView 
        style={[styles.container, { backgroundColor: `${levelColor}05` }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>
            Select an activity to improve your language skills
          </Text>
        </View>

        <View style={styles.exercisesContainer}>
          {exercises.map((exercise, index) => (
            <Card
              key={exercise.id}
              style={[
                styles.exerciseCard,
                { borderLeftColor: exercise.color, borderLeftWidth: 5 }
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

                  <Text style={styles.exerciseDescription}>{exercise.description}</Text>

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
                        label="New"
                        color={exercise.color}
                        variant="subtle"
                        size="small"
                      />
                    </View>
                  )}
                </View>
              </View>

              <Button
                title="Start"
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