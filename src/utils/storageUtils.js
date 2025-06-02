// utils/storageUtils.js
/**
 * Utilitaires pour la gestion sécurisée du localStorage
 */

import { STORAGE_CONFIG, DEFAULT_STATS } from './timeConstants.js';
import { sanitizeTimeStats } from './timeUtils.js';

/**
 * Structure attendue des données stockées
 */
const STORAGE_SCHEMA = {
  version: 'string',
  data: 'object',
  lastModified: 'number'
};

/**
 * Vérifie si localStorage est disponible
 * @returns {boolean} True si localStorage est disponible
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.warn('localStorage not available:', e.message);
    return false;
  }
};

/**
 * Valide la structure des données stockées
 * @param {any} data - Données à valider
 * @returns {boolean} True si la structure est valide
 */
const validateStorageStructure = (data) => {
  if (!data || typeof data !== 'object') return false;
  
  // Vérifier la présence des champs requis
  const hasVersion = typeof data.version === 'string';
  const hasData = typeof data.data === 'object' && data.data !== null;
  const hasTimestamp = typeof data.lastModified === 'number';
  
  return hasVersion && hasData && hasTimestamp;
};

/**
 * Migre les anciennes données vers le nouveau format
 * @param {object} oldData - Anciennes données
 * @returns {object} Données migrées
 */
const migrateOldData = (oldData) => {
  // Si c'est déjà le nouveau format, on retourne tel quel
  if (validateStorageStructure(oldData)) {
    return oldData;
  }
  
  // Migration depuis l'ancien format (données directes)
  let migratedData = { ...DEFAULT_STATS };
  
  if (oldData && typeof oldData === 'object') {
    // Migration vocabulary_classic + vocabulary_fast -> vocabulary
    if (oldData.vocabulary_classic || oldData.vocabulary_fast) {
      const classicTime = oldData.vocabulary_classic || 0;
      const fastTime = oldData.vocabulary_fast || 0;
      migratedData.vocabulary = classicTime + fastTime;
    }
    
    // Copier les autres exercices s'ils existent
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
 * Lit les données depuis localStorage avec validation
 * @param {string} key - Clé de stockage
 * @returns {object|null} Données lues ou null si erreur
 */
export const readFromStorage = (key = STORAGE_CONFIG.KEY) => {
  if (!isStorageAvailable()) {
    return null;
  }
  
  try {
    const rawData = localStorage.getItem(key);
    if (!rawData) {
      return null;
    }
    
    const parsedData = JSON.parse(rawData);
    const migratedData = migrateOldData(parsedData);
    
    // Si migration nécessaire, sauvegarder immédiatement
    if (!validateStorageStructure(parsedData)) {
      writeToStorage(key, migratedData.data);
    }
    
    return migratedData;
    
  } catch (error) {
    console.error(`Error reading from storage (${key}):`, error);
    
    // Essayer de récupérer la sauvegarde
    if (key !== STORAGE_CONFIG.BACKUP_KEY) {
      const backup = readFromStorage(STORAGE_CONFIG.BACKUP_KEY);
      if (backup) {
        console.info('Restored from backup');
        return backup;
      }
    }
    
    return null;
  }
};

/**
 * Écrit les données dans localStorage avec validation
 * @param {string} key - Clé de stockage
 * @param {object} data - Données à stocker
 * @returns {boolean} True si succès
 */
export const writeToStorage = (key = STORAGE_CONFIG.KEY, data) => {
  if (!isStorageAvailable()) {
    return false;
  }
  
  try {
    const sanitizedData = sanitizeTimeStats(data);
    const storageData = {
      version: STORAGE_CONFIG.VERSION,
      data: sanitizedData,
      lastModified: Date.now()
    };
    
    const serialized = JSON.stringify(storageData);
    
    // Créer une sauvegarde avant d'écrire
    if (key === STORAGE_CONFIG.KEY) {
      const existing = localStorage.getItem(key);
      if (existing) {
        localStorage.setItem(STORAGE_CONFIG.BACKUP_KEY, existing);
      }
    }
    
    localStorage.setItem(key, serialized);
    return true;
    
  } catch (error) {
    console.error(`Error writing to storage (${key}):`, error);
    return false;
  }
};

/**
 * Supprime les données du localStorage
 * @param {string} key - Clé de stockage
 * @returns {boolean} True si succès
 */
export const removeFromStorage = (key = STORAGE_CONFIG.KEY) => {
  if (!isStorageAvailable()) {
    return false;
  }
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from storage (${key}):`, error);
    return false;
  }
};

/**
 * Remet les données à zéro
 * @returns {boolean} True si succès
 */
export const resetStorage = () => {
  return writeToStorage(STORAGE_CONFIG.KEY, DEFAULT_STATS);
};

/**
 * Obtient les statistiques de stockage pour debug
 * @returns {object} Informations sur le stockage
 */
export const getStorageInfo = () => {
  if (!isStorageAvailable()) {
    return { available: false };
  }
  
  try {
    const data = readFromStorage();
    const hasBackup = !!localStorage.getItem(STORAGE_CONFIG.BACKUP_KEY);
    
    return {
      available: true,
      hasData: !!data,
      hasBackup,
      version: data?.version || 'unknown',
      lastModified: data?.lastModified ? new Date(data.lastModified) : null,
      dataSize: localStorage.getItem(STORAGE_CONFIG.KEY)?.length || 0
    };
  } catch (error) {
    return {
      available: true,
      error: error.message
    };
  }
};