import React, { useEffect, useMemo } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
// Utiliser Expo Router à la place de React Navigation
import { router } from 'expo-router';

// Hooks personnalisés
import useVocabularyProgress from "./hooks/useVocabularyProgress";
import useExerciseState from "../../../hooks/useExerciseState";

// Composants
import VocabularyHeader from "./VocabularyHeader";
import VocabularyNavigation from "./VocabularyNavigation";
import VocabularyWordCard from "./VocabularyWordCard";
import VocabularyCategorySelector from "./VocabularyCategorySelector";

// Utilitaires
import { getVocabularyData } from "../../../utils/vocabulary/vocabularyDataHelper";
import { LANGUAGE_LEVELS } from "../../../utils/constants";

const VocabularyExercise = ({ route }) => {
  const { level } = route.params;

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

  // Fonction pour récupérer le mot actuel
  const getCurrentWord = () => {
    try {
      // Vérifier si les indices sont valides
      if (
        vocabularyData?.exercises &&
        selectedCategoryIndex >= 0 &&
        selectedCategoryIndex < vocabularyData.exercises.length
      ) {
        const currentCategory = vocabularyData.exercises[selectedCategoryIndex];
        
        if (
          currentCategory?.words &&
          currentWordIndex >= 0 &&
          currentWordIndex < currentCategory.words.length
        ) {
          return currentCategory.words[currentWordIndex];
        }
      }
      
      // Retourner un objet vide mais avec la structure attendue
      return {
        term: "",
        translation: "",
        definition: "",
        example: ""
      };
    } catch (error) {
      console.error("Error getting current word:", error);
      return {
        term: "",
        translation: "",
        definition: "",
        example: ""
      };
    }
  };

  // Vérifier si c'est le dernier mot de l'exercice
  const isLastWordInExercise = () => {
    try {
      if (
        vocabularyData?.exercises &&
        selectedCategoryIndex >= 0 &&
        selectedCategoryIndex < vocabularyData.exercises.length
      ) {
        const currentCategory = vocabularyData.exercises[selectedCategoryIndex];
        return currentCategory?.words && 
               currentWordIndex === currentCategory.words.length - 1;
      }
      return false;
    } catch (error) {
      console.error("Error checking if last word:", error);
      return false;
    }
  };

  // Logique de navigation entre mots/catégories
  const handleNext = () => {
    try {
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
    } catch (error) {
      console.error("Error in handleNext:", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite. Veuillez réessayer."
      );
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

  // Récupérer le mot actuel
  const currentWord = getCurrentWord();

  // Obtenir la couleur du niveau
  const levelColor = LANGUAGE_LEVELS[level]?.color || "#5E60CE";

  // Rendu principal
  return (
    <View>
      <VocabularyHeader
        level={level}
        progress={calculateTotalProgress(vocabularyData.exercises)}
      />

      <VocabularyCategorySelector
        categories={vocabularyData.exercises?.map((cat) => cat.title) || []}
        selectedIndex={selectedCategoryIndex}
        onSelectCategory={setSelectedCategoryIndex}
      />

      {/* Passer les propriétés individuellement au lieu de l'objet entier */}
      <VocabularyWordCard
        word={currentWord.term || ""}
        translation={currentWord.translation || ""}
        definition={currentWord.definition || ""}
        example={currentWord.example || ""}
        showTranslation={showTranslation}
        onToggleTranslation={() => setShowTranslation(!showTranslation)}
        levelColor={levelColor}
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