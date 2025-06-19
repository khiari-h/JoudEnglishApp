// src/components/revision/RevisionOrchestrator/index.js - VERSION SIMPLE
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RevisionPopup from '../../Dashboard/components/popup/RevisionPopup';

const RevisionOrchestrator = ({ currentLevel = "mixed" }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [totalWords, setTotalWords] = useState(0);
  const [nextRevisionAt, setNextRevisionAt] = useState(50);

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
            
            Object.values(completedWords).forEach(words => {
              if (Array.isArray(words)) {
                total += words.length;
              }
            });
          }
        }
      }

      setTotalWords(total);
      return total;
    } catch (error) {
      return 0;
    }
  };

  // ========== SAUVEGARDE/CHARGEMENT ==========
  const loadRevisionSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('revision_settings');
      if (saved) {
        const { nextAt } = JSON.parse(saved);
        setNextRevisionAt(nextAt || 50);
      }
    } catch (error) {
      // Ignore
    }
  };

  const saveRevisionSettings = async (nextAt) => {
    try {
      await AsyncStorage.setItem('revision_settings', JSON.stringify({ nextAt }));
    } catch (error) {
      // Ignore
    }
  };

  // ========== VÉRIFICATION AU DÉMARRAGE ==========
  useEffect(() => {
    const checkRevision = async () => {
      await loadRevisionSettings();
      const words = await countWords();
      
      if (words >= nextRevisionAt && words > 0) {
        setTimeout(() => setShowPopup(true), 1000);
      }
    };

    checkRevision();
  }, [nextRevisionAt]);

  // ========== HANDLERS ==========
  const handleChoice = async (choice) => {
    setShowPopup(false); // Fermer IMMÉDIATEMENT
    
    switch (choice) {
      case 'now':
        // Programmer prochaine révision AVANT navigation
        const nextTarget = totalWords + 50;
        setNextRevisionAt(nextTarget);
        await saveRevisionSettings(nextTarget);
        
        // Navigation
        router.push({
          pathname: "/(tabs)/vocabularyRevision",
          params: {
            level: currentLevel,
            questionsCount: 10,
            source: 'popup_trigger'
          }
        });
        break;
        
      case 'later_50':
        const next50 = totalWords + 50;
        setNextRevisionAt(next50);
        await saveRevisionSettings(next50);
        break;
        
      case 'later_100':
        const next100 = totalWords + 100;
        setNextRevisionAt(next100);
        await saveRevisionSettings(next100);
        break;
        
      case 'disable':
        setNextRevisionAt(999999);
        await saveRevisionSettings(999999);
        break;
    }
  };

  return (
    <RevisionPopup
      visible={showPopup}
      totalWordsLearned={totalWords}
      questionsCount={10}
      currentLevel={currentLevel}
      onChoice={handleChoice}
      onDismiss={() => setShowPopup(false)}
    />
  );
};

export default RevisionOrchestrator;