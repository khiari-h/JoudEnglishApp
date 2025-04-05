// src/contexts/AppProvider.js
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { ProgressProvider } from './ProgressContext';
import { SettingsProvider } from './SettingsContext';

/**
 * Fournisseur global qui combine tous les contextes de l'application
 * Simplifie l'inclusion des contextes dans l'application
 */
const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <ProgressProvider>
          {children}
        </ProgressProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default AppProvider;