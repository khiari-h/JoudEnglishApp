// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utilitaires pour la gestion du stockage local avec AsyncStorage
 */

/**
 * Enregistrer des données dans AsyncStorage
 * @param {string} key - Clé de stockage
 * @param {any} value - Valeur à stocker (sera convertie en JSON)
 * @returns {Promise<boolean>} - true si succès, false si erreur
 */
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error storing data:', error);
    return false;
  }
};

/**
 * Récupérer des données depuis AsyncStorage
 * @param {string} key - Clé de stockage
 * @returns {Promise<any>} - Données récupérées ou null si non trouvé/erreur
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

/**
 * Supprimer des données d'AsyncStorage
 * @param {string} key - Clé de stockage
 * @returns {Promise<boolean>} - true si succès, false si erreur
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};

/**
 * Vérifier si une clé existe dans AsyncStorage
 * @param {string} key - Clé à vérifier
 * @returns {Promise<boolean>} - true si la clé existe, false sinon
 */
export const hasKey = async (key) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (error) {
    console.error('Error checking key:', error);
    return false;
  }
};

/**
 * Récupérer plusieurs données depuis AsyncStorage
 * @param {Array<string>} keys - Tableau de clés
 * @returns {Promise<Object>} - Objet avec les clés et les valeurs
 */
export const getMultipleData = async (keys) => {
  try {
    const items = await AsyncStorage.multiGet(keys);
    return items.reduce((result, [key, value]) => {
      result[key] = value != null ? JSON.parse(value) : null;
      return result;
    }, {});
  } catch (error) {
    console.error('Error retrieving multiple data:', error);
    return {};
  }
};

/**
 * Stocker plusieurs données dans AsyncStorage
 * @param {Object} keyValuePairs - Objet avec les clés et les valeurs
 * @returns {Promise<boolean>} - true si succès, false si erreur
 */
export const storeMultipleData = async (keyValuePairs) => {
  try {
    const pairs = Object.entries(keyValuePairs).map(([key, value]) => [
      key, 
      JSON.stringify(value)
    ]);
    
    await AsyncStorage.multiSet(pairs);
    return true;
  } catch (error) {
    console.error('Error storing multiple data:', error);
    return false;
  }
};

/**
 * Supprimer plusieurs données d'AsyncStorage
 * @param {Array<string>} keys - Tableau de clés
 * @returns {Promise<boolean>} - true si succès, false si erreur
 */
export const removeMultipleData = async (keys) => {
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error('Error removing multiple data:', error);
    return false;
  }
};

/**
 * Effacer toutes les données de l'application
 * @returns {Promise<boolean>} - true si succès, false si erreur
 */
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};

/**
 * Obtenir toutes les clés stockées
 * @returns {Promise<Array<string>>} - Tableau de toutes les clés
 */
export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

/**
 * Récupérer des données avec une date d'expiration
 * @param {string} key - Clé de stockage
 * @returns {Promise<any>} - Données récupérées ou null si expirées/non trouvées
 */
export const getDataWithExpiry = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    
    if (!jsonValue) {
      return null;
    }
    
    const item = JSON.parse(jsonValue);
    
    // Vérifier si l'élément a une date d'expiration
    if (!item.expiry) {
      return item.value;
    }
    
    // Vérifier si l'élément a expiré
    if (new Date().getTime() > item.expiry) {
      // Supprimer l'élément expiré
      await AsyncStorage.removeItem(key);
      return null;
    }
    
    return item.value;
  } catch (error) {
    console.error('Error retrieving data with expiry:', error);
    return null;
  }
};

/**
 * Stocker des données avec une date d'expiration
 * @param {string} key - Clé de stockage
 * @param {any} value - Valeur à stocker
 * @param {number} ttl - Durée de vie en millisecondes
 * @returns {Promise<boolean>} - true si succès, false si erreur
 */
