// src/hooks/useRevisionSettings.js - VERSION CORRIGÉE AVEC GESTION D'ERREUR

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REVISION_STORAGE_KEY = 'revision_preferences';

export const useRevisionSettings = () => {
  const [preferences, setPreferences] = useState({
    isDisabled: false,
    nextRevisionAt: 50,
    frequency: 50, // Tous les X mots
    questionsCount: 10
  });
  const [isLoading, setIsLoading] = useState(true);

  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, fallback = null) => {
    console.warn(`Storage error in ${operation}:`, error);
    return fallback;
  };

  const loadPreferences = async () => {
    try {
      const saved = await AsyncStorage.getItem(REVISION_STORAGE_KEY);
      if (saved) {
        const prefs = JSON.parse(saved);
        setPreferences({
          isDisabled: prefs.isDisabled || false,
          nextRevisionAt: prefs.nextRevisionAt || 50,
          frequency: prefs.frequency || 50,
          questionsCount: prefs.questionsCount || 10
        });
      }
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      handleStorageError(error, 'loadPreferences');
      // Fallback: utiliser les valeurs par défaut déjà définies dans useState
    } finally {
      setIsLoading(false);
    }
  };

  // ========== CHARGEMENT ==========
  useEffect(() => {
    loadPreferences();
  }, []);

  // ========== SAUVEGARDE ==========
  const updatePreferences = async (newPrefs) => {
    try {
      const updatedPrefs = { ...preferences, ...newPrefs, lastUpdate: Date.now() };
      await AsyncStorage.setItem(REVISION_STORAGE_KEY, JSON.stringify(updatedPrefs));
      setPreferences(updatedPrefs);
      
      // Événement de mise à jour des settings
      try { 
        require('../utils/eventBus').emit('settings-updated', updatedPrefs); 
      } catch(eventBusError) { 
        // ✅ Gestion d'erreur appropriée
        console.warn('Event bus error (non-critical):', eventBusError);
      }
      return true;
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      return handleStorageError(error, 'updatePreferences', false);
    }
  };

  // ========== ACTIONS SPÉCIFIQUES ==========
  const enableRevisions = (frequency = 50, questionsCount = 10) => {
    return updatePreferences({
      isDisabled: false,
      frequency,
      questionsCount,
      nextRevisionAt: frequency // Reset target
    });
  };

  const disableRevisions = () => {
    return updatePreferences({ isDisabled: true });
  };

  const updateFrequency = (newFrequency) => {
    return updatePreferences({ 
      frequency: newFrequency,
      nextRevisionAt: newFrequency // Reset target
    });
  };

  const resetToNextTarget = (wordsLearned) => {
    const newTarget = wordsLearned + preferences.frequency;
    return updatePreferences({ nextRevisionAt: newTarget });
  };

  return {
    preferences,
    isLoading,
    enableRevisions,
    disableRevisions,
    updateFrequency,
    updatePreferences,
    resetToNextTarget
  };
};
