// hooks/useVocabularyProgress.js
import { useState, useEffect, useCallback } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../../../../utils/constants";

/**
 * Hook personnalisé pour gérer la progression spécifique aux exercices de vocabulaire
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useVocabularyProgress = (level) => {
  // Clé de stockage unique pour ce niveau
  const storageKey = `${STORAGE_KEYS.COMPLETED_EXERCISES}_vocabulary_${level}`;

  // Utiliser useLocalStorage pour la persistance
  const {
    value: storedProgress,
    setValue: setStoredProgress,
    loaded,
  } = useLocalStorage(storageKey, {
    // Structure de données pour la progression du vocabulaire
    completedWords: {}, // { categoryIndex: [wordIndices] }
    lastPosition: {
      categoryIndex: 0,
      wordIndex: 0,
    },
    timestamp: null,
  });

  // État local pour la progression
  const [completedWords, setCompletedWords] = useState({});
  const [lastPosition, setLastPosition] = useState({
    categoryIndex: 0,
    wordIndex: 0,
  });

  // Synchroniser l'état local avec le stockage
  useEffect(() => {
    if (loaded && storedProgress) {
      setCompletedWords(storedProgress.completedWords || {});
      setLastPosition(
        storedProgress.lastPosition || { categoryIndex: 0, wordIndex: 0 }
      );
    }
  }, [loaded, storedProgress]);

  // Sauvegarder les modifications dans le stockage
  const saveProgress = useCallback(() => {
    setStoredProgress({
      completedWords,
      lastPosition,
      timestamp: new Date().toISOString(),
    });
  }, [completedWords, lastPosition, setStoredProgress]);

  // Marquer un mot comme complété
  const markWordAsCompleted = useCallback(
    (categoryIndex, wordIndex) => {
      setCompletedWords((prev) => {
        const categoryId = categoryIndex.toString();

        // Copie profonde de l'objet précédent
        const updated = { ...prev };

        // Initialiser la catégorie si elle n'existe pas
        if (!updated[categoryId]) {
          updated[categoryId] = [];
        }

        // Ajouter l'index du mot s'il n'est pas déjà complété
        if (!updated[categoryId].includes(wordIndex)) {
          updated[categoryId] = [...updated[categoryId], wordIndex];
        }

        return updated;
      });

      // Sauvegarder automatiquement après la mise à jour
      setTimeout(saveProgress, 0);
    },
    [saveProgress]
  );

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(
    (categoryIndex, wordIndex) => {
      setLastPosition({
        categoryIndex,
        wordIndex,
      });

      // Sauvegarder automatiquement après la mise à jour
      setTimeout(saveProgress, 0);
    },
    [saveProgress]
  );

  // Vérifier si un mot est complété
  const isWordCompleted = useCallback(
    (categoryIndex, wordIndex) => {
      const categoryId = categoryIndex.toString();
      return completedWords[categoryId]?.includes(wordIndex) || false;
    },
    [completedWords]
  );

  // Calculer le pourcentage de progression pour une catégorie
  const calculateCategoryProgress = useCallback(
    (categoryIndex, totalWords) => {
      const categoryId = categoryIndex.toString();
      const completed = completedWords[categoryId]?.length || 0;

      if (!completed || totalWords === 0) {
        return 0;
      }

      return Math.min(100, (completed / totalWords) * 100);
    },
    [completedWords]
  );

  // Calculer le pourcentage de progression global pour toutes les catégories
  const calculateTotalProgress = useCallback(
    (categories) => {
      if (!categories || categories.length === 0) {
        return 0;
      }

      let totalCompleted = 0;
      let totalWords = 0;

      categories.forEach((category, index) => {
        const categoryId = index.toString();
        totalCompleted += completedWords[categoryId]?.length || 0;
        totalWords += category.words?.length || 0;
      });

      return totalWords > 0
        ? Math.min(100, (totalCompleted / totalWords) * 100)
        : 0;
    },
    [completedWords]
  );

  // Initialiser la progression pour un ensemble de catégories
  const initializeProgress = useCallback(
    (vocabularyData) => {
      if (!loaded || !vocabularyData || !vocabularyData.exercises) return;

      // Vérifier si la progression a déjà été initialisée
      if (Object.keys(completedWords).length === 0) {
        const initialCompletedWords = {};
        vocabularyData.exercises.forEach((_, index) => {
          initialCompletedWords[index.toString()] = [];
        });

        setCompletedWords(initialCompletedWords);
        setTimeout(saveProgress, 0);
      }
    },
    [loaded, completedWords, saveProgress]
  );

  // Réinitialiser la progression
  const resetProgress = useCallback(() => {
    setCompletedWords({});
    setLastPosition({ categoryIndex: 0, wordIndex: 0 });
    setTimeout(saveProgress, 0);
  }, [saveProgress]);

  return {
    // État
    completedWords,
    lastPosition,
    loaded,

    // Actions
    markWordAsCompleted,
    saveLastPosition,
    isWordCompleted,
    resetProgress,
    initializeProgress,

    // Calculs
    calculateCategoryProgress,
    calculateTotalProgress,
  };
};

export default useVocabularyProgress;
