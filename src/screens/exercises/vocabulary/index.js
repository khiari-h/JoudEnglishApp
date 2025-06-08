import React, { useMemo, useCallback } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
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

// Utils
import { getVocabularyData, isBonusLevel, getLevelColor } from "../../../utils/vocabulary/vocabularyDataHelper";

// Hooks spécialisés
import useVocabularyProgress from "./hooks/useVocabularyProgress";
import useVocabularyExerciseState from "./hooks/useVocabularyExerciceState";
import useVocabularyNavigation from "./hooks/useVocabularyNavigation";
import useVocabularyStats from "./hooks/useVocabularyStats";
import useVocabularyDisplay from "./hooks/useVocabularyDisplay";
import useVocabularyLoader from "./hooks/useVocabularyLoader";

// 🎯 COMPOSANT SIMPLIFIÉ - PAS DE SÉLECTEUR DE MODE
const VocabularyExercise = ({ route }) => {
  const { level, mode } = route.params;
  const navigation = useNavigation();

  // 🎯 NOUVELLE LOGIQUE : Mode obligatoire depuis ExerciseSelection
  // Si pas de mode, fallback sur classic (sécurité)
  const finalMode = mode || (isBonusLevel(level) ? "fast" : "classic");
  
  const levelColor = getLevelColor(level);

  // === DONNÉES DE BASE ===
  const vocabularyData = useMemo(() => getVocabularyData(level, finalMode), [level, finalMode]);
  const progressKey = useMemo(() => `${level}_${finalMode}`, [level, finalMode]);

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

  // === HOOK DE CHARGEMENT ===
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
  } = useVocabularyDisplay(vocabularyData, categoryIndex, wordIndex, level, finalMode);

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
        mode={finalMode}
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
        mode={finalMode}
        level={level}
        levelColor={levelColor}
        showTranslation={showTranslation}
        onToggleTranslation={toggleTranslation}
      />

      <LearningTipCard 
        level={level} 
        mode={finalMode} 
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

  // === RENDU PRINCIPAL ===
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
        contentContainerStyle: { paddingBottom: 100 }
      }}
    >
      {renderMainContent()}
    </Container>
  );
};

export default VocabularyExercise;