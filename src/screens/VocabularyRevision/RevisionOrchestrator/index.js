// src/components/revision/RevisionOrchestrator/index.js - VERSION CORRIGÉE
import { useEffect, useState, useRef, useCallback } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RevisionPopup from '../../Dashboard/components/popup/RevisionPopup';

const REVISION_STORAGE_KEY = 'revision_preferences';

const RevisionOrchestrator = ({ currentLevel = "mixed" }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [totalWords, setTotalWords] = useState(0);
  const [nextRevisionAt, setNextRevisionAt] = useState(50);
  const [isDisabled, setIsDisabled] = useState(false); // ✅ VRAI FLAG BOOLEAN
  const [isLoaded, setIsLoaded] = useState(false);
  
  // ✅ PROTECTION contre double-popup
  const popupShownRef = useRef(false);

  // ========== COMPTAGE SIMPLE ==========
  const countWords = async () => {
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
            total += Object.values(completedWords).reduce((acc, words) => {
              if (Array.isArray(words)) {
                return acc + words.length;
              }
              return acc;
            }, 0);
          }
        }
      }

      setTotalWords(total);
      return total;
    } catch (error) {
      return 0;
    }
  };

  // ========== SAUVEGARDE/CHARGEMENT CORRIGÉ ==========
  const loadRevisionPreferences = async () => {
    try {
      const saved = await AsyncStorage.getItem(REVISION_STORAGE_KEY);
      if (saved) {
        const prefs = JSON.parse(saved);
        setNextRevisionAt(prefs.nextRevisionAt || 50);
        setIsDisabled(prefs.isDisabled || false); // ✅ VRAI FLAG
      } else {
        // ✅ Valeurs par défaut
        setNextRevisionAt(50);
        setIsDisabled(false);
      }
    } catch (error) {
      console.error('Error loading revision preferences:', error);
      setNextRevisionAt(50);
      setIsDisabled(false);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveRevisionPreferences = async (newNextAt, newIsDisabled) => {
    try {
      const prefs = {
        nextRevisionAt: newNextAt,
        isDisabled: newIsDisabled,
        lastUpdate: Date.now()
      };
      
      await AsyncStorage.setItem(REVISION_STORAGE_KEY, JSON.stringify(prefs));
      
      setNextRevisionAt(newNextAt);
      setIsDisabled(newIsDisabled);
    } catch (error) {
      console.error('Error saving revision preferences:', error);
    }
  };

  // ========== CHARGEMENT INITIAL ==========
  useEffect(() => {
    const initializeRevision = async () => {
      await loadRevisionPreferences();
      await countWords();
    };

    initializeRevision();
  }, []);

  // ========== VÉRIFICATION RÉVISION ==========
  useEffect(() => {
    // ✅ ATTENDRE que tout soit chargé
    if (!isLoaded) return;
    
    // ✅ VÉRIFICATION COMPLÈTE
    const shouldShow = !isDisabled && 
                      totalWords >= nextRevisionAt && 
                      totalWords > 0 && 
                      !showPopup && 
                      !popupShownRef.current;

    if (shouldShow) {
      // ✅ PROTECTION double-popup
      popupShownRef.current = true;
      setTimeout(() => setShowPopup(true), 1000);
    }
  }, [isLoaded, isDisabled, totalWords, nextRevisionAt, showPopup]);

  // ========== HANDLERS CORRIGÉS ==========
  const handleChoice = useCallback(async (choice) => {
    setShowPopup(false);
    popupShownRef.current = false; // ✅ Reset protection
    
    switch (choice) {
      case 'now': {
        // ✅ Programmer prochaine révision AVANT navigation
        const nextTarget = totalWords + 50;
        await saveRevisionPreferences(nextTarget, false);
        // Navigation
        router.push({
          pathname: "/tabs/vocabularyRevision",
          params: {
            level: currentLevel,
            questionsCount: 10,
            source: 'popup_trigger'
          }
        });
        break;
      }
      case 'later_50': {
        const next50 = totalWords + 50;
        await saveRevisionPreferences(next50, false);
        break;
      }
      case 'later_100': {
        const next100 = totalWords + 100;
        await saveRevisionPreferences(next100, false);
        break;
      }
      case 'disable': {
        // ✅ VRAIE DÉSACTIVATION
        await saveRevisionPreferences(nextRevisionAt, true); // ✅ isDisabled = true
        break;
      }
      default: {
        // Fermeture = later_50 par défaut
        const defaultNext = totalWords + 50;
        await saveRevisionPreferences(defaultNext, false);
        break;
      }
    }
  }, [totalWords, saveRevisionPreferences, currentLevel, nextRevisionAt]);

  const handleDismiss = useCallback(() => handleChoice('later_50'), [handleChoice]);

  // ✅ NE PAS RENDRE SI DISABLED
  if (isDisabled) {
    return null;
  }

  return (
    <RevisionPopup
      visible={showPopup}
      totalWordsLearned={totalWords}
      questionsCount={10}
      currentLevel={currentLevel}
      onChoice={handleChoice}
      onDismiss={handleDismiss}
    />
  );
};

export default RevisionOrchestrator;