// ErrorCorrectionExercise/index.js - VERSION CORRIGÉE

import { useMemo, useState, useEffect, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";

// Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Composants refactorisés
import ErrorCorrectionHeader from "./ErrorCorrectionHeader";
import ErrorCorrectionCategorySelector from "./ErrorCorrectionCategorySelector";
import ErrorCorrectionModeSelector from "./ErrorCorrectionModeSelector";
import ErrorCorrectionProgress from "./ErrorCorrectionProgress";
import ErrorCorrectionWordSection from "./ErrorCorrectionWordSection";
import ErrorCorrectionNavigation from "./ErrorCorrectionNavigation";
import ErrorCorrectionResultsCard from "./ErrorCorrectionResultsCard";

// Hook unifié & Utils
import useErrorCorrection from "./hooks/useErrorCorrection";
import useLastActivity from "../../../hooks/useLastActivity";
import { getErrorsData, getLevelColor } from "../../../utils/errorCorrection/errorCorrectionDataHelper";
import createStyles from "./style";

/**
 * 🎯 ErrorCorrectionExercise - VERSION CORRIGÉE
 */
const ErrorCorrectionExercise = ({ route }) => {
  const { level = "A1" } = route.params || {};
  // const navigation = useNavigation(); // supprimé car inutilisé
  const styles = createStyles();

  // Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();

  // Data
  const levelColor = getLevelColor(level);
  const errorCorrectionData = useMemo(() => getErrorsData(level), [level]);

  // Hook unifié
  const {
    selectedCategory,
    currentExerciseIndex,
    correctionMode,
    showFeedback,
    isCorrect,
    showResults,
    loaded,
    showDetailedProgress,
    // Mode-specific state
    userCorrection,
    selectedErrorIndices,
    selectedChoiceIndex,
    // Data
    currentExercise,
    exercises,
    // Actions
    changeCategory,
    startExercise,
    toggleDetailedProgress,
    handleNext,
    handlePrevious,
    checkAnswer,
    handleWordPress,
    handleChoiceSelect,
    setUserCorrection,
    setShowResults,
    // Computed
    isLastExerciseInCategory,
    hasValidData,
    stats,
    display,
  } = useErrorCorrection(errorCorrectionData, level);

  // États locaux
  const [viewMode, setViewMode] = useState("browse"); // "browse", "exercise", "results"

  // ✅ CORRECTION : Mémoriser le nom de catégorie
  const currentCategoryName = useMemo(() => {
    return errorCorrectionData?.categories?.find(cat => cat.id === selectedCategory)?.name || "Général";
  }, [errorCorrectionData?.categories, selectedCategory]);

  // ✅ CORRECTION : Mémoriser les métadonnées
  const activityMetadata = useMemo(() => ({
    exercise: currentExerciseIndex,
    totalExercises: exercises.length,
    category: currentCategoryName,
    mode: correctionMode,
    categoryId: selectedCategory
  }), [currentExerciseIndex, exercises.length, currentCategoryName, correctionMode, selectedCategory]);

  // ✅ CORRECTION : Callback mémorisé pour saveActivity
  const handleSaveActivity = useCallback(() => {
    if (loaded && hasValidData && viewMode === "exercise" && currentExercise && !showResults) {
      saveActivity({
        title: "Correction d'erreurs",
        level: level,
        type: "errorCorrection",
        metadata: activityMetadata
      });
    }
  }, [loaded, hasValidData, viewMode, currentExercise, showResults, level, saveActivity, activityMetadata]);

  // ✅ CORRECTION : useEffect optimisé
  useEffect(() => {
    handleSaveActivity();
  }, [handleSaveActivity]);

  // Handlers
const handleBackPress = useCallback(() => {
  if (viewMode === "exercise") {
    setViewMode("browse");
  } else {
    router.push({
      pathname: "/tabs/exerciseSelection",
      params: { level }
    });
  }
}, [viewMode, level]);

const handleStartExercise = useCallback((mode) => {
  startExercise(mode);
  setViewMode("exercise");
}, [startExercise]);

const handleCategoryChange = useCallback((categoryId) => {
  changeCategory(categoryId);
}, [changeCategory]);

const handleCategoryProgressPress = useCallback((index) => {
  const category = errorCorrectionData?.categories?.[index];
  if (category) {
    changeCategory(category.id);
  }
}, [errorCorrectionData?.categories, changeCategory]);

const handleToggleProgressDetails = useCallback(() => {
  toggleDetailedProgress();
}, [toggleDetailedProgress]);

const handleNextAction = useCallback(() => {
  if (showFeedback) {
    const result = handleNext();
    if (result.completed) {
      setViewMode("browse");
    }
  } else {
    checkAnswer();
  }
}, [showFeedback, handleNext, checkAnswer]);

const handlePreviousAction = useCallback(() => {
  handlePrevious();
}, [handlePrevious]);

const handleRetryResults = useCallback(() => {
  setShowResults(false);
  setViewMode("exercise");
}, []);

const handleContinueResults = useCallback(() => {
  setViewMode("browse");
}, []);

  // Loading state
  if (!loaded || !hasValidData) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} />
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
      {/* Header */}
      <ErrorCorrectionHeader
        level={level}
        onBackPress={handleBackPress}
      />

      {/* Progress (seulement en mode exercice) */}
      {viewMode === "exercise" && !showResults && (
        <ErrorCorrectionProgress
          categories={errorCorrectionData.categories || []}
          exercises={errorCorrectionData.exercises || []}
          completedExercises={stats.completedExercises || {}}
          levelColor={levelColor}
          expanded={showDetailedProgress}
          onToggleExpand={handleToggleProgressDetails}
          onCategoryPress={handleCategoryProgressPress}
        />
      )}

      {/* Contenu principal */}
      {viewMode === "browse" && (
        <>
          {/* Category Selector */}
          <ErrorCorrectionCategorySelector
            categories={errorCorrectionData.categories || []}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            levelColor={levelColor}
          />

          {/* Mode Selector */}
          <ErrorCorrectionModeSelector
            onSelectMode={handleStartExercise}
            disabled={exercises.length === 0}
            levelColor={levelColor}
          />
        </>
      )}

      {viewMode === "exercise" && !showResults && (
        <>
          {/* Word Section */}
          <ErrorCorrectionWordSection
            currentExercise={currentExercise}
            exerciseCounter={display.exerciseCounter}
            correctionMode={correctionMode}
            level={level}
            levelColor={levelColor}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            // Mode-specific props
            userCorrection={userCorrection}
            selectedErrorIndices={selectedErrorIndices}
            selectedChoiceIndex={selectedChoiceIndex}
            onChangeUserCorrection={setUserCorrection}
            onToggleErrorIndex={handleWordPress}
            onSelectChoice={handleChoiceSelect}
          />
        </>
      )}

      {showResults && (
        <ErrorCorrectionResultsCard
          score={stats.score || 0}
          totalExercises={exercises.length}
          level={level}
          levelColor={levelColor}
          onRetry={handleRetryResults}
          onContinue={handleContinueResults}
          onExit={handleBackPress}
        />
      )}

      {/* Navigation (seulement en mode exercice) */}
      {viewMode === "exercise" && !showResults && (
        <ErrorCorrectionNavigation
          onNext={handleNextAction}
          onPrevious={handlePreviousAction}
          onExit={() => setViewMode("browse")}
          currentIndex={currentExerciseIndex}
          totalCount={exercises.length}
          disableNext={
            (correctionMode === "full" && userCorrection.trim() === "") ||
            (correctionMode === "identify" && selectedErrorIndices.length === 0) ||
            (correctionMode === "multiple_choice" && selectedChoiceIndex === null)
          }
          isLastExercise={isLastExerciseInCategory}
          showFeedback={showFeedback}
          levelColor={levelColor}
        />
      )}
    </Container>
  );
};

export default ErrorCorrectionExercise;