// src/contexts/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { getData, storeData } from '../utils/storageUtils'; // ← Import unifié
import { COLORS } from '../utils/constants';

// Créer le contexte
export const ThemeContext = createContext();

/**
 * Fournisseur de contexte pour gérer le thème de l'application
 */
export const ThemeProvider = ({ children }) => {
  // États
  const [theme, setTheme] = useState('system'); // 'light', 'dark', 'system'
  const systemColorScheme = useColorScheme();
  const [loaded, setLoaded] = useState(false);

  // Mode sombre déterminé en fonction du thème et du système
  const isDarkTheme = 
    theme === 'system' 
      ? systemColorScheme === 'dark'
      : theme === 'dark';

  // Charger le thème sauvegardé au démarrage
  useEffect(() => {
    let mounted = true;

    const loadTheme = async () => {
      try {
        const savedTheme = await getData('appTheme');
        if (mounted) {
          if (savedTheme) {
            setTheme(savedTheme);
          }
          setLoaded(true);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        if (mounted) {
          setLoaded(true);
        }
      }
    };

    loadTheme();

    return () => {
      mounted = false;
    };
  }, []); // ← Dépendances vides = une seule fois

  // Sauvegarder le thème lorsqu'il change
  useEffect(() => {
    let timeoutId;

    if (loaded) {
      // Debounce pour éviter trop de sauvegardes
      timeoutId = setTimeout(() => {
        storeData('appTheme', theme);
      }, 300);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [theme, loaded]);

  // Changer le thème
  const setAppTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Basculer entre les thèmes
  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(systemColorScheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  // Réinitialiser au thème du système
  const resetToSystemTheme = () => {
    setTheme('system');
  };

  // Couleurs en fonction du thème
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

        // Couleurs spécifiques au niveau
        level: {
          A1: '#3b82f6',
          A2: '#8b5cf6', 
          B1: '#10b981',
          B2: '#f59e0b',
          C1: '#ef4444',
          C2: '#6366f1',
        }
      }
    : {
        // Palette de couleurs pour le thème clair
        ...COLORS,

        // Couleurs spécifiques au niveau
        level: {
          A1: '#3b82f6',
          A2: '#8b5cf6', 
          B1: '#10b981',
          B2: '#f59e0b',
          C1: '#ef4444',
          C2: '#6366f1',
        }
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
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.8,
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

  // Ombres
  const shadows = isDarkTheme 
    ? {
        sm: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
        },
        md: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 4,
        },
        lg: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 6,
        },
      }
    : {
        sm: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        },
        md: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 4,
        },
        lg: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 6,
        },
      };

  // Valeur fournie par le contexte
  const contextValue = {
    theme,
    setTheme: setAppTheme,
    toggleTheme,
    resetToSystemTheme,
    isDarkTheme,
    colors,
    spacing,
    typography,
    borderRadius,
    shadows,
    loaded,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;