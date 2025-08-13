// src/utils/storageUtils.js
/**
 * Utilitaires unifiés pour la gestion du stockage AsyncStorage
 * Combine logique métier + utilitaires génériques
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_CONFIG, DEFAULT_STATS } from './timeConstants.js';
import { sanitizeTimeStats } from './timeUtils.js';

// =================== UTILITAIRES GÉNÉRIQUES ===================

/**
 * Vérifie si AsyncStorage est disponible
 * @returns {Promise<boolean>} True si AsyncStorage est disponible
 */
export const isStorageAvailable = async () => {
  try {
    const test = '__storage_test__';
    await AsyncStorage.setItem(test, test);
    await AsyncStorage.removeItem(test);
    return true;
  } catch (e) {
    console.warn('AsyncStorage not available:', e.message);
    return false;
  }
};

/**
 * Stocker des données génériques
 * @param {string} key - Clé de stockage
 * @param {any} value - Valeur à stocker (sera convertie en JSON)
 * @returns {Promise<boolean>} - true si succès, false si erreur
 */
export const storeData = async (key, value) => {
  try {
    // Si la valeur est null/undefined, on supprime la clé pour éviter l'erreur AsyncStorage
    if (value === undefined || value === null) {
      await AsyncStorage.removeItem(key);
      return true;
    }

    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error storing data:', error);
    return false;
  }
};

/**
 * Récupérer des données génériques
 * @param {string} key - Clé de stockage
 * @returns {Promise<any>} - Données récupérées ou null si non trouvé/erreur
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

/**
 * Supprimer des données
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
    console.error('Error getting multiple data:', error);
    return {};
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

// =================== LOGIQUE MÉTIER SPÉCIFIQUE ===================

/**
 * Valide la structure des données stockées
 */
const validateStorageStructure = (data) => {
  if (!data || typeof data !== 'object') return false;
  
  const hasVersion = typeof data.version === 'string';
  const hasData = typeof data.data === 'object' && data.data !== null;
  const hasTimestamp = typeof data.lastModified === 'number';
  
  return hasVersion && hasData && hasTimestamp;
};

/**
 * Migre les anciennes données vers le nouveau format
 */
const migrateOldData = (oldData) => {
  if (validateStorageStructure(oldData)) {
    return oldData;
  }
  
  const migratedData = { ...DEFAULT_STATS };
  
  if (oldData && typeof oldData === 'object') {
    if (oldData.vocabulary_classic || oldData.vocabulary_fast) {
      const classicTime = oldData.vocabulary_classic || 0;
      const fastTime = oldData.vocabulary_fast || 0;
      migratedData.vocabulary = classicTime + fastTime;
    }
    
    Object.keys(DEFAULT_STATS).forEach(exerciseType => {
      if (exerciseType !== 'vocabulary' && oldData[exerciseType]) {
        migratedData[exerciseType] = oldData[exerciseType];
      }
    });
  }
  
  return {
    version: STORAGE_CONFIG.VERSION,
    data: sanitizeTimeStats(migratedData),
    lastModified: Date.now()
  };
};

/**
 * Écrit les données avec validation
 */
const writeToStorage = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

/**
 * Lit les données avec validation et migration
 */
export const readFromStorage = async (key = STORAGE_CONFIG.KEY) => {
  const available = await isStorageAvailable();
  if (!available) {
    return null;
  }
  
  try {
    const rawData = await AsyncStorage.getItem(key);
    if (!rawData) {
      return null;
    }
    
    const parsedData = JSON.parse(rawData);
    const migratedData = migrateOldData(parsedData);
    
    if (!validateStorageStructure(parsedData)) {
      await writeToStorage(key, migratedData.data);
    }
    
    return migratedData;
    
  } catch (error) {
    console.error(`Error reading from storage (${key}):`, error);
    
    if (key !== STORAGE_CONFIG.BACKUP_KEY) {
      const backup = await readFromStorage(STORAGE_CONFIG.BACKUP_KEY);
      if (backup) {
        console.info('Restored from backup');
        return backup;
      }
    }
    
    return null;
  }
};

