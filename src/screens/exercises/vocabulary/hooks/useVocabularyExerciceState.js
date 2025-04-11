// hooks/useVocabularyExerciseState.js
import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer l'état spécifique aux exercices de vocabulaire,
 * conçu pour éviter les boucles infinies.
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 * @param {Object} initialState - État initial optionnel
 */
const useVocabularyExerciseState = (level, initialState = {}) => {
  // Utiliser useRef pour suivre si nous sommes en train de restaurer l'état
  // Cela nous aidera à éviter les boucles infinies
  const isRestoringState = useRef(false);
  
  // États pour les catégories et les mots
  const [selectedCategoryIndex, setSelectedCategoryIndexInternal] = useState(
    initialState.categoryIndex || 0
  );
  const [currentWordIndex, setCurrentWordIndexInternal] = useState(
    initialState.wordIndex || 0
  );
  const [showTranslation, setShowTranslation] = useState(false);

  // Wrappers sécurisés pour les setters d'état
  // Ces wrappers évitent les mises à jour inutiles si la valeur est la même
  const setSelectedCategoryIndex = useCallback((newIndex) => {
    if (isRestoringState.current) return; // Éviter les mises à jour pendant la restauration
    
    setSelectedCategoryIndexInternal(prevIndex => {
      if (prevIndex === newIndex) return prevIndex; // Éviter les re-rendus si la valeur ne change pas
      return newIndex;
    });
  }, []);

  const setCurrentWordIndex = useCallback((newIndex) => {
    if (isRestoringState.current) return; // Éviter les mises à jour pendant la restauration
    
    setCurrentWordIndexInternal(prevIndex => {
      if (prevIndex === newIndex) return prevIndex; // Éviter les re-rendus si la valeur ne change pas
      return newIndex;
    });
  }, []);

  // Fonction pour restaurer l'état de manière sécurisée
  // Cette fonction utilise le flag isRestoringState pour éviter les boucles
  const restoreState = useCallback((categoryIndex, wordIndex) => {
    if (
      categoryIndex === selectedCategoryIndex && 
      wordIndex === currentWordIndex
    ) {
      return; // Éviter de restaurer si les valeurs sont identiques
    }

    try {
      isRestoringState.current = true; // Signaler que nous sommes en restauration
      
      // Mettre à jour les états directement pour éviter des déclenchements en cascade
      setSelectedCategoryIndexInternal(categoryIndex);
      setCurrentWordIndexInternal(wordIndex);
      
    } finally {
      // Assurer que le flag est réinitialisé même en cas d'erreur
      setTimeout(() => {
        isRestoringState.current = false;
      }, 0);
    }
  }, [selectedCategoryIndex, currentWordIndex]);

  // Fonctions supplémentaires
  const resetState = useCallback(() => {
    setShowTranslation(false);
    
    // Utiliser restoreState au lieu des setters individuels pour éviter les boucles
    restoreState(0, 0);
  }, [restoreState]);

  // Changer de catégorie tout en réinitialisant l'index du mot
  const changeCategory = useCallback((newCategoryIndex) => {
    setShowTranslation(false);
    
    // Utiliser restoreState au lieu des setters individuels pour éviter les boucles
    restoreState(newCategoryIndex, 0);
  }, [restoreState]);

  return {
    // État
    selectedCategoryIndex,
    setSelectedCategoryIndex,
    currentWordIndex,
    setCurrentWordIndex,
    showTranslation,
    setShowTranslation,
    
    // Actions supplémentaires
    resetState,
    changeCategory,
    restoreState,
  };
};

export default useVocabularyExerciseState;