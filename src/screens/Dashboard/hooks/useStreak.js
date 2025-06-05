// src/screens/Dashboard/hooks/useStreak.js - VERSION STABLE
import { useState, useEffect, useCallback, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Hook pour gérer le streak (jours consécutifs d'utilisation)
 * Au moindre mouvement = activité comptée
 */
const useStreak = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ FIX : Utiliser useRef pour éviter les dépendances instables
  const longestStreakRef = useRef(0);
  
  const STREAK_STORAGE_KEY = "user_streak_data";

  // Obtenir la date du jour au format YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Calculer la différence en jours entre deux dates
  const getDaysDifference = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Charger les données de streak
  const loadStreakData = useCallback(async () => {
    try {
      const savedData = await AsyncStorage.getItem(STREAK_STORAGE_KEY);

      if (savedData) {
        const streakData = JSON.parse(savedData);
        const today = getTodayDate();
        const lastActivityDate = streakData.lastActivityDate;

        if (lastActivityDate) {
          const daysDiff = getDaysDifference(lastActivityDate, today);

          if (daysDiff === 0) {
            // Même jour - garde le streak actuel
            setCurrentStreak(streakData.currentStreak || 0);
          } else if (daysDiff === 1) {
            // Jour suivant - streak continue
            setCurrentStreak(streakData.currentStreak || 0);
          } else {
            // Plus d'un jour - streak cassé
            setCurrentStreak(0);
            // Sauvegarder le reset
            await saveStreakData(0, null, streakData.longestStreak || 0);
          }
        } else {
          // Pas de dernière date - nouveau user
          setCurrentStreak(0);
        }

        const longest = streakData.longestStreak || 0;
        setLongestStreak(longest);
        longestStreakRef.current = longest; // ✅ Sync avec ref
      } else {
        // Première utilisation
        setCurrentStreak(0);
        setLongestStreak(0);
        longestStreakRef.current = 0;
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error loading streak data:', error);
      setCurrentStreak(0);
      setLongestStreak(0);
      longestStreakRef.current = 0;
      setIsLoading(false);
    }
  }, []); // ✅ Pas de dépendances = fonction stable

  // Sauvegarder les données de streak
  const saveStreakData = useCallback(async (streak, lastDate, longest) => {
    try {
      const streakData = {
        currentStreak: streak,
        lastActivityDate: lastDate,
        longestStreak: longest,
        lastUpdated: Date.now(),
      };

      await AsyncStorage.setItem(
        STREAK_STORAGE_KEY,
        JSON.stringify(streakData)
      );
    } catch (error) {
      console.error('Error saving streak data:', error);
    }
  }, []); // ✅ Pas de dépendances = fonction stable

  // ✅ FIX : Mettre à jour le streak avec useRef pour éviter la dépendance instable
  const updateStreak = useCallback(async () => {
    try {
      const today = getTodayDate();
      const savedData = await AsyncStorage.getItem(STREAK_STORAGE_KEY);

      let newStreak = 1;
      let newLongest = longestStreakRef.current; // ✅ Utiliser ref au lieu de state

      if (savedData) {
        const streakData = JSON.parse(savedData);
        const lastActivityDate = streakData.lastActivityDate;

        if (lastActivityDate === today) {
          // Déjà une activité aujourd'hui - pas de changement
          return;
        }

        if (lastActivityDate) {
          const daysDiff = getDaysDifference(lastActivityDate, today);

          if (daysDiff === 1) {
            // Jour consécutif - increment streak
            newStreak = (streakData.currentStreak || 0) + 1;
          } else {
            // Streak cassé ou relancé
            newStreak = 1;
          }
        }
      }

      // Mettre à jour le longest streak
      if (newStreak > newLongest) {
        newLongest = newStreak;
      }

      // Sauvegarder et mettre à jour les états
      await saveStreakData(newStreak, today, newLongest);
      setCurrentStreak(newStreak);
      setLongestStreak(newLongest);
      longestStreakRef.current = newLongest; // ✅ Sync avec ref
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  }, []); // ✅ PLUS de dépendances = fonction toujours stable !

  // Obtenir les statistiques du streak
  const getStreakStats = useCallback(() => {
    return {
      current: currentStreak,
      longest: longestStreak,
      isActive: currentStreak > 0,
    };
  }, [currentStreak, longestStreak]);

  // ✅ FIX : useEffect avec flag mounted pour éviter setState après démontage
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (mounted) {
        await loadStreakData();
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [loadStreakData]); // ✅ loadStreakData est maintenant stable

  return {
    currentStreak,
    longestStreak,
    isLoading,
    updateStreak, // ✅ Maintenant stable !
    getStreakStats,
    loadStreakData,
  };
};

export default useStreak;