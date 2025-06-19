// utils/phrases/phrasesStats.js

/**
 * Calcule le nombre total de phrases dans toutes les catégories
 * @param {Array} categories - Tableau des catégories
 * @param {Array} phrases - Tableau de toutes les phrases
 * @returns {number} Nombre total de phrases
 */
export const calculateTotalPhrases = (categories = [], phrases = []) => {
  // Si on a directement les phrases
  if (phrases.length > 0) {
    return phrases.length;
  }
  
  // Sinon calculer depuis les catégories
  return categories.reduce(
    (total, category) => total + (category.phrases?.length || 0),
    0
  );
};

/**
 * Calcule le nombre de phrases complétées
 * @param {Object} completedPhrases - Phrases complétées par catégorie
 * @returns {number} Nombre total de phrases complétées
 */
export const calculateCompletedPhrasesCount = (completedPhrases = {}) =>
  Object.keys(completedPhrases).reduce(
    (count, key) => count + (completedPhrases[key]?.length || 0),
    0
  );

/**
 * Calcule la progression totale en pourcentage
 * @param {Array} categories - Tableau des catégories
 * @param {Array} phrases - Tableau de toutes les phrases
 * @param {Object} completedPhrases - Phrases complétées par catégorie
 * @returns {number} Pourcentage de progression (0-100)
 */
export const calculateTotalPhrasesProgress = (categories = [], phrases = [], completedPhrases = {}) => {
  const totalPhrases = calculateTotalPhrases(categories, phrases);
  const totalCompleted = calculateCompletedPhrasesCount(completedPhrases);
  return totalPhrases > 0
    ? Math.min(100, Math.round((totalCompleted / totalPhrases) * 100))
    : 0;
};

/**
 * Calcule la progression par catégorie
 * @param {Array} categories - Tableau des catégories
 * @param {Array} phrases - Tableau de toutes les phrases
 * @param {Object} completedPhrases - Phrases complétées par catégorie
 * @returns {Array} Progression de chaque catégorie
 */
export const calculateCategoryPhrasesProgress = (categories = [], phrases = [], completedPhrases = {}) => {
  return categories.map((category, index) => {
    // Trouver les phrases de cette catégorie
    const categoryPhrases = phrases.filter(phrase => phrase.categoryId === category.id);
    const totalInCategory = categoryPhrases.length;
    const completedInCategory = completedPhrases[index]?.length || 0;
    const progress = totalInCategory > 0 
      ? Math.min(100, Math.round((completedInCategory / totalInCategory) * 100))
      : 0;

    return {
      title: category.name || `Catégorie ${index + 1}`,
      totalPhrases: totalInCategory,
      completedPhrases: completedInCategory,
      progress: progress
    };
  });
};

/**
 * Calcule les statistiques générales pour un niveau
 * @param {Object} phrasesData - Données complètes des phrases
 * @param {Object} completedPhrases - Phrases complétées
 * @returns {Object} Statistiques générales
 */
export const calculatePhrasesStats = (phrasesData = {}, completedPhrases = {}) => {
  const categories = phrasesData.categories || [];
  const phrases = phrasesData.phrases || [];
  
  const totalPhrases = calculateTotalPhrases(categories, phrases);
  const completedCount = calculateCompletedPhrasesCount(completedPhrases);
  const totalProgress = calculateTotalPhrasesProgress(categories, phrases, completedPhrases);
  const categoryProgress = calculateCategoryPhrasesProgress(categories, phrases, completedPhrases);

  return {
    totalPhrases,
    completedCount,
    totalProgress,
    categoryProgress,
    totalCategories: categories.length,
    averagePhrasesPerCategory: categories.length > 0 ? Math.round(totalPhrases / categories.length) : 0
  };
};