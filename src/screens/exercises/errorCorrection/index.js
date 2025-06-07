// src/components/screens/exercises/errorCorrection/ErrorCorrectionExercise/index.js
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Composants spécifiques à la correction d'erreurs
import ErrorCorrectionHeader from "./ErrorCorrectionHeader";
import ErrorCorrectionCategorySelector from "./ErrorCorrectionCategorySelector";
import ErrorCorrectionModeSelector from "./ErrorCorrectionModeSelector";
import ErrorCorrectionProgressBar from "./ErrorCorrectionProgressBar";
import ErrorCorrectionNavigation from "./ErrorCorrectionNavigation";

// Composants de contenu pour les différents modes
import FullCorrectionMode from "./modes/FullCorrectionMode";
import IdentifyErrorsMode from "./modes/IdentifyErrorsMode";
import MultipleChoiceMode from "./modes/MultipleChoiceMode";
import ErrorCorrectionResultsCard from "./ErrorCorrectionResultsCard";

// Hooks personnalisés (les deux maintenant !)
import useErrorCorrectionExerciseState from "./hooks/useErrorCorrectionExerciseState";
import useErrorCorrectionProgress from "./hooks/useErrorCorrectionProgress";

// Utilitaires et helpers
import {
  getErrorsData,
  getLevelColor,
} from "../../../utils/errorCorrection/errorCorrectionDataHelper";

// Styles
import styles from "./style";

/**
 * Composant principal pour l'exercice de correction d'erreurs
 * Version recodée : intégration des deux hooks + logique propre de progression + Container SafeArea
 */