export const storeDataWithExpiry = async (key, value, ttl) => {
  try {
    const item = {
      value,
      expiry: new Date().getTime() + ttl,
    };
    
    await AsyncStorage.setItem(key, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error('Error storing data with expiry:', error);
    return false;
  }
};

/**
 * Service de stockage spécifique pour l'application d'apprentissage des langues
 */
export const storageService = {
  // Clés de stockage
  keys: {
    USER_PROGRESS: 'userProgress',
    USER_SETTINGS: 'userSettings',
    LAST_ACTIVITY: 'lastActivity',
    CURRENT_LEVEL: 'currentLevel',
    STREAK_DATA: 'streakData',
    COMPLETED_EXERCISES: 'completedExercises',
  },
  
  // Sauvegarder la progression de l'utilisateur
  saveProgress: async (progressData) => {
    return storeData(storageService.keys.USER_PROGRESS, progressData);
  },
  
  // Récupérer la progression de l'utilisateur
  getProgress: async () => {
    return getData(storageService.keys.USER_PROGRESS);
  },
  
  // Sauvegarder les paramètres de l'utilisateur
  saveSettings: async (settings) => {
    return storeData(storageService.keys.USER_SETTINGS, settings);
  },
  
  // Récupérer les paramètres de l'utilisateur
  getSettings: async () => {
    return getData(storageService.keys.USER_SETTINGS);
  },
  
  // Marquer un exercice comme complété
  markExerciseCompleted: async (exerciseId, level, score) => {
    try {
      // Récupérer les exercices déjà complétés
      const completedExercises = await getData(storageService.keys.COMPLETED_EXERCISES) || {};
      
      // Ajouter le nouvel exercice complété
      completedExercises[exerciseId] = {
        level,
        score,
        completedAt: new Date().toISOString(),
      };
      
      // Sauvegarder la liste mise à jour
      await storeData(storageService.keys.COMPLETED_EXERCISES, completedExercises);
      return true;
    } catch (error) {
      console.error('Error marking exercise as completed:', error);
      return false;
    }
  },
  
  // Vérifier si un exercice a été complété
  isExerciseCompleted: async (exerciseId) => {
    const completedExercises = await getData(storageService.keys.COMPLETED_EXERCISES) || {};
    return Boolean(completedExercises[exerciseId]);
  },
  
  // Mettre à jour la streak de l'utilisateur
  updateStreak: async () => {
    try {
      // Récupérer les données de streak
      const streakData = await getData(storageService.keys.STREAK_DATA) || {
        currentStreak: 0,
        lastLoginDate: null,
        maxStreak: 0,
      };
      
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      
      // Si c'est la première connexion
      if (!streakData.lastLoginDate) {
        streakData.currentStreak = 1;
        streakData.maxStreak = 1;
        streakData.lastLoginDate = today;
      } else {
        const lastLogin = new Date(streakData.lastLoginDate).getTime();
        const oneDayMs = 24 * 60 * 60 * 1000;
        
        // Si la dernière connexion était hier, on incrémente la streak
        if (today - lastLogin === oneDayMs) {
          streakData.currentStreak += 1;
          streakData.maxStreak = Math.max(streakData.maxStreak, streakData.currentStreak);
          streakData.lastLoginDate = today;
        }
        // Si la dernière connexion était aujourd'hui, on ne fait rien
        else if (today === lastLogin) {
          // Ne rien faire
        }
        // Sinon, on réinitialise la streak
        else {
          streakData.currentStreak = 1;
          streakData.lastLoginDate = today;
        }
      }
      
      // Sauvegarder les données de streak mises à jour
      await storeData(storageService.keys.STREAK_DATA, streakData);
      return streakData;
    } catch (error) {
      console.error('Error updating streak:', error);
      return null;
    }
  },
  
  // Récupérer les données de streak
  getStreak: async () => {
    return getData(storageService.keys.STREAK_DATA) || {
      currentStreak: 0,
      lastLoginDate: null,
      maxStreak: 0,
    };
  },
  
  // Réinitialiser toutes les données de l'application
  resetAllData: async () => {
    return clearAllData();
  },
};

export default storageService;