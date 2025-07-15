// src/hooks/useRevisionManager.js - SYSTÈME INTELLIGENT SIMPLE
import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REVISION_CONFIG = {
  TRIGGER_INTERVAL: 50,    // Tous les 50 mots
  QUESTIONS_COUNT: 10,     // Toujours 10 questions
  STORAGE_KEY: 'revision_manager_data'
};

const useRevisionManager = () => {
  // ========== ÉTATS ==========
  const [totalWordsLearned, setTotalWordsLearned] = useState(0);
  const [nextRevisionAt, setNextRevisionAt] = useState(50);
  const [lastRevisionWords, setLastRevisionWords] = useState([]);
  const [revisionHistory, setRevisionHistory] = useState([]);
  const [isRevisionDisabled, setIsRevisionDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Ref pour éviter les calculs trop fréquents
  const lastCalculationRef = useRef(0);

  const loadRevisionData = async () => {
    try {
      const stored = await AsyncStorage.getItem(REVISION_CONFIG.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setNextRevisionAt(data.nextRevisionAt || 50);
        setLastRevisionWords(data.lastRevisionWords || []);
        setRevisionHistory(data.revisionHistory || []);
        setIsRevisionDisabled(data.isRevisionDisabled || false);
      }
    } catch (error) {
      console.warn('Erreur chargement données révision:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ========== CHARGEMENT INITIAL ==========
  useEffect(() => {
    loadRevisionData();
  }, []);

  // ========== SAUVEGARDE AUTO ==========
  const saveRevisionData = useCallback(async () => {
    if (isLoading) return;
    
    try {
      const data = {
        nextRevisionAt,
        lastRevisionWords,
        revisionHistory,
        isRevisionDisabled,
        lastUpdate: Date.now()
      };
      await AsyncStorage.setItem(REVISION_CONFIG.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Erreur sauvegarde données révision:', error);
    }
  }, [nextRevisionAt, lastRevisionWords, revisionHistory, isRevisionDisabled, isLoading]);

  useEffect(() => {
    saveRevisionData();
  }, [saveRevisionData]);

  // ========== COMPTAGE DES MOTS APPRIS ==========
  const calculateTotalWords = useCallback(async () => {
    const now = Date.now();
    if (now - lastCalculationRef.current < 2000) return; // Debounce 2s
    lastCalculationRef.current = now;

    try {
      let total = 0;
      const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
      const modes = ['classic', 'fast'];

      for (const level of levels) {
        for (const mode of modes) {
          const stored = await AsyncStorage.getItem(`vocabulary_${level}_${mode}`);
          if (stored) {
            const data = JSON.parse(stored);
            const completedWords = data.completedWords || {};
            
            // Compter tous les mots appris
            total += Object.values(completedWords).reduce((acc, words) => {
              if (Array.isArray(words)) {
                return acc + words.length;
              }
              return acc;
            }, 0);
          }
        }
      }

      setTotalWordsLearned(total);
      return total;
    } catch (error) {
      console.warn('Erreur calcul mots appris:', error);
      return 0;
    }
  }, []);

  // ========== RÉCUPÉRATION DES MOTS POUR RÉVISION ==========
  const getAllLearnedWords = useCallback(async () => {
    try {
      const allWords = [];
      const levels = ['1', '2', '3', '4', '5', '6', 'bonus'];
      const modes = ['classic', 'fast'];

      for (const level of levels) {
        for (const mode of modes) {
          const stored = await AsyncStorage.getItem(`vocabulary_${level}_${mode}`);
          if (stored) {
            const data = JSON.parse(stored);
            const completedWords = data.completedWords || {};
            
            // Récupérer tous les mots avec métadonnées
            Object.entries(completedWords).forEach(([categoryIndex, words]) => {
              if (Array.isArray(words)) {
                words.forEach(word => {
                  // Support ancien et nouveau format
                  if (typeof word === 'object' && word.word) {
                    allWords.push({
                      ...word,
                      fromLevel: level,
                      fromMode: mode,
                      categoryIndex: parseInt(categoryIndex)
                    });
                  } else if (typeof word === 'string') {
                    // Ancien format - on fait de notre mieux
                    allWords.push({
                      word: word,
                      translation: '?', // Sera récupéré depuis les données originales
                      fromLevel: level,
                      fromMode: mode,
                      categoryIndex: parseInt(categoryIndex),
                      timestamp: null
                    });
                  }
                });
              }
            });
          }
        }
      }

      return allWords;
    } catch (error) {
      console.warn('Erreur récupération mots appris:', error);
      return [];
    }
  }, []);

  // ========== ALGORITHME ANTI-RÉPÉTITION ==========
  const selectRevisionWords = useCallback(async (count = REVISION_CONFIG.QUESTIONS_COUNT) => {
    const allWords = await getAllLearnedWords();
    
    if (allWords.length === 0) return [];
    if (allWords.length <= count) return allWords;

    // Filtrer les mots de la dernière révision (éviter répétition immédiate)
    const lastWords = new Set(lastRevisionWords.map(w => w.word));
    const availableWords = allWords.filter(word => !lastWords.has(word.word));
    
    // Si pas assez de mots différents, on prend quand même dans tous
    const poolWords = availableWords.length >= count ? availableWords : allWords;
    
    // Algorithme de sélection intelligent :
    // 1. Prioriser les mots les plus anciens (non révisés récemment)
    // 2. Mélanger les niveaux et modes
    // 3. Éviter trop de mots du même niveau d'affilée

    const sortedByAge = poolWords.sort((a, b) => {
      const aTime = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const bTime = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return aTime - bTime; // Plus ancien en premier
    });

    // Prendre une mix : 60% des plus anciens + 40% aléatoire
    const oldCount = Math.floor(count * 0.6);
    const randomCount = count - oldCount;
    
    const oldWords = sortedByAge.slice(0, oldCount);
    const remainingWords = sortedByAge.slice(oldCount);
    const randomWords = remainingWords
      .sort(() => Math.random() - 0.5)
      .slice(0, randomCount);

    const selectedWords = [...oldWords, ...randomWords]
      .sort(() => Math.random() - 0.5); // Mélanger le résultat final

    return selectedWords.slice(0, count);
  }, [lastRevisionWords, getAllLearnedWords]);

  // ========== LOGIQUE DE DÉCLENCHEMENT ==========
  const shouldShowRevision = !isRevisionDisabled && 
                           totalWordsLearned >= nextRevisionAt && 
                           totalWordsLearned > 0;

  // ========== HANDLERS DU POPUP ==========
  const handleRevisionChoice = useCallback(async (choice) => {
    switch (choice) {
      case 'now':
        // La navigation sera gérée par le composant parent
        return {
          action: 'navigate',
          words: await selectRevisionWords(),
          questionsCount: REVISION_CONFIG.QUESTIONS_COUNT
        };
        
      case 'later_50': {
        const newTarget50 = totalWordsLearned + 50;
        setNextRevisionAt(newTarget50);
        return { action: 'postponed', nextAt: newTarget50 };
      }
      case 'later_100': {
        const newTarget100 = totalWordsLearned + 100;
        setNextRevisionAt(newTarget100);
        return { action: 'postponed', nextAt: newTarget100 };
      }
        
      case 'disable':
        setIsRevisionDisabled(true);
        return { action: 'disabled' };
        
      default:
        return { action: 'cancelled' };
    }
  }, [totalWordsLearned, selectRevisionWords]);

  // ========== COMPLETION D'UNE RÉVISION ==========
  const markRevisionCompleted = useCallback(async (completedWords, score, questionsCount) => {
    try {
      // Enregistrer l'historique
      const revisionRecord = {
        timestamp: Date.now(),
        wordsCount: completedWords.length,
        score,
        questionsCount,
        percentage: Math.round((score / questionsCount) * 100),
        totalWordsAtTime: totalWordsLearned
      };

      setRevisionHistory(prev => [...prev, revisionRecord]);
      setLastRevisionWords(completedWords);
      
      // Programmer la prochaine révision
      const nextTarget = totalWordsLearned + REVISION_CONFIG.TRIGGER_INTERVAL;
      setNextRevisionAt(nextTarget);

    } catch (error) {
      console.warn('Erreur enregistrement révision:', error);
    }
  }, [totalWordsLearned]);

  // ========== RÉACTIVATION DES RÉVISIONS ==========
  const enableRevisions = useCallback(() => {
    setIsRevisionDisabled(false);
    const nextTarget = totalWordsLearned + REVISION_CONFIG.TRIGGER_INTERVAL;
    setNextRevisionAt(nextTarget);
  }, [totalWordsLearned]);

  // ========== CALCUL AUTO DU TOTAL ==========
  useEffect(() => {
    calculateTotalWords();
    
    // Recalculer périodiquement
    const interval = setInterval(calculateTotalWords, 10000); // Toutes les 10s
    return () => clearInterval(interval);
  }, [calculateTotalWords]);

  // ========== STATISTIQUES ==========
  const getRevisionStats = useCallback(() => {
    if (revisionHistory.length === 0) {
      return {
        totalRevisions: 0,
        averageScore: 0,
        lastRevision: null,
        streak: 0
      };
    }

    const totalRevisions = revisionHistory.length;
    const averageScore = revisionHistory.reduce((sum, r) => sum + r.percentage, 0) / totalRevisions;
    const lastRevision = revisionHistory[revisionHistory.length - 1];
    
    // Calculer le streak (révisions récentes avec >70%)
    let streak = 0;
    for (let i = revisionHistory.length - 1; i >= 0; i--) {
      if (revisionHistory[i].percentage >= 70) {
        streak++;
      } else {
        break;
      }
    }

    return {
      totalRevisions,
      averageScore: Math.round(averageScore),
      lastRevision,
      streak
    };
  }, [revisionHistory]);

  // ========== RETURN ==========
  return {
    // État
    totalWordsLearned,
    nextRevisionAt,
    shouldShowRevision,
    isRevisionDisabled,
    isLoading,
    
    // Actions
    handleRevisionChoice,
    markRevisionCompleted,
    enableRevisions,
    calculateTotalWords,
    selectRevisionWords,
    
    // Utilitaires
    getRevisionStats,
    
    // Configuration
    config: REVISION_CONFIG
  };
};

export default useRevisionManager;