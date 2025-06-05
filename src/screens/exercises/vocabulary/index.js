import React, { useMemo, useState, useCallback } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Composants
import VocabularyHeader from "./VocabularyHeader";
import VocabularyNavigation from "./VocabularyNavigation";
import VocabularyWordSection from "./VocabularyWordSection";
import VocabularyCategorySelector from "./VocabularyCategorySelector";
import VocabularyProgress from "./VocabularyProgress";
import LearningTipCard from "./LearningTipCard";
import VocabularyModeSelector from "./VocabularyModeSelector";

// Utils
import { getVocabularyData, isBonusLevel, getLevelColor } from "../../../utils/vocabulary/vocabularyDataHelper";

// Hooks spécialisés
import useVocabularyProgress from "./hooks/useVocabularyProgress";
import useVocabularyExerciseState from "./hooks/useVocabularyExerciceState";
import useVocabularyNavigation from "./hooks/useVocabularyNavigation";
import useVocabularyStats from "./hooks/useVocabularyStats";
import useVocabularyDisplay from "./hooks/useVocabularyDisplay";
import useVocabularyLoader from "./hooks/useVocabularyLoader";

const VocabularyExercise = ({ route }) => {
  const { level, mode: initialMode } = route.params;
  const [selectedMode, setSelectedMode] = useState(initialMode);

  const shouldShowModeSelector = !selectedMode && !isBonusLevel(level);
  const finalMode = selectedMode || (isBonusLevel(level) ? "fast" : "classic");

  const handleModeSelect = useCallback((mode) => setSelectedMode(mode), []);

  if (shouldShowModeSelector) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <VocabularyModeSelector route={route} onModeSelect={handleModeSelect} />
      </Container>
    );
  }

  return <VocabularyExerciseContent level={level} mode={finalMode} />;
};

// 🎯 Composant principal OPTIMISÉ avec Container SafeArea
const VocabularyExerciseContent = ({ level, mode }) => {
  const navigation = useNavigation();
  const levelColor = getLevelColor(level);

  // === DONNÉES DE BASE ===
  const vocabularyData = useMemo(() => getVocabularyData(level, mode), [level, mode]);
  const progressKey = useMemo(() => `${level}_${mode}`, [level, mode]);

  // === HOOKS EXISTANTS ===
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

  // === HOOK DE CHARGEMENT - GÈRE TOUS LES EFFETS ===
  const { isFullyLoaded } = useVocabularyLoader({
    loaded,
    vocabularyData,
    lastPosition,
    restoreState,
    initializeProgress
  });

  // === HOOKS SPÉCIALISÉS ===
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
  } = useVocabularyDisplay(vocabularyData, categoryIndex, wordIndex, level, mode);

  // === NAVIGATION ===
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
    mode, 
    level,
    markWordAsCompleted, 
    saveLastPosition, 
    goToNextWord, 
    goToPreviousWord, 
    changeCategory, 
    restoreState,
    onComplete: handleComplete,
  });

  // === HANDLERS UI ===
  const handleCategoryProgressPress = useCallback((index) => {
    handleCategoryChange(index);
  }, [handleCategoryChange]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // === LOADING STATE ===
  if (!isFullyLoaded) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={levelColor} />
          <Text style={{ marginTop: 10, color: "#666", fontSize: 16 }}>
            Chargement...
          </Text>
        </View>
      </Container>
    );
  }

  // === CONTENU PRINCIPAL ===
  const renderMainContent = () => (
    <>
      <VocabularyHeader
        level={level}
        mode={mode}
        title={headerTitle}
        progress={totalProgress}
        completedWords={completedWordsCount}
        totalWords={totalWords}
        levelColor={levelColor}
        onBackPress={handleBackPress}
      />

      <VocabularyProgress
        vocabularyData={vocabularyData}
        completedWords={completedWords}
        levelColor={levelColor}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onCategoryPress={handleCategoryProgressPress}
      />

      <VocabularyCategorySelector
        categories={categories}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      <VocabularyWordSection
        currentWord={getCurrentWord}
        wordCounter={wordCounter}
        mode={mode}
        level={level}
        levelColor={levelColor}
        showTranslation={showTranslation}
        onToggleTranslation={toggleTranslation}
      />

      <LearningTipCard 
        level={level} 
        mode={mode} 
        levelColor={levelColor} 
      />

      <VocabularyNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoPrevious={canGoToPrevious()}
        isLast={isLastWordInExercise()}
        levelColor={levelColor}
      />
    </>
  );

  // === RENDU OPTIMISÉ AVEC CONTAINER SAFEAREA ===
  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL} // SafeArea complète pour les exercices
      withScrollView
      backgroundColor="#f8fafc"
      statusBarStyle="dark-content"
      withPadding={false} // Pas de padding global, géré par les composants internes
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        contentContainerStyle: { paddingBottom: 100 } // Espace pour navigation
      }}
    >
      {renderMainContent()}
    </Container>
  );
};

export default VocabularyExercise;