import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer l'état de l'exercice de vocabulaire
 * Version optimisée pour éviter les boucles infinies
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 * @param {number} initialCategoryIndex - Index initial de la catégorie
 * @param {number} initialWordIndex - Index initial du mot
 */
const useVocabularyExerciseState = (level, initialCategoryIndex = 0, initialWordIndex = 0) => {
  // États de base pour la navigation dans l'exercice
  const [categoryIndex, setCategoryIndex] = useState(initialCategoryIndex);
  const [wordIndex, setWordIndex] = useState(initialWordIndex);
  const [showTranslation, setShowTranslation] = useState(false);
  
  // Flag pour suivre si l'initialisation a été effectuée
  const isInitialized = useRef(false);
  
  // Initialiser l'état au premier rendu avec les valeurs fournies
  useEffect(() => {
    if (!isInitialized.current) {
      setCategoryIndex(initialCategoryIndex);
      setWordIndex(initialWordIndex);
      isInitialized.current = true;
    }
  }, [initialCategoryIndex, initialWordIndex]);
  
  // Méthode pour restaurer l'état à une position spécifique
  const restoreState = useCallback((newCategoryIndex, newWordIndex) => {
    setCategoryIndex(newCategoryIndex);
    setWordIndex(newWordIndex);
    setShowTranslation(false);
  }, []);
  
  // Fonction pour naviguer vers le mot précédent
  const goToPreviousWord = useCallback(() => {
    if (wordIndex > 0) {
      setWordIndex(prev => prev - 1);
      setShowTranslation(false);
      return true;
    }
    return false;
  }, [wordIndex]);
  
  // Fonction pour naviguer vers le mot suivant
  const goToNextWord = useCallback(() => {
    setWordIndex(prev => prev + 1);
    setShowTranslation(false);
    return true;
  }, []);
  
  // Fonction pour changer de catégorie
  const changeCategory = useCallback((newCategoryIndex) => {
    setCategoryIndex(newCategoryIndex);
    setWordIndex(0);
    setShowTranslation(false);
  }, []);
  
  // Fonction pour basculer l'affichage de la traduction
  const toggleTranslation = useCallback(() => {
    setShowTranslation(prev => !prev);
  }, []);
  
  return {
    categoryIndex,
    wordIndex,
    showTranslation,
    restoreState,
    goToPreviousWord,
    goToNextWord,
    changeCategory,
    toggleTranslation
  };
};

export default useVocabularyExerciseState;