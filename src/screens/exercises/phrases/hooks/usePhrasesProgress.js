// src/screens/exercises/phrases/hooks/usePhrasesProgress.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const usePhrasesProgress = (level) => {
  const [completedPhrases, setCompletedPhrases] = useState({});
  const [lastPosition, setLastPosition] = useState({ 
    categoryIndex: 0, 
    phraseIndex: 0 
  });
  const [loaded, setLoaded] = useState(false);

  // Clés pour AsyncStorage
  const COMPLETED_PHRASES_KEY = `phrases_completed_${level}`;
  const LAST_POSITION_KEY = `phrases_position_${level}`;

  // Charger les données sauvegardées
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedCompletedPhrasesJson = await AsyncStorage.getItem(COMPLETED_PHRASES_KEY);
        const savedCompletedPhrases = savedCompletedPhrasesJson 
          ? JSON.parse(savedCompletedPhrasesJson) 
          : {};

        const savedPositionJson = await AsyncStorage.getItem(LAST_POSITION_KEY);
        const savedPosition = savedPositionJson 
          ? JSON.parse(savedPositionJson) 
          : { categoryIndex: 0, phraseIndex: 0 };

        setCompletedPhrases(savedCompletedPhrases);
        setLastPosition(savedPosition);
        setLoaded(true);
      } catch (error) {

        setLoaded(true);
      }
    };

    loadSavedData();
  }, []);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(async (categoryIndex, phraseIndex) => {
    try {
      const newPosition = { 
        categoryIndex, 
        phraseIndex,
        timestamp: Date.now() // Ajout du timestamp pour suivre la dernière activité
      };
      setLastPosition(newPosition);
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(newPosition));
    } catch (error) {

    }
  }, []);

  // Marquer une phrase comme complétée
  const markPhraseAsCompleted = useCallback(async (categoryIndex, phraseIndex, phrase) => {
    try {
      const updatedCompletedPhrases = { ...completedPhrases };

      if (!updatedCompletedPhrases[categoryIndex]) {
        updatedCompletedPhrases[categoryIndex] = [];
      }

      if (!updatedCompletedPhrases[categoryIndex].includes(phraseIndex)) {
        updatedCompletedPhrases[categoryIndex].push(phraseIndex);

        setCompletedPhrases(updatedCompletedPhrases);
        await AsyncStorage.setItem(COMPLETED_PHRASES_KEY, JSON.stringify(updatedCompletedPhrases));
      }
    } catch (error) {

    }
  }, [completedPhrases]);

  // Calculer la progression globale
  const calculateOverallProgress = useCallback(() => {
    const totalCategories = Object.keys(completedPhrases).length;
    if (totalCategories === 0) return 0;

    const completedCategories = Object.values(completedPhrases).filter(phrases => phrases.length > 0).length;
    return (completedCategories / totalCategories) * 100;
  }, [completedPhrases]);

  return {
    completedPhrases,
    lastPosition,
    loaded,
    saveLastPosition,
    markPhraseAsCompleted,
    calculateOverallProgress
  };
};

export default usePhrasesProgress;
