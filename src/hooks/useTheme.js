// src/hooks/useTheme.js
import { useContext, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import useLocalStorage from './useLocalStorage';

/**
 * Hook pour accéder et manipuler le thème de l'application
 */
const useTheme = () => {
  // Récupérer le contexte du thème (à implémenter dans ThemeContext.js)
  const themeContext = useContext(ThemeContext);

  // Utiliser useLocalStorage pour stocker les préférences de thème
  const { value: storedTheme, setValue: setStoredTheme } = useLocalStorage(
    'appTheme',
    'system' // Par défaut, suivre le thème du système
  );

  // Récupérer le schéma de couleurs du système
  const systemColorScheme = useColorScheme();

  // Si le contexte de thème existe, l'utiliser
  if (themeContext) {
    return themeContext;
  }

  // Sinon, fournir une implémentation de base

  // Déterminer le thème actuel
  const currentTheme = storedTheme === 'system' 
    ? systemColorScheme || 'light' 
    : storedTheme;

  // Changer le thème
  const setTheme = useCallback((theme) => {
    setStoredTheme(theme);
  }, [setStoredTheme]);

  // Basculer entre les thèmes
  const toggleTheme = useCallback(() => {
    setStoredTheme(prevTheme => {
      if (prevTheme === 'system') {
        return systemColorScheme === 'dark' ? 'light' : 'dark';
      }
      return prevTheme === 'dark' ? 'light' : 'dark';
    });
  }, [setStoredTheme, systemColorScheme]);

  // Réinitialiser au thème du système
  const resetToSystemTheme = useCallback(() => {
    setStoredTheme('system');
  }, [setStoredTheme]);

  // Vérifier si c'est le thème sombre
  const isDarkTheme = currentTheme === 'dark';

  // Couleurs de base en fonction du thème
  const colors = isDarkTheme 
    ? {
        // Palette de couleurs pour le thème sombre
        background: '#121212',
        surface: '#1E1E1E',
        primary: '#BB86FC',
        primaryDark: '#9F66EB',
        secondary: '#03DAC6',
        accent: '#CF6679',
        error: '#CF6679',
        text: '#FFFFFF',
        textSecondary: '#B0B0B0',
        border: '#2C2C2C',
        divider: '#2C2C2C',
        disabled: '#666666',
        icon: '#FFFFFF',
      }
    : {
        // Palette de couleurs pour le thème clair
        background: '#FFFFFF',
        surface: '#F8F8F8',
        primary: '#5E60CE',
        primaryDark: '#4E50AE',
        secondary: '#6B7280',
        accent: '#F59E0B',
        error: '#EF4444',
        text: '#1F2937',
        textSecondary: '#6B7280',
        border: '#E5E7EB',
        divider: '#E5E7EB',
        disabled: '#9CA3AF',
        icon: '#4B5563',
      };

  // Espacement et dimensions cohérents
  const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  };

  // Typographie
  const typography = {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 30,
    },
    fontWeights: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  };

  // Rayons de bordure
  const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  };

  return {
    theme: currentTheme,
    setTheme,
    toggleTheme,
    resetToSystemTheme,
    isDarkTheme,
    colors,
    spacing,
    typography,
    borderRadius,
  };
};

export default useTheme;
