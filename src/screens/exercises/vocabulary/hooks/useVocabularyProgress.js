import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook personnalisé pour gérer la progression dans les exercices de vocabulaire
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useVocabularyProgress = (level) => {
  // États pour suivre la progression
  const [completedWords, setCompletedWords] = useState({});
  const [lastPosition, setLastPosition] = useState({ categoryIndex: 0, wordIndex: 0 });
  const [loaded, setLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Clés pour AsyncStorage
  const COMPLETED_WORDS_KEY = `vocabulary_completed_${level}`;
  const LAST_POSITION_KEY = `vocabulary_position_${level}`;

  // Charger les données sauvegardées au premier rendu
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Récupérer les mots complétés
        const savedCompletedWordsJson = await AsyncStorage.getItem(COMPLETED_WORDS_KEY);
        const savedCompletedWords = savedCompletedWordsJson 
          ? JSON.parse(savedCompletedWordsJson) 
          : {};
        
        // Récupérer la dernière position
        const savedPositionJson = await AsyncStorage.getItem(LAST_POSITION_KEY);
        const savedPosition = savedPositionJson 
          ? JSON.parse(savedPositionJson) 
          : { categoryIndex: 0, wordIndex: 0 };
        
        setCompletedWords(savedCompletedWords);
        setLastPosition(savedPosition);
        setLoaded(true);
      } catch (error) {
        console.error('Erreur lors du chargement des données de progression:', error);
        // En cas d'erreur, initialiser avec des valeurs par défaut
        setCompletedWords({});
        setLastPosition({ categoryIndex: 0, wordIndex: 0 });
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [COMPLETED_WORDS_KEY, LAST_POSITION_KEY]);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(async (categoryIndex, wordIndex) => {
    try {
      const newPosition = { categoryIndex, wordIndex };
      setLastPosition(newPosition);
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(newPosition));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la position:', error);
    }
  }, [LAST_POSITION_KEY]);

  // Marquer un mot comme complété
  const markWordAsCompleted = useCallback(async (categoryIndex, wordIndex) => {
    try {
      const updatedCompletedWords = { ...completedWords };
      
      // Initialiser le tableau pour cette catégorie si nécessaire
      if (!updatedCompletedWords[categoryIndex]) {
        updatedCompletedWords[categoryIndex] = [];
      }
      
      // Ajouter l'index du mot s'il n'est pas déjà présent
      if (!updatedCompletedWords[categoryIndex].includes(wordIndex)) {
        updatedCompletedWords[categoryIndex].push(wordIndex);
        setCompletedWords(updatedCompletedWords);
        await AsyncStorage.setItem(COMPLETED_WORDS_KEY, JSON.stringify(updatedCompletedWords));
      }
    } catch (error) {
      console.error('Erreur lors du marquage du mot comme complété:', error);
    }
  }, [completedWords, COMPLETED_WORDS_KEY]);

  // Initialiser la progression pour les nouvelles catégories
  const initializeProgress = useCallback((vocabularyData) => {
    if (!initialized && loaded && vocabularyData) {
      const exercises = vocabularyData.exercises || [];
      const newCompletedWords = { ...completedWords };
      
      // Créer des entrées vides pour les catégories manquantes
      exercises.forEach((_, index) => {
        if (!newCompletedWords[index]) {
          newCompletedWords[index] = [];
        }
      });
      
      setCompletedWords(newCompletedWords);
      setInitialized(true);
    }
  }, [completedWords, initialized, loaded]);

  return {
    completedWords,
    lastPosition,
    loaded,
    markWordAsCompleted,
    saveLastPosition,
    initializeProgress
  };
};

export default useVocabularyProgress;