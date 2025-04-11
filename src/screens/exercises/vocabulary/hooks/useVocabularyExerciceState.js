// hooks/useVocabularyExerciseState.js
import { useState, useRef, useCallback } from 'react';

/**
 * Hook personnalisé pour gérer l'état de l'exercice de vocabulaire
 * Version optimisée pour éviter les boucles infinies
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useVocabularyExerciseState = (level) => {
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
    setWordIndex(0);
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
  
  return {
    // États
    categoryIndex,
    wordIndex,
    showTranslation,
    hasRestored: hasRestoredPosition.current,
    
    // Setters (pour les cas où nous avons besoin d'accès direct)
    setCategoryIndex,
    setWordIndex,
    setShowTranslation,
    
    // Actions
    restoreState,
    goToPreviousWord,
    goToNextWord,
    changeCategory,
    toggleTranslation,
    resetState
  };
};

export default useVocabularyExerciseState;