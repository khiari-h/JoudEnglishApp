// SpellingExercise/index.js - VERSION PROPRE

import { useMemo, useEffect, useCallback, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropTypes from 'prop-types';

import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";
import SpellingHeader from "./SpellingHeader";
import SpellingProgress from "./SpellingProgress";
import SpellingCard from "./SpellingCard";
import SpellingActions from "./SpellingActions";

import useSpelling from "./hooks/useSpelling";
import useLastActivity from "../../../hooks/useLastActivity";
import { getSpellingData, getLevelColor } from "../../../utils/spelling/spellingDataHelper";
import createStyles from "./style";

const SpellingExercise = ({ route }) => {
  const { level = "1", exerciseType = "correction" } = route.params || {};
  const navigation = useNavigation();
  const styles = createStyles();
  const { saveActivity } = useLastActivity();

  const levelColor = getLevelColor(level);

  const spellingData = useMemo(() => {
    try {
      return getSpellingData(level, exerciseType);
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      console.warn(`Error getting spelling data for level ${level}, type ${exerciseType}:`, error);
      return null;
    }
  }, [level, exerciseType]);

  const {
    currentExerciseIndex,
    userInput,
    showHint,
    showFeedback,
    isCorrect,
    loaded,
    currentExercise,
    totalExercises,
    exercises,
    completedExercises,
    setUserInput,
    toggleHint,
    checkAnswer,
    handleNext,
    retryExercise,
    isLastExercise,
    hasValidData,
  } = useSpelling(spellingData, level, exerciseType);

  // ✅ AJOUTÉ : État pour l'expansion de la progress bar
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // ✅ AJOUTÉ : Debug pour voir ce que le composant reçoit du hook
  console.log('🔍 DEBUG SpellingExercise Component:', {
    loaded,
    hasValidData,
    currentExercise: !!currentExercise,
    currentExerciseIndex,
    totalExercises,
    spellingData: !!spellingData,
    level,
    exerciseType
  });

  useEffect(() => {
    if (loaded && hasValidData && currentExercise) {
      const saveActivityAsync = async () => {
        try {
          await saveActivity({
            title: "Orthographe",
            level,
            type: "spelling",
            metadata: {
              word: currentExerciseIndex,           // ✅ Index actuel (pour progression)
              totalWords: totalExercises,           // ✅ Total (pour progression)
              exerciseType,
              content: currentExercise.wordToCorrect || `Exercice ${currentExerciseIndex + 1}` // ✅ Contenu de l'exercice
            }
          });
        } catch (error) {
          console.error("Error saving activity:", error);
        }
      };

      saveActivityAsync();
    }
  }, [loaded, hasValidData, currentExercise, level, exerciseType, currentExerciseIndex, totalExercises, saveActivity]);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  // ✅ AJOUTÉ : Handler pour toggle l'expansion de la progress bar
  const handleToggleProgressDetails = useCallback(() => {
    setShowDetailedProgress(prev => !prev);
  }, []);

  // ✅ AJOUTÉ : Handler pour la navigation par catégorie
  const handleCategoryPress = useCallback((index) => {
    // Pour l'instant, on peut juste afficher un message
    // Plus tard, on pourra naviguer vers des exercices spécifiques par type
    console.log('Category pressed:', index);
  }, []);

  if (!loaded) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <SpellingHeader
          level={level}
          onBackPress={handleBack}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} testID="activity-indicator" />
          {/* ✅ MODERNISÉ : Supprimé le texte de chargement pour être cohérent avec les autres modules */}
        </View>
      </Container>
    );
  }

  if (!hasValidData) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <SpellingHeader
          level={level}
          onBackPress={handleBack}
        />
        {/* ✅ MODERNISÉ : Utilise un message simple au lieu de styles d'erreur personnalisés */}
        <View style={styles.loadingContainer}>
          <Text style={{ fontSize: 16, color: '#64748b', textAlign: 'center' }}>
            Aucune donnée trouvée pour ce niveau.
          </Text>
        </View>
      </Container>
    );
  }

  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
      withScrollView
      backgroundColor="#f8fafc"
      statusBarStyle="dark-content"
      withPadding={false}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        contentContainerStyle: styles.scrollContent,
      }}
    >
      <SpellingHeader
        level={level}
        onBackPress={handleBack}
      />
      <SpellingProgress
        exercises={exercises}
        completedExercises={completedExercises}
        levelColor={levelColor}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onCategoryPress={handleCategoryPress}
      />
      <SpellingCard
        exercise={currentExercise}
        userInput={userInput}
        showHint={showHint}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        onChangeText={setUserInput}
        onToggleHint={toggleHint}
        onCheckAnswer={checkAnswer}
        onNext={handleNext}
        onRetry={retryExercise}
        isLastExercise={isLastExercise}
        levelColor={levelColor}
      />
      <SpellingActions
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        userInput={userInput}
        isLastExercise={isLastExercise}
        exerciseType={exerciseType}
        levelColor={levelColor}
        onCheck={checkAnswer}
        onNext={handleNext}
        onRetry={retryExercise}
      />
    </Container>
  );
};

export default SpellingExercise;

// ✅ Ajout de la validation des props
SpellingExercise.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      level: PropTypes.string,
      exerciseType: PropTypes.string,
    }),
  }).isRequired,
};