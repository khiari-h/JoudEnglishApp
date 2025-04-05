// src/utils/helpers.js

/**
 * Fonctions utilitaires diverses pour l'application
 */

/**
 * Mélange les éléments d'un tableau de façon aléatoire
 * @param {Array} array - Tableau à mélanger
 * @returns {Array} - Nouveau tableau mélangé
 */
export const shuffleArray = (array) => {
    if (!array || !Array.isArray(array)) return [];
    
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  /**
   * Génère un ID unique
   * @param {string} prefix - Préfixe optionnel pour l'ID
   * @returns {string} - ID unique
   */
  export const generateId = (prefix = '') => {
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`;
  };
  
  /**
   * Filtre un tableau d'objets selon une valeur de recherche
   * @param {Array} items - Tableau d'objets à filtrer
   * @param {string} searchValue - Texte à rechercher
   * @param {Array} searchFields - Champs où rechercher le texte
   * @returns {Array} - Tableau filtré
   */
  export const filterItems = (items, searchValue, searchFields) => {
    if (!searchValue || !searchFields || !items) return items;
    
    const search = searchValue.toLowerCase();
    
    return items.filter(item => 
      searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(search);
        }
        return false;
      })
    );
  };
  
  /**
   * Groupe un tableau d'objets selon une propriété
   * @param {Array} array - Tableau d'objets
   * @param {string|Function} key - Propriété ou fonction pour extraire la clé de groupement
   * @returns {Object} - Objets groupés par clé
   */
  export const groupBy = (array, key) => {
    if (!array || !Array.isArray(array)) return {};
    
    return array.reduce((result, item) => {
      const groupKey = typeof key === 'function' ? key(item) : item[key];
      
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      
      result[groupKey].push(item);
      return result;
    }, {});
  };
  
  /**
   * Convertit un texte en slug (pour URLs, identifiants, etc.)
   * @param {string} text - Texte à convertir
   * @returns {string} - Slug
   */
  export const slugify = (text) => {
    if (!text) return '';
    
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };
  
  /**
   * Limite le nombre d'appels à une fonction dans un intervalle de temps
   * @param {Function} func - Fonction à limiter
   * @param {number} wait - Délai minimum entre les appels (ms)
   * @returns {Function} - Fonction limitée
   */
  export const debounce = (func, wait = 300) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  /**
   * Exécute une fonction au maximum une fois dans un intervalle de temps
   * @param {Function} func - Fonction à limiter
   * @param {number} wait - Délai minimum entre les appels (ms)
   * @returns {Function} - Fonction limitée
   */
  export const throttle = (func, wait = 300) => {
    let inThrottle;
    
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, wait);
      }
    };
  };
  
  /**
   * Divise un tableau en chunks de taille spécifiée
   * @param {Array} array - Tableau à diviser
   * @param {number} size - Taille des chunks
   * @returns {Array} - Tableau de chunks
   */
  export const chunkArray = (array, size) => {
    if (!array || !Array.isArray(array)) return [];
    
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };
  
  /**
   * Retourne un élément aléatoire d'un tableau
   * @param {Array} array - Tableau source
   * @returns {*} - Élément aléatoire
   */
  export const getRandomItem = (array) => {
    if (!array || !Array.isArray(array) || array.length === 0) return null;
    
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  };
  
  /**
   * Supprime les doublons d'un tableau
   * @param {Array} array - Tableau avec doublons
   * @param {string|Function} key - Clé ou fonction pour identifier les doublons (pour tableaux d'objets)
   * @returns {Array} - Tableau sans doublons
   */
  export const removeDuplicates = (array, key) => {
    if (!array || !Array.isArray(array)) return [];
    
    if (!key) {
      return [...new Set(array)];
    }
    
    const seen = new Set();
    return array.filter(item => {
      const keyValue = typeof key === 'function' ? key(item) : item[key];
      if (seen.has(keyValue)) {
        return false;
      }
      seen.add(keyValue);
      return true;
    });
  };
  
  /**
   * Calcule le score de similarité entre deux chaînes (distance de Levenshtein)
   * Utile pour détecter les fautes de frappe et erreurs mineures
   * @param {string} s1 - Première chaîne
   * @param {string} s2 - Deuxième chaîne
   * @returns {number} - Score de similarité (0-1)
   */
  export const getSimilarity = (s1, s2) => {
    if (!s1 || !s2) return 0;
    
    const track = Array(s2.length + 1).fill(null).map(() => 
      Array(s1.length + 1).fill(null));
    
    for (let i = 0; i <= s1.length; i += 1) {
      track[0][i] = i;
    }
    
    for (let j = 0; j <= s2.length; j += 1) {
      track[j][0] = j;
    }
    
    for (let j = 1; j <= s2.length; j += 1) {
      for (let i = 1; i <= s1.length; i += 1) {
        const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1,
          track[j - 1][i] + 1,
          track[j - 1][i - 1] + indicator,
        );
      }
    }
    
    const distance = track[s2.length][s1.length];
    const maxLength = Math.max(s1.length, s2.length);
    
    return 1 - distance / maxLength;
  };
  
  /**
   * Vérifie si un exercice doit être révisé selon la répétition espacée
   * @param {Object} exercise - Objet exercice avec historique
   * @param {Array} intervals - Intervalles de répétition espacée (en heures)
   * @returns {boolean} - true si l'exercice doit être révisé
   */
  export const shouldReviewExercise = (exercise, intervals = [0, 4, 8, 24, 72, 168, 336, 672]) => {
    if (!exercise || !exercise.history || !exercise.history.length) {
      return true; // Nouvel exercice, à réviser
    }
    
    // Trier l'historique par date (plus récent en premier)
    const sortedHistory = [...exercise.history].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    const lastAttempt = sortedHistory[0];
    const repeatCount = sortedHistory.length;
    
    // Obtenir l'intervalle approprié selon le nombre de répétitions
    const interval = intervals[Math.min(repeatCount, intervals.length - 1)];
    
    // Calculer quand la prochaine révision devrait avoir lieu
    const lastDate = new Date(lastAttempt.date);
    const nextReviewDate = new Date(lastDate.getTime() + interval * 60 * 60 * 1000);
    
    // Vérifier si la date actuelle est après la date de prochaine révision
    return new Date() >= nextReviewDate;
  };
  
  /**
   * Calcule le niveau de maîtrise d'un exercice basé sur l'historique
   * @param {Object} exercise - Objet exercice avec historique
   * @returns {number} - Niveau de maîtrise (0-100)
   */
  export const calculateMasteryLevel = (exercise) => {
    if (!exercise || !exercise.history || !exercise.history.length) {
      return 0; // Pas encore pratiqué
    }
    
    // On prend en compte seulement les 5 dernières tentatives
    const recentHistory = [...exercise.history]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    
    // Calculer le score moyen pondéré (les tentatives plus récentes ont plus de poids)
    const totalWeight = recentHistory.reduce((sum, _, index) => sum + (5 - index), 0);
    
    const weightedScore = recentHistory.reduce((sum, attempt, index) => {
      const weight = 5 - index; // Plus récent = plus de poids
      return sum + (attempt.score * weight);
    }, 0);
    
    return Math.round((weightedScore / totalWeight) * 100);
  };
  
  /**
   * Formate un texte pour comparaison (normalisation)
   * Utile pour vérifier les réponses textuelles des utilisateurs
   * @param {string} text - Texte à normaliser
   * @param {Object} options - Options de normalisation
   * @returns {string} - Texte normalisé
   */
  export const normalizeText = (text, options = {}) => {
    if (!text) return '';
    
    const {
      lowercase = true,
      trim = true,
      removeAccents = true,
      removePunctuation = true,
      normalizeWhitespace = true
    } = options;
    
    let normalized = text;
    
    if (lowercase) {
      normalized = normalized.toLowerCase();
    }
    
    if (trim) {
      normalized = normalized.trim();
    }
    
    if (removeAccents) {
      normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    
    if (removePunctuation) {
      normalized = normalized.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    }
    
    if (normalizeWhitespace) {
      normalized = normalized.replace(/\s+/g, " ");
    }
    
    return normalized;
  };
  
  /**
   * Fonctions spécifiques pour l'application d'apprentissage des langues
   */
  
  /**
   * Calcule le score de compréhension orale estimé
   * @param {Object} progress - Objet avec données de progression
   * @returns {number} - Score estimé (0-100)
   */
  export const estimateListeningScore = (progress) => {
    if (!progress) return 0;
    
    // Pondération des différents types d'exercices pour la compréhension orale
    const weights = {
      vocabulary: 0.3,
      phrases: 0.3,
      chatbot: 0.2,
      grammar: 0.1,
      reading: 0.1,
    };
    
    let totalWeight = 0;
    let weightedScore = 0;
    
    // Calculer le score pondéré
    Object.entries(weights).forEach(([type, weight]) => {
      if (progress.exercises[type]) {
        const levelScores = Object.values(progress.exercises[type]);
        const avgScore = levelScores.reduce((sum, level) => 
          sum + (level.completed / level.total), 0) / levelScores.length;
        
        weightedScore += avgScore * weight * 100;
        totalWeight += weight;
      }
    });
    
    // Si aucune donnée disponible
    if (totalWeight === 0) return 0;
    
    return Math.round(weightedScore / totalWeight);
  };
  
  /**
   * Suggère les prochains exercices à pratiquer en fonction de la progression
   * @param {Object} progress - Objet avec données de progression
   * @param {number} count - Nombre de suggestions à retourner
   * @returns {Array} - Suggestions d'exercices
   */
  export const suggestNextExercises = (progress, count = 3) => {
    if (!progress || !progress.exercises) return [];
    
    const suggestions = [];
    
    // Trouver les exercices avec le moins de progression
    const exerciseTypes = Object.keys(progress.exercises);
    
    for (const type of exerciseTypes) {
      const levels = progress.exercises[type];
      
      for (const level in levels) {
        const { completed, total } = levels[level];
        const percentage = (completed / total) * 100;
        
        // Ajouter à la liste des suggestions si non complété
        if (percentage < 100) {
          suggestions.push({
            type,
            level,
            percentage,
            priority: 100 - percentage, // Plus le pourcentage est bas, plus la priorité est haute
          });
        }
      }
    }
    
    // Trier par priorité et retourner les N premiers
    return suggestions
      .sort((a, b) => b.priority - a.priority)
      .slice(0, count);
  };
  
  export default {
    shuffleArray,
    generateId,
    filterItems,
    groupBy,
    slugify,
    debounce,
    throttle,
    chunkArray,
    getRandomItem,
    removeDuplicates,
    getSimilarity,
    shouldReviewExercise,
    calculateMasteryLevel,
    normalizeText,
    estimateListeningScore,
    suggestNextExercises,
  };