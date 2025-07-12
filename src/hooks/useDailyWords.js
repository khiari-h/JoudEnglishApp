// src/hooks/useDailyWords.js - SANS TREND

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

            // Parcourir chaque catégorie
            Object.keys(completedWords).forEach(categoryIndex => {
              const wordsInCategory = completedWords[categoryIndex] || [];
              
              wordsInCategory.forEach(word => {
                // ✅ COMPATIBILITÉ : Ancien format (number) vs nouveau format (object)
                if (typeof word === 'object' && word.timestamp) {
                  // Nouveau format avec timestamp
                  const wordDate = new Date(word.timestamp).toDateString();
                  
                  if (wordDate === today) {
                    todayCount++;
                  }
                } else {
                  // Ancien format (number) - on ne peut pas savoir la date
                  // Pour compatibilité, on les ignore dans le comptage quotidien
                }
              });
            });
          }
        } catch (error) {
          // Continue avec les autres niveaux si erreur
        }
      }

      setWordsToday(todayCount);

    } catch (error) {
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
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Minuit
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    // Timer pour refresh à minuit
    const midnightTimer = setTimeout(() => {
      calculateDailyWords(); // Reset automatique
      
      // Ensuite refresh chaque 24h
      const dailyInterval = setInterval(calculateDailyWords, 24 * 60 * 60 * 1000);
      
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, [calculateDailyWords]);

  // =================== REFRESH MANUEL ===================
  const refresh = useCallback(() => {
    calculateDailyWords();
  }, [calculateDailyWords]);

  return {
    wordsToday: wordsToday || 0,     // ✅ Juste le nombre
    isLoading,
    refresh,
    // ✅ SUPPRIMÉ : wordsYesterday, trend, getTrend()
  };
};

export default useDailyWords;