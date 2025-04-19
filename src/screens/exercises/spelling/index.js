// src/screens/exercises/spelling/index.js
import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
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
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.route - L'objet route de React Navigation contenant les paramètres
 */
const SpellingExercise = ({ route }) => {
  // Hooks de navigation
  const navigation = useNavigation();
  const { level = "A1", exerciseType = "correction" } = route.params || {};

  // Initialisation des couleurs
  const levelColor = getLevelColor(level);

  // Utilisation du hook personnalisé pour gérer l'état de l'exercice
  const {
    exercises,
    currentExerciseIndex,
    currentExercise,
    totalExercises,
    progress,
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

  // Utilisation du hook de progression pour la persistance
  const {
    completedExercises,
    lastPosition,
    loaded,
    saveLastPosition,
    markExerciseAsCompleted,
    initializeProgress,
    isExerciseCompleted
  } = useSpellingProgress(level, exerciseType);

  // Initialiser les exercices et la progression
  useEffect(() => {
    if (exercises.length > 0 && loaded) {
      initializeProgress(exercises);
      
      // Restaurer la dernière position de l'utilisateur si elle existe
      if (lastPosition > 0 && lastPosition < exercises.length) {
        setCurrentExerciseIndex(lastPosition);
      }
    }
  }, [exercises, loaded, lastPosition, initializeProgress, setCurrentExerciseIndex]);

  // Fonction pour gérer la vérification de la réponse
  const handleCheckAnswer = () => {
    const result = checkAnswer();
    
    if (result && currentExercise) {
      // Marquer l'exercice comme complété et sauvegarder la réponse
      markExerciseAsCompleted(
        currentExerciseIndex,
        result,
        userInput,
        currentExercise.correctAnswer
      );
    }
  };

  // Fonction pour passer à l'exercice suivant
  const handleNextExercise = () => {
    // Sauvegarder la position pour la prochaine session
    const nextIndex = currentExerciseIndex + 1;
    if (nextIndex < totalExercises) {
      saveLastPosition(nextIndex);
    }
    
    nextExercise();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête */}
      <SpellingHeader 
        level={level} 
        exerciseType={exerciseType}
        levelColor={levelColor} 
        onBackPress={() => navigation.goBack()} 
      />
      
      {/* Barre de progression */}
      <SpellingProgressBar 
        progress={progress}
        currentIndex={currentExerciseIndex + 1}
        totalCount={totalExercises}
        completedCount={completedExercises.length}
        levelColor={levelColor}
      />
      
      {/* Carte principale */}
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
        levelColor={levelColor}
        onCheck={handleCheckAnswer}
        onNext={handleNextExercise}
        onRetry={retryExercise}
      />
    </SafeAreaView>
  );
};

export default SpellingExercise;