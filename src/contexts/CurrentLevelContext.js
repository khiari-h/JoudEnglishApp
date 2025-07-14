import React, { createContext, useContext, useState } from "react";

// Crée le contexte
const CurrentLevelContext = createContext();

// Provider pour englober l’app
export function CurrentLevelProvider({ children, initialLevel = "1" }) {
  const [currentLevel, setCurrentLevel] = useState(initialLevel);

  return (
    <CurrentLevelContext.Provider value={{ currentLevel, setCurrentLevel }}>
      {children}
    </CurrentLevelContext.Provider>
  );
}

// Hook d’accès pratique
export function useCurrentLevel() {
  const context = useContext(CurrentLevelContext);
  if (!context) {
    throw new Error("useCurrentLevel doit être utilisé dans CurrentLevelProvider");
  }
  return context;
} 