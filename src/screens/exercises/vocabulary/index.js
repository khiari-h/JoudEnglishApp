import React, { useMemo, useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants
import VocabularyHeader from "./VocabularyHeader";
import VocabularyNavigation from "./VocabularyNavigation";
import VocabularyWordCard from "./VocabularyWordCard";
import VocabularyCategorySelector from "./VocabularyCategorySelector";
import VocabularyProgress from "./VocabularyProgress";
import LearningTipCard from "./LearningTipCard";
import VocabularyModeSelector from "./VocabularyModeSelector"; // Import du sélecteur

// Utils et hooks
import {
  getVocabularyData,
  isBonusLevel,
  getLevelDisplayName,
  getLevelColor,
} from "../../../utils/vocabulary/vocabularyDataHelper";
import { LANGUAGE_LEVELS } from "../../../utils/constants";
import {
  calculateTotalWords,
  calculateCompletedWordsCount,
  calculateTotalProgress,
} from "../../../utils/vocabulary/vocabularyStats";

import useVocabularyProgress from "./hooks/useVocabularyProgress";
import useVocabularyExerciseState from "./hooks/useVocabularyExerciceState";

const VocabularyExercise = ({ route }) => {
  // Récupération des paramètres
  const { level, mode: initialMode } = route.params;

  // State local pour gérer le mode sélectionné
  const [selectedMode, setSelectedMode] = useState(initialMode);

  // === LOGIQUE D'ASSEMBLAGE ===
  // Si pas de mode ET pas BLevel → Afficher VocabularyModeSelector
  const shouldShowModeSelector = !selectedMode && !isBonusLevel(level);

  // Si BLevel ET pas de mode → Mode fast automatique
  const finalMode = selectedMode || (isBonusLevel(level) ? "fast" : "classic");

  // Fonction pour gérer la sélection du mode
  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  // === ASSEMBLAGE DES COMPOSANTS ===
  if (shouldShowModeSelector) {
    return (
      <VocabularyModeSelector route={route} onModeSelect={handleModeSelect} />
    );
  }

  // === EXERCICE DE VOCABULAIRE ===
  return <VocabularyExerciseContent level={level} mode={finalMode} />;
};

// Composant séparé pour l'exercice de vocabulaire
const VocabularyExerciseContent = ({ level, mode }) => {
  const navigation = useNavigation();
  const levelColor = getLevelColor(level);
  const vocabularyData = useMemo(() => {

    const data = getVocabularyData(level, mode);

    return data;
  }, [level, mode]);
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // Hook de progression avec identifiant unique par niveau ET mode
  const progressKey = `${level}_${mode}`;

  const {
    completedWords,
    lastPosition,
    loaded,
    markWordAsCompleted,
    saveLastPosition,
    initializeProgress,
  } = useVocabularyProgress(progressKey);

  // Hook d'état avec clé unique
  const {
    categoryIndex,
    wordIndex,
    showTranslation,
    restoreState,
    goToPreviousWord,
    goToNextWord,
    changeCategory,
    toggleTranslation,
  } = useVocabularyExerciseState(progressKey, 0, 0);

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

  // Calculs de statistiques avec vocabularyStats
  const totalWords = useMemo(() => {
    return calculateTotalWords(vocabularyData?.exercises || []);
  }, [vocabularyData]);

  const completedWordsCount = useMemo(() => {
    return calculateCompletedWordsCount(completedWords);
  }, [completedWords]);

  const totalProgress = useMemo(() => {
    return calculateTotalProgress(
      vocabularyData?.exercises || [],
      completedWords
    );
  }, [completedWords, vocabularyData]);

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
    if (category?.words && wordIndex < category.words.length) {
      return category.words[wordIndex];
    }
    return { word: "", translation: "", definition: "", example: "" };
  };

  const isLastWordInExercise = () => {
    const category = vocabularyData?.exercises?.[categoryIndex];
    return (
      category?.words && wordIndex === category.words.length - 1
    );
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
        const completionMessage =
          mode === "fast"
            ? `Félicitations ! Vous avez terminé le Fast Vocabulary ${level} !`
            : `Félicitations ! Vous avez terminé le vocabulaire ${level} !`;

        Alert.alert("Félicitations", completionMessage);
        navigation.goBack();
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
  const wordCounter = `${wordIndex + 1} / ${
    currentCategory?.words?.length || 0
  }`;

  // Titre adapté selon le mode et le niveau
  const getHeaderTitle = () => {
    const displayName = getLevelDisplayName(level);
    if (mode === "fast") {
      return isBonusLevel(level) ? displayName : `${displayName} - Fast`;
    }
    return displayName;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <VocabularyHeader
        level={level}
        mode={mode}
        title={getHeaderTitle()}
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
        categories={vocabularyData?.exercises?.map((cat) => cat.title) || []}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      <View
        style={{
          padding: 10,
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <Text
          style={{
            color: levelColor,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {wordCounter}
        </Text>
        {mode === "fast" && (
          <Text
            style={{
              color: "#f59e0b",
              fontSize: 12,
              fontWeight: "600",
              marginTop: 2,
              textTransform: "uppercase",
            }}
          >
            {isBonusLevel(level) ? "Bonus Level" : "Fast Mode"}
          </Text>
        )}
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

      <LearningTipCard level={level} mode={mode} levelColor={levelColor} />

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

