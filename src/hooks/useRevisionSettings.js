// src/hooks/useRevisionSettings.js - HOOK POUR MENU SETTINGS
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
      // Ignored on purpose
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
      try { require('../utils/eventBus').emit('settings-updated', updatedPrefs); } catch(e) {}
      return true;
    } catch (error) {
      // Ignored on purpose
      return null;
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