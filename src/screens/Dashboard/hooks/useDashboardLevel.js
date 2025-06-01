// src/screens/Dashboard/hooks/useDashboardLevel.js
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANGUAGE_LEVELS } from "../../../utils/constants";

const ACTIVE_LEVEL_KEY = "user_active_level";

export const useDashboardLevel = (progressContext) => {
  const [currentLevel, setCurrentLevel] = useState("1");

  const mapOldToNewLevel = useCallback((level) => {
    const mapping = {
      A1: "1",
      A2: "2",
      B1: "3",
      B2: "4",
      C1: "5",
      C2: "6",
      bonus: "bonus",
    };
    return mapping[level] || level;
  }, []);

  const handleChangeActiveLevel = useCallback(async (newLevel) => {
    if (!LANGUAGE_LEVELS[newLevel]) return;

    setCurrentLevel(newLevel);
    try {
      await AsyncStorage.setItem(ACTIVE_LEVEL_KEY, newLevel);
    } catch (error) {
      console.error("Erreur sauvegarde niveau:", error);
    }
  }, []);

  useEffect(() => {
    const loadActiveLevel = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem(ACTIVE_LEVEL_KEY);
        if (savedLevel && LANGUAGE_LEVELS[savedLevel]) {
          setCurrentLevel(mapOldToNewLevel(savedLevel));
        } else if (progressContext?.progress?.currentLevel) {
          setCurrentLevel(
            mapOldToNewLevel(progressContext.progress.currentLevel)
          );
        }
      } catch (error) {
        console.error("Erreur chargement niveau:", error);
      }
    };
    loadActiveLevel();
  }, [mapOldToNewLevel, progressContext]);

  const levelColor = LANGUAGE_LEVELS[currentLevel]?.color || "#3B82F6";

  return {
    currentLevel,
    handleChangeActiveLevel,
    levelColor,
  };
};
