// src/hooks/useActivityMetrics.js - TEMPS ET STREAK

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useActivityMetrics = () => {
  const [currentStreak, setCurrentStreak] = useState(0); // ✅ Default 0
  const [totalMinutes, setTotalMinutes] = useState(0);   // ✅ Default 0
  const [sessionStart, setSessionStart] = useState(null);

  // =================== CHARGEMENT INITIAL ===================
  
  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const [streakData, timeData] = await Promise.all([
        AsyncStorage.getItem('current_streak'),
        AsyncStorage.getItem('total_minutes')
      ]);

      setCurrentStreak(parseInt(streakData || '0'));
      setTotalMinutes(parseInt(timeData || '0'));
    } catch (error) {
      // Silently fail
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
      const sessionMinutes = Math.round((sessionEnd - sessionStart) / 60000); // En minutes

      if (sessionMinutes > 0) {
        const newTotal = totalMinutes + sessionMinutes;
        setTotalMinutes(newTotal);
        await AsyncStorage.setItem('total_minutes', newTotal.toString());
      }

      setSessionStart(null);
    } catch (error) {
      // Silently fail
    }
  }, [sessionStart, totalMinutes]);

  // =================== STREAK LOGIC ===================
  
  const updateStreak = useCallback(async () => {
    try {
      const today = new Date().toDateString();
      const lastDate = await AsyncStorage.getItem('last_activity_date');
      
      if (lastDate !== today) {
        // Nouveau jour
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isYesterday = lastDate === yesterday.toDateString();
        
        let newStreak;
        if (isYesterday) {
          // Continuer le streak
          newStreak = currentStreak + 1;
        } else {
          // Nouveau streak
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
    if (totalMinutes < 60) {
      return `${totalMinutes}min`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return `${hours}h${mins > 0 ? `${mins}min` : ''}`;
    }
  }, [totalMinutes]);

  return {
    // Actions
    startSession,
    endSession,
    updateStreak,
    
    // Data
    currentStreak: currentStreak || 0,           // ✅ Protection supplémentaire
    totalMinutes: totalMinutes || 0,             // ✅ Protection supplémentaire
    
    // Computed
    streakTrend: getStreakTrend(),
    formattedTime: getFormattedTime() || '0min', // ✅ Protection supplémentaire
  };
};

export default useActivityMetrics;