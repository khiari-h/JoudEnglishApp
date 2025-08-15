// src/components/revision/RevisionOrchestrator/index.js - VERSION AVEC HOOK PARTAGÉ
import { useEffect, useState, useRef, useCallback } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types'; // ✅ Import de PropTypes
import RevisionPopup from '../../Dashboard/components/popup/RevisionPopup';
import { useRevisionSettings } from '../../../hooks/useRevisionSettings';

const RevisionOrchestrator = ({ currentLevel = "mixed" }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [totalWords, setTotalWords] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { 
    preferences, 
    disableRevisions, 
    resetToNextTarget,
    updatePreferences 
  } = useRevisionSettings();
  
  const popupShownRef = useRef(false);

  // ========== COMPTAGE SIMPLE (INCHANGÉ) ==========
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

  // ========== CHARGEMENT INITIAL ET VÉRIFICATION RÉVISION ==========
  useEffect(() => {
    const initializeRevision = async () => {
      await countWords();
      setIsLoaded(true);
      
      const shouldShow = !preferences.isDisabled && 
                          totalWords >= preferences.nextRevisionAt && 
                          totalWords > 0 && 
                          !popupShownRef.current;

      if (shouldShow) {
        popupShownRef.current = true;
        setTimeout(() => setShowPopup(true), 1000);
      }
    };

    initializeRevision();
  }, [preferences.isDisabled, preferences.nextRevisionAt]);

  // ========== VÉRIFICATION RÉVISION QUAND LES PREFERENCES CHANGENT ==========
  useEffect(() => {
    if (!isLoaded) return;
    
    const shouldShow = !preferences.isDisabled && 
                      totalWords >= preferences.nextRevisionAt && 
                      totalWords > 0 && 
                      !popupShownRef.current;

    if (shouldShow) {
      popupShownRef.current = true;
      setTimeout(() => setShowPopup(true), 1000);
    }
  }, [isLoaded, preferences.isDisabled, preferences.nextRevisionAt, totalWords]);

  // ========== HANDLERS AVEC HOOK PARTAGÉ ==========
  const handleChoice = useCallback(async (choice) => {
    setShowPopup(false);
    popupShownRef.current = false;
    
    switch (choice) {
      case 'now': {
        await resetToNextTarget(totalWords);
        router.push({
          pathname: "/tabs/vocabularyRevision",
          params: {
            level: currentLevel,
            questionsCount: preferences.questionsCount,
            source: 'popup_trigger'
          }
        });
        break;
      }
      case 'later_50': {
        const next50 = totalWords + 50;
        await updatePreferences({ nextRevisionAt: next50 });
        break;
      }
      case 'later_100': {
        const next100 = totalWords + 100;
        await updatePreferences({ nextRevisionAt: next100 });
        break;
      }
      case 'disable': {
        await disableRevisions();
        break;
      }
      default: {
        const defaultNext = totalWords + 50;
        await updatePreferences({ nextRevisionAt: defaultNext });
        break;
      }
    }
  }, [totalWords, disableRevisions, resetToNextTarget, updatePreferences, currentLevel, preferences.questionsCount]);

  const handleDismiss = useCallback(() => handleChoice('later_50'), [handleChoice]);

  if (preferences.isDisabled) {
    return null;
  }

  return (
    <RevisionPopup
      visible={showPopup}
      totalWordsLearned={totalWords}
      questionsCount={preferences.questionsCount}
      currentLevel={currentLevel}
      onChoice={handleChoice}
      onDismiss={handleDismiss}
    />
  );
};

// ✅ Ajout de la validation des props
RevisionOrchestrator.propTypes = {
  currentLevel: PropTypes.string.isRequired,
};

export default RevisionOrchestrator;