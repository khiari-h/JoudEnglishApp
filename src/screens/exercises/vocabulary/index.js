// VocabularyExercise/index.js - VERSION REFACTORISÉE adaptée aux nouveaux composants

import React, { useMemo, useCallback } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Composants refactorisés avec composants génériques
import VocabularyHeader from "./VocabularyHeader";
import VocabularyNavigation from "./VocabularyNavigation";
import VocabularyWordSection from "./VocabularyWordSection"; // ← Version refactorisée
import VocabularyCategorySelector from "./VocabularyCategorySelector";
import VocabularyProgress from "./VocabularyProgress"; // ← Version refactorisée utilisant ProgressCard

// Utils
import { getVocabularyData, isBonusLevel, getLevelColor } from "../../../utils/vocabulary/vocabularyDataHelper";

// Hooks spécialisés
import useVocabularyProgress from "./hooks/useVocabularyProgress";
import useVocabularyExerciseState from "./hooks/useVocabularyExerciceState";
import useVocabularyNavigation from "./hooks/useVocabularyNavigation";
import useVocabularyStats from "./hooks/useVocabularyStats";
import useVocabularyDisplay from "./hooks/useVocabularyDisplay";
import useVocabularyLoader from "./hooks/useVocabularyLoader";

// Styles
import createStyles from "./style";

/**
 * 🏆 VocabularyExercise - Version Refactorisée avec composants génériques
 * - Utilise HeroCard, RevealButton, ContentSection, ProgressCard
 * - Même logique métier, architecture optimisée
 * - Interface inchangée, performance améliorée
 * - Code réduit et maintenabilité accrue
 */
const VocabularyExercise = ({ route }) => {
  const { level, mode } = route.params;
  const navigation = useNavigation();
  const styles = createStyles();

  // 🎯 LOGIQUE MÉTIER INCHANGÉE
  const finalMode = mode || (isBonusLevel(level) ? "fast" : "classic");
  const levelColor = getLevelColor(level);

  // === DONNÉES DE BASE (INCHANGÉ) ===
  const vocabularyData = useMemo(() => getVocabularyData(level, finalMode), [level, finalMode]);
  const progressKey = useMemo(() => `${level}_${finalMode}`, [level, finalMode]);

  // === HOOKS EXISTANTS (INCHANGÉ) ===
  const { 
    completedWords, 
    lastPosition, 
    loaded, 
    markWordAsCompleted, 
    saveLastPosition, 
    initializeProgress 
  } = useVocabularyProgress(progressKey);

  const { 
    categoryIndex, 
    wordIndex, 
    showTranslation, 
    restoreState, 
    goToPreviousWord, 
    goToNextWord, 
    changeCategory, 
    toggleTranslation 
  } = useVocabularyExerciseState(progressKey, 0, 0);

  // === HOOK DE CHARGEMENT (INCHANGÉ) ===
  const { isFullyLoaded } = useVocabularyLoader({
    loaded,
    vocabularyData,
    lastPosition,
    restoreState,
    initializeProgress
  });

  // === HOOKS SPÉCIALISÉS (INCHANGÉ) ===
  const { 
    totalWords, 
    completedWordsCount, 
    totalProgress 
  } = useVocabularyStats(vocabularyData, completedWords);

  const { 
    getCurrentWord, 
    wordCounter, 
    headerTitle, 
    categories, 
    showDetailedProgress, 
    handleToggleProgressDetails 
  } = useVocabularyDisplay(vocabularyData, categoryIndex, wordIndex, level, finalMode);

  // === NAVIGATION (INCHANGÉ) ===
  const handleComplete = useCallback((message) => {
    Alert.alert("Félicitations", message);
    navigation.goBack();
  }, [navigation]);

  const { 
    handleNext, 
    handlePrevious, 
    handleCategoryChange, 
    canGoToPrevious, 
    isLastWordInExercise 
  } = useVocabularyNavigation({
    vocabularyData, 
    categoryIndex, 
    wordIndex, 
    completedWords, 
    mode: finalMode, 
    level,
    markWordAsCompleted, 
    saveLastPosition, 
    goToNextWord, 
    goToPreviousWord, 
    changeCategory, 
    restoreState,
    onComplete: handleComplete,
  });

  // === HANDLERS UI (INCHANGÉ) ===
  const handleCategoryProgressPress = useCallback((index) => {
    handleCategoryChange(index);
  }, [handleCategoryChange]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // === LOADING STATE MODERNE ===
  if (!isFullyLoaded) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} />
          <Text style={[styles.loadingText, { color: levelColor }]}>
            Loading your vocabulary...
          </Text>
        </View>
      </Container>
    );
  }

  // === CONTENU PRINCIPAL OPTIMISÉ ===
  const renderMainContent = () => (
    <>
      {/* 🏆 Header (inchangé) */}
      <VocabularyHeader
        level={level}
        mode={finalMode}
        onBackPress={handleBackPress}
      />

      {/* 📊 Progress - Utilise maintenant ProgressCard générique */}
      <VocabularyProgress
        vocabularyData={vocabularyData}
        completedWords={completedWords}
        levelColor={levelColor}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onCategoryPress={handleCategoryProgressPress}
      />

      {/* 🎨 Category Selector (inchangé) */}
      <VocabularyCategorySelector
        categories={categories}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      {/* ⭐ Word Section - Utilise maintenant HeroCard + RevealButton + ContentSection */}
      <VocabularyWordSection
        currentWord={getCurrentWord}
        wordCounter={wordCounter}
        mode={finalMode}
        level={level}
        levelColor={levelColor}
        showTranslation={showTranslation}
        onToggleTranslation={toggleTranslation}
      />

      {/* ⏭️ Navigation (inchangé) */}
      <VocabularyNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoPrevious={canGoToPrevious()}
        isLast={isLastWordInExercise()}
        levelColor={levelColor}
      />
    </>
  );

  // === RENDU PRINCIPAL OPTIMISÉ ===
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
        contentContainerStyle: styles.scrollContent
      }}
    >
      {renderMainContent()}
    </Container>
  );
};

export default VocabularyExercise;