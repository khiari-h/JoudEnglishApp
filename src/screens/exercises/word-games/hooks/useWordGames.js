// src/screens/exercises/word-games/hooks/useWordGames.js - VERSION CORRIGÉE

import { useState, useEffect, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated } from 'react-native';
import { shuffleArray } from '../../../../utils/arrayUtils';

/**
 * 🎯 Hook unifié pour Word Games
 * Remplace useWordGamesState + useWordGamesProgress
 * Simple, efficace, maintenable - pattern identique à useVocabulary et useAssessment
 */
const useWordGames = (wordGamesData = null, level = "A1") => {
  
  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, fallback = null) => {
    console.warn(`Word games storage error in ${operation}:`, error);
    return fallback;
  };

  // =================== STORAGE KEYS ===================
  const STORAGE_KEY = `wordGames_${level}_position`;
  const COMPLETED_KEY = `wordGames_${level}_completed`;
  const SCORES_KEY = `wordGames_${level}_scores`;

  // =================== STATE ===================
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [gameResults, setGameResults] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [completedGames, setCompletedGames] = useState({});
  const [lastPosition, setLastPosition] = useState(null);

  const isInitialized = useRef(false);

  // =================== COMPUTED VALUES ===================
  const games = wordGamesData?.games || [];
  const totalGames = games.length;
  const currentGame = games[currentGameIndex];

  // =================== ANIMATIONS ===================
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  // =================== DATA LOADING ===================
  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger position sauvegardée
        try {
          const savedPosition = await AsyncStorage.getItem(STORAGE_KEY);
          if (savedPosition) {
            const position = JSON.parse(savedPosition);
            setLastPosition(position);
          }
        } catch (positionError) {
          handleStorageError(positionError, 'load position');
        }

        // Charger jeux complétés
        try {
          const savedCompleted = await AsyncStorage.getItem(COMPLETED_KEY);
          if (savedCompleted) {
            const completed = JSON.parse(savedCompleted);
            setCompletedGames(completed);
          }
        } catch (completedError) {
          handleStorageError(completedError, 'load completed games');
        }

        // Charger scores
        try {
          const savedScores = await AsyncStorage.getItem(SCORES_KEY);
          if (savedScores) {
            const scores = JSON.parse(savedScores);
            setGameResults(scores);
          } else {
            // Initialiser avec des scores par défaut
            setGameResults(Array(games.length).fill({
              score: 0,
              maxScore: 0,
              completed: false,
            }));
          }
        } catch (scoresError) {
          handleStorageError(scoresError, 'load scores');
          // Fallback: initialiser avec des scores par défaut
          setGameResults(Array(games.length).fill({
            score: 0,
            maxScore: 0,
            completed: false,
          }));
        }
      } catch (error) {
        // ✅ Gestion d'erreur appropriée
        console.error('Error loading word games data:', error);
      } finally {
        setLoaded(true);
      }
    };
    loadData();
  }, [level, games.length]);

  // Save data to storage
  const saveData = useCallback(async () => {
    try {
      // Sauvegarder position
      const dataToSave = {
        gameIndex: currentGameIndex,
        timestamp: Date.now()
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

      // Sauvegarder jeux complétés
      await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(completedGames));
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      handleStorageError(error, 'saveData');
      // Fallback: continuer sans sauvegarde
    }
  }, [currentGameIndex, completedGames, STORAGE_KEY, COMPLETED_KEY]);

  // Auto-save when data changes
  useEffect(() => {
    if (loaded) saveData();
  }, [saveData, loaded]);

  // Initialize game setup
  useEffect(() => {
    if (loaded && games.length > 0 && !isInitialized.current) {
      // Restaurer position ou commencer au début
      if (lastPosition && lastPosition.gameIndex < games.length) {
        setCurrentGameIndex(lastPosition.gameIndex);
      }
      
      // Initialiser progression si nécessaire
      const newCompletedGames = { ...completedGames };
      games.forEach((_, index) => {
        if (!newCompletedGames[index]) {
          newCompletedGames[index] = { completed: false };
        }
      });
      setCompletedGames(newCompletedGames);
      isInitialized.current = true;
    }
  }, [loaded, games, lastPosition, completedGames]);

  // Déclaration des fonctions utilitaires avant leur utilisation
  const shuffleGameOptions = (game) => {
    let optionsToShuffle = [];

    if (game.type === "matching") {
      const allItems = game.pairs.flatMap((pair) => [pair.word, pair.match]);
      optionsToShuffle = shuffleArray(allItems);
    } else if (game.type === "categorization") {
      optionsToShuffle = shuffleArray([...game.words]);
    }

    setShuffledOptions(optionsToShuffle);
  };

  // Setup current game
  useEffect(() => {
    if (currentGame) {
      // Réinitialiser les états pour le jeu actuel
      setSelectedItems([]);
      setMatchedItems([]);
      setShowFeedback(false);
      setIsCorrect(false);

      // Mélanger les options selon le type de jeu
      shuffleGameOptions(currentGame);
    }
  }, [currentGameIndex, currentGame]);

  // =================== GAME LOGIC ===================
  
  // =================== MAIN NAVIGATION ===================
  
  const handleNext = useCallback(() => {
    if (currentGameIndex < games.length - 1) {
      setCurrentGameIndex(prev => prev + 1);
      setShowFeedback(false);
      setIsCorrect(false);
      return { completed: false };
    } else {
      setShowResults(true);
      return { completed: true };
    }
  }, [currentGameIndex, games.length]);

  const handlePrevious = useCallback(() => {
    if (currentGameIndex > 0) {
      setCurrentGameIndex(prev => prev - 1);
      setShowFeedback(false);
      setIsCorrect(false);
      return true;
    }
    return false;
  }, [currentGameIndex]);

  const resetGames = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEY, COMPLETED_KEY, SCORES_KEY]);
      setCurrentGameIndex(0);
      setSelectedItems([]);
      setMatchedItems([]);
      setShowFeedback(false);
      setIsCorrect(false);
      setShowResults(false);
      setScore(0);
      setCompletedGames({});
      setLastPosition({ gameIndex: 0 });
      
      if (games.length > 0) {
        setGameResults(Array(games.length).fill({
          score: 0,
          maxScore: 0,
          completed: false,
        }));
        shuffleGameOptions(games[0]);
      }
    } catch (error) {
      // ✅ Gestion d'erreur appropriée
      handleStorageError(error, 'resetGames');
      // Fallback: réinitialiser l'état local même si la suppression échoue
      setCurrentGameIndex(0);
      setSelectedItems([]);
      setMatchedItems([]);
      setShowFeedback(false);
      setIsCorrect(false);
      setShowResults(false);
      setScore(0);
      setCompletedGames({});
      setLastPosition({ gameIndex: 0 });
      
      if (games.length > 0) {
        setGameResults(Array(games.length).fill({
          score: 0,
          maxScore: 0,
          completed: false,
        }));
        shuffleGameOptions(games[0]);
      }
    }
  }, [STORAGE_KEY, COMPLETED_KEY, SCORES_KEY, games]);

  // =================== COMPUTED STATS ===================
  
  const getStats = useCallback(() => {
    const completedGamesCount = Object.values(completedGames).filter(
      game => game.completed
    ).length;
    
    const totalMaxScore = gameResults.reduce((sum, result) => sum + result.maxScore, 0);
    const totalProgress = totalGames > 0 ? Math.round((completedGamesCount / totalGames) * 100) : 0;
    const currentProgress = totalGames > 0 ? ((currentGameIndex + 1) / totalGames) * 100 : 0;

    return {
      totalGames,
      completedGamesCount,
      totalProgress,
      currentProgress,
      score,
      totalMaxScore,
      percentage: totalMaxScore > 0 ? Math.round((score / totalMaxScore) * 100) : 0
    };
  }, [totalGames, completedGames, gameResults, currentGameIndex, score]);

  // =================== COMPUTED DISPLAY ===================
  
  const getDisplayData = useCallback(() => {
    const gameCounter = `${currentGameIndex + 1} / ${totalGames}`;
    const gameTitle = currentGame?.title || `Game ${currentGameIndex + 1}`;

    return {
      gameCounter,
      gameTitle,
      currentGame,
      currentGameIndex: currentGameIndex + 1
    };
  }, [currentGameIndex, totalGames, currentGame]);

  // =================== VALIDATION ===================
  
  const canGoToPrevious = currentGameIndex > 0;
  const isLastGame = currentGameIndex === totalGames - 1;

  return {
    // State
    currentGameIndex,
    selectedItems,
    matchedItems,
    showFeedback,
    isCorrect,
    showResults,
    score,
    gameResults,
    shuffledOptions,
    completedGames,
    loaded,
    
    // Data
    games,
    currentGame,
    totalGames,
    
    // Animations
    fadeAnim,
    bounceAnim,
    
    // Actions
    handleNext,
    handlePrevious,
    resetGames,
    setCurrentGameIndex,
    
    // Computed
    canGoToPrevious,
    isLastGame,
    stats: getStats(),
    display: getDisplayData(),
  };
};

export default useWordGames;