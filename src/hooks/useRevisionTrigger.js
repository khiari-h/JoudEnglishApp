// src/hooks/useRevisionTrigger.js
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // ✅ AJOUT
import { ROUTES } from '../navigation/routes'; // ✅ AJOUT

const REVISION_STORAGE_KEY = 'revision_trigger_data';
const OPTIMAL_WORDS_THRESHOLD = 15; // Recherche prouve 15 mots = optimal
const SNOOZE_HOURS = 2; // Snooze pour 2h si "Plus tard"

/**
 * Hook pour gérer le déclenchement intelligent des révisions
 * ✅ Basé sur recherche scientifique : 15 mots = trigger optimal
 */
const useRevisionTrigger = (totalWordsLearned = 0) => {
  const navigation = useNavigation(); // ✅ AJOUT
  
  const [showRevisionPopup, setShowRevisionPopup] = useState(false);
  const [revisionData, setRevisionData] = useState({
    wordsToReview: 0,
    isSnoozing: false,
    snoozeUntil: null,
    lastRevisionAt: null,
    totalRevisionsTriggered: 0
  });

  // Ref pour éviter les triggers multiples
  const lastTriggeredAt = useRef(0);

  // Charger données révision
  useEffect(() => {
    const loadRevisionData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(REVISION_STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setRevisionData(parsedData);
          
          // Vérifier si on est encore en snooze
          if (parsedData.snoozeUntil) {
            const now = new Date();
            const snoozeEnd = new Date(parsedData.snoozeUntil);
            if (now < snoozeEnd) {
              setRevisionData(prev => ({ ...prev, isSnoozing: true }));
              return;
            } else {
              // Snooze terminé
              setRevisionData(prev => ({ 
                ...prev, 
                isSnoozing: false, 
                snoozeUntil: null 
              }));
            }
          }
        }
      } catch (error) {
        console.error('Erreur chargement révision data:', error);
      }
    };

    loadRevisionData();
  }, []);

  // Sauvegarder données révision
  const saveRevisionData = async (newData) => {
    try {
      const dataToSave = { ...revisionData, ...newData };
      await AsyncStorage.setItem(REVISION_STORAGE_KEY, JSON.stringify(dataToSave));
      setRevisionData(dataToSave);
    } catch (error) {
      console.error('Erreur sauvegarde révision data:', error);
    }
  };

  // ========== LOGIQUE DÉCLENCHEMENT ==========
  
  useEffect(() => {
    // Éviter triggers multiples rapprochés
    const now = Date.now();
    if (now - lastTriggeredAt.current < 5000) return; // 5s cooldown

    // Ne pas trigger si en snooze
    if (revisionData.isSnoozing) return;

    // Ne pas trigger si popup déjà ouvert
    if (showRevisionPopup) return;

    // Logique principale : tous les 15 mots
    if (totalWordsLearned > 0 && totalWordsLearned % OPTIMAL_WORDS_THRESHOLD === 0) {
      // Vérifier qu'on n'a pas déjà trigger pour ce seuil
      const expectedRevisions = Math.floor(totalWordsLearned / OPTIMAL_WORDS_THRESHOLD);
      
      if (expectedRevisions > revisionData.totalRevisionsTriggered) {
        triggerRevisionPopup();
        lastTriggeredAt.current = now;
      }
    }
  }, [totalWordsLearned, revisionData.isSnoozing, revisionData.totalRevisionsTriggered, showRevisionPopup]);

  // Déclencher popup révision
  const triggerRevisionPopup = async () => {
    const wordsToReview = Math.floor(totalWordsLearned / OPTIMAL_WORDS_THRESHOLD) * 10; // 10 mots par cycle
    
    await saveRevisionData({
      totalRevisionsTriggered: revisionData.totalRevisionsTriggered + 1,
      wordsToReview,
    });
    
    setShowRevisionPopup(true);
  };

  // Gérer "Réviser maintenant" ✅ CORRIGÉ
  const handleReviseNow = async () => {
    await saveRevisionData({
      lastRevisionAt: new Date().toISOString(),
    });
    
    setShowRevisionPopup(false);
    
    // ✅ NAVIGATION REACT NAVIGATION
    navigation.navigate(ROUTES.VOCABULARY_REVISION, {
      level: 'mixed', // Révision = mix de tous les niveaux
      wordsToReview: revisionData.wordsToReview,
    });
    
    // Retourner données pour info
    return {
      wordsToReview: revisionData.wordsToReview,
      level: 'mixed',
    };
  };

  // Gérer "Plus tard" (snooze)
  const handleSnoozeLater = async () => {
    const snoozeUntil = new Date();
    snoozeUntil.setHours(snoozeUntil.getHours() + SNOOZE_HOURS);
    
    await saveRevisionData({
      isSnoozing: true,
      snoozeUntil: snoozeUntil.toISOString(),
    });
    
    setShowRevisionPopup(false);
    
    // Programmer vérification automatique dans 2h
    setTimeout(() => {
      setRevisionData(prev => ({ 
        ...prev, 
        isSnoozing: false, 
        snoozeUntil: null 
      }));
    }, SNOOZE_HOURS * 60 * 60 * 1000);
  };

  // Fermer popup sans action
  const handleDismiss = () => {
    setShowRevisionPopup(false);
  };

  // Réinitialiser système (debug)
  const resetRevisionSystem = async () => {
    try {
      await AsyncStorage.removeItem(REVISION_STORAGE_KEY);
      setRevisionData({
        wordsToReview: 0,
        isSnoozing: false,
        snoozeUntil: null,
        lastRevisionAt: null,
        totalRevisionsTriggered: 0
      });
      setShowRevisionPopup(false);
    } catch (error) {
      console.error('Erreur reset révision:', error);
    }
  };

  // Infos pour affichage
  const getRevisionInfo = () => {
    const nextThreshold = Math.ceil(totalWordsLearned / OPTIMAL_WORDS_THRESHOLD) * OPTIMAL_WORDS_THRESHOLD;
    const wordsUntilNext = nextThreshold - totalWordsLearned;
    
    return {
      currentWords: totalWordsLearned,
      nextThreshold,
      wordsUntilNext: wordsUntilNext > 0 ? wordsUntilNext : OPTIMAL_WORDS_THRESHOLD,
      isSnoozing: revisionData.isSnoozing,
      canTrigger: !revisionData.isSnoozing && !showRevisionPopup,
      totalRevisionsTriggered: revisionData.totalRevisionsTriggered,
    };
  };

  return {
    // États
    showRevisionPopup,
    revisionData,
    
    // Actions
    handleReviseNow,
    handleSnoozeLater, 
    handleDismiss,
    resetRevisionSystem,
    
    // Infos
    getRevisionInfo,
  };
};

export default useRevisionTrigger;