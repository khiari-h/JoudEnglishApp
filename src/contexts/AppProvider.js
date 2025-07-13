// src/contexts/AppProvider.js





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