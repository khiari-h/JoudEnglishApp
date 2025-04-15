// src/screens/exercises/phrases/hooks/usePhrasesExerciseState.js
import { useState, useCallback, useEffect } from 'react';

const usePhrasesExerciseState = (level, phrasesData = []) => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [completionProgress, setCompletionProgress] = useState(0);

  // Effet pour mettre à jour la progression
  useEffect(() => {
    const currentCategory = phrasesData.categories[categoryIndex];
    const currentPhrases = phrasesData.phrases.filter(
      phrase => phrase.categoryId === currentCategory.id
    );
    
    const progress = ((phraseIndex + 1) / currentPhrases.length) * 100;
    setCompletionProgress(progress);
  }, [categoryIndex, phraseIndex, phrasesData]);

  // Changer de catégorie
  const changeCategory = useCallback((index) => {
    if (index !== categoryIndex) {
      setCategoryIndex(index);
      setPhraseIndex(0);
    }
  }, [categoryIndex]);

  // Aller à la phrase suivante
  const goToNextPhrase = useCallback(() => {
    const currentCategory = phrasesData.categories[categoryIndex];
    const currentPhrases = phrasesData.phrases.filter(
      phrase => phrase.categoryId === currentCategory.id
    );

    if (phraseIndex < currentPhrases.length - 1) {
      setPhraseIndex(prev => prev + 1);
    }
  }, [categoryIndex, phraseIndex, phrasesData]);

  // Aller à la phrase précédente
  const goToPreviousPhrase = useCallback(() => {
    if (phraseIndex > 0) {
      setPhraseIndex(prev => prev - 1);
    }
  }, [phraseIndex]);

  // Ouvrir les détails d'une phrase
  const openPhraseDetails = useCallback((phrase) => {
    setSelectedPhrase(phrase);
    setShowDetails(true);
  }, []);

  // Fermer les détails
  const closePhraseDetails = useCallback(() => {
    setSelectedPhrase(null);
    setShowDetails(false);
  }, []);

  return {
    categoryIndex,
    phraseIndex,
    selectedPhrase,
    showDetails,
    completionProgress,
    changeCategory,
    goToNextPhrase,
    goToPreviousPhrase,
    openPhraseDetails,
    closePhraseDetails,
    currentCategory: phrasesData.categories[categoryIndex] || null,
    currentPhrases: phrasesData.phrases.filter(
      phrase => phrase.categoryId === phrasesData.categories[categoryIndex]?.id
    ),
  };
};

export default usePhrasesExerciseState;