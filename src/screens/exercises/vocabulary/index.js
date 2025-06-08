import React, { useMemo, useCallback } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Composants LDC - Tous redesignés niveau Champions League
import VocabularyHeader from "./VocabularyHeader";
import VocabularyNavigation from "./VocabularyNavigation";
import VocabularyWordSection from "./VocabularyWordSection";
import VocabularyCategorySelector from "./VocabularyCategorySelector";
import VocabularyProgress from "./VocabularyProgress";
// 🧹 LearningTipCard SUPPRIMÉ - Mode PSG épuré, focus sur l'essentiel

// Utils
import { getVocabularyData, isBonusLevel, getLevelColor } from "../../../utils/vocabulary/vocabularyDataHelper";

// Hooks spécialisés
import useVocabularyProgress from "./hooks/useVocabularyProgress";
import useVocabularyExerciseState from "./hooks/useVocabularyExerciceState";
import useVocabularyNavigation from "./hooks/useVocabularyNavigation";
import useVocabularyStats from "./hooks/useVocabularyStats";
import useVocabularyDisplay from "./hooks/useVocabularyDisplay";
import useVocabularyLoader from "./hooks/useVocabularyLoader";

/**
 * 🏆 VocabularyExercise - Version Niveau LDC (Paris Saint-Germain)
 * - Mode épuré : focus total sur l'apprentissage du vocabulaire
 * - Tous les composants redesignés avec glassmorphism et animations
 * - Architecture simplifiée et efficace
 * - Comme Enrique : que l'essentiel, rien de superflu
 */
const VocabularyExercise = ({ route }) => {
  const { level, mode } = route.params;
  const navigation = useNavigation();

  // 🎯 LOGIQUE SIMPLIFIÉE : Mode obligatoire depuis ExerciseSelection
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

  // === LOADING STATE AMÉLIORÉ ===
  if (!isFullyLoaded) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <View style={{ 
          flex: 1, 
          justifyContent: "center", 
          alignItems: "center",
          paddingHorizontal: 20 
        }}>
          <ActivityIndicator size="large" color={levelColor} />
          <Text style={{ 
            marginTop: 16, 
            color: "#666", 
            fontSize: 16,
            fontWeight: "500",
            textAlign: "center",
            letterSpacing: 0.3
          }}>
            Chargement de votre vocabulaire...
          </Text>
        </View>
      </Container>
    );
  }

  // === CONTENU PRINCIPAL - VERSION ÉPURÉE LDC ===
  const renderMainContent = () => (
    <>
      {/* 🏆 Header premium avec glassmorphism */}
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

      {/* 📊 Progression avec animations et glassmorphism */}
      <VocabularyProgress
        vocabularyData={vocabularyData}
        completedWords={completedWords}
        levelColor={levelColor}
        expanded={showDetailedProgress}
        onToggleExpand={handleToggleProgressDetails}
        onCategoryPress={handleCategoryProgressPress}
      />

      {/* 🎨 Sélecteur de catégories avec pills modernes */}
      <VocabularyCategorySelector
        categories={categories}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      {/* ⭐ Section principale - Le mot héro avec glassmorphism */}
      <VocabularyWordSection
        currentWord={getCurrentWord}
        wordCounter={wordCounter}
        mode={finalMode}
        level={level}
        levelColor={levelColor}
        showTranslation={showTranslation}
        onToggleTranslation={toggleTranslation}
      />

      {/* 
        🧹 LearningTipCard SUPPRIMÉ pour mode épuré
        - Focus total sur l'apprentissage du vocabulaire
        - Interface plus clean et moderne
        - Comme Enrique : que l'efficacité, rien de superflu
      */}

      {/* ⏭️ Navigation avec glassmorphism et micro-interactions */}
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
        contentContainerStyle: { 
          paddingBottom: 120, // Un peu plus d'espace en bas
          minHeight: '100%' // Assure que le contenu prend toute la hauteur
        }
      }}
    >
      {renderMainContent()}
    </Container>
  );
};

export default VocabularyExercise;