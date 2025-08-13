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

function randomSalt(length = 16) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let out = '';
  for (let i = 0; i < length; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
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
  const salt = randomSalt();
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

export function generateRecoveryCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 16; i += 1) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
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


