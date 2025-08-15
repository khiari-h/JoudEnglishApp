// src/services/lockService.js - Simple offline app lock service (PIN + recovery)
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ENABLED: 'app_lock.enabled',
  PIN_HASH: 'app_lock.pin_hash',
  PIN_SALT: 'app_lock.pin_salt',
  BIO_ENABLED: 'app_lock.bio_enabled',
  RECOVERY_HASH: 'app_lock.recovery_hash',
  TIMEOUT_SECONDS: 'app_lock.timeout_seconds',
  LOCKOUT_UNTIL: 'app_lock.lockout_until',
  FAILED_ATTEMPTS: 'app_lock.failed_attempts',
};

// NOTE: This is not cryptographically strong. For local lock UX only.
function simpleHash(input) {
  let hash = 0;
  const str = String(input);
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

/**
 * Génère des bytes aléatoires cryptographiquement sûrs
 * @param {number} length - Nombre de bytes à générer
 * @returns {Uint8Array} Bytes aléatoires
 */
function getSecureRandomBytes(length) {
  try {
    // Méthode 1: Web Crypto API (disponible dans React Native)
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const randomValues = new Uint8Array(length);
      crypto.getRandomValues(randomValues);
      return randomValues;
    }
    
    // Méthode 2: Node.js crypto (si disponible)
    if (typeof require !== 'undefined') {
      try {
        const nodeCrypto = require('crypto');
        return nodeCrypto.randomBytes(length);
      } catch (nodeCryptoError) {
        console.warn('Node.js crypto failed:', nodeCryptoError.message);
      }
    }
    
    // Méthode 3: expo-crypto (si disponible et importé)
    if (typeof require !== 'undefined') {
      try {
        const expoCrypto = require('expo-crypto');
        if (expoCrypto?.getRandomBytes) {
          // expo-crypto.getRandomBytes est synchrone, pas besoin d'await
          return expoCrypto.getRandomBytes(length);
        }
      } catch (expoError) {
        console.warn('expo-crypto not available:', expoError.message);
      }
    }
    
    throw new Error('No secure random source available');
  } catch (error) {
    console.warn('All secure random methods failed, using fallback:', error.message);
    throw error;
  }
}

/**
 * Génère un salt cryptographiquement sûr
 * @param {number} length - Longueur du salt (défaut: 16)
 * @returns {string} Salt sécurisé
 */
function secureRandomSalt(length = 16) {
  try {
    const randomBytes = getSecureRandomBytes(length);
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let out = '';
    
    for (let i = 0; i < length; i += 1) {
      const randomIndex = randomBytes[i] % chars.length;
      out += chars[randomIndex];
    }
    return out;
  } catch (error) {
    console.warn('Secure random failed, using fallback method:', error.message);
    // Dernier recours : méthode moins sécurisée mais fonctionnelle
    return fallbackRandomSalt(length);
  }
}

/**
 * Fallback moins sécurisé (utilisé uniquement en cas d'échec de toutes les méthodes sécurisées)
 * @param {number} length - Longueur du salt
 * @returns {string} Salt moins sécurisé
 */
function fallbackRandomSalt(length = 16) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let out = '';
  
  // Utilise une combinaison d'entropie système au lieu de Math.random
  const entropySources = [
    Date.now() % 1000000,
    process.hrtime ? process.hrtime()[1] : 0,
    Math.floor(performance?.now() || 0),
    crypto?.getRandomValues ? crypto.getRandomValues(new Uint8Array(1))[0] : 0
  ];
  
  for (let i = 0; i < length; i += 1) {
    // Combine plusieurs sources d'entropie pour améliorer la qualité
    const entropy = entropySources.reduce((acc, source, index) => {
      return acc + (source * (index + 1)) % chars.length;
    }, i);
    const randomIndex = entropy % chars.length;
    out += chars[randomIndex];
  }
  return out;
}

/**
 * Génère un code de récupération cryptographiquement sûr
 * @returns {string} Code de récupération sécurisé
 */
export function generateRecoveryCode() {
  try {
    const randomBytes = getSecureRandomBytes(16);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    
    for (let i = 0; i < 16; i += 1) {
      const randomIndex = randomBytes[i] % chars.length;
      code += chars[randomIndex];
    }
    return code;
  } catch (error) {
    console.warn('Secure random failed, using fallback method:', error.message);
    // Dernier recours : méthode moins sécurisée mais fonctionnelle
    return fallbackGenerateRecoveryCode();
  }
}

/**
 * Fallback moins sécurisé pour la génération de code de récupération
 * @returns {string} Code de récupération moins sécurisé
 */
function fallbackGenerateRecoveryCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  
  // Utilise une combinaison d'entropie système au lieu de Math.random
  const entropySources = [
    Date.now() % 1000000,
    process.hrtime ? process.hrtime()[1] : 0,
    Math.floor(performance?.now() || 0),
    crypto?.getRandomValues ? crypto.getRandomValues(new Uint8Array(1))[0] : 0
  ];
  
  for (let i = 0; i < 16; i += 1) {
    // Combine plusieurs sources d'entropie pour améliorer la qualité
    const entropy = entropySources.reduce((acc, source, index) => {
      return acc + (source * (index + 1)) % chars.length;
    }, i);
    const randomIndex = entropy % chars.length;
    code += chars[randomIndex];
  }
  return code;
}

export async function isEnabled() {
  const enabled = await AsyncStorage.getItem(STORAGE_KEYS.ENABLED);
  return enabled === '1';
}

export async function enableLock() {
  await AsyncStorage.setItem(STORAGE_KEYS.ENABLED, '1');
  return true;
}

export async function disableLock() {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.ENABLED,
    STORAGE_KEYS.PIN_HASH,
    STORAGE_KEYS.PIN_SALT,
    STORAGE_KEYS.BIO_ENABLED,
    STORAGE_KEYS.RECOVERY_HASH,
    STORAGE_KEYS.TIMEOUT_SECONDS,
    STORAGE_KEYS.LOCKOUT_UNTIL,
    STORAGE_KEYS.FAILED_ATTEMPTS,
  ]);
  return true;
}

export async function setPin(pin) {
  const salt = secureRandomSalt();
  const pinHash = simpleHash(`${salt}:${pin}`);
  await AsyncStorage.setItem(STORAGE_KEYS.PIN_SALT, salt);
  await AsyncStorage.setItem(STORAGE_KEYS.PIN_HASH, pinHash);
  return true;
}

export async function verifyPin(pin) {
  const lockoutUntil = Number(await AsyncStorage.getItem(STORAGE_KEYS.LOCKOUT_UNTIL) || '0');
  const now = Date.now();
  if (lockoutUntil && now < lockoutUntil) {
    return { ok: false, reason: 'lockout' };
  }

  const salt = await AsyncStorage.getItem(STORAGE_KEYS.PIN_SALT);
  const expected = await AsyncStorage.getItem(STORAGE_KEYS.PIN_HASH);
  if (!salt || !expected) return { ok: false };
  const given = simpleHash(`${salt}:${pin}`);
  const ok = given === expected;

  let attempts = Number(await AsyncStorage.getItem(STORAGE_KEYS.FAILED_ATTEMPTS) || '0');
  if (ok) {
    await AsyncStorage.setItem(STORAGE_KEYS.FAILED_ATTEMPTS, '0');
    return { ok: true };
  }
  attempts += 1;
  await AsyncStorage.setItem(STORAGE_KEYS.FAILED_ATTEMPTS, String(attempts));
  if (attempts >= 5) {
    const lockMs = 30_000 * Math.min(4, attempts - 4); // 30s, 60s, 90s, 120s
    await AsyncStorage.setItem(STORAGE_KEYS.LOCKOUT_UNTIL, String(now + lockMs));
    return { ok: false, reason: 'lockout' };
  }
  return { ok: false };
}

export async function setBiometricsEnabled(enabled) {
  await AsyncStorage.setItem(STORAGE_KEYS.BIO_ENABLED, enabled ? '1' : '0');
  return true;
}

export async function isBiometricsEnabled() {
  const v = await AsyncStorage.getItem(STORAGE_KEYS.BIO_ENABLED);
  return v === '1';
}

export async function unlockWithBiometrics() {
  // Placeholder for real expo-local-authentication integration
  const enabled = await isBiometricsEnabled();
  if (!enabled) return { ok: false };
  // In real app: prompt biometric and return result
  return { ok: true };
}

export async function setRecoveryCode(code) {
  const hash = simpleHash(code);
  await AsyncStorage.setItem(STORAGE_KEYS.RECOVERY_HASH, hash);
  return true;
}

export async function verifyRecovery(code) {
  const expected = await AsyncStorage.getItem(STORAGE_KEYS.RECOVERY_HASH);
  if (!expected) return false;
  return simpleHash(code) === expected;
}

export async function setAutoLockTimeout(seconds) {
  await AsyncStorage.setItem(STORAGE_KEYS.TIMEOUT_SECONDS, String(seconds));
  return true;
}

export async function getAutoLockTimeout() {
  return Number(await AsyncStorage.getItem(STORAGE_KEYS.TIMEOUT_SECONDS) || '0');
}

export async function emergencyReset() {
  await disableLock();
  return true;
}

export const lockStorageKeys = STORAGE_KEYS;


