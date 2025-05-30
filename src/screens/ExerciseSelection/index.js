import React, { useContext, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Contextes
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProgressContext } from "../../contexts/ProgressContext";

// Composants UI
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

// Composants Layout
import Container from "../../components/layout/Container";
import Header from "../../components/layout/Header";

// Constantes et Helpers
import { EXERCISE_TYPES, LANGUAGE_LEVELS, ROUTES } from "../../utils/constants";

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

// Exercices qui ont accès au niveau bonus
const BONUS_EXERCISE_TYPES = ['reading', 'vocabulary', 'phrases'];

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
        icon: level === 'bonus' ? "⭐" : "📚",
      }
    );
  }, [level, colors.primary]);

  // Couleur du niveau
  const levelColor = levelInfo.color;

  // Préparer les exercices disponibles selon le niveau
  const exercises = useMemo(() => {
    return Object.keys(EXERCISE_TYPES)
      .map((exerciseKey) => {
        const exerciseInfo = EXERCISE_TYPES[exerciseKey];
        
        // Si c'est le niveau bonus, filtrer seulement les exercices autorisés
        if (level === 'bonus' && !BONUS_EXERCISE_TYPES.includes(exerciseKey)) {
          return null;
        }

        // Utiliser la couleur spécifique à l'exercice ou celle du niveau par défaut
        const exerciseColor = exerciseInfo.color || levelColor;
        
        // Récupérer la progression ou initialiser à 0
        const exerciseProgress =
          progress?.exercises?.[`${level}_${exerciseKey}`]?.completed || 0;

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
    if (level === 'bonus') {
      return 'Niveau Bonus';
    }
    return `Niveau ${level}`;
  };

  // Obtenir le badge du niveau
  const getLevelBadge = () => {
    if (level === 'bonus') {
      return 'BONUS';
    }
    return level.toString();
  };

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
        // Progress bar intégrée dans la carte
        progress={exercise.progress}
        progressColor={exercise.color}
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
      {/* Header simplifié avec dégradé */}
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
          
          {/* Badge de niveau centré */}
          <View style={styles.levelBadgeContainer}>
            <View style={[
              styles.levelBadge,
              level === 'bonus' && styles.bonusLevelBadge
            ]}>
              <Text style={[
                styles.levelBadgeText,
                level === 'bonus' && styles.bonusLevelBadgeText
              ]}>
                {getLevelBadge()}
              </Text>
            </View>
            <Text style={styles.levelTitle}>{getLevelDisplayTitle()}</Text>
            {level === 'bonus' && (
              <Text style={styles.bonusSubtitle}>
                Contenu exclusif débloqué !
              </Text>
            )}
          </View>
        </LinearGradient>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          {level === 'bonus' 
            ? "Découvrez du contenu exclusif et avancé"
            : "Sélectionnez une activité pour améliorer vos compétences"
          }
        </Text>
        
        <View style={styles.exercisesContainer}>
          {exercises.map(renderExerciseCard)}
        </View>
      </ScrollView>
    </Container>
  );
};

export default ExerciseSelection;