// hooks/useVocabularyState.js
import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour gérer l'état des exercices de vocabulaire
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 * @returns {Object} État et fonctions pour les exercices de vocabulaire
 */
const useVocabularyState = (level) => {
  // États de base pour la navigation dans l'exercice
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  // Réinitialiser l'affichage de la traduction quand l'utilisateur change de mot
  useEffect(() => {
    setShowTranslation(false);
  }, [selectedCategoryIndex, currentWordIndex]);

  // Fonctions utiles
  const getCurrentWord = (vocabularyData) => {
    try {
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
        example: "",
      };
    } catch (error) {
      console.error("Error getting current word:", error);
      return {
        term: "",
        translation: "",
        definition: "",
        example: "",
      };
    }
  };

  const isLastWordInExercise = (vocabularyData) => {
    try {
      if (
        vocabularyData?.exercises &&
        selectedCategoryIndex >= 0 &&
        selectedCategoryIndex < vocabularyData.exercises.length
      ) {
        const currentCategory = vocabularyData.exercises[selectedCategoryIndex];
        return (
          currentCategory?.words &&
          currentWordIndex === currentCategory.words.length - 1
        );
      }
      return false;
    } catch (error) {
      console.error("Error checking if last word:", error);
      return false;
    }
  };

  const findNextUncompletedCategory = (vocabularyData, completedWords) => {
    if (!vocabularyData?.exercises) return -1;

    const totalCategories = vocabularyData.exercises.length;
    for (let i = 1; i <= totalCategories; i++) {
      const nextIndex = (selectedCategoryIndex + i) % totalCategories;
      const category = vocabularyData.exercises[nextIndex];
      const completedInCategory = completedWords?.[nextIndex]?.length || 0;

      if (category?.words && completedInCategory < category.words.length) {
        return nextIndex;
      }
    }
    return -1; // Tout est complété
  };

  return {
    // États
    selectedCategoryIndex,
    currentWordIndex,
    showTranslation,

    // Setters
    setSelectedCategoryIndex,
    setCurrentWordIndex,
    setShowTranslation,

    // Fonctions utiles
    getCurrentWord,
    isLastWordInExercise,
    findNextUncompletedCategory,
  };
};

export default useVocabularyState;
