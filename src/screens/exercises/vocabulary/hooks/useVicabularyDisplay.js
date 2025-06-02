// hooks/useVocabularyDisplay.js
import { useMemo, useCallback, useState } from "react";
import { getLevelDisplayName, isBonusLevel } from "../../../../utils/vocabulary/vocabularyDataHelper";

/**
 * Hook pour toutes les données d'affichage et handlers UI
 * Centralise la logique de présentation des données
 */
const useVocabularyDisplay = (vocabularyData, categoryIndex, wordIndex, level, mode) => {
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // Mot actuel avec mémorisation
  const getCurrentWord = useMemo(() => {
    const category = vocabularyData?.exercises?.[categoryIndex];
    if (category?.words && wordIndex < category.words.length) {
      return category.words[wordIndex];
    }
    return { word: "", translation: "", definition: "", example: "" };
  }, [vocabularyData, categoryIndex, wordIndex]);

  // Compteur de mots (ex: "5 / 20")
  const wordCounter = useMemo(() => {
    const currentCategory = vocabularyData?.exercises?.[categoryIndex] || {};
    return `${wordIndex + 1} / ${currentCategory?.words?.length || 0}`;
  }, [vocabularyData, categoryIndex, wordIndex]);

  // Titre du header adapté selon le mode et niveau
  const headerTitle = useMemo(() => {
    const displayName = getLevelDisplayName(level);
    if (mode === "fast") {
      return isBonusLevel(level) ? displayName : `${displayName} - Fast`;
    }
    return displayName;
  }, [level, mode]);

  // Categories pour le sélecteur avec mémorisation
  const categories = useMemo(() => {
    return vocabularyData?.exercises?.map((cat) => cat.title) || [];
  }, [vocabularyData]);

  // Handler pour toggle l'affichage des détails de progression
  const handleToggleProgressDetails = useCallback(() => {
    setShowDetailedProgress(!showDetailedProgress);
  }, [showDetailedProgress]);

  return {
    getCurrentWord,
    wordCounter,
    headerTitle,
    categories,
    showDetailedProgress,
    handleToggleProgressDetails,
  };
};

export default useVocabularyDisplay;