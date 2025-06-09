// PhrasesExercise/index.js - VERSION avec PhrasesProgress (cohérence nomenclature)

import React, { useMemo, useCallback } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Composants refactorisés
import PhrasesHeader from "./PhrasesHeader";
import PhrasesCategorySelector from "./PhrasesCategorySelector";
import PhrasesProgress from "./PhrasesProgress"; // ← Renommé pour cohérence
import PhraseCard from "./PhraseCard";
import PhrasesNavigation from "./PhrasesNavigation";

// Hooks personnalisés
import usePhrasesExerciseState from "./hooks/usePhrasesExerciseState";
import usePhrasesProgress from "./hooks/usePhrasesProgress";
import usePhrasesDisplay from "./hooks/usePhrasesDisplay"; // ← Pattern identique à Vocabulary

// Utilitaires
import {
  getPhrasesData,
  getLevelColor,
} from "../../../utils/phrases/phrasesDataHelper";

// Styles
import createStyles from "./style";

/**
 * 🏆 PhrasesExercise - Architecture identique à VocabularyExercise
 * - Utilise usePhrasesDisplay pour la logique d'affichage
 * - Pattern cohérent avec VocabularyExercise et ReadingExercise
 * - Gestion d'état centralisée dans les hooks
 */
const PhrasesExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // Récupérer les données et la couleur du niveau
  const levelColor = getLevelColor(level);
  const phrasesData = useMemo(() => getPhrasesData(level), [level]);

  // Hooks existants (logique métier)
  const { 
    completedPhrases,
    lastPosition,
    loaded, 
    saveLastPosition,
    markPhraseAsCompleted 
  } = usePhrasesProgress(level);

  const {
    categoryIndex,
    phraseIndex,
    showTranslation,
    completionProgress,
    changeCategory,
    goToNextPhrase,
    goToPreviousPhrase,
    toggleTranslation,
  } = usePhrasesExerciseState(level, phrasesData);

  // ✅ Hook d'affichage (pattern identique à VocabularyExercise)
  const {
    getCurrentPhrase,
    phraseCounter,
    headerTitle,
    categories,
    currentCategory,
    currentPhrases,
    showDetailedProgress,
    handleToggleProgressDetails,
  } = usePhrasesDisplay(phrasesData, categoryIndex, phraseIndex, level);

  // Effets et logique métier (inchangés)
  React.useEffect(() => {
    if (loaded && lastPosition && phrasesData) {
      if (lastPosition.categoryIndex !== categoryIndex) {
        changeCategory(lastPosition.categoryIndex);
      }
    }
  }, [loaded, lastPosition, phrasesData, categoryIndex, changeCategory]);

  // Fonction pour trouver la prochaine catégorie incomplète (inchangée)
  const findNextUncompletedCategory = useCallback(() => {
    const totalCategories = phrasesData?.categories?.length || 0;
    for (let i = 1; i <= totalCategories; i++) {
      const nextIndex = (categoryIndex + i) % totalCategories;
      const category = phrasesData.categories[nextIndex];
      const categoryPhrases = phrasesData.phrases?.filter(p => p.categoryId === category.id) || [];
      const completedInCategory = completedPhrases[nextIndex]?.length || 0;
      if (completedInCategory < categoryPhrases.length) {
        return nextIndex;
      }
    }
    return -1;
  }, [phrasesData, categoryIndex, completedPhrases]);

  // Gestionnaires d'événements (inchangés)
  const handleNext = useCallback(() => {
    markPhraseAsCompleted(categoryIndex, phraseIndex, currentPhrases[phraseIndex]);

    if (phraseIndex < currentPhrases.length - 1) {
      goToNextPhrase();
      saveLastPosition(categoryIndex, phraseIndex + 1);
    } else {
      const nextCategoryIndex = findNextUncompletedCategory();
      if (nextCategoryIndex === -1) {
        Alert.alert(
          "Félicitations",
          "Vous avez terminé tous les exercices de phrases !"
        );
        navigation.goBack();
      } else {
        changeCategory(nextCategoryIndex);
        saveLastPosition(nextCategoryIndex, 0);
      }
    }
  }, [
    markPhraseAsCompleted, 
    categoryIndex, 
    phraseIndex, 
    currentPhrases, 
    goToNextPhrase, 
    saveLastPosition, 
    findNextUncompletedCategory, 
    changeCategory, 
    navigation
  ]);

  const handlePrevious = useCallback(() => {
    goToPreviousPhrase();
    if (phraseIndex > 0) {
      saveLastPosition(categoryIndex, phraseIndex - 1);
    }
  }, [goToPreviousPhrase, phraseIndex, saveLastPosition, categoryIndex]);

  const handleCategoryChange = useCallback((newIndex) => {
    changeCategory(newIndex);
    saveLastPosition(newIndex, 0);
  }, [changeCategory, saveLastPosition]);

  React.useEffect(() => {
    if (loaded && currentPhrases.length > 0) {
      saveLastPosition(categoryIndex, phraseIndex);
    }
  }, [categoryIndex, phraseIndex, loaded, currentPhrases.length, saveLastPosition]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Calculer les statistiques pour ProgressCard
  const completedCount = Object.values(completedPhrases).reduce((acc, phrases) => acc + phrases.length, 0);
  const totalCount = phrasesData?.phrases?.length || 0;

  // ========== ÉCRAN DE CHARGEMENT ==========
  if (!loaded || !phrasesData) {
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
            Loading phrases...
          </Text>
        </View>
      </Container>
    );
  }

  // ========== ÉTAT VIDE ==========
  if (currentPhrases.length === 0) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <PhrasesHeader
          level={level}
          onBackPress={handleBackPress}
        />
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No phrases available in this category.
          </Text>
        </View>
      </Container>
    );
  }

  // ========== CONTENU PRINCIPAL ==========
  const renderMainContent = () => (
    <>
      {/* Header */}
      <PhrasesHeader
        level={level}
        onBackPress={handleBackPress}
      />

      {/* Category Selector */}
      <PhrasesCategorySelector
        categories={categories}
        selectedIndex={categoryIndex}
        onSelectCategory={handleCategoryChange}
        levelColor={levelColor}
      />

      {/* Progress - Avec état géré par usePhrasesDisplay */}
      <PhrasesProgress
        progress={completionProgress}
        currentPhrase={phraseIndex + 1}
        totalPhrases={currentPhrases.length}
        completedCount={completedCount}
        levelColor={levelColor}
        phrasesData={phrasesData}
        completedPhrases={completedPhrases}
        expanded={showDetailedProgress} // ← Du hook usePhrasesDisplay
        onToggleExpand={handleToggleProgressDetails} // ← Du hook usePhrasesDisplay
        onCategoryPress={handleCategoryChange}
      />

      {/* Phrase Card */}
      <View style={styles.contentContainer}>
        <View style={styles.categoryTitleContainer}>
          <Text style={styles.categoryTitle}>
            {currentCategory?.name || "Category"}
          </Text>
        </View>

        {getCurrentPhrase ? (
          <PhraseCard
            phraseData={getCurrentPhrase} // ← Du hook usePhrasesDisplay
            showTranslation={showTranslation}
            onToggleTranslation={toggleTranslation}
            levelColor={levelColor}
          />
        ) : (
          <View style={styles.phrasePlaceholder}>
            <Text>Phrase not available</Text>
          </View>
        )}
      </View>

      {/* Navigation */}
      <PhrasesNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        disablePrevious={phraseIndex === 0}
        disableNext={phraseIndex === currentPhrases.length - 1}
        isLast={phraseIndex === currentPhrases.length - 1}
        levelColor={levelColor}
      />
    </>
  );

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
      {renderMainContent()}
    </Container>
  );
};

export default PhrasesExercise;