// src/hooks/useLastActivity.js - VERSION SIMPLE
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

const useLastActivity = () => {
  const [lastActivity, setLastActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ========== CHARGEMENT ==========
  const loadLastActivity = async () => {
    try {
      setIsLoading(true);
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
      
      if (stored) {
        const activity = JSON.parse(stored);
        
        // Calculer temps écoulé simple
        const now = Date.now();
        const diffInMinutes = Math.floor((now - activity.timestamp) / (1000 * 60));
        
        let timeElapsed = "À l'instant";
        if (diffInMinutes < 60) {
          timeElapsed = diffInMinutes === 0 ? "À l'instant" : `Il y a ${diffInMinutes} min`;
        } else if (diffInMinutes < 1440) {
          const hours = Math.floor(diffInMinutes / 60);
          timeElapsed = `Il y a ${hours}h`;
        } else {
          const days = Math.floor(diffInMinutes / 1440);
          timeElapsed = `Il y a ${days}j`;
        }
        
        setLastActivity({
          ...activity,
          timeElapsed
        });
      } else {
        setLastActivity(null);
      }
    } catch (error) {
      console.error('Erreur chargement dernière activité:', error);
      setLastActivity(null);
    } finally {
      setIsLoading(false);
    }
  };

  // ========== SAUVEGARDE ==========
  const saveActivity = async (activityData) => {
    try {
      const activity = {
        ...activityData,
        timestamp: Date.now()
      };
      
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, JSON.stringify(activity));
      
      // Mettre à jour l'état local avec temps écoulé
      setLastActivity({
        ...activity,
        timeElapsed: "À l'instant"
      });
    } catch (error) {
      console.error('Erreur sauvegarde activité:', error);
    }
  };

  // ========== SUPPRESSION ==========
  const clearActivity = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.LAST_ACTIVITY);
      setLastActivity(null);
    } catch (error) {
      console.error('Erreur suppression activité:', error);
    }
  };

  // ========== CHARGEMENT INITIAL ==========
  useEffect(() => {
    loadLastActivity();
  }, []);

  return {
    lastActivity,
    isLoading,
    saveActivity,
    clearActivity,
    reload: loadLastActivity
  };
};

export default useLastActivity;