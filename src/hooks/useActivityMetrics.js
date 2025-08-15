// src/hooks/useActivityMetrics.js - TEMPS QUOTIDIEN

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useActivityMetrics = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0); // ✅ CHANGÉ : quotidien
  const [sessionStart, setSessionStart] = useState(null);

  // =================== DATES HELPER ===================
  const getTodayString = () => new Date().toDateString();

  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, fallback) => {
    console.warn(`Storage error in ${operation}:`, error);
    return fallback;
  };

  // =================== CHARGEMENT INITIAL ===================
  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const today = getTodayString();
      
      const [streakData, timeData, lastDateData] = await Promise.all([
        AsyncStorage.getItem('current_streak'),
        AsyncStorage.getItem('today_minutes'),
        AsyncStorage.getItem('last_time_date')
      ]);

      setCurrentStreak(parseInt(streakData || '0'));
      
      // ✅ CORRECTION : Vérifier si c'est aujourd'hui
      const lastDate = lastDateData;
      if (lastDate === today) {
        setTodayMinutes(parseInt(timeData || '0'));
      } else {
        // Nouveau jour = reset
        setTodayMinutes(0);
        try {
          await AsyncStorage.setItem('today_minutes', '0');
          await AsyncStorage.setItem('last_time_date', today);
        } catch (storageError) {
          handleStorageError(storageError, 'reset daily metrics', null);
        }
      }
    } catch (error) {
      handleStorageError(error, 'loadMetrics', null);
      // Fallback: utiliser les valeurs par défaut
      setCurrentStreak(0);
      setTodayMinutes(0);
    }
  };

  // =================== SESSION TIMER ===================
  const startSession = useCallback((exerciseType) => {
    setSessionStart(Date.now());
  }, []);

  const endSession = useCallback(async () => {
    if (!sessionStart) return;

    try {
      const sessionEnd = Date.now();
      const sessionMinutes = Math.round((sessionEnd - sessionStart) / 60000);

      if (sessionMinutes > 0) {
        const newTodayTotal = todayMinutes + sessionMinutes;
        setTodayMinutes(newTodayTotal);
        
        const today = getTodayString();
        try {
          await Promise.all([
            AsyncStorage.setItem('today_minutes', newTodayTotal.toString()),
            AsyncStorage.setItem('last_time_date', today)
          ]);
        } catch (storageError) {
          handleStorageError(storageError, 'save session data', null);
          // Fallback: garder les données en mémoire même si la sauvegarde échoue
        }
      }

      setSessionStart(null);
    } catch (error) {
      handleStorageError(error, 'endSession', null);
      // Fallback: réinitialiser la session même en cas d'erreur
      setSessionStart(null);
    }
  }, [sessionStart, todayMinutes]);

  // =================== STREAK LOGIC ===================
  const updateStreak = useCallback(async () => {
    try {
      const today = getTodayString();
      const lastDate = await AsyncStorage.getItem('last_activity_date');
      
      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isYesterday = lastDate === yesterday.toDateString();
        
        let newStreak;
        if (isYesterday) {
          newStreak = currentStreak + 1;
        } else {
          newStreak = 1;
        }
        
        setCurrentStreak(newStreak);
        try {
          await Promise.all([
            AsyncStorage.setItem('current_streak', newStreak.toString()),
            AsyncStorage.setItem('last_activity_date', today)
          ]);
        } catch (storageError) {
          handleStorageError(storageError, 'save streak data', null);
          // Fallback: garder le streak en mémoire même si la sauvegarde échoue
        }
      }
    } catch (error) {
      handleStorageError(error, 'updateStreak', null);
      // Fallback: ne pas mettre à jour le streak en cas d'erreur
    }
  }, [currentStreak]);

  // =================== GETTERS ===================
  const getStreakTrend = useCallback(() => {
    if (currentStreak >= 7) return '🏆 Incroyable!';
    if (currentStreak >= 3) return '💪 En forme!';
    if (currentStreak >= 1) return '🔥 Continue!';
    return null;
  }, [currentStreak]);

  const getFormattedTime = useCallback(() => {
    if (todayMinutes < 60) {
      return `${todayMinutes}min`;
    } else {
      const hours = Math.floor(todayMinutes / 60);
      const mins = todayMinutes % 60;
      
      // Évite les template literals imbriqués en utilisant des variables intermédiaires
      const minsPart = mins > 0 ? `${mins}min` : '';
      return `${hours}h${minsPart}`;
    }
  }, [todayMinutes]);

  return {
    startSession,
    endSession,
    updateStreak,
    
    currentStreak: currentStreak || 0,
    todayMinutes: todayMinutes || 0, // ✅ CHANGÉ : quotidien
    
    streakTrend: getStreakTrend(),
    formattedTime: getFormattedTime() || '0min',
  };
};

export default useActivityMetrics;