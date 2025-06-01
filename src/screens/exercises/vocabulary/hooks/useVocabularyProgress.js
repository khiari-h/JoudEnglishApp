import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Hook personnalisé pour gérer la progression dans les exercices de vocabulaire
 *
 * @param {string} progressKey - Clé unique (level_mode, ex: "1_fast", "2_classic")
 */
const useVocabularyProgress = (progressKey) => {
  // États pour suivre la progression
  const [completedWords, setCompletedWords] = useState({});
  const [lastPosition, setLastPosition] = useState({
    categoryIndex: 0,
    wordIndex: 0,
  });
  const [loaded, setLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Clés pour AsyncStorage - MAINTENANT avec progressKey complet
  const COMPLETED_WORDS_KEY = `vocabulary_completed_${progressKey}`;
  const LAST_POSITION_KEY = `vocabulary_position_${progressKey}`;

  // DEBUG

  // Charger les données sauvegardées au premier rendu
  useEffect(() => {
    const loadSavedData = async () => {
      try {

        // Récupérer les mots complétés
        const savedCompletedWordsJson = await AsyncStorage.getItem(
          COMPLETED_WORDS_KEY
        );
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

        // En cas d'erreur, initialiser avec des valeurs par défaut
        setCompletedWords({});
        setLastPosition({ categoryIndex: 0, wordIndex: 0 });
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [COMPLETED_WORDS_KEY, LAST_POSITION_KEY, progressKey]);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(
    async (categoryIndex, wordIndex) => {
      try {
        const newPosition = {
          categoryIndex,
          wordIndex,
          timestamp: Date.now(),
          progressKey, // Ajouter la clé pour debug
        };

        setLastPosition(newPosition);
        await AsyncStorage.setItem(
          LAST_POSITION_KEY,
          JSON.stringify(newPosition)
        );
      } catch (error) {

      }
    },
    [LAST_POSITION_KEY, progressKey]
  );

  // Marquer un mot comme complété
  const markWordAsCompleted = useCallback(
    async (categoryIndex, wordIndex) => {
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
          await AsyncStorage.setItem(
            COMPLETED_WORDS_KEY,
            JSON.stringify(updatedCompletedWords)
          );
        }
      } catch (error) {

      }
    },
    [completedWords, COMPLETED_WORDS_KEY, progressKey]
  );

  // Initialiser la progression pour les nouvelles catégories
  const initializeProgress = useCallback(
    (vocabularyData) => {
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
    },
    [completedWords, initialized, loaded, progressKey]
  );

  return {
    completedWords,
    lastPosition,
    loaded,
    markWordAsCompleted,
    saveLastPosition,
    initializeProgress,
  };
};

export default useVocabularyProgress;

