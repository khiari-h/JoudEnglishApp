import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from 'prop-types';

// Crée le contexte
const CurrentLevelContext = createContext();

// Provider pour englober l'app
export function CurrentLevelProvider({ children, initialLevel = "1" }) {
  const [currentLevel, setCurrentLevel] = useState(initialLevel);

  // Mémorise la valeur du contexte pour éviter les re-rendus inutiles
  const contextValue = useMemo(() => ({
    currentLevel,
    setCurrentLevel
  }), [currentLevel]);

  return (
    <CurrentLevelContext.Provider value={contextValue}>
      {children}
    </CurrentLevelContext.Provider>
  );
}

CurrentLevelProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialLevel: PropTypes.string,
};

// Hook d'accès pratique
export function useCurrentLevel() {
  const context = useContext(CurrentLevelContext);
  if (!context) {
    throw new Error("useCurrentLevel doit être utilisé dans CurrentLevelProvider");
  }
  return context;
} 