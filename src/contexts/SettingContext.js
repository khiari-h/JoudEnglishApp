// src/contexts/SettingsContext.js
import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { storeData, getData } from '../utils/storageUtils';
import { DEFAULT_SETTINGS } from '../utils/constants';
import PropTypes from 'prop-types';

// Créer le contexte
export const SettingsContext = createContext();

/**
 * Fournisseur de contexte pour gérer les paramètres de l'application
 */
export const SettingsProvider = ({ children }) => {
  // État des paramètres
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les paramètres au démarrage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const savedSettings = await getData('userSettings');

        if (savedSettings) {
          // Fusionner avec les paramètres par défaut pour s'assurer que tous les champs sont présents
          setSettings({ ...DEFAULT_SETTINGS, ...savedSettings });
        } else {
          // If no saved settings, use default
          setSettings(DEFAULT_SETTINGS);
        }
      } catch (error) {
        // Ignored on purpose
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Sauvegarder les paramètres lorsqu'ils changent
  useEffect(() => {
    if (!isLoading) {
      storeData('userSettings', settings);
    }
  }, [settings, isLoading]);

  // Mettre à jour un paramètre spécifique
  const updateSetting = useCallback((key, value) => {
    if (settings[key] === undefined) {
      return;
    }

    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value
    }));
  }, [settings]);

  // Mettre à jour plusieurs paramètres à la fois
  const updateSettings = useCallback((newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  }, []);

  // Réinitialiser tous les paramètres
  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  // Vérifier si les notifications sont activées
  const areNotificationsEnabled = useMemo(() => {
    return settings.notifications;
  }, [settings.notifications]);

  // Obtenir le délai journalier
  const getDailyGoal = useMemo(() => {
    return settings.dailyGoal;
  }, [settings.dailyGoal]);

  // Définir le délai journalier
  const setDailyGoal = useCallback((minutes) => {
    updateSetting('dailyGoal', Math.max(1, Math.min(120, minutes))); // Entre 1 et 120 minutes
  }, [updateSetting]);

  // Valeur fournie par le contexte
  const contextValue = useMemo(() => ({
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
    areNotificationsEnabled,
    getDailyGoal,
    setDailyGoal,
    isLoading,
  }), [
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
    areNotificationsEnabled,
    getDailyGoal,
    setDailyGoal,
    isLoading,
  ]);

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

// ✅ Définition de PropTypes pour le fournisseur de contexte
SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};