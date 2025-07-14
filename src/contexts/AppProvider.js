// src/contexts/AppProvider.js
import { ThemeProvider } from './ThemeContext';
import { ProgressProvider } from './ProgressContext';
import { SettingsProvider } from './SettingContext';
import { CurrentLevelProvider } from './CurrentLevelContext';

/**
 * Fournisseur global qui combine tous les contextes de l'application
 * Simplifie l'inclusion des contextes dans l'application
 */
const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <ProgressProvider>
          <CurrentLevelProvider>
            {children}
          </CurrentLevelProvider>
        </ProgressProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default AppProvider;