// hooks/usePhrasesExerciseState.js - VERSION COMPLÈTE MODIFIÉE

import { useState, useCallback, useEffect } from "react";

/**
 * Hook personnalisé pour gérer l'état de l'exercice des phrases
 * Version modifiée : suppression du modal, ajout du toggle translation
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 * @param {Object} phrasesData - Données de phrases (peut être null initialement)
 */
const usePhrasesExerciseState = (level, phrasesData) => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  
  // ✅ AJOUTÉ - Toggle translation (remplace le modal)
  const [showTranslation, setShowTranslation] = useState(false);
  
  const [completionProgress, setCompletionProgress] = useState(0);

  // Vérifier si phrasesData est valide et a des catégories
  const hasValidData =
    phrasesData?.categories &&
    Array.isArray(phrasesData.categories) &&
    phrasesData.categories.length > 0;

  // Extraire les catégories et phrases de manière sécurisée
  const categories = hasValidData ? phrasesData.categories : [];
  const allPhrases =
    hasValidData && phrasesData.phrases ? phrasesData.phrases : [];

  // Déterminer la catégorie actuelle de manière sécurisée
  const currentCategory = categories[categoryIndex] || {
    id: null,
    name: "Chargement...",
    phrases: [],
  };

  // Filtrer les phrases pour la catégorie actuelle
  const currentPhrases =
    hasValidData && currentCategory.id
      ? allPhrases.filter((phrase) => phrase.categoryId === currentCategory.id)
      : [];

  // Effet pour mettre à jour la progression
  useEffect(() => {
    if (currentPhrases.length > 0) {
      const progress = ((phraseIndex + 1) / currentPhrases.length) * 100;
      setCompletionProgress(progress);
    } else {
      setCompletionProgress(0);
    }
  }, [categoryIndex, phraseIndex, currentPhrases.length]);

  // Changer de catégorie
  const changeCategory = useCallback(
    (index) => {
      if (index !== categoryIndex && index >= 0 && index < categories.length) {
        setCategoryIndex(index);
        setPhraseIndex(0); // Réinitialiser l'index de phrase lors du changement de catégorie
        setShowTranslation(false); // ✅ AJOUTÉ - Reset translation
      }
    },
    [categoryIndex, categories.length]
  );

  // Aller à la phrase suivante
  const goToNextPhrase = useCallback(() => {
    if (phraseIndex < currentPhrases.length - 1) {
      setPhraseIndex((prev) => prev + 1);
      setShowTranslation(false); // ✅ AJOUTÉ - Reset translation
    }
  }, [phraseIndex, currentPhrases.length]);

  // Aller à la phrase précédente
  const goToPreviousPhrase = useCallback(() => {
    if (phraseIndex > 0) {
      setPhraseIndex((prev) => prev - 1);
      setShowTranslation(false); // ✅ AJOUTÉ - Reset translation
    }
  }, [phraseIndex]);

  // ✅ AJOUTÉ - Toggle translation (remplace openPhraseDetails/closePhraseDetails)
  const toggleTranslation = useCallback(() => {
    setShowTranslation((prev) => !prev);
  }, []);

  return {
    // États existants
    categoryIndex,
    phraseIndex,
    completionProgress,
    
    // ✅ AJOUTÉ - État translation
    showTranslation,
    
    // Fonctions existantes
    changeCategory,
    goToNextPhrase,
    goToPreviousPhrase,
    
    // ✅ AJOUTÉ - Function toggle
    toggleTranslation,
    
    // Données calculées
    currentCategory,
    currentPhrases,
    hasValidData,
  };
};

export default usePhrasesExerciseState;