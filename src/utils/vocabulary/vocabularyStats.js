// utils/vocabularyStats.js

export const calculateTotalWords = (exercises = []) =>
  exercises.reduce(
    (total, category) => total + (category.words?.length || 0),
    0
  );

export const calculateCompletedWordsCount = (completedWords = {}) =>
  Object.keys(completedWords).reduce(
    (count, key) => count + (completedWords[key]?.length || 0),
    0
  );

export const calculateTotalProgress = (exercises = [], completedWords = {}) => {
  const totalWords = calculateTotalWords(exercises);
  const totalCompleted = calculateCompletedWordsCount(completedWords);
  return totalWords > 0
    ? Math.min(100, (totalCompleted / totalWords) * 100)
    : 0;
};
