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

// ✅ NOUVELLE FONCTION - Calcul progression par catégorie
export const calculateCategoryProgress = (exercises = [], completedWords = {}) => {
  return exercises.map((category, index) => {
    const totalInCategory = category.words?.length || 0;
    const completedInCategory = completedWords[index]?.length || 0;
    const progress = totalInCategory > 0 
      ? Math.min(100, Math.round((completedInCategory / totalInCategory) * 100))
      : 0;
    
    return {
      title: category.title || `Catégorie ${index + 1}`,
      totalWords: totalInCategory,
      completedWords: completedInCategory,
      progress: progress
    };
  });
};