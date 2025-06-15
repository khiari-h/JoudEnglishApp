// VocabularyExercise/index.js - VERSION AVEC SAUVEGARDE ACTIVITÉ
import React, { useMemo, useState, useEffect } from "react";
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
import useLastActivity from "../../../hooks/useLastActivity"; // ✅ AJOUTÉ
import { getVocabularyData, isBonusLevel, getLevelColor } from "../../../utils/vocabulary/vocabularyDataHelper";
import createStyles from "./style";

/**
 * 🎯 VocabularyExercise - VERSION AVEC SAUVEGARDE ACTIVITÉ
 */
const VocabularyExercise = ({ route }) => {
  const { level, mode } = route.params;
  const navigation = useNavigation();
  const styles = createStyles();

  // ✅ AJOUTÉ : Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();

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

  // ✅ AJOUTÉ : Sauvegarder l'activité à chaque changement de mot
  useEffect(() => {
    // ✅ CONDITION SIMPLIFIÉE : Pas besoin de categories obligatoire
    if (loaded && vocabularyData && currentWord && wordIndex < 100) { // ✅ Protection contre boucle
      // ✅ CORRIGÉ : Gère les 3 structures de données
      let totalWords = 15; // fallback par défaut
      
      if (vocabularyData.categories && Array.isArray(vocabularyData.categories)) {
        // Mode classic : { categories: [...] }
        totalWords = vocabularyData.categories.reduce((total, cat) => total + (cat.words?.length || 0), 0);
      } else if (vocabularyData.exercises && Array.isArray(vocabularyData.exercises)) {
        // Mode fast : { exercises: [...] }  
        totalWords = vocabularyData.exercises.reduce((total, ex) => total + (ex.words?.length || 0), 0);
      } else if (vocabularyData.words && Array.isArray(vocabularyData.words)) {
        // Structure directe : { words: [...] }
        totalWords = vocabularyData.words.length;
      }

      const currentWordNumber = wordIndex + 1;

      const activityData = {
        title: `Vocabulaire ${finalMode === "fast" ? "Fast" : ""}`,
        level: level,
        type: "vocabulary",
        mode: finalMode,
        metadata: {
          word: Math.max(0, currentWordNumber - 1), // Index pour la progression
          totalWords: totalWords, // ✅ Maintenant correct !
          category: currentCategory?.name || "Général",
          categoryIndex: categoryIndex,
          wordIndex: wordIndex
        }
      };

      console.log("✅ Activity saved:", `${activityData.title} - Mot ${currentWordNumber}/${totalWords}`); // ✅ Devrait afficher 80 maintenant
      saveActivity(activityData);
    }
  }, [loaded, vocabularyData, currentWord, wordIndex, categoryIndex, level, finalMode, currentCategory]); // ✅ ENLEVÉ saveActivity des dépendances

  // Handlers
  const handleBackPress = () => navigation.goBack();
  
  const handleCategoryChange = (index) => changeCategory(index);

  const handleCategoryProgressPress = (index) => changeCategory(index);

  const handleToggleProgressDetails = () => toggleDetailedProgress();

  const handleNextWord = () => {
    const result = handleNext();
    if (result.completed) {
      // ✅ AJOUTÉ : Nettoyer l'activité quand terminé
      // Note: Tu peux garder l'activité ou la supprimer selon tes besoins
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