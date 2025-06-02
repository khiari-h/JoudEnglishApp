import React, { useMemo, useEffect, useState, useCallback } from "react";
import { View, Text, ActivityIndicator, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants
import VocabularyHeader from "./VocabularyHeader";
import VocabularyNavigation from "./VocabularyNavigation";
import VocabularyWordSection from "./components/VocabularyWordSection"; // 🔥 NOUVEAU COMPOSANT
import VocabularyCategorySelector from "./VocabularyCategorySelector";
import VocabularyProgress from "./VocabularyProgress";
import LearningTipCard from "./LearningTipCard";
import VocabularyModeSelector from "./VocabularyModeSelector";

// Utils
import { getVocabularyData, isBonusLevel, getLevelColor } from "../../../utils/vocabulary/vocabularyDataHelper";

// Hooks spécialisés
import useVocabularyProgress from "./hooks/useVocabularyProgress";
import useVocabularyExerciseState from "./hooks/useVocabularyExerciceState";
import useVocabularyNavigation from "./hooks/useVocabularyNavigation"; // 🔥 NOUVEAU HOOK
import useVocabularyStats from "./hooks/useVocabularyStats"; // 🔥 NOUVEAU HOOK  
import useVocabularyDisplay from "./hooks/useVocabularyDisplay"; // 🔥 NOUVEAU HOOK

const VocabularyExercise = ({ route }) => {
  const { level, mode: initialMode } = route.params;
  const [selectedMode, setSelectedMode] = useState(initialMode);

  // === LOGIQUE D'ASSEMBLAGE ===
  const shouldShowModeSelector = !selectedMode && !isBonusLevel(level);
  const finalMode = selectedMode || (isBonusLevel(level) ? "fast" : "classic");

  const handleModeSelect = useCallback((mode) => setSelectedMode(mode), []);

  if (shouldShowModeSelector) {
    return <VocabularyModeSelector route={route} onModeSelect={handleModeSelect} />;
  }

  return <VocabularyExerciseContent level={level} mode={finalMode} />;
};

// 🎯 Composant principal ULTRA SIMPLIFIÉ - 80 lignes max !
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

  // === NOUVEAUX HOOKS SPÉCIALISÉS ===
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

  // === NAVIGATION AVEC HOOK SPÉCIALISÉ ===
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

  // === EFFETS DE CHARGEMENT ===
  useEffect(() => {
    if (loaded && lastPosition) {
      restoreState(lastPosition.categoryIndex, lastPosition.wordIndex);
    }
  }, [loaded, lastPosition, restoreState]);

  useEffect(() => {
    if (loaded && vocabularyData) {
      initializeProgress(vocabularyData);
    }
  }, [loaded, vocabularyData, initializeProgress]);

  // === HANDLERS UI ===
  const handleCategoryProgressPress = useCallback((index) => {
    handleCategoryChange(index);
  }, [handleCategoryChange]);

  // === LOADING STATE ===
  if (!loaded || !vocabularyData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={levelColor} />
        <Text style={{ marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }

  // === RENDU ULTRA SIMPLIFIÉ ===
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <VocabularyHeader
        level={level}
        mode={mode}
        title={headerTitle}
        progress={totalProgress}
        completedWords={completedWordsCount}
        totalWords={totalWords}
        levelColor={levelColor}
        onBackPress={() => navigation.goBack()}
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
        canGoPrevious={canGoToPrevious()} // 🔥 PROBLÈME DE NAVIGATION RÉSOLU
        isLast={isLastWordInExercise()}
        levelColor={levelColor}
      />
    </ScrollView>
  );
};

export default VocabularyExercise;