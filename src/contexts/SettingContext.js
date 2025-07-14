// src/contexts/SettingsContext.js
import { createContext, useState, useEffect } from 'react';
import { storeData, getData } from '../utils/storageUtils';
import { DEFAULT_SETTINGS } from '../utils/constants';

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
        }
      } catch (error) {

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
  const updateSetting = (key, value) => {
    if (settings[key] === undefined) {

      return;
    }

    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value
    }));
  };

  // Mettre à jour plusieurs paramètres à la fois
  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  // Réinitialiser tous les paramètres
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  // Vérifier si les notifications sont activées
  const areNotificationsEnabled = () => {
    return settings.notifications;
  };

  // Obtenir le délai journalier
  const getDailyGoal = () => {
    return settings.dailyGoal;
  };

  // Définir le délai journalier
  const setDailyGoal = (minutes) => {
    updateSetting('dailyGoal', Math.max(1, Math.min(120, minutes))); // Entre 1 et 120 minutes
  };

  // Valeur fournie par le contexte
  const contextValue = {
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
    areNotificationsEnabled,
    getDailyGoal,
    setDailyGoal,
    isLoading,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;