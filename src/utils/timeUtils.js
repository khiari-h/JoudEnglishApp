// utils/timeUtils.js
/**
 * Utilitaires pour la gestion et conversion des temps
 */

/**
 * Convertit des secondes en minutes (floor)
 * @param {number} seconds - Temps en secondes
 * @returns {number} Temps en minutes
 */
export const secondsToMinutes = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) return 0;
  return Math.floor(seconds / 60);
};

/**
 * Convertit des minutes en secondes
 * @param {number} minutes - Temps en minutes
 * @returns {number} Temps en secondes
 */
export const minutesToSeconds = (minutes) => {
  if (typeof minutes !== 'number' || minutes < 0) return 0;
  return minutes * 60;
};

/**
 * Formate un temps en secondes pour l'affichage
 * @param {number} seconds - Temps en secondes
 * @returns {string} Temps formaté (ex: "2 min 30s", "45s")
 */
export const formatTime = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) return '0s';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  if (remainingSeconds === 0) {
    return `${minutes} min`;
  }
  
  return `${minutes} min ${remainingSeconds}s`;
};

/**
 * Formate un temps en secondes pour l'affichage simple (minutes seulement)
 * @param {number} seconds - Temps en secondes
 * @returns {string} Temps formaté (ex: "2 min", "0 min")
 */
export const formatTimeSimple = (seconds) => {
  const minutes = secondsToMinutes(seconds);
  return `${minutes} min`;
};

/**
 * Calcule le temps écoulé depuis un timestamp
 * @param {number} startTime - Timestamp de début (Date.now())
 * @returns {number} Temps écoulé en secondes
 */
export const getElapsedSeconds = (startTime) => {
  if (typeof startTime !== 'number' || startTime <= 0) return 0;
  return Math.floor((Date.now() - startTime) / 1000);
};

/**
 * Valide qu'une valeur est un temps valide en secondes
 * @param {any} value - Valeur à valider
 * @returns {boolean} True si valide
 */
export const isValidTimeInSeconds = (value) => {
  return typeof value === 'number' && 
         value >= 0 && 
         value < Number.MAX_SAFE_INTEGER &&
         Number.isInteger(value);
};

/**
 * Nettoie et valide un objet de stats de temps
 * @param {object} stats - Stats à nettoyer
 * @returns {object} Stats nettoyées et validées
 */
export const sanitizeTimeStats = (stats) => {
  if (!stats || typeof stats !== 'object') return {};
  
  const sanitized = {};
  
  Object.entries(stats).forEach(([key, value]) => {
    if (typeof key === 'string' && isValidTimeInSeconds(value)) {
      sanitized[key] = value;
    }
  });
  
  return sanitized;
};