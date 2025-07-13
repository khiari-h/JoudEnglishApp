import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ACTIVE_LEVEL_KEY = "user_active_level";

export const useCurrentLevel = () => {
  const [currentLevel, setCurrentLevel] = useState("1");

  useEffect(() => {
    const loadActiveLevel = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem(ACTIVE_LEVEL_KEY);
        if (savedLevel) {
          setCurrentLevel(savedLevel);
        }
      } catch (error) {
        console.error('Erreur chargement niveau actif:', error);
      }
    };

    loadActiveLevel();
  }, []);

  return currentLevel;
}; 