// PhrasesExercise/index.js - VERSION AVEC SAUVEGARDE ACTIVITÉ
import { useMemo, useEffect, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

// Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Components
import PhrasesHeader from "./PhrasesHeader";
import PhrasesCategorySelector from "./PhrasesCategorySelector";
import PhrasesProgress from "./PhrasesProgress";
import PhraseCard from "./PhraseCard";
import PhrasesNavigation from "./PhrasesNavigation";

// Hook & Utils
import usePhrases from "./hooks/usePhrases";
import useLastActivity from "../../../hooks/useLastActivity"; // ✅ AJOUTÉ
import { getPhrasesData, getLevelColor } from "../../../utils/phrases/phrasesDataHelper";
import createStyles from "./style";

/**
 * 🎯 PhrasesExercise - VERSION AVEC SAUVEGARDE ACTIVITÉ
 */
const PhrasesExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // ✅ AJOUTÉ : Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();

  // Data
  const levelColor = getLevelColor(level);
  const phrasesData = useMemo(() => getPhrasesData(level), [level]);

  // Hook unifié - Garde seulement les variables utilisées
  const {
    categoryIndex,
    phraseIndex,
    showTranslation,
    completedPhrases,
    loaded,
    showDetailedProgress,
    currentPhrase,
    currentPhrases,
    totalPhrasesInCategory,
    hasValidData,
    changeCategory,
    toggleTranslation,
    toggleDetailedProgress,
    handleNext,
    handlePrevious,
    canGoToPrevious,
    isLastPhraseInCategory,
    stats,
    display,
  } = usePhrases(phrasesData, level);

  // ✅ AJOUTÉ : Sauvegarder l'activité à chaque changement de phrase/catégorie
  useEffect(() => {
    if (loaded && hasValidData && currentPhrase && currentPhrases.length > 0 && phraseIndex < 100) { // ✅ Protection boucle
      const currentCategory = phrasesData?.categories?.[categoryIndex];
      
      const activityData = {
        title: "Expressions",
        level,
        type: "phrases",
        metadata: {
          phrase: phraseIndex,
          totalPhrases: totalPhrasesInCategory || currentPhrases.length, // ✅ Fallback
          category: currentCategory?.name || "Général",
          categoryIndex,
          totalCategories: phrasesData?.categories?.length || 1
        }
      };

      saveActivity(activityData);
    }
  }, [loaded, hasValidData, currentPhrase, currentPhrases.length, phraseIndex, totalPhrasesInCategory, categoryIndex, level, phrasesData]);

  // Handlers
  const handleBackPress = useCallback(() => {
    router.push({
      pathname: "/tabs/exerciseSelection",
      params: { level }
    });
  }, [level]);

  const handleCategoryChange = useCallback((index) => changeCategory(index), [changeCategory]);

  const handleToggleProgressDetails = useCallback(() => toggleDetailedProgress(), [toggleDetailedProgress]);

  const handleNextPhrase = useCallback(() => {
    const result = handleNext();
    if (result.completed) {
      navigation.goBack();
    }
  }, [handleNext, navigation]);

  const handlePreviousPhrase = useCallback(() => handlePrevious(), [handlePrevious]);

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
          <ActivityIndicator size="large" color={levelColor} testID="activity-indicator" />
        </View>
      </Container>
    );
  }

  // Empty state
  if (currentPhrases.length === 0) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <PhrasesHeader
          level={level}
          onBackPress={handleBackPress}
        />
        <View style={styles.emptyStateContainer}>
          <ActivityIndicator size="large" color={levelColor} testID="activity-indicator" />
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
      <PhrasesHeader
        level={level}
        onBackPress={handleBackPress}
      />

      {/* Progress - MAINTENANT COLLÉ AU HEADER */}
      <PhrasesProgress
        progress={stats.completionProgress}
        currentPhrase={phraseIndex + 1}
        totalPhrases={totalPhrasesInCategory}
        completedCount={stats.completedPhrasesCount}
        levelColor={levelColor}
        phrasesData={phrasesData}
        completedPhrases={completedPhrases}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onCategoryPress={handleCategoryChange}
      />

      {/* Category Selector - APRÈS PROGRESS comme les autres exercices */}
      <PhrasesCategorySelector
        categories={display.categories}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      {/* Phrase Card */}
      <PhraseCard
        phraseData={currentPhrase}
        showTranslation={showTranslation}
        onToggleTranslation={toggleTranslation}
        levelColor={levelColor}
      />

      {/* Navigation */}
      <PhrasesNavigation
        onNext={handleNextPhrase}
        onPrevious={handlePreviousPhrase}
        disablePrevious={!canGoToPrevious}
        disableNext={false}
        isLast={isLastPhraseInCategory}
        levelColor={levelColor}
      />
    </Container>
  );
};

export default PhrasesExercise;