// src/components/screens/exercises/reading/ReadingExercise/index.js
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../../../components/layout/Container";

// Components communs
import ExerciseHeader from "../../../components/exercise-common/ExerciseHeader";
import ExerciseFeedback from "../../../components/exercise-common/ExerciseFeedback";
import InstructionBox from "../../../components/exercise-common/InstructionBox";

// Components spécifiques à la lecture
import ReadingProgressBar from "./ReadingProgressBar";
import ReadingTextSelector from "./ReadingTextSelector";
import ReadingText from "./ReadingText";
import ReadingQuestion from "./ReadingQuestion";
import QuestionIndicators from "./QuestionIndicators";
import ReadingNavigation from "./ReadingNavigation";

// Hooks EXISTANTS (pas modifiés)
import useReadingExerciseState from "./hooks/useReadingExerciseState";
import useReadingProgress from "./hooks/useReadingProgress";

// Utils
import {
  getReadingData,
  getLevelColor,
} from "../../../utils/reading/readingDataHelper";
import styles from "./style";

/**
 * Composant principal pour l'exercice de lecture
 * Version recodée avec Container SafeArea + hooks existants + ProgressBar unifiée
 */
const ReadingExercise = ({ route }) => {
  // ========== NAVIGATION ET PARAMÈTRES ==========
  const navigation = useNavigation();
  const { level = "A1" } = route.params || {};

  // Données et couleur du niveau
  const levelColor = getLevelColor(level);
  const readingData = getReadingData(level);

  // ========== HOOKS EXISTANTS (utilisés tels quels) ==========

  // Hook d'état UI (avec toute sa logique existante)
  const {
    allExercises,
    selectedExerciseIndex,
    currentExercise,
    currentQuestionIndex,
    selectedAnswer,
    completedQuestions,  // Structure: {0: [0,1,2], 1: [0]}
    showFeedback,
    textExpanded,
    attempts,
    fadeAnim,
    slideAnim,
    scrollViewRef,
    textsScrollViewRef,
    isCurrentQuestionCompleted,
    handleTextChange,
    handleSelectAnswer,
    handleSubmitAnswer,
    retryExercise,
    handleNextQuestion: originalHandleNextQuestion,
    handlePreviousQuestion: originalHandlePreviousQuestion,
    toggleTextExpansion,
    calculateProgress,
    setCurrentQuestionIndex,
    setSelectedAnswer,
    setShowFeedback,
    setAttempts,
  } = useReadingExerciseState(readingData?.exercises || [], level);

  // Hook de progression (avec toute sa logique existante)
  const {
    completedExercises,  // Structure: {exerciseIndex: {completedAt, completedQuestions: [0,1,2]}}
    lastPosition,
    loaded,
    saveLastPosition,
    markExerciseAsCompleted,
    updateExerciseProgress,
    initializeProgress,
    calculateOverallProgress,
  } = useReadingProgress(level);

  // ========== INITIALISATION ==========

  // Initialiser la progression (hook existant)
  useEffect(() => {
    if (loaded && readingData) {
      initializeProgress(readingData);
    }
  }, [loaded, readingData, initializeProgress]);

  // Restaurer la dernière position (hook existant)
  useEffect(() => {
    if (loaded && lastPosition && allExercises.length > 0) {
      // Restaurer l'exercice si différent
      if (lastPosition.exerciseIndex !== selectedExerciseIndex) {
        handleTextChange(lastPosition.exerciseIndex);
      }

      // Restaurer la question si différente
      if (lastPosition.questionIndex !== currentQuestionIndex) {
        setCurrentQuestionIndex(lastPosition.questionIndex);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setAttempts(0);
      }
    }
  }, [loaded, lastPosition, allExercises.length, selectedExerciseIndex, currentQuestionIndex, handleTextChange, setCurrentQuestionIndex, setSelectedAnswer, setShowFeedback, setAttempts]);

  // ========== DONNÉES CALCULÉES (utilisant hooks existants) ==========

  // Question actuelle
  const getCurrentQuestion = currentExercise?.questions?.[currentQuestionIndex] || null;

  // Vérification réponse
  const isCorrect = getCurrentQuestion && selectedAnswer !== null
    ? selectedAnswer === getCurrentQuestion.correctAnswer
    : false;

  // Comptage questions complétées dans exercice actuel (depuis hook existant)
  const completedInCurrentExercise = completedQuestions[selectedExerciseIndex]?.length || 0;

  // ========== GESTIONNAIRES PERSONNALISÉS ==========

  // Vérifier la réponse (utilise hook existant + sync avec progression)
  const handleCheckAnswer = useCallback(() => {
    if (selectedAnswer === null || !getCurrentQuestion) return;

    // Utiliser la fonction du hook existant
    handleSubmitAnswer();

    // Si correct, synchroniser avec useReadingProgress
    if (isCorrect) {
      // Récupérer les questions complétées actuelles
      const currentCompleted = completedQuestions[selectedExerciseIndex] || [];

      // Ajouter la question actuelle si pas déjà dans la liste
      if (!currentCompleted.includes(currentQuestionIndex)) {
        const updatedCompleted = [...currentCompleted, currentQuestionIndex];

        // Synchroniser avec useReadingProgress
        updateExerciseProgress(selectedExerciseIndex, updatedCompleted);
      }
    }
  }, [selectedAnswer, getCurrentQuestion, selectedExerciseIndex, currentQuestionIndex, handleSubmitAnswer, isCorrect, completedQuestions, updateExerciseProgress]);

  // Navigation question suivante (override du hook existant)
  const handleNextQuestionClick = useCallback(() => {
    const isLastQuestion = currentQuestionIndex === (currentExercise?.questions?.length || 0) - 1;
    const isLastExercise = selectedExerciseIndex === allExercises.length - 1;

    // Sauvegarder position avant navigation
    if (isLastQuestion && !isLastExercise) {
      // Passer à l'exercice suivant
      saveLastPosition(selectedExerciseIndex + 1, 0);
    } else if (!isLastQuestion) {
      // Question suivante dans le même exercice
      saveLastPosition(selectedExerciseIndex, currentQuestionIndex + 1);
    }

    // Si fin de tout, gérer spécialement
    if (isLastQuestion && isLastExercise) {
      Alert.alert(
        "Félicitations !",
        "Vous avez terminé tous les exercices de lecture !",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
      return;
    }

    // Utiliser la navigation du hook existant
    originalHandleNextQuestion();
  }, [currentQuestionIndex, currentExercise, selectedExerciseIndex, allExercises.length, saveLastPosition, originalHandleNextQuestion, navigation]);

  // Navigation question précédente (override du hook existant)
  const handlePreviousQuestionClick = useCallback(() => {
    // Sauvegarder position avant navigation
    const newQuestionIndex = Math.max(0, currentQuestionIndex - 1);
    saveLastPosition(selectedExerciseIndex, newQuestionIndex);

    // Utiliser la navigation du hook existant
    originalHandlePreviousQuestion();
  }, [currentQuestionIndex, selectedExerciseIndex, saveLastPosition, originalHandlePreviousQuestion]);

  // Changer d'exercice (utilise hook existant + sync position)
  const handleExerciseChange = useCallback((exerciseIndex) => {
    // Utiliser le hook existant
    handleTextChange(exerciseIndex);

    // Sauvegarder nouvelle position
    saveLastPosition(exerciseIndex, 0);
  }, [handleTextChange, saveLastPosition]);

  // Sélection directe de question (utilise hooks existants)
  const handleQuestionSelect = useCallback((questionIndex) => {
    // Utiliser les setters du hook existant
    setCurrentQuestionIndex(questionIndex);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAttempts(0);

    // Sauvegarder position
    saveLastPosition(selectedExerciseIndex, questionIndex);
  }, [setCurrentQuestionIndex, setSelectedAnswer, setShowFeedback, setAttempts, selectedExerciseIndex, saveLastPosition]);

  // Gestionnaire retour navigation
  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // ========== GESTION CHARGEMENT ==========
  if (!loaded || allExercises.length === 0) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#FAFBFC"
        statusBarStyle="dark-content"
        style={styles.safeArea}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} />
          <Text style={styles.loadingText}>Chargement des exercices...</Text>
        </View>
      </Container>
    );
  }

  if (!currentExercise) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#FAFBFC"
        statusBarStyle="dark-content"
        style={styles.safeArea}
      >
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Aucun exercice disponible</Text>
        </View>
      </Container>
    );
  }

  // ========== CONTENU PRINCIPAL ==========
  const renderMainContent = () => (
    <>
      {/* En-tête */}
      <ExerciseHeader
        title="Reading"
        level={level}
        onClose={handleBackPress}
        levelColor={levelColor}
      />

      {/* Sélecteur de textes (utilise hook existant) */}
      <ReadingTextSelector
        exercises={allExercises}
        selectedIndex={selectedExerciseIndex}
        onSelectExercise={handleExerciseChange}
        scrollViewRef={textsScrollViewRef}
        levelColor={levelColor}
      />

      {/* ✅ NOUVELLE ProgressBar unifiée */}
      <ReadingProgressBar
        currentExercise={selectedExerciseIndex + 1}
        totalExercises={allExercises.length}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={currentExercise?.questions?.length || 0}
        completedQuestionsInExercise={completedInCurrentExercise}
        exerciseTitle={currentExercise?.title || `Exercise ${selectedExerciseIndex + 1}`}
        levelColor={levelColor}
      />

      {/* Instructions */}
      <InstructionBox
        title="Reading Exercise"
        instructions="Read the text carefully and answer the questions."
        variant="compact"
        primaryColor={levelColor}
        initiallyExpanded={false}
      />

      {/* Texte de lecture (utilise hook existant) */}
      <ReadingText
        exercise={currentExercise}
        textExpanded={textExpanded}
        onToggleExpand={toggleTextExpansion}
        levelColor={levelColor}
      />

      {/* Question actuelle */}
      {getCurrentQuestion && (
        <ReadingQuestion
          question={getCurrentQuestion}
          questionIndex={currentQuestionIndex}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          showFeedback={showFeedback}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
          levelColor={levelColor}
        />
      )}

      {/* Feedback */}
      {showFeedback && getCurrentQuestion && (
        <ExerciseFeedback
          type={isCorrect ? "success" : "error"}
          message={isCorrect ? "Correct!" : "Incorrect!"}
          explanation={
            isCorrect
              ? getCurrentQuestion.explanation
              : attempts > 1
              ? `The correct answer is: ${
                  getCurrentQuestion.options[getCurrentQuestion.correctAnswer]
                }`
              : "Try again!"
          }
          showDismissButton={false}
        />
      )}

      {/* Indicateurs de questions (utilise hook existant) */}
      <QuestionIndicators
        totalQuestions={currentExercise.questions.length}
        currentQuestionIndex={currentQuestionIndex}
        completedQuestions={completedQuestions[selectedExerciseIndex] || []}
        onSelectQuestion={handleQuestionSelect}
        levelColor={levelColor}
      />

      {/* Navigation */}
      <ReadingNavigation
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        selectedAnswer={selectedAnswer}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={currentExercise.questions.length}
        attempts={attempts}
        levelColor={levelColor}
        onNext={showFeedback ? handleNextQuestionClick : handleCheckAnswer}
        onPrevious={handlePreviousQuestionClick}
        onRetry={retryExercise}
      />
    </>
  );

  // ========== RENDU PRINCIPAL ==========
  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL} // SafeArea complète pour les exercices
      withScrollView
      backgroundColor="#FAFBFC"
      statusBarStyle="dark-content"
      withPadding={false} // Pas de padding global, géré par les composants internes
      scrollViewProps={{
        ref: scrollViewRef,
        style: styles.scrollView,
        contentContainerStyle: styles.contentContainer,
        showsVerticalScrollIndicator: false,
      }}
      style={styles.safeArea}
    >
      {renderMainContent()}
    </Container>
  );
};

export default ReadingExercise;