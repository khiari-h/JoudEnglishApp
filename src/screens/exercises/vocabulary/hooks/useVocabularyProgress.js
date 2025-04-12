import { useState, useRef, useCallback } from 'react';

/**
 * Hook personnalisé pour gérer l'état de l'exercice de vocabulaire
 * Version optimisée pour éviter les boucles infinies
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useVocabularyExerciseState = (level, vocabularyData, saveLastPosition) => {
  // États de base pour la navigation dans l'exercice
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  
  // Flag pour éviter les restaurations multiples
  const hasRestoredPosition = useRef(false);
  
  // Méthode sécurisée pour restaurer l'état
  const restoreState = useCallback((newCategoryIndex, newWordIndex) => {
    // Ne restaurer qu'une seule fois
    if (hasRestoredPosition.current) return;
    
    // Mettre à jour les états
    setCategoryIndex(newCategoryIndex);
    setWordIndex(newWordIndex);
    
    // Marquer comme restauré
    hasRestoredPosition.current = true;
  }, []);
  
  // Fonction pour naviguer vers le mot précédent
  const goToPreviousWord = useCallback(() => {
    if (wordIndex > 0) {
      setWordIndex(wordIndex - 1);
      setShowTranslation(false); // Masquer la traduction
      return true;
    }
    return false;
  }, [wordIndex]);
  
  // Fonction pour naviguer vers le mot suivant dans la même catégorie
  const goToNextWord = useCallback(() => {
    setWordIndex(wordIndex + 1);
    setShowTranslation(false); // Masquer la traduction
    return true;
  }, [wordIndex]);
  
  // Fonction pour changer de catégorie
  const changeCategory = useCallback((newCategoryIndex) => {
    setCategoryIndex(newCategoryIndex);
    setWordIndex(0); // Réinitialiser l'index du mot à 0 lorsque la catégorie change
    setShowTranslation(false); // Masquer la traduction
  }, []);
  
  // Fonction pour basculer l'affichage de la traduction
  const toggleTranslation = useCallback(() => {
    setShowTranslation(prev => !prev);
  }, []);
  
  // Réinitialiser l'état
  const resetState = useCallback(() => {
    setCategoryIndex(0);
    setWordIndex(0);
    setShowTranslation(false);
  }, []);
  
  // Fonction pour marquer un mot comme complété
  const markWordAsCompleted = useCallback((categoryIndex, wordIndex) => {
    // Logique pour marquer un mot comme complété
    // Cela pourrait être lié à l'état global ou un fichier de sauvegarde
  }, []);

  // Fonction pour trouver la catégorie suivante non terminée
  const findNextUncompletedCategory = useCallback(() => {
    const totalCategories = vocabularyData?.exercises?.length || 0;
    for (let i = 1; i <= totalCategories; i++) {
      const nextIndex = (categoryIndex + i) % totalCategories;
      const category = vocabularyData?.exercises?.[nextIndex];
      const completedInCategory = category?.completedWords?.length || 0;
      if (completedInCategory < (category.words?.length || 0)) {
        return nextIndex;
      }
    }
    return -1;
  }, [categoryIndex, vocabularyData]);
  
  return {
    categoryIndex,
    wordIndex,
    showTranslation,
    hasRestored: hasRestoredPosition.current,
    restoreState,
    goToPreviousWord,
    goToNextWord,
    changeCategory,
    toggleTranslation,
    resetState,
    markWordAsCompleted,
    findNextUncompletedCategory
  };
};

export default useVocabularyExerciseState;
