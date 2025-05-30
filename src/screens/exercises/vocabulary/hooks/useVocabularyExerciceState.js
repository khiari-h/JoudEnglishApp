import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Hook personnalisé pour gérer l'état de l'exercice de vocabulaire
 * Version optimisée pour éviter les boucles infinies
 *
 * @param {string} progressKey - Clé unique (level_mode, ex: "1_fast", "2_classic")
 * @param {number} initialCategoryIndex - Index initial de la catégorie
 * @param {number} initialWordIndex - Index initial du mot
 */
const useVocabularyExerciseState = (
  progressKey,
  initialCategoryIndex = 0,
  initialWordIndex = 0
) => {
  // États de base pour la navigation dans l'exercice
  const [categoryIndex, setCategoryIndex] = useState(initialCategoryIndex);
  const [wordIndex, setWordIndex] = useState(initialWordIndex);
  const [showTranslation, setShowTranslation] = useState(false);

  // Flag pour suivre si l'initialisation a été effectuée
  const isInitialized = useRef(false);

  // DEBUG
  console.log("🎮 Hook useVocabularyExerciseState - progressKey:", progressKey);

  // Initialiser l'état au premier rendu avec les valeurs fournies
  useEffect(() => {
    if (!isInitialized.current) {
      console.log("🎯 Initialisation état:", {
        progressKey,
        initialCategoryIndex,
        initialWordIndex,
      });
      setCategoryIndex(initialCategoryIndex);
      setWordIndex(initialWordIndex);
      isInitialized.current = true;
    }
  }, [initialCategoryIndex, initialWordIndex, progressKey]);

  // Méthode pour restaurer l'état à une position spécifique
  const restoreState = useCallback(
    (newCategoryIndex, newWordIndex) => {
      console.log("🔄 Restauration état:", {
        progressKey,
        newCategoryIndex,
        newWordIndex,
      });
      setCategoryIndex(newCategoryIndex);
      setWordIndex(newWordIndex);
      setShowTranslation(false);
    },
    [progressKey]
  );

  // Fonction pour naviguer vers le mot précédent
  const goToPreviousWord = useCallback(() => {
    if (wordIndex > 0) {
      console.log("⬅️ Mot précédent:", {
        progressKey,
        fromIndex: wordIndex,
        toIndex: wordIndex - 1,
      });
      setWordIndex((prev) => prev - 1);
      setShowTranslation(false);
      return true;
    }
    return false;
  }, [wordIndex, progressKey]);

  // Fonction pour naviguer vers le mot suivant
  const goToNextWord = useCallback(() => {
    console.log("➡️ Mot suivant:", {
      progressKey,
      fromIndex: wordIndex,
      toIndex: wordIndex + 1,
    });
    setWordIndex((prev) => prev + 1);
    setShowTranslation(false);
    return true;
  }, [progressKey, wordIndex]);

  // Fonction pour changer de catégorie
  const changeCategory = useCallback(
    (newCategoryIndex) => {
      console.log("📂 Changement catégorie:", {
        progressKey,
        fromCategory: categoryIndex,
        toCategory: newCategoryIndex,
      });
      setCategoryIndex(newCategoryIndex);
      setWordIndex(0);
      setShowTranslation(false);
    },
    [progressKey, categoryIndex]
  );

  // Fonction pour basculer l'affichage de la traduction
  const toggleTranslation = useCallback(() => {
    console.log("🔄 Toggle traduction:", {
      progressKey,
      current: showTranslation,
    });
    setShowTranslation((prev) => !prev);
  }, [progressKey, showTranslation]);

  return {
    categoryIndex,
    wordIndex,
    showTranslation,
    restoreState,
    goToPreviousWord,
    goToNextWord,
    changeCategory,
    toggleTranslation,
  };
};

export default useVocabularyExerciseState;
