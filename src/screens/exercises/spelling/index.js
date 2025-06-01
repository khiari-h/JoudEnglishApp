// src/screens/exercises/spelling/index.js
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants spécifiques à l'exercice d'orthographe
import SpellingHeader from "./SpellingHeader";
import SpellingProgressBar from "./SpellingProgressBar";
import SpellingCard from "./SpellingCard";
import SpellingActions from "./SpellingActions";

// Hooks personnalisés
import useSpellingExerciseState from "./hooks/useSpellingExerciseState";
import useSpellingProgress from "./hooks/useSpellingProgress";

// Utilitaires et helpers
import { getLevelColor } from "../../../utils/spelling/spellingDataHelper";

// Styles
import styles from "./style";

/**
 * Composant principal pour l'exercice d'orthographe (Spelling)
 * Version nettoyée avec une seule logique de progression
 */
const SpellingExercise = ({ route }) => {
  // ========== NAVIGATION ET PARAMÈTRES ==========
  const navigation = useNavigation();
  const { level = "A1", exerciseType = "correction" } = route.params || {};
  const levelColor = getLevelColor(level);

  // ========== HOOKS D'ÉTAT ==========

  // État des exercices (sans progression - supprimée)
  const {
    exercises,
    currentExerciseIndex,
    currentExercise,
    totalExercises,
    userInput,
    showHint,
    showFeedback,
    isCorrect,
    setUserInput,
    toggleHint,
    checkAnswer,
    nextExercise,
    retryExercise,
    setCurrentExerciseIndex
  } = useSpellingExerciseState(level, exerciseType);

  // Gestion de la progression (seule source de vérité)
  const {
    completedExercises,
    lastPosition,
    loaded,
    saveLastPosition,
    markExerciseAsCompleted,
    initializeProgress,
    isExerciseCompleted
  } = useSpellingProgress(level, exerciseType);

  // ========== INITIALISATION ==========

  // Initialiser les exercices et restaurer la position
  useEffect(() => {
    if (exercises.length > 0 && loaded) {
      initializeProgress(exercises);

      // Restaurer la dernière position si valide
      if (lastPosition > 0 && lastPosition < exercises.length) {
        setCurrentExerciseIndex(lastPosition);
      }
    }
  }, [exercises, loaded, lastPosition, initializeProgress, setCurrentExerciseIndex, completedExercises.length]);

  // ========== GESTIONNAIRES D'ÉVÉNEMENTS ==========

  // Vérification de la réponse
  const handleCheckAnswer = () => {
    const result = checkAnswer();

    if (result && currentExercise) {
      // Marquer comme complété avec toutes les données
      markExerciseAsCompleted(
        currentExerciseIndex,
        result,
        userInput,
        currentExercise.correctAnswer,
        {
          exerciseType: currentExercise.type,
          hint: currentExercise.hint,
          timestamp: Date.now()
        }
      );
    }
  };

  // Passage à l'exercice suivant
  const handleNextExercise = () => {
    const nextIndex = currentExerciseIndex + 1;

    // Sauvegarder la position pour persistance
    if (nextIndex < totalExercises) {
      saveLastPosition(nextIndex);
    }

    nextExercise();
  };

  // Retour en arrière
  const handleBackPress = () => {
    navigation.goBack();
  };

  // ========== RENDU ==========
  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête avec niveau et couleur */}
      <SpellingHeader 
        level={level} 
        exerciseType={exerciseType}
        levelColor={levelColor} 
        onBackPress={handleBackPress} 
      />

      {/* Barre de progression basée sur les exercices complétés */}
      <SpellingProgressBar 
        currentIndex={currentExerciseIndex + 1}
        totalCount={totalExercises}
        completedCount={completedExercises.length}
        levelColor={levelColor}
      />

      {/* Carte d'exercice principale */}
      <SpellingCard 
        exercise={currentExercise}
        userInput={userInput}
        showHint={showHint}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        isCompleted={isExerciseCompleted(currentExerciseIndex)}
        onChangeText={setUserInput}
        onToggleHint={toggleHint}
        levelColor={levelColor}
      />

      {/* Boutons d'action */}
      <SpellingActions 
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        userInput={userInput}
        isLastExercise={currentExerciseIndex === totalExercises - 1}
        isCompleted={isExerciseCompleted(currentExerciseIndex)}
        exerciseType={exerciseType} 
        levelColor={levelColor}
        onCheck={handleCheckAnswer}
        onNext={handleNextExercise}
        onRetry={retryExercise}
      />
    </SafeAreaView>
  );
};

export default SpellingExercise;