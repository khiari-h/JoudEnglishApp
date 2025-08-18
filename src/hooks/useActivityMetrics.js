import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  CURRENT_STREAK: 'current_streak',
  TODAY_MINUTES: 'today_minutes',
  LAST_TIME_DATE: 'last_time_date',
  LAST_ACTIVITY_DATE: 'last_activity_date',
};

const useActivityMetrics = () => {
  // =================== STATE ===================
  const [currentStreak, setCurrentStreak] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [sessionStart, setSessionStart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionElapsedTime, setSessionElapsedTime] = useState(0);

  // =================== UTILS & HELPERS ===================
  const getTodayString = useCallback(() => new Date().toDateString(), []);

  const getYesterdayString = useCallback(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toDateString();
  }, []);

  const logError = useCallback((operation, error) => {
    console.warn(`Storage error in ${operation}:`, error);
  }, []);

  const getStorageValue = useCallback(async (key, defaultValue = null) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? value : defaultValue;
    } catch (error) {
      logError(`getItem ${key}`, error);
      return defaultValue;
    }
  }, [logError]);

  const setMultipleStorageValues = useCallback(async (keyValuePairs) => {
    try {
      const promises = keyValuePairs.map(([key, value]) =>
        AsyncStorage.setItem(key, value.toString())
      );
      await Promise.all(promises);
      return true;
    } catch (error) {
      logError('setMultipleItems', error);
      return false;
    }
  }, [logError]);

  // =================== CORE LOGIC ===================
  const loadMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      const today = getTodayString();
      const yesterday = getYesterdayString();

      const [streakData, timeData, lastTimeDate, lastActivityDate] = await Promise.all([
        getStorageValue(STORAGE_KEYS.CURRENT_STREAK, '0'),
        getStorageValue(STORAGE_KEYS.TODAY_MINUTES, '0'),
        getStorageValue(STORAGE_KEYS.LAST_TIME_DATE, null),
        getStorageValue(STORAGE_KEYS.LAST_ACTIVITY_DATE, null),
      ]);

      let streak = parseInt(streakData) || 0;
      let minutes = parseInt(timeData) || 0;

      // Réinitialisation des minutes si c'est un nouveau jour
      if (lastTimeDate !== today) {
        minutes = 0;
        await setMultipleStorageValues([
          [STORAGE_KEYS.TODAY_MINUTES, 0],
          [STORAGE_KEYS.LAST_TIME_DATE, today]
        ]);
      }

      // Réinitialisation du streak si la dernière activité n'était ni hier ni aujourd'hui
      if (lastActivityDate && lastActivityDate !== today && lastActivityDate !== yesterday) {
          streak = 0;
          await setMultipleStorageValues([
              [STORAGE_KEYS.CURRENT_STREAK, 0]
          ]);
      }
      
      setCurrentStreak(streak);
      setTodayMinutes(minutes);

    } catch (error) {
      logError('loadMetrics', error);
      setCurrentStreak(0);
      setTodayMinutes(0);
    } finally {
      setIsLoading(false);
    }
  }, [getTodayString, getYesterdayString, getStorageValue, setMultipleStorageValues, logError]);

  const startSession = useCallback(() => {
    setSessionStart(Date.now());
    setSessionElapsedTime(0);
  }, []);

  const endSession = useCallback(async () => {
    if (!sessionStart) {
      return { success: false, reason: 'No active session' };
    }

    try {
      const sessionDurationMs = Date.now() - sessionStart;
      // Utilisation de Math.floor pour ne pas compter les minutes partielles
      const sessionMinutes = Math.floor(sessionDurationMs / 60000); 

      setSessionStart(null);
      setSessionElapsedTime(0);

      if (sessionMinutes <= 0) {
        return { success: false, reason: 'Session too short' };
      }

      const newTotalMinutes = todayMinutes + sessionMinutes;
      setTodayMinutes(newTotalMinutes);

      const today = getTodayString();
      const saveSuccess = await setMultipleStorageValues([
        [STORAGE_KEYS.TODAY_MINUTES, newTotalMinutes],
        [STORAGE_KEYS.LAST_TIME_DATE, today]
      ]);

      return { 
        success: saveSuccess, 
        sessionMinutes,
        totalMinutes: newTotalMinutes
      };
    } catch (error) {
      logError('save session data', error);
      setSessionStart(null);
      setSessionElapsedTime(0);
      return { success: false, error };
    }
  }, [sessionStart, todayMinutes, getTodayString, setMultipleStorageValues, logError]);

const updateStreak = useCallback(async () => {
    try {
      // Cas 1 : Aucune activité aujourd'hui. On ne fait rien.
      if (todayMinutes === 0) {
        return { success: true, reason: 'No activity today to update streak' };
      }

      // Récupération des données du stockage.
      const today = getTodayString();
      const lastActivityDate = await getStorageValue(STORAGE_KEYS.LAST_ACTIVITY_DATE);
      
      // Cas 2 : Le streak a déjà été mis à jour aujourd'hui.
      if (lastActivityDate === today) {
        return { success: true, streak: currentStreak, reason: 'Already updated today' };
      }

      // Calcul du nouveau streak.
      const currentStreakValue = parseInt(await getStorageValue(STORAGE_KEYS.CURRENT_STREAK, '0')) || 0;
      const yesterday = getYesterdayString();
      let newStreak;

      // Le streak est incrémenté si l'activité était hier, sinon il est réinitialisé à 1.
      if (!lastActivityDate || lastActivityDate !== yesterday) {
        newStreak = 1;
      } else {
        newStreak = currentStreakValue + 1;
      }

      // Mise à jour de l'état local.
      setCurrentStreak(newStreak);
      
      // Tentative de sauvegarde initiale.
      const saveSuccess = await setMultipleStorageValues([
        [STORAGE_KEYS.CURRENT_STREAK, newStreak],
        [STORAGE_KEYS.LAST_ACTIVITY_DATE, today]
      ]);

      // Retourne le résultat.
      return { 
        success: saveSuccess, 
        streak: newStreak,
        wasIncremented: newStreak > currentStreakValue
      };
    } catch (error) {
      // Premier échec de sauvegarde. On entre ici.
      logError('updateStreak - initial save failed', error);
      
      // On réinitialise localement le streak à 1 pour une nouvelle journée.
      setCurrentStreak(1);
      
      // Seconde tentative de sauvegarde avec un nouveau bloc try/catch pour gérer un double échec.
      let secondSaveSuccess = false;
      try {
        await setMultipleStorageValues([
          [STORAGE_KEYS.CURRENT_STREAK, 1],
          [STORAGE_KEYS.LAST_ACTIVITY_DATE, getTodayString()]
        ]);
        secondSaveSuccess = true;
      } catch (secondSaveError) {
        logError('updateStreak - second save failed', secondSaveError);
        // secondSaveSuccess reste à false
      }
      
      return { success: secondSaveSuccess, error, streak: 1 };
    }
  }, [todayMinutes, getTodayString, getYesterdayString, getStorageValue, setMultipleStorageValues, currentStreak, logError]);
  // =================== FORMATTING & API ===================
  const getFormattedTime = useCallback(() => {
    if (todayMinutes === 0) return '0min';
    const hours = Math.floor(todayMinutes / 60);
    const minutes = todayMinutes % 60;
    
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h${minutes}min`;
  }, [todayMinutes]);

  const getStreakTrend = useCallback(() => {
    if (currentStreak >= 30) return '🏆 Légendaire!';
    if (currentStreak >= 14) return '💎 Exceptionnel!';
    if (currentStreak >= 7) return '🏆 Incroyable!';
    if (currentStreak >= 3) return '💪 En forme!';
    if (currentStreak >= 1) return '🔥 Continue!';
    return null;
  }, [currentStreak]);

  const getSessionStatus = useCallback(() => {
    if (!sessionStart) return null;
    const minutes = Math.floor(sessionElapsedTime / 60);
    const seconds = sessionElapsedTime % 60;
    return { 
      isActive: true, 
      elapsed: sessionElapsedTime,
      formattedTime: `${minutes}:${seconds.toString().padStart(2, '0')}` 
    };
  }, [sessionStart, sessionElapsedTime]);

  const getStreakInfo = useCallback(() => {
    return {
      current: currentStreak,
      isActive: currentStreak > 0,
      trend: getStreakTrend(),
      nextMilestone: currentStreak < 3 ? 3 : 
          currentStreak < 7 ? 7 : 
          currentStreak < 14 ? 14 : 
          currentStreak < 30 ? 30 : null
    };
  }, [currentStreak, getStreakTrend]);

  const getTodayInfo = useCallback(() => {
    return {
      minutes: todayMinutes,
      formattedTime: getFormattedTime(),
      hasActivity: todayMinutes > 0,
      session: getSessionStatus()
    };
  }, [todayMinutes, getFormattedTime, getSessionStatus]);

  // =================== EFFECTS ===================
  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  useEffect(() => {
    let interval;
    if (sessionStart) {
      interval = setInterval(() => {
        setSessionElapsedTime(Math.floor((Date.now() - sessionStart) / 1000));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [sessionStart]);

  // =================== PUBLIC API ===================
  return {
    startSession,
    endSession,
    updateStreak,
    isLoading,
    currentStreak,
    todayMinutes,
    formattedTime: getFormattedTime(),
    streakTrend: getStreakTrend(),
    streakInfo: getStreakInfo(),
    todayInfo: getTodayInfo(),
    refreshMetrics: loadMetrics
  };
};

export default useActivityMetrics;