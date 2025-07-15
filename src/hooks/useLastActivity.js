// src/hooks/useLastActivity.js - VERSION CORRIGÉE AVEC useCallback
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

const useLastActivity = () => {
  const [lastActivity, setLastActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ========== CHARGEMENT ==========
  const loadLastActivity = useCallback(async () => {
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
  }, []); // ✅ Aucune dépendance - stable

  // ========== SAUVEGARDE MÉMORISÉE ==========
  const saveActivity = useCallback(async (activityData) => {
    try {
      const activity = {
        ...activityData,
        timestamp: Date.now()
      };
      
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, JSON.stringify(activity));
      
      // Event bus : notifier la progression
      try { require('../utils/eventBus').emit('progress-updated', activity); } catch(e) { /* empty */ }
      // Mettre à jour l'état local avec temps écoulé
      setLastActivity({
        ...activity,
        timeElapsed: "À l'instant"
      });
    } catch (error) {
      console.error('Erreur sauvegarde activité:', error);
    }
  }, []); // ✅ CRUCIAL : Aucune dépendance - fonction stable

  // ========== SUPPRESSION MÉMORISÉE ==========
  const clearActivity = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.LAST_ACTIVITY);
      setLastActivity(null);
    } catch (error) {
      console.error('Erreur suppression activité:', error);
    }
  }, []); // ✅ Fonction stable

  // ========== CHARGEMENT INITIAL ==========
  useEffect(() => {
    loadLastActivity();
  }, [loadLastActivity]);

  return {
    lastActivity,
    isLoading,
    saveActivity, // ✅ Maintenant stable entre les renders
    clearActivity, // ✅ Maintenant stable
    reload: loadLastActivity // ✅ Maintenant stable
  };
};

export default useLastActivity;