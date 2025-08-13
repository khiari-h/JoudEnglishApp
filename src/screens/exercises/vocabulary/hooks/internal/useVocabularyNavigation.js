// src/screens/exercises/vocabulary/hooks/internal/useVocabularyNavigation.js
import { useCallback } from 'react';
import { Alert } from 'react-native';

export default function useVocabularyNavigation({
  exercises,
  level,
  mode,
  categoryIndex,
  wordIndex,
  totalWordsInCategory,
  setCategoryIndex,
  setWordIndex,
  setShowTranslation,
  completedWords,
  setCompletedWords,
}) {
  const changeCategory = useCallback((newCategoryIndex) => {
    setCategoryIndex(newCategoryIndex);
    setWordIndex(0);
    setShowTranslation(false);
  }, [setCategoryIndex, setWordIndex, setShowTranslation]);

  const goToNextWord = useCallback(() => {
    setWordIndex((prev) => prev + 1);
    setShowTranslation(false);
  }, [setWordIndex, setShowTranslation]);

  const goToPreviousWord = useCallback(() => {
    if (wordIndex > 0) {
      setWordIndex((prev) => prev - 1);
      setShowTranslation(false);
      return true;
    }
    return false;
  }, [wordIndex, setWordIndex, setShowTranslation]);

  const markWordAsCompleted = useCallback((catIndex, wIndex) => {
    setCompletedWords((prev) => {
      const categoryCompleted = prev[catIndex] || [];
      const isAlreadyCompleted = categoryCompleted.find((word) =>
        (typeof word === 'number' && word === wIndex) ||
        (typeof word === 'object' && word.wordIndex === wIndex)
      );
      if (!isAlreadyCompleted) {
        const newWordEntry = { wordIndex: wIndex, timestamp: Date.now(), date: new Date().toDateString() };
        return { ...prev, [catIndex]: [...categoryCompleted, newWordEntry] };
      }
      return prev;
    });
  }, [setCompletedWords]);

  const findNextUncompletedCategory = useCallback(() => {
    const numCategories = exercises.length;
    for (let i = 1; i <= numCategories; i++) {
      const nextIndex = (categoryIndex + i) % numCategories;
      const category = exercises[nextIndex];
      const completedInCategory = completedWords[nextIndex]?.length || 0;
      const totalInCategory = category.words?.length || 0;
      if (completedInCategory < totalInCategory) return nextIndex;
    }
    return -1;
  }, [exercises, categoryIndex, completedWords]);

  const handleNext = useCallback(() => {
    markWordAsCompleted(categoryIndex, wordIndex);
    if (wordIndex < totalWordsInCategory - 1) {
      goToNextWord();
    } else {
      const nextCategoryIndex = findNextUncompletedCategory();
      if (nextCategoryIndex === -1) {
        const completionMessage = mode === 'fast'
          ? `Félicitations ! Vous avez terminé le Fast Vocabulary ${level} !`
          : `Félicitations ! Vous avez terminé le vocabulaire ${level} !`;
        Alert.alert('Félicitations', completionMessage);
        return { completed: true };
      } else {
        changeCategory(nextCategoryIndex);
      }
    }
    return { completed: false };
  }, [categoryIndex, wordIndex, totalWordsInCategory, markWordAsCompleted, goToNextWord, findNextUncompletedCategory, changeCategory, mode, level]);

  const handlePrevious = useCallback(() => {
    if (wordIndex > 0) {
      goToPreviousWord();
      return;
    }
    if (categoryIndex > 0) {
      const previousCategoryIndex = categoryIndex - 1;
      const previousCategory = exercises[previousCategoryIndex];
      const lastWordIndex = (previousCategory.words?.length || 1) - 1;
      setCategoryIndex(previousCategoryIndex);
      setWordIndex(lastWordIndex);
      setShowTranslation(false);
    }
  }, [wordIndex, categoryIndex, exercises, goToPreviousWord, setCategoryIndex, setWordIndex, setShowTranslation]);

  return {
    changeCategory,
    goToNextWord,
    goToPreviousWord,
    markWordAsCompleted,
    findNextUncompletedCategory,
    handleNext,
    handlePrevious,
  };
}