const ErrorCorrectionExercise = ({ route }) => {
  // ========== NAVIGATION ET PARAMÈTRES ==========
  const navigation = useNavigation();
  const { level = "A1" } = route.params || {};

  // Couleur et données du niveau
  const levelColor = getLevelColor(level);
  const exercisesData = useMemo(() => getErrorsData(level), [level]);

  // ========== ÉTATS LOCAUX ==========
  const [viewMode, setViewMode] = useState("browse"); // "browse", "exercise", "results"

  // ========== HOOKS D'ÉTAT ==========

  // Hook d'état des exercices (sans progression)
  const {
    selectedCategory,
    currentExerciseIndex,
    exercises,
    correctionMode,
    userCorrection,
    selectedErrorIndices,
    selectedChoiceIndex,
    showFeedback,
    isCorrect,
    showResults,
    score,
    showHint,
    setUserCorrection,
    setSelectedCategory,
    changeCategory,
    startExercise,
    checkAnswer,
    goToNextExercise,
    handleWordPress,
    handleChoiceSelect,
    resetExerciseState,
    setShowHint,
    setShowResults,
    hasValidData,
    currentCategory,
    totalExercises
  } = useErrorCorrectionExerciseState(level, exercisesData);

  // Hook de progression (seule source de vérité pour la progression)
  const {
    completedExercises,
    lastPosition,
    loaded,
    saveLastPosition,
    markExerciseAsCompleted,
    getCategoryProgress,
    calculateOverallProgress,
    isExerciseCompleted,
    getCompletedCountInCategory
  } = useErrorCorrectionProgress(level);

  // ========== DONNÉES CALCULÉES ==========

  // Progression de la catégorie actuelle
  const currentCategoryProgress = selectedCategory 
    ? getCategoryProgress(selectedCategory, totalExercises)
    : 0;

  // Nombre d'exercices complétés dans la catégorie actuelle
  const completedInCurrentCategory = selectedCategory 
    ? getCompletedCountInCategory(selectedCategory)
    : 0;

  // ========== INITIALISATION ==========

  // Restaurer la dernière position
  useEffect(() => {
    if (loaded && lastPosition.categoryId && exercisesData && hasValidData) {
      // Changer la catégorie si différente
      if (lastPosition.categoryId !== selectedCategory) {
        changeCategory(lastPosition.categoryId);
      }

      // Note: currentExerciseIndex sera géré par le hook d'état
    }
  }, [loaded, lastPosition, exercisesData, hasValidData, selectedCategory, changeCategory]);

  // ========== GESTIONNAIRES D'ÉVÉNEMENTS ==========

  // Retour navigation
  const handleBack = useCallback(() => {
    if (viewMode === "exercise") {
      setViewMode("browse");
    } else {
      navigation.goBack();
    }
  }, [viewMode, navigation]);

  // Démarrer un exercice avec un mode spécifique
  const handleStartExercise = useCallback((mode) => {
    startExercise(mode);
    setViewMode("exercise");
  }, [startExercise]);

  // Action principal : vérifier réponse ou passer au suivant
  const handleNextAction = useCallback(() => {
    if (showFeedback) {
      // Marquer l'exercice comme complété avant de passer au suivant
      if (selectedCategory !== null) {
        markExerciseAsCompleted(
          selectedCategory, 
          currentExerciseIndex, 
          isCorrect, 
          getCurrentUserAnswer(),
          {
            mode: correctionMode,
            timestamp: Date.now()
          }
        );
      }

      goToNextExercise();

      // Sauvegarder la position
      if (currentExerciseIndex < totalExercises - 1) {
        saveLastPosition(selectedCategory, currentExerciseIndex + 1);
      }
    } else {
      checkAnswer();
    }
  }, [
    showFeedback, 
    selectedCategory, 
    currentExerciseIndex, 
    isCorrect, 
    correctionMode, 
    markExerciseAsCompleted, 
    goToNextExercise, 
    checkAnswer, 
    saveLastPosition, 
    totalExercises
  ]);

  // Obtenir la réponse utilisateur actuelle selon le mode
  const getCurrentUserAnswer = useCallback(() => {
    switch(correctionMode) {
      case 'full':
        return userCorrection;
      case 'identify':
        return JSON.stringify(selectedErrorIndices);
      case 'multiple_choice':
        return String(selectedChoiceIndex);
      default:
        return '';
    }
  }, [correctionMode, userCorrection, selectedErrorIndices, selectedChoiceIndex]);

  // Gérer la soumission
  const handleSubmit = useCallback(() => {
    if (showResults) {
      // Retour au mode browse depuis les résultats
      setViewMode("browse");
      setShowResults(false);
    } else {
      handleNextAction();
    }
  }, [showResults, handleNextAction, setShowResults]);

  // Réessayer les exercices
  const handleRetry = useCallback(() => {
    resetExerciseState();
    setShowResults(false);
  }, [resetExerciseState, setShowResults]);

  // Changement de catégorie
  const handleCategoryChange = useCallback((categoryId) => {
    changeCategory(categoryId);
    saveLastPosition(categoryId, 0);
  }, [changeCategory, saveLastPosition]);

  // ========== RENDU MODES ==========

  // Mode parcourir (sélection catégorie + mode)
  const renderBrowseMode = () => (
    <>
      <ErrorCorrectionCategorySelector
        categories={exercisesData.categories || []}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      <ErrorCorrectionModeSelector
        onSelectMode={handleStartExercise}
        disabled={exercises.length === 0}
        levelColor={levelColor}
      />

      {/* Info progression pour la catégorie sélectionnée */}
      {selectedCategory && (
        <View style={styles.categoryProgressInfo}>
          <Text style={styles.categoryProgressText}>
            Progression: {completedInCurrentCategory}/{totalExercises} exercices ({currentCategoryProgress}%)
          </Text>
        </View>
      )}
    </>
  );

  // Mode exercice
  const renderExerciseMode = () => {
    if (exercises.length === 0 || currentExerciseIndex >= exercises.length) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Aucun exercice disponible</Text>
        </View>
      );
    }

    const currentExercise = exercises[currentExerciseIndex];

    switch (correctionMode) {
      case "full":
        return (
          <FullCorrectionMode
            exercise={currentExercise}
            userCorrection={userCorrection}
            onChangeUserCorrection={setUserCorrection}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            levelColor={levelColor}
          />
        );
      case "identify":
        return (
          <IdentifyErrorsMode
            exercise={currentExercise}
            selectedErrorIndices={selectedErrorIndices}
            onToggleErrorIndex={handleWordPress}
            showFeedback={showFeedback}
            levelColor={levelColor}
          />
        );
      case "multiple_choice":
        return (
          <MultipleChoiceMode
            exercise={currentExercise}
            selectedChoiceIndex={selectedChoiceIndex}
            onSelectChoice={handleChoiceSelect}
            showFeedback={showFeedback}
            levelColor={levelColor}
          />
        );
      default:
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Mode de correction inconnu: {correctionMode}</Text>
          </View>
        );
    }
  };

  // Mode résultats
  const renderResultsMode = () => (
    <ErrorCorrectionResultsCard
      score={score}
      totalExercises={exercises.length}
      userAttempts={[]} // À implémenter si nécessaire
      exercises={exercises}
      level={level}
      levelColor={levelColor}
      onRetry={handleRetry}
      onContinue={() => setViewMode("browse")}
      onExit={handleBack}
    />
  );

  // ========== ÉCRAN DE CHARGEMENT ==========
  if (!loaded || !hasValidData) {
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

  // ========== CONTENU PRINCIPAL ==========
  const renderMainContent = () => (
    <>
      {/* En-tête */}
      <ErrorCorrectionHeader
        level={level}
        currentExerciseIndex={currentExerciseIndex}
        totalExercises={exercises.length}
        onBack={handleBack}
        levelColor={levelColor}
      />

      {/* Barre de progression (seulement en mode exercice) */}
      {viewMode === "exercise" && !showResults && (
        <ErrorCorrectionProgressBar
          currentIndex={currentExerciseIndex + 1}
          totalCount={totalExercises}
          completedCount={completedInCurrentCategory}
          levelColor={levelColor}
        />
      )}

      {/* Contenu principal */}
      <View style={styles.content}>
        {viewMode === "browse" && renderBrowseMode()}
        {viewMode === "exercise" && !showResults && renderExerciseMode()}
        {showResults && renderResultsMode()}
      </View>

      {/* Navigation (seulement en mode exercice) */}
      {viewMode === "exercise" && !showResults && (
        <ErrorCorrectionNavigation
          onNext={handleSubmit}
          onPrevious={() => {}} // À implémenter si nécessaire
          onExit={() => setViewMode("browse")}
          currentIndex={currentExerciseIndex}
          totalCount={exercises.length}
          disableNext={
            (correctionMode === "full" && userCorrection.trim() === "") ||
            (correctionMode === "identify" && selectedErrorIndices.length === 0) ||
            (correctionMode === "multiple_choice" && selectedChoiceIndex === null)
          }
          isLastExercise={currentExerciseIndex === exercises.length - 1}
          showFeedback={showFeedback}
          levelColor={levelColor}
        />
      )}
    </>
  );

  // ========== RENDU PRINCIPAL ==========
  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL} // SafeArea complète pour les exercices
      backgroundColor="#FAFBFC"
      statusBarStyle="dark-content"
      withPadding={false} // Pas de padding global, géré par les composants internes
      style={styles.safeArea}
    >
      {renderMainContent()}
    </Container>
  );
};

export default ErrorCorrectionExercise;