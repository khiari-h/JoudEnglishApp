import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 📅 Hook pour compter les mots appris AUJOURD'HUI
 * Reset automatique à minuit
 * Focus sur vocabulary CLASSIC uniquement
 * ✅ PLUS DE TREND - juste le nombre
 */
const useDailyWords = () => {
  const [wordsToday, setWordsToday] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // =================== DATES HELPER ===================
  const getTodayString = () => new Date().toDateString();

  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, level = 'unknown') => {
    console.warn(`Storage error in ${operation} for level ${level}:`, error);
  };

  // =================== CALCUL DES MOTS QUOTIDIENS ===================
  const calculateDailyWords = useCallback(async () => {
    try {
      setIsLoading(true);
      const today = getTodayString();
      let todayCount = 0;

      // Parcourir tous les niveaux (1 à 6)
      const levels = ['1', '2', '3', '4', '5', '6'];
      
      for (const level of levels) {
        try {
          // ✅ Seulement vocabulary CLASSIC (pas fast)
          const storageKey = `vocabulary_${level}_classic`;
          const savedData = await AsyncStorage.getItem(storageKey);
          
          if (savedData) {
            const data = JSON.parse(savedData);
            const completedWords = data.completedWords || {};

            todayCount += Object.keys(completedWords).reduce((acc, categoryIndex) => {
              const wordsInCategory = completedWords[categoryIndex] || [];
              return acc + wordsInCategory.reduce((catAcc, word) => {
                if (typeof word === 'object' && word.timestamp) {
                  const wordDate = new Date(word.timestamp).toDateString();
                  if (wordDate === today) {
                    return catAcc + 1;
                  }
                }
                return catAcc;
              }, 0);
            }, 0);
          }
        } catch (error) {
          // ✅ Gestion d'erreur appropriée
          handleStorageError(error, 'calculateDailyWords', level);
          // Continue avec les autres niveaux si erreur
        }
      }

      setWordsToday(todayCount);
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      console.error('Error calculating daily words:', error);
      setWordsToday(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // =================== CHARGEMENT INITIAL ===================
  useEffect(() => {
    calculateDailyWords();
  }, [calculateDailyWords]);

  // =================== AUTO-REFRESH À MINUIT ===================
  useEffect(() => {
    let dailyInterval;
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Minuit
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    // Timer pour refresh à minuit
    const midnightTimer = setTimeout(() => {
      calculateDailyWords(); // Reset automatique
      
      // Ensuite refresh chaque 24h
      dailyInterval = setInterval(calculateDailyWords, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    // ✅ Nettoyage des DEUX minuteries à la désinitialisation du hook
    return () => {
      clearTimeout(midnightTimer);
      if (dailyInterval) {
        clearInterval(dailyInterval);
      }
    };
  }, [calculateDailyWords]);

  // =================== REFRESH MANUEL ===================
  const refresh = useCallback(() => {
    calculateDailyWords();
  }, [calculateDailyWords]);

  return {
    wordsToday: wordsToday || 0, // ✅ Juste le nombre
    isLoading,
    refresh,
    // ✅ SUPPRIMÉ : wordsYesterday, trend, getTrend()
  };
};

export default useDailyWords;