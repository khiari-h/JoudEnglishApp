import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Hook pour gérer le streak (jours consécutifs d'utilisation)
 * Au moindre mouvement = activité comptée
 */
const useStreak = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

        setLongestStreak(streakData.longestStreak || 0);
      } else {
        // Première utilisation
        setCurrentStreak(0);
        setLongestStreak(0);
      }

      setIsLoading(false);
    } catch (error) {
      setCurrentStreak(0);
      setLongestStreak(0);
      setIsLoading(false);
    }
  }, []);

  // Sauvegarder les données de streak
  const saveStreakData = async (streak, lastDate, longest) => {
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
      // Silencieux
    }
  };

  // Mettre à jour le streak (appelé à chaque activité)
  const updateStreak = useCallback(async () => {
    try {
      const today = getTodayDate();
      const savedData = await AsyncStorage.getItem(STREAK_STORAGE_KEY);

      let newStreak = 1;
      let newLongest = longestStreak;

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
    } catch (error) {
      // Silencieux
    }
  }, [longestStreak]);

  // Obtenir les statistiques du streak
  const getStreakStats = useCallback(() => {
    return {
      current: currentStreak,
      longest: longestStreak,
      isActive: currentStreak > 0,
    };
  }, [currentStreak, longestStreak]);

  // Charger au montage - UNE SEULE FOIS
  useEffect(() => {
    loadStreakData();
  }, []); // ✅ Dépendances vides pour éviter les boucles

  return {
    currentStreak,
    longestStreak,
    isLoading,
    updateStreak,
    getStreakStats,
    loadStreakData,
  };
};

export default useStreak;