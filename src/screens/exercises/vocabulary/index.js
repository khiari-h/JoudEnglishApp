import React, { useEffect, useMemo } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
// Remplacer useNavigation par router d'Expo Router
import { router } from "expo-router";

// Hooks personnalisés
import useVocabularyProgress from "./hooks/useVocabularyProgress";
import useExerciseState from "../../../hooks/useExerciseState"; // À créer si nécessaire

// Composants
import VocabularyHeader from "./VocabularyHeader";
import VocabularyNavigation from "./VocabularyNavigation";
import VocabularyWordCard from "./VocabularyWordCard";
import VocabularyCategorySelector from "./VocabularyCategorySelector";

// Utilitaires
import { getVocabularyData } from "../../../utils/vocabulary/vocabularyDataHelper";

const VocabularyExercise = ({ route }) => {
  const { level } = route.params;
  // const navigation = useNavigation();

  // Données de vocabulaire pour ce niveau
  const vocabularyData = useMemo(() => getVocabularyData(level), [level]);

  // Hooks de gestion d'état
  const {
    completedWords,
    lastPosition,
    loaded,
    markWordAsCompleted,
    saveLastPosition,
    calculateCategoryProgress,
    calculateTotalProgress,
    initializeProgress,
    resetProgress,
  } = useVocabularyProgress(level);

  const {
    selectedCategoryIndex,
    setSelectedCategoryIndex,
    currentWordIndex,
    setCurrentWordIndex,
    showTranslation,
    setShowTranslation,
  } = useExerciseState(level);

  // Initialisation et restauration de la progression
  useEffect(() => {
    initializeProgress(vocabularyData);

    // Restaurer la dernière position si disponible
    if (loaded && lastPosition) {
      setSelectedCategoryIndex(lastPosition.categoryIndex);
      setCurrentWordIndex(lastPosition.wordIndex);
    }
  }, [loaded, vocabularyData]);

  // Sauvegarde de la progression
  useEffect(() => {
    saveLastPosition(selectedCategoryIndex, currentWordIndex);
  }, [selectedCategoryIndex, currentWordIndex]);

  // AJOUTER CETTE FONCTION: Récupérer le mot actuel
  const getCurrentWord = () => {
    try {
      const currentCategory = vocabularyData.exercises[selectedCategoryIndex];
      return currentCategory.words[currentWordIndex] || {};
    } catch (error) {
      console.error("Error getting current word:", error);
      return {}; // Retourner un objet vide en cas d'erreur
    }
  };

  // AJOUTER CETTE FONCTION: Vérifier si c'est le dernier mot
  const isLastWordInExercise = () => {
    try {
      const currentCategory = vocabularyData.exercises[selectedCategoryIndex];
      return currentWordIndex === currentCategory.words.length - 1;
    } catch (error) {
      console.error("Error checking if last word:", error);
      return false;
    }
  };

  // Logique de navigation entre mots/catégories
  const handleNext = () => {
    const currentCategory = vocabularyData.exercises[selectedCategoryIndex];

    // Marquer le mot comme complété
    markWordAsCompleted(selectedCategoryIndex, currentWordIndex);

    // Logique de progression dans les mots/catégories
    if (currentWordIndex < currentCategory.words.length - 1) {
      // Mot suivant dans la même catégorie
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Fin de catégorie, trouver la prochaine
      const nextCategoryIndex = findNextUncompletedCategory();

      if (nextCategoryIndex === -1) {
        // Tous les exercices terminés
        Alert.alert(
          "Félicitations",
          "Vous avez terminé tous les exercices de vocabulaire !"
        );
        // Utiliser router.back() au lieu de navigation.goBack()
        router.back();
      } else {
        setSelectedCategoryIndex(nextCategoryIndex);
        setCurrentWordIndex(0);
      }
    }
  };

  const findNextUncompletedCategory = () => {
    const totalCategories = vocabularyData.exercises.length;
    for (let i = 1; i <= totalCategories; i++) {
      const nextIndex = (selectedCategoryIndex + i) % totalCategories;
      const category = vocabularyData.exercises[nextIndex];
      const completedInCategory = completedWords[nextIndex]?.length || 0;

      if (completedInCategory < category.words.length) {
        return nextIndex;
      }
    }
    return -1; // Tout est complété
  };

  // Rendu principal
  return (
    <View>
      <VocabularyHeader
        level={level}
        progress={calculateTotalProgress(vocabularyData.exercises)}
      />

      <VocabularyCategorySelector
        categories={vocabularyData.exercises.map((cat) => cat.title)}
        selectedIndex={selectedCategoryIndex}
        onSelectCategory={setSelectedCategoryIndex}
      />

      <VocabularyWordCard
        word={getCurrentWord()}
        showTranslation={showTranslation}
        onToggleTranslation={() => setShowTranslation(!showTranslation)}
      />

      <VocabularyNavigation
        onNext={handleNext}
        onPrevious={() => setCurrentWordIndex(currentWordIndex - 1)}
        canGoPrevious={currentWordIndex > 0}
        isLast={isLastWordInExercise()}
      />
    </View>
  );
};

export default VocabularyExercise;