/**
 * Supprime les données du AsyncStorage
 */
export const removeFromStorage = async (key = STORAGE_CONFIG.KEY) => {
  const available = await isStorageAvailable();
  if (!available) {
    return false;
  }
  
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from storage (${key}):`, error);
    return false;
  }
};

/**
 * Remet les données à zéro
 */
export const resetStorage = () => {
  return writeToStorage(STORAGE_CONFIG.KEY, DEFAULT_STATS);
};

/**
 * Obtient les statistiques de stockage pour debug
 */
export const getStorageInfo = async () => {
  const available = await isStorageAvailable();
  if (!available) {
    return { available: false };
  }
  
  try {
    const data = await readFromStorage();
    const backupData = await AsyncStorage.getItem(STORAGE_CONFIG.BACKUP_KEY);
    const hasBackup = Boolean(backupData);
    const mainData = await AsyncStorage.getItem(STORAGE_CONFIG.KEY);
    
    return {
      available: true,
      hasData: Boolean(data),
      hasBackup,
      version: data?.version || 'unknown',
      lastModified: data?.lastModified ? new Date(data.lastModified) : null,
      dataSize: mainData?.length || 0
    };
  } catch (error) {
    return {
      available: true,
      error: error.message
    };
  }
};

// =================== SERVICE MÉTIER POUR L'APP ===================

/**
 * Service de stockage spécifique pour l'application
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

  // Sauvegarder la progression
  saveProgress: (progressData) => {
    return storeData(storageService.keys.USER_PROGRESS, progressData);
  },

  // Récupérer la progression
  getProgress: () => {
    return getData(storageService.keys.USER_PROGRESS);
  },

  // Sauvegarder les paramètres
  saveSettings: (settings) => {
    return storeData(storageService.keys.USER_SETTINGS, settings);
  },

  // Récupérer les paramètres
  getSettings: () => {
    return getData(storageService.keys.USER_SETTINGS);
  },

  // Marquer un exercice comme complété
  markExerciseCompleted: async (exerciseId, level, score) => {
    try {
      const completedExercises = await getData(storageService.keys.COMPLETED_EXERCISES) || {};

      completedExercises[exerciseId] = {
        level,
        score,
        completedAt: new Date().toISOString(),
      };

      await storeData(storageService.keys.COMPLETED_EXERCISES, completedExercises);
      return true;
    } catch (error) {
      console.error('Error marking exercise completed:', error);
      return false;
    }
  },

  // Vérifier si un exercice a été complété
  isExerciseCompleted: async (exerciseId) => {
    const completedExercises = await getData(storageService.keys.COMPLETED_EXERCISES) || {};
    return Boolean(completedExercises[exerciseId]);
  },

  // Mettre à jour la streak
  updateStreak: async () => {
    try {
      const streakData = await getData(storageService.keys.STREAK_DATA) || {
        currentStreak: 0,
        lastLoginDate: null,
        maxStreak: 0,
      };

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

      if (!streakData.lastLoginDate) {
        streakData.currentStreak = 1;
        streakData.maxStreak = 1;
        streakData.lastLoginDate = today;
      } else {
        const lastLogin = new Date(streakData.lastLoginDate).getTime();
        const oneDayMs = 24 * 60 * 60 * 1000;

        if (today - lastLogin === oneDayMs) {
          streakData.currentStreak += 1;
          streakData.maxStreak = Math.max(streakData.maxStreak, streakData.currentStreak);
          streakData.lastLoginDate = today;
        } else if (today === lastLogin) {
          // Ne rien faire
        } else {
          streakData.currentStreak = 1;
          streakData.lastLoginDate = today;
        }
      }

      await storeData(storageService.keys.STREAK_DATA, streakData);
      return streakData;
    } catch (error) {
      console.error('Error updating streak:', error);
      return null;
    }
  },

  // Récupérer les données de streak
  getStreak: () => {
    return getData(storageService.keys.STREAK_DATA) || {
      currentStreak: 0,
      lastLoginDate: null,
      maxStreak: 0,
    };
  },

  // Réinitialiser toutes les données
  resetAllData: () => {
    return clearAllData();
  },
};