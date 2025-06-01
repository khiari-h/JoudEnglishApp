// src/screens/exercises/wordGames/hooks/useWordGamesProgress.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook personnalisé pour gérer la progression dans les jeux de mots
 * Permet de sauvegarder la progression et la dernière position pour le suivi des activités
 * 
 * @param {string} level - Niveau de langue (A1, A2, B1, B2, C1, C2)
 */
const useWordGamesProgress = (level) => {
  // États pour suivre la progression
  const [completedGames, setCompletedGames] = useState({});
  const [lastPosition, setLastPosition] = useState({ gameIndex: 0 });
  const [userScores, setUserScores] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Clés pour AsyncStorage
  const COMPLETED_GAMES_KEY = `word_games_completed_${level}`;
  const LAST_POSITION_KEY = `word_games_position_${level}`;
  const USER_SCORES_KEY = `word_games_scores_${level}`;

  // Charger les données sauvegardées
  useEffect(() => {
    const loadSavedData = async () => {
      try {

        // Récupérer les jeux complétés
        const savedCompletedGamesJson = await AsyncStorage.getItem(COMPLETED_GAMES_KEY);
        const savedCompletedGames = savedCompletedGamesJson 
          ? JSON.parse(savedCompletedGamesJson) 
          : {};

        // Récupérer la dernière position
        const savedPositionJson = await AsyncStorage.getItem(LAST_POSITION_KEY);
        const savedPosition = savedPositionJson 
          ? JSON.parse(savedPositionJson) 
          : { gameIndex: 0 };

        // Récupérer les scores de l'utilisateur
        const savedScoresJson = await AsyncStorage.getItem(USER_SCORES_KEY);
        const savedScores = savedScoresJson 
          ? JSON.parse(savedScoresJson) 
          : [];

        .length,
          scoresCount: savedScores.length
        });

        setCompletedGames(savedCompletedGames);
        setLastPosition(savedPosition);
        setUserScores(savedScores);
        setLoaded(true);
      } catch (error) {

        setCompletedGames({});
        setLastPosition({ gameIndex: 0 });
        setUserScores([]);
        setLoaded(true);
      }
    };

    loadSavedData();
  }, [COMPLETED_GAMES_KEY, LAST_POSITION_KEY, USER_SCORES_KEY, level]);

  // Sauvegarder la dernière position
  const saveLastPosition = useCallback(async (gameIndex) => {
    try {

      const newPosition = { 
        gameIndex,
        timestamp: Date.now() // Important pour le tracking dans useLastActivity
      };
      setLastPosition(newPosition);
      await AsyncStorage.setItem(LAST_POSITION_KEY, JSON.stringify(newPosition));

      .toISOString()}`);
    } catch (error) {

    }
  }, [LAST_POSITION_KEY]);

  // Marquer un jeu comme complété
  const markGameAsCompleted = useCallback(async (gameIndex, score, maxScore) => {
    try {

      // Mettre à jour les jeux complétés
      const updatedCompletedGames = { ...completedGames };
      updatedCompletedGames[gameIndex] = {
        completed: true,
        completedAt: new Date().toISOString(),
        score,
        maxScore
      };

      setCompletedGames(updatedCompletedGames);
      await AsyncStorage.setItem(COMPLETED_GAMES_KEY, JSON.stringify(updatedCompletedGames));

      // Mettre à jour les scores
      const newScore = {
        gameIndex,
        score,
        maxScore,
        timestamp: Date.now()
      };

      const updatedScores = [...userScores, newScore];
      setUserScores(updatedScores);
      await AsyncStorage.setItem(USER_SCORES_KEY, JSON.stringify(updatedScores));

    } catch (error) {

    }
  }, [completedGames, userScores, COMPLETED_GAMES_KEY, USER_SCORES_KEY]);

  // Initialiser la progression pour un nouveau jeu
  const initializeProgress = useCallback((games) => {
    if (!initialized && loaded && games && games.length > 0) {

      const newCompletedGames = { ...completedGames };

      // Créer des entrées vides pour les jeux manquants
      games.forEach((_, index) => {
        if (!newCompletedGames[index]) {
          newCompletedGames[index] = { completed: false };
        }
      });

      setCompletedGames(newCompletedGames);
      setInitialized(true);

    }
  }, [completedGames, initialized, loaded]);

  // Calculer le score total et le pourcentage
  const calculateOverallProgress = useCallback(() => {
    const totalGames = Object.keys(completedGames).length;
    if (totalGames === 0) return 0;

    const completedCount = Object.values(completedGames)
      .filter(game => game.completed)
      .length;

    const progressPercentage = (completedCount / totalGames) * 100;
    }% (${completedCount}/${totalGames})`);

    return progressPercentage;
  }, [completedGames]);

  // Obtenir les jeux complétés
  const getCompletedGames = useCallback(() => {
    return Object.entries(completedGames)
      .filter(([_, data]) => data.completed)
      .map(([index, data]) => ({
        index: parseInt(index, 10),
        ...data
      }));
  }, [completedGames]);

  // Vérifier si un jeu spécifique est complété
  const isGameCompleted = useCallback((gameIndex) => {
    return completedGames[gameIndex]?.completed || false;
  }, [completedGames]);

  // Réinitialiser tous les scores et progressions (pour le débogage)
  const resetAllProgress = useCallback(async () => {
    try {

      await AsyncStorage.multiRemove([
        COMPLETED_GAMES_KEY,
        LAST_POSITION_KEY,
        USER_SCORES_KEY
      ]);

      setCompletedGames({});
      setLastPosition({ gameIndex: 0 });
      setUserScores([]);
      setInitialized(false);

    } catch (error) {

    }
  }, [COMPLETED_GAMES_KEY, LAST_POSITION_KEY, USER_SCORES_KEY]);

  return {
    completedGames,
    lastPosition,
    userScores,
    loaded,
    saveLastPosition,
    markGameAsCompleted,
    initializeProgress,
    calculateOverallProgress,
    getCompletedGames,
    isGameCompleted,
    resetAllProgress
  };
};

export default useWordGamesProgress;
