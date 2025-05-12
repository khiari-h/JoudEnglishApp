import React, { useMemo, useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, ScrollView } from "react-native";
import { router } from "expo-router";

import VocabularyHeader from "./VocabularyHeader";
import VocabularyNavigation from "./VocabularyNavigation";
import VocabularyWordCard from "./VocabularyWordCard";
import VocabularyCategorySelector from "./VocabularyCategorySelector";
// Import retiré: VocabularyCardIndicators
import VocabularyProgress from "./VocabularyProgress";
import LearningTipCard from "./LearningTipCard";

import { getVocabularyData } from "../../../utils/vocabulary/vocabularyDataHelper";
import { LANGUAGE_LEVELS } from "../../../utils/constants";
import {
  calculateTotalWords,
  calculateCompletedWordsCount,
  calculateTotalProgress,
} from "../../../utils/vocabulary/vocabularyStats";

import useVocabularyProgress from "./hooks/useVocabularyProgress";
import useVocabularyExerciseState from "./hooks/useVocabularyExerciceState";

const VocabularyExercise = ({ route }) => {
  const { level } = route.params;
  const vocabularyData = useMemo(() => getVocabularyData(level), [level]);
  const levelColor = LANGUAGE_LEVELS[level]?.color || "#5E60CE";
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // Utiliser le hook pour gérer la progression
  const {
    completedWords,
    lastPosition,
    loaded,
    markWordAsCompleted,
    saveLastPosition,
    initializeProgress,
  } = useVocabularyProgress(level);

  // Initialiser le hook d'état avec des valeurs par défaut
  // (il sera mis à jour une fois lastPosition chargé)
  const {
    categoryIndex,
    wordIndex,
    showTranslation,
    restoreState,
    goToPreviousWord,
    goToNextWord,
    changeCategory,
    toggleTranslation,
  } = useVocabularyExerciseState(level, 0, 0);

  // Restaurer l'état une fois les données chargées
  useEffect(() => {
    if (loaded && lastPosition) {
      restoreState(lastPosition.categoryIndex, lastPosition.wordIndex);
    }
  }, [loaded, lastPosition, restoreState]);

  // Initialiser la progression une fois les données chargées
  useEffect(() => {
    if (loaded && vocabularyData) {
      initializeProgress(vocabularyData);
    }
  }, [loaded, vocabularyData, initializeProgress]);

  // Affiche le spinner pendant le chargement des données
  if (!loaded || !vocabularyData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={levelColor} />
        <Text style={{ marginTop: 10 }}>Chargement...</Text>
      </View>
    );
  }

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

  const handleToggleProgressDetails = () => {
    setShowDetailedProgress(!showDetailedProgress);
  };

  const handleCategoryProgressPress = (index) => {
    handleCategoryChange(index);
  };

  const currentWord = getCurrentWord();
  const currentCategory = vocabularyData?.exercises?.[categoryIndex] || {};

  // Affichage du compteur de mots pour remplacer les points
  const wordCounter = `${wordIndex + 1} / ${currentCategory?.words?.length || 0}`;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <VocabularyHeader
        level={level}
        progress={0}
        completedWords={0}
        totalWords={0}
        levelColor={levelColor}
        onBackPress={() => router.back()}
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
        categories={vocabularyData?.exercises?.map((cat) => cat.title) || []}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      {/* Ajout d'un compteur de mots textuel pour remplacer les points */}
      <View style={{ 
        padding: 10, 
        alignItems: 'center', 
        marginVertical: 5 
      }}>
        <Text style={{ 
          color: levelColor, 
          fontWeight: 'bold',
          fontSize: 16
        }}>
          {wordCounter}
        </Text>
      </View>

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
        level={level}
        levelColor={levelColor}
      />

      <VocabularyNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoPrevious={wordIndex > 0}
        isLast={isLastWordInExercise()}
        levelColor={levelColor}
      />
    </ScrollView>
  );
};

export default VocabularyExercise;