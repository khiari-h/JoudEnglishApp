// utils/timeUtils.js
/**
 * Utilitaires pour la gestion et validation des temps
 */

import { DEFAULT_STATS, EXERCISE_TYPES } from './timeConstants.js';

/**
 * Valide qu'une valeur de temps en secondes est correcte
 * @param {any} timeInSeconds - Valeur à valider
 * @returns {boolean} True si valide
 */
export const isValidTimeInSeconds = (timeInSeconds) => {
  return (
    typeof timeInSeconds === 'number' &&
    !isNaN(timeInSeconds) &&
    isFinite(timeInSeconds) &&
    timeInSeconds >= 0 &&
    timeInSeconds <= 86400 // Max 24h par session
  );
};

/**
 * Sanitise les stats de temps pour éviter les valeurs invalides
 * @param {object} stats - Stats à sanitiser
 * @returns {object} Stats nettoyées
 */
export const sanitizeTimeStats = (stats) => {
  if (!stats || typeof stats !== 'object') {
    return { ...DEFAULT_STATS };
  }

  const sanitized = { ...DEFAULT_STATS };

  // Valider chaque type d'exercice
  Object.values(EXERCISE_TYPES).forEach(exerciseType => {
    const timeValue = stats[exerciseType];
    
    if (isValidTimeInSeconds(timeValue)) {
      sanitized[exerciseType] = Math.floor(timeValue); // Arrondir à l'entier
    } else {
      sanitized[exerciseType] = 0; // Valeur par défaut
    }
  });

  return sanitized;
};

/**
 * Calcule le temps écoulé depuis un timestamp
 * @param {number} startTime - Timestamp de début
 * @returns {number} Temps écoulé en secondes
 */
export const getElapsedSeconds = (startTime) => {
  if (!startTime || typeof startTime !== 'number') {
    return 0;
  }

  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  return Math.max(0, elapsed);
};

/**
 * Convertit des secondes en minutes (arrondi)
 * @param {number} seconds - Secondes à convertir
 * @returns {number} Minutes arrondies
 */
export const secondsToMinutes = (seconds) => {
  if (!isValidTimeInSeconds(seconds)) {
    return 0;
  }
  
  return Math.floor(seconds / 60);
};

/**
 * Convertit des minutes en secondes
 * @param {number} minutes - Minutes à convertir
 * @returns {number} Secondes
 */
export const minutesToSeconds = (minutes) => {
  if (typeof minutes !== 'number' || isNaN(minutes) || minutes < 0) {
    return 0;
  }
  
  return minutes * 60;
};

/**
 * Formate un temps en secondes pour l'affichage
 * @param {number} seconds - Secondes à formater
 * @returns {string} Temps formaté (ex: "5m 30s")
 */
export const formatTime = (seconds) => {
  if (!isValidTimeInSeconds(seconds)) {
    return "0s";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  if (remainingSeconds === 0) {
    return `${minutes}m`;
  }

  return `${minutes}m ${remainingSeconds}s`;
};

/**
 * Formate un temps en secondes pour l'affichage compact
 * @param {number} seconds - Secondes à formater
 * @returns {string} Temps formaté compact (ex: "5:30")
 */
export const formatTimeCompact = (seconds) => {
  if (!isValidTimeInSeconds(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Valide qu'un objet de stats a la bonne structure
 * @param {any} stats - Stats à valider
 * @returns {boolean} True si structure valide
 */
export const isValidStatsStructure = (stats) => {
  if (!stats || typeof stats !== 'object') {
    return false;
  }

  // Vérifier que tous les types d'exercices requis sont présents
  const requiredTypes = Object.values(EXERCISE_TYPES);
  const hasAllTypes = requiredTypes.every(type => 
    Object.hasOwn(stats, type) && isValidTimeInSeconds(stats[type])
  );

  return hasAllTypes;
};

/**
 * Calcule le temps total de toutes les stats
 * @param {object} stats - Stats à additionner
 * @returns {number} Temps total en secondes
 */
export const getTotalTimeFromStats = (stats) => {
  if (!isValidStatsStructure(stats)) {
    return 0;
  }

  return Object.values(stats).reduce((total, time) => total + time, 0);
};

/**
 * Obtient les stats triées par temps décroissant
 * @param {object} stats - Stats à trier
 * @returns {Array} Tableau d'objets {exerciseType, time} triés
 */
export const getSortedStatsByTime = (stats) => {
  if (!isValidStatsStructure(stats)) {
    return [];
  }

  return Object.entries(stats)
    .map(([exerciseType, time]) => ({ exerciseType, time }))
    .sort((a, b) => b.time - a.time);
};

/**
 * Vérifie si l'utilisateur a du temps sur un exercice spécifique
 * @param {object} stats - Stats de l'utilisateur
 * @param {string} exerciseType - Type d'exercice à vérifier
 * @param {number} minimumMinutes - Minimum en minutes (défaut: 1)
 * @returns {boolean} True si l'utilisateur a assez de temps
 */
export const hasMinimumTime = (stats, exerciseType, minimumMinutes = 1) => {
  if (!isValidStatsStructure(stats) || !Object.values(EXERCISE_TYPES).includes(exerciseType)) {
    return false;
  }

  const timeInSeconds = stats[exerciseType] || 0;
  const minimumSeconds = minutesToSeconds(minimumMinutes);
  
  return timeInSeconds >= minimumSeconds;
};