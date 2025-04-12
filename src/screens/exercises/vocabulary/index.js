import React, { useEffect, useMemo } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";

import VocabularyHeader from "./VocabularyHeader";
import VocabularyNavigation from "./VocabularyNavigation";
import VocabularyWordCard from "./VocabularyWordCard";
import VocabularyCategorySelector from "./VocabularyCategorySelector";
import VocabularyCardIndicators from "./VocabularyCardIndicators";
import LearningTipCard from "./LearningTipCard";

import { getVocabularyData } from "../../../utils/vocabulary/vocabularyDataHelper";
import { LANGUAGE_LEVELS } from "../../../utils/constants";
import {
  calculateTotalWords,
  calculateCompletedWordsCount,
  calculateTotalProgress,
} from "../../../utils/vocabulary/vocabularyStats";

import useVocabularyProgress from "./hooks/useVocabularyProgress";
import useVocabularyExerciseState from "./hooks/useVocabularyExerciseState"

const VocabularyExercise = ({ route }) => {
  const { level } = route.params;
  const vocabularyData = useMemo(() => getVocabularyData(level), [level]);

  const {
    completedWords,
    lastPosition,
    loaded,
    markWordAsCompleted,
    saveLastPosition,
    initializeProgress,
  } = useVocabularyProgress(level);

  const {
    categoryIndex,
    wordIndex,
    showTranslation,
    restoreState,
    goToPreviousWord,
    goToNextWord,
    changeCategory,
    toggleTranslation,
  } = useVocabularyExerciseState(level);

  useEffect(() => {
    if (!loaded || !vocabularyData) return;
    initializeProgress(vocabularyData);
    if (lastPosition) {
      restoreState(lastPosition.categoryIndex, lastPosition.wordIndex);
    }
  }, [loaded, vocabularyData, lastPosition, initializeProgress, restoreState]);

  const getCurrentWord = () => {
    const category = vocabularyData?.exercises?.[categoryIndex];
    if (category && category.words && wordIndex < category.words.length) {
      return category.words[wordIndex];
    }
    return { word: "", translation: "", definition: "", example: "" };
  };

  const isLastWordInExercise = () => {
    const category = vocabularyData?.exercises?.[categoryIndex];
    return category && category.words && wordIndex === category.words.length - 1;
  };

  const findNextUncompletedCategory = () => {
    const totalCategories = vocabularyData?.exercises?.length || 0;
    for (let i = 1; i <= totalCategories; i++) {
      const nextIndex = (categoryIndex + i) % totalCategories;
      const category = vocabularyData.exercises[nextIndex];
      const completedInCategory = completedWords[nextIndex]?.length || 0;
      if (completedInCategory < (category.words?.length || 0)) {
        return nextIndex;
      }
    }
    return -1;
  };

  const handleNext = () => {
    const category = vocabularyData.exercises[categoryIndex];
    if (!category) return;
    markWordAsCompleted(categoryIndex, wordIndex);
    if (wordIndex < category.words.length - 1) {
      goToNextWord();
      saveLastPosition(categoryIndex, wordIndex + 1);
    } else {
      const nextCategoryIndex = findNextUncompletedCategory();
      if (nextCategoryIndex === -1) {
        Alert.alert(
          "Félicitations",
          "Vous avez terminé tous les exercices de vocabulaire !"
        );
        router.back();
      } else {
        changeCategory(nextCategoryIndex);
        saveLastPosition(nextCategoryIndex, 0);
      }
    }
  };

  const handlePrevious = () => {
    if (goToPreviousWord()) {
      saveLastPosition(categoryIndex, wordIndex - 1);
    }
  };

  const handleCategoryChange = (newIndex) => {
    changeCategory(newIndex);
    saveLastPosition(newIndex, 0);
  };

  const currentWord = getCurrentWord();
  const levelColor = LANGUAGE_LEVELS[level]?.color || "#5E60CE";

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={levelColor} />
        <Text style={{ marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }

  const totalWordsCount = calculateTotalWords(vocabularyData?.exercises);
  const completedWordsCount = calculateCompletedWordsCount(completedWords);
  const totalProgress = calculateTotalProgress(
    vocabularyData?.exercises,
    completedWords
  );

  const currentCategory = vocabularyData?.exercises?.[categoryIndex];
  const dotsTotal = currentCategory?.words?.length || 0;
  const dotsCompleted = completedWords[categoryIndex] || [];

  return (
    <View>
      <VocabularyHeader
        level={level}
        progress={totalProgress}
        completedWords={completedWordsCount}
        totalWords={totalWordsCount}
        levelColor={levelColor}
        onBackPress={() => router.back()}
      />

      <VocabularyCategorySelector
        categories={vocabularyData?.exercises?.map((cat) => cat.title) || []}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      <VocabularyCardIndicators
        totalWords={dotsTotal}
        currentIndex={wordIndex}
        completedIndices={dotsCompleted}
        onSelectWord={(index) => {
          saveLastPosition(categoryIndex, index);
          restoreState(categoryIndex, index);
        }}
        levelColor={levelColor}
      />

      <VocabularyWordCard
        word={currentWord.word || ""}
        translation={currentWord.translation || ""}
        definition={currentWord.definition || ""}
        example={currentWord.example || ""}
        showTranslation={showTranslation}
        onToggleTranslation={toggleTranslation}
        levelColor={levelColor}
      />

      <LearningTipCard
        tipText="Utilise ce mot dans une phrase pour mieux le retenir !"
        onDismiss={() => {}}
      />

      <VocabularyNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoPrevious={wordIndex > 0}
        isLast={isLastWordInExercise()}
        levelColor={levelColor}
      />
    </View>
  );
};

export default VocabularyExercise;
