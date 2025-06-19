// src/screens/Dashboard/hooks/useDashboardLevel.js - VERSION CORRIGÉE
import { useState, useEffect, useCallback, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANGUAGE_LEVELS } from "../../../utils/constants";

const ACTIVE_LEVEL_KEY = "user_active_level";

export const useDashboardLevel = ({ progress: progressData }) => {
  const [currentLevel, setCurrentLevel] = useState("1");
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialLoad = useRef(true);

  // ✅ CORRECTION : Mémoriser la fonction de mapping
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

  // ✅ CORRECTION : Mémoriser la fonction de changement de niveau
  const handleChangeActiveLevel = useCallback(async (newLevel) => {
    if (!LANGUAGE_LEVELS[newLevel]) return;

    setCurrentLevel(newLevel);
    try {
      await AsyncStorage.setItem(ACTIVE_LEVEL_KEY, newLevel);
    } catch (error) {
      console.error('Erreur sauvegarde niveau actif:', error);
    }
  }, []);

  // ========== 🚨 CORRECTION PRINCIPALE : CHARGEMENT UNIQUE ==========
  useEffect(() => {
    // Ne charger qu'une seule fois au montage
    if (!isInitialLoad.current) return;
    
    const loadActiveLevel = async () => {
      try {
        const savedLevel = await AsyncStorage.getItem(ACTIVE_LEVEL_KEY);
        
        if (savedLevel && LANGUAGE_LEVELS[savedLevel]) {
          setCurrentLevel(mapOldToNewLevel(savedLevel));
        } else if (progressData?.currentLevel) {
          setCurrentLevel(mapOldToNewLevel(progressData.currentLevel));
        }
        
        setIsLoaded(true);
        isInitialLoad.current = false;
      } catch (error) {
        console.error('Erreur chargement niveau actif:', error);
        setIsLoaded(true);
        isInitialLoad.current = false;
      }
    };

    loadActiveLevel();
  }, []); // ✅ CORRIGÉ : Aucune dépendance - ne charge qu'une fois

  // ========== EFFET SÉPARÉ POUR SYNC AVEC PROGRESS ==========
  useEffect(() => {
    // Seulement après le chargement initial
    if (!isLoaded || isInitialLoad.current) return;
    
    // Seulement si le progress a un currentLevel différent
    if (progressData?.currentLevel && progressData.currentLevel !== currentLevel) {
      const mappedLevel = mapOldToNewLevel(progressData.currentLevel);
      if (mappedLevel !== currentLevel && LANGUAGE_LEVELS[mappedLevel]) {
        setCurrentLevel(mappedLevel);
      }
    }
  }, [progressData?.currentLevel, isLoaded, currentLevel, mapOldToNewLevel]);

  // ✅ CORRECTION : Mémoriser la couleur du niveau
  const levelColor = LANGUAGE_LEVELS[currentLevel]?.color || "#3B82F6";

  return {
    currentLevel,
    handleChangeActiveLevel,
    levelColor,
    isLoaded, // Exposer l'état de chargement si nécessaire
  };
};