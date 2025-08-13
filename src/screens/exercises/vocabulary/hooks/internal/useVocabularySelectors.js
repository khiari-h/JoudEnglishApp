// src/screens/exercises/vocabulary/hooks/internal/useVocabularySelectors.js
import { useCallback } from 'react';

export default function useVocabularySelectors({
  exercises,
  completedWords,
  categoryIndex,
  wordIndex,
  totalWordsInCategory,
  currentWord,
  currentCategory,
}) {
  const getStats = useCallback(() => {
    const totalWords = exercises.reduce((sum, cat) => sum + (cat.words?.length || 0), 0);
    const completedWordsCount = Object.values(completedWords).reduce((sum, completed) => {
      const categoryCount = (completed || []).length;
      return sum + categoryCount;
    }, 0);
    const totalProgress = totalWords > 0 ? Math.round((completedWordsCount / totalWords) * 100) : 0;
    return {
      totalWords,
      completedWordsCount,
      totalProgress,
      completedInCurrentCategory: completedWords[categoryIndex]?.length || 0,
      totalInCurrentCategory: totalWordsInCategory,
    };
  }, [exercises, completedWords, categoryIndex, totalWordsInCategory]);

  const getDisplayData = useCallback(() => {
    const wordCounter = `${wordIndex + 1} / ${totalWordsInCategory}`;
    const categories = exercises.map((cat) => cat.title);
    return { wordCounter, categories, currentWord, currentCategory };
  }, [wordIndex, totalWordsInCategory, exercises, currentWord, currentCategory]);

  const canGoToPrevious = useCallback(() => {
    if (wordIndex > 0) return true;
    if (categoryIndex > 0) {
      const previousCategory = exercises[categoryIndex - 1];
      return previousCategory?.words && previousCategory.words.length > 0;
    }
    return false;
  }, [wordIndex, categoryIndex, exercises]);

  const isLastWordInExercise = useCallback(() => {
    return wordIndex === totalWordsInCategory - 1;
  }, [wordIndex, totalWordsInCategory]);

  return {
    getStats,
    getDisplayData,
    canGoToPrevious,
    isLastWordInExercise,
  };
}


