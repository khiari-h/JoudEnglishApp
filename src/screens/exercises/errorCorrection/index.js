// src/components/screens/exercises/errorCorrection/ErrorCorrectionExercise/index.js
import React, { useState, useEffect, useMemo } from "react";
import { SafeAreaView, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Composants spécifiques à la correction d'erreurs
import ErrorCorrectionHeader from "../ErrorCorrectionHeader";
import ErrorCorrectionCategorySelector from "../ErrorCorrectionCategorySelector";
import ErrorCorrectionModeSelector from "../ErrorCorrectionModeSelector";
import ErrorCorrectionProgressBar from "../ErrorCorrectionProgressBar";
import ErrorCorrectionNavigation from "../ErrorCorrectionNavigation";

// Composants de contenu pour les différents modes
import FullCorrectionMode from "../modes/FullCorrectionMode";
import IdentifyErrorsMode from "../modes/IdentifyErrorsMode";
import MultipleChoiceMode from "../modes/MultipleChoiceMode";
import ErrorCorrectionResultsCard from "../ErrorCorrectionResultsCard";

// Hook pour la gestion de l'état
import useErrorCorrectionExerciseState from "../hooks/useErrorCorrectionExerciseState";

// Utilitaires et helpers
import { getErrorsData, getLevelColor } from "../../../utils/errorCorrection/errorCorrectionHelper";

// Styles
import styles from "./style";

/**
 * Composant principal pour l'exercice de correction d'erreurs
 */
const ErrorCorrectionExercise = () => {
  // Hooks de navigation
  const navigation = useNavigation();
  const route = useRoute();
  const { level = "A1" } = route.params || {};

  // Initialisation des données
  const levelColor = getLevelColor(level);
  const exercisesData = useMemo(() => getErrorsData(level), [level]);
  
  // Vue active (browse, exercise, results)
  const [viewMode, setViewMode] = useState("browse");
  
  // État des exercices via notre hook personnalisé
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
    completionProgress,
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
  } = useErrorCorrectionExerciseState(level, exercisesData);

  // Gestion du retour à la navigation
  const handleBack = () => {
    if (viewMode === "exercise") {
      setViewMode("browse");
    } else {
      navigation.goBack();
    }
  };

  // Démarrer l'exercice avec un mode spécifique
  const handleStartExercise = (mode) => {
    startExercise(mode);
    setViewMode("exercise");
  };

  // Vérifier la réponse ou passer au suivant
  const handleNextAction = () => {
    if (showFeedback) {
      goToNextExercise();
    } else {
      checkAnswer();
    }
  };

  // Gérer la soumission
  const handleSubmit = () => {
    if (showResults) {
      // Si on est en mode résultats, on revient à la navigation
      setViewMode("browse");
      setShowResults(false);
    } else {
      // Sinon on vérifie la réponse
      handleNextAction();
    }
  };

  // Réessayer les exercices
  const handleRetry = () => {
    resetExerciseState(exercises.length);
    setShowResults(false);
  };

  // Rendu du mode parcourir
  const renderBrowseMode = () => (
    <>
      <ErrorCorrectionCategorySelector
        categories={exercisesData.categories || []}
        selectedCategory={selectedCategory}
        onSelectCategory={changeCategory}
        levelColor={levelColor}
      />

      <ErrorCorrectionModeSelector
        onSelectMode={handleStartExercise}
        disabled={exercises.length === 0}
        levelColor={levelColor}
      />
    </>
  );

  // Rendu du mode exercice
  const renderExerciseMode = () => {
    if (exercises.length === 0 || currentExerciseIndex >= exercises.length) {
      return null;
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
        return null;
    }
  };

  // Rendu du mode résultats
  const renderResultsMode = () => (
    <ErrorCorrectionResultsCard
      score={score}
      totalExercises={exercises.length}
      userAttempts={[]} // À implémenter avec les données du hook
      exercises={exercises}
      level={level}
      levelColor={levelColor}
      onRetry={handleRetry}
      onContinue={() => setViewMode("browse")}
      onExit={handleBack}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
          currentExerciseIndex={currentExerciseIndex}
          totalExercises={exercises.length}
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
    </SafeAreaView>
  );
};

export default ErrorCorrectionExercise;