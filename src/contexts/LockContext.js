// src/contexts/LockContext.js
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Lock from '../services/lockService';

const LockContext = createContext(null);

export function LockProvider({ children }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const enabled = await Lock.isEnabled();
        setIsEnabled(enabled);
        setIsLocked(enabled);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const lockNow = useCallback(() => {
    if (isEnabled) setIsLocked(true);
  }, [isEnabled]);

  const unlockWithPin = useCallback(async (pin) => {
    const res = await Lock.verifyPin(pin);
    if (res.ok) {
      setIsLocked(false);
      return { ok: true };
    }
    if (res.reason === 'lockout') return { ok: false, reason: 'lockout' };
    return { ok: false };
  }, []);

  const disable = useCallback(async () => {
    await Lock.disableLock();
    setIsEnabled(false);
    setIsLocked(false);
  }, []);

  const enable = useCallback(async () => {
    await Lock.enableLock();
    setIsEnabled(true);
    setIsLocked(true);
  }, []);

  const value = {
    isEnabled,
    isLocked,
    isLoading,
    lockNow,
    unlockWithPin,
    enable,
    disable,
  };

  return (
    <LockContext.Provider value={value}>{children}</LockContext.Provider>
  );
}

LockProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useLock() {
  const ctx = useContext(LockContext);
  if (!ctx) throw new Error('useLock must be used within LockProvider');
  return ctx;
}


