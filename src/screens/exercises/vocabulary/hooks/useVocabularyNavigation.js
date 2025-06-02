// hooks/useVocabularyNavigation.js
import { useCallback } from "react";

/**
 * Hook spécialisé pour la navigation dans le vocabulaire
 * Gère toute la logique de navigation inter-catégories
 */
const useVocabularyNavigation = ({
  vocabularyData,
  categoryIndex,
  wordIndex,
  completedWords,
  mode,
  level,
  // Fonctions des autres hooks
  markWordAsCompleted,
  saveLastPosition,
  goToNextWord,
  goToPreviousWord,
  changeCategory,
  restoreState,
  // Callback de fin
  onComplete,
}) => {

  // 🔥 FONCTION CLEF: Vérifier s'il y a un mot précédent (inter-catégories)
  const canGoToPrevious = useCallback(() => {
    // Si on n'est pas au premier mot de la catégorie actuelle
    if (wordIndex > 0) {
      return true;
    }
    
    // Si on est au premier mot, vérifier s'il y a une catégorie précédente
    if (categoryIndex > 0) {
      const previousCategory = vocabularyData?.exercises?.[categoryIndex - 1];
      return previousCategory?.words && previousCategory.words.length > 0;
    }
    
    // Si on est au tout premier mot du tout premier exercice
    return false;
  }, [wordIndex, categoryIndex, vocabularyData]);

  // Vérifier si c'est le dernier mot de l'exercice  
  const isLastWordInExercise = useCallback(() => {
    const category = vocabularyData?.exercises?.[categoryIndex];
    return category?.words && wordIndex === category.words.length - 1;
  }, [vocabularyData, categoryIndex, wordIndex]);

  // Trouver la prochaine catégorie non terminée
  const findNextUncompletedCategory = useCallback(() => {
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
  }, [vocabularyData, categoryIndex, completedWords]);

  // 🔥 FONCTION CLEF: Navigation suivante
  const handleNext = useCallback(() => {
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
        onComplete(completionMessage);
      } else {
        changeCategory(nextCategoryIndex);
        saveLastPosition(nextCategoryIndex, 0);
      }
    }
  }, [
    vocabularyData,
    categoryIndex,
    wordIndex,
    markWordAsCompleted,
    goToNextWord,
    saveLastPosition,
    findNextUncompletedCategory,
    changeCategory,
    mode,
    level,
    onComplete
  ]);

  // 🔥 FONCTION CLEF: Navigation précédente AVEC inter-catégories
  const handlePrevious = useCallback(() => {
    // Cas 1: Reculer dans la même catégorie
    if (wordIndex > 0) {
      if (goToPreviousWord()) {
        saveLastPosition(categoryIndex, wordIndex - 1);
      }
      return;
    }
    
    // Cas 2: Aller à la catégorie précédente (dernier mot)
    if (categoryIndex > 0) {
      const previousCategoryIndex = categoryIndex - 1;
      const previousCategory = vocabularyData?.exercises?.[previousCategoryIndex];
      
      if (previousCategory?.words && previousCategory.words.length > 0) {
        const lastWordIndex = previousCategory.words.length - 1;
        restoreState(previousCategoryIndex, lastWordIndex);
        saveLastPosition(previousCategoryIndex, lastWordIndex);
      }
    }
  }, [
    wordIndex,
    categoryIndex,
    vocabularyData,
    goToPreviousWord,
    saveLastPosition,
    restoreState
  ]);

  // Gérer le changement de catégorie
  const handleCategoryChange = useCallback((newIndex) => {
    changeCategory(newIndex);
    saveLastPosition(newIndex, 0);
  }, [changeCategory, saveLastPosition]);

  return {
    handleNext,
    handlePrevious,
    handleCategoryChange,
    canGoToPrevious,
    isLastWordInExercise,
    findNextUncompletedCategory,
  };
};

export default useVocabularyNavigation;