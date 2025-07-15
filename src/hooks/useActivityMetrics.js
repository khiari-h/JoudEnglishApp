// src/hooks/useActivityMetrics.js - TEMPS QUOTIDIEN

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useActivityMetrics = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0); // ✅ CHANGÉ : quotidien
  const [sessionStart, setSessionStart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // =================== DATES HELPER ===================
  const getTodayString = () => new Date().toDateString();

  const loadMetrics = async () => {
    try {
      setIsLoading(true);
      const stored = await AsyncStorage.getItem(METRICS_STORAGE_KEY);
      if (stored) {
        setMetrics(JSON.parse(stored));
      }
    } catch (error) {
      // Ignored on purpose
    } finally {
      setIsLoading(false);
    }
  };

  // =================== CHARGEMENT INITIAL ===================
  useEffect(() => {
    loadMetrics();
  }, []);

  // =================== SESSION TIMER ===================
  const startSession = useCallback(() => {
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
        await Promise.all([
          AsyncStorage.setItem('today_minutes', newTodayTotal.toString()),
          AsyncStorage.setItem('last_time_date', today)
        ]);
      }

      setSessionStart(null);
    } catch (error) {
      // Silently fail
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
        await Promise.all([
          AsyncStorage.setItem('current_streak', newStreak.toString()),
          AsyncStorage.setItem('last_activity_date', today)
        ]);
      }
    } catch (error) {
      // Silently fail
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
      return `${hours}h${mins > 0 ? `${mins}min` : ''}`;
    }
  }, [todayMinutes]);

  return {
    startSession,
    endSession,
    updateStreak,
    isLoading,
    currentStreak: currentStreak || 0,
    todayMinutes: todayMinutes || 0, // ✅ CHANGÉ : quotidien
    streakTrend: getStreakTrend(),
    formattedTime: getFormattedTime() || '0min',
  };
};

export default useActivityMetrics;