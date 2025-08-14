// src/utils/arrayUtils.js - Utilitaires pour la manipulation d'arrays

/**
 * Mélange un array en utilisant l'algorithme Fisher-Yates (shuffle)
 * Plus efficace et prévisible que sort(() => Math.random() - 0.5)
 * @param {Array} array - L'array à mélanger
 * @returns {Array} - Une copie mélangée de l'array
 */
export const shuffleArray = (array) => {
  if (!Array.isArray(array)) {
    return [];
  }
  
  if (array.length <= 1) {
    return [...array];
  }

  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

/**
 * Mélange un array et retourne les n premiers éléments
 * @param {Array} array - L'array à mélanger
 * @param {number} count - Nombre d'éléments à retourner
 * @returns {Array} - Les n premiers éléments mélangés
 */
export const shuffleAndTake = (array, count) => {
  if (!Array.isArray(array) || array.length === 0 || count <= 0) {
    return [];
  }
  
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
};

/**
 * Mélange un array et retourne les n premiers éléments avec fallback
 * @param {Array} array - L'array principal
 * @param {Array} fallbackArray - Array de fallback si le principal est insuffisant
 * @param {number} count - Nombre d'éléments à retourner
 * @returns {Array} - Les n premiers éléments mélangés
 */
export const shuffleWithFallback = (array, fallbackArray, count) => {
  if (!Array.isArray(array) || array.length === 0) {
    return shuffleAndTake(fallbackArray, count);
  }
  
  if (array.length >= count) {
    return shuffleAndTake(array, count);
  }
  
  // Combiner les deux arrays et mélanger
  const combined = [...array, ...fallbackArray];
  return shuffleAndTake(combined, count);
};

/**
 * Mélange un array en place (modifie l'array original)
 * @param {Array} array - L'array à mélanger
 * @returns {Array} - L'array mélangé (même référence)
 */
export const shuffleInPlace = (array) => {
  if (!Array.isArray(array) || array.length <= 1) {
    return array;
  }

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  return array;
};
