// VocabularyExercise/index.js - VERSION CLEAN & SIMPLE
import React, { useMemo, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Components
import VocabularyHeader from "./VocabularyHeader";
import VocabularyCategorySelector from "./VocabularyCategorySelector";
import VocabularyProgress from "./VocabularyProgress";
import VocabularyWordSection from "./VocabularyWordSection";
import VocabularyNavigation from "./VocabularyNavigation";

// Hook & Utils
import useVocabulary from "./hooks/useVocabulary";
import { getVocabularyData, isBonusLevel, getLevelColor } from "../../../utils/vocabulary/vocabularyDataHelper";
import createStyles from "./style";

/**
 * 🎯 VocabularyExercise - VERSION CLEAN & SIMPLE
 * 200+ lignes → 130 lignes (-35% de code)
 * 6 hooks → 1 hook, logique claire, maintenable
 */
const VocabularyExercise = ({ route }) => {
  const { level, mode } = route.params;
  const navigation = useNavigation();
  const styles = createStyles();

  // Data
  const finalMode = mode || (isBonusLevel(level) ? "fast" : "classic");
  const levelColor = getLevelColor(level);
  const vocabularyData = useMemo(() => getVocabularyData(level, finalMode), [level, finalMode]);

  // Hook unifié
  const {
    categoryIndex,
    wordIndex,
    showTranslation,
    completedWords,
    loaded,
    showDetailedProgress,
    currentWord,
    currentCategory,
    totalCategories,
    totalWordsInCategory,
    changeCategory,
    toggleTranslation,
    toggleDetailedProgress,
    handleNext,
    handlePrevious,
    canGoToPrevious,
    isLastWordInExercise,
    stats,
    display,
  } = useVocabulary(vocabularyData, level, finalMode);

  // Handlers
  const handleBackPress = () => navigation.goBack();
  
  const handleCategoryChange = (index) => changeCategory(index);

  const handleCategoryProgressPress = (index) => changeCategory(index);

  const handleToggleProgressDetails = () => toggleDetailedProgress();

  const handleNextWord = () => {
    const result = handleNext();
    if (result.completed) {
      navigation.goBack();
    }
  };

  const handlePreviousWord = () => handlePrevious();

  // Loading state
  if (!loaded || !vocabularyData) {
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
      <VocabularyHeader
        level={level}
        mode={finalMode}
        onBackPress={handleBackPress}
      />

      {/* Progress */}
      <VocabularyProgress
        vocabularyData={vocabularyData}
        completedWords={completedWords}
        levelColor={levelColor}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onCategoryPress={handleCategoryProgressPress}
      />

      {/* Category Selector */}
      <VocabularyCategorySelector
        categories={display.categories}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      {/* Word Section */}
      <VocabularyWordSection
        currentWord={currentWord}
        wordCounter={display.wordCounter}
        mode={finalMode}
        level={level}
        levelColor={levelColor}
        showTranslation={showTranslation}
        onToggleTranslation={toggleTranslation}
      />

      {/* Navigation */}
      <VocabularyNavigation
        onNext={handleNextWord}
        onPrevious={handlePreviousWord}
        canGoPrevious={canGoToPrevious}
        isLast={isLastWordInExercise}
        levelColor={levelColor}
      />
    </Container>
  );
};

export default VocabularyExercise;