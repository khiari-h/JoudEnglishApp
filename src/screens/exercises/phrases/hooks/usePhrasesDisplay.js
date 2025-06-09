// hooks/usePhrasesDisplay.js - Modèle identique à useVocabularyDisplay
import { useMemo, useCallback, useState } from "react";

/**
 * Hook pour toutes les données d'affichage et handlers UI
 * Centralise la logique de présentation des données
 * Modèle identique à useVocabularyDisplay
 */
const usePhrasesDisplay = (phrasesData, categoryIndex, phraseIndex, level) => {
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // Phrase actuelle avec mémorisation
  const getCurrentPhrase = useMemo(() => {
    const category = phrasesData?.categories?.[categoryIndex];
    if (category) {
      const categoryPhrases = phrasesData.phrases?.filter(p => p.categoryId === category.id) || [];
      if (phraseIndex < categoryPhrases.length) {
        return categoryPhrases[phraseIndex];
      }
    }
    return { id: "", phrase: "", translation: "", context: "" };
  }, [phrasesData, categoryIndex, phraseIndex]);

  // Compteur de phrases (ex: "5 / 20")
  const phraseCounter = useMemo(() => {
    const category = phrasesData?.categories?.[categoryIndex];
    const categoryPhrases = category ? 
      phrasesData.phrases?.filter(p => p.categoryId === category.id) || [] : [];
    return `${phraseIndex + 1} / ${categoryPhrases.length || 0}`;
  }, [phrasesData, categoryIndex, phraseIndex]);

  // Titre du header adapté selon le niveau
  const headerTitle = useMemo(() => {
    return `${level} Phrases`;
  }, [level]);

  // Categories pour le sélecteur avec mémorisation
  const categories = useMemo(() => {
    return phrasesData?.categories?.map((cat) => cat.name) || [];
  }, [phrasesData]);

  // Catégorie actuelle avec mémorisation
  const currentCategory = useMemo(() => {
    return phrasesData?.categories?.[categoryIndex] || null;
  }, [phrasesData, categoryIndex]);

  // Phrases de la catégorie actuelle avec mémorisation
  const currentPhrases = useMemo(() => {
    if (!phrasesData?.phrases || !currentCategory) return [];
    return phrasesData.phrases.filter(p => p.categoryId === currentCategory.id);
  }, [phrasesData, currentCategory]);

  // Handler pour toggle l'affichage des détails de progression
  const handleToggleProgressDetails = useCallback(() => {
    setShowDetailedProgress(!showDetailedProgress);
  }, [showDetailedProgress]);

  return {
    getCurrentPhrase,
    phraseCounter,
    headerTitle,
    categories,
    currentCategory,
    currentPhrases,
    showDetailedProgress,
    handleToggleProgressDetails,
  };
};

export default usePhrasesDisplay;