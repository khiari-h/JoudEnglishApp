// hooks/useWordGames.js - HOOK UNIFIÉ SIMPLE
import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGameAnimation from './useGameAnimation';

/**
 * 🎯 Hook unifié pour Word Games
 * Remplace useWordGamesState + useWordGamesProgress
 * Simple, efficace, maintenable - pattern identique à useVocabulary et useAssessment
 */
const useWordGames = (wordGamesData = null, level = "A1") => {
  
  // =================== CORE STATE ===================
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [gameResults, setGameResults] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [completedGames, setCompletedGames] = useState({});
  const [lastPosition, setLastPosition] = useState({ gameIndex: 0 });
  const [loaded, setLoaded] = useState(false);

  // =================== REFS ===================
  const isInitialized = useRef(false);

  // =================== ANIMATIONS ===================
  const { fadeAnim, bounceAnim, animateFeedback } = useGameAnimation();

  // =================== COMPUTED VALUES ===================
  const games = wordGamesData?.games || [];
  const currentGame = games[currentGameIndex] || null;
  const totalGames = games.length;
  
  // =================== PERSISTENCE ===================
  const STORAGE_KEY = `word_games_${level}`;
  const COMPLETED_KEY = `word_games_completed_${level}`;
  const SCORES_KEY = `word_games_scores_${level}`;

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger position
        const savedPosition = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedPosition) {
          const { gameIndex } = JSON.parse(savedPosition);
          setLastPosition({ gameIndex });
        }

        // Charger jeux complétés
        const savedCompleted = await AsyncStorage.getItem(COMPLETED_KEY);
        if (savedCompleted) {
          setCompletedGames(JSON.parse(savedCompleted));
        }

        // Initialiser gameResults selon le nombre de jeux
        if (games.length > 0) {
          setGameResults(Array(games.length).fill({
            score: 0,
            maxScore: 0,
            completed: false,
          }));
        }
      } catch (error) {
        // Ignored on purpose
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
      // Ignored on purpose
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
  
  // Déclaration des fonctions utilitaires avant leur utilisation
  const shuffleGameOptions = (game) => {
    let optionsToShuffle = [];

    if (game.type === "matching") {
      const allItems = game.pairs.flatMap((pair) => [pair.word, pair.match]);
      optionsToShuffle = allItems.sort(() => Math.random() - 0.5);
    } else if (game.type === "categorization") {
      optionsToShuffle = [...game.words].sort(() => Math.random() - 0.5);
    }

    setShuffledOptions(optionsToShuffle);
  };

  const handleGameComplete = (isSuccessful) => {
    const earnedScore = isSuccessful ? currentGame.maxScore || 10 : 0;
    const maxPossibleScore = currentGame.maxScore || 10;

    updateGameResults(earnedScore, maxPossibleScore);
    setIsCorrect(isSuccessful);
    setShowFeedback(true);
    animateFeedback(isSuccessful);
  };

  const updateGameResults = (earnedScore, maxScore) => {
    const newGameResults = [...gameResults];
    newGameResults[currentGameIndex] = {
      score: earnedScore,
      maxScore,
      completed: true,
    };
    setGameResults(newGameResults);

    // Marquer le jeu comme complété
    markGameAsCompleted(currentGameIndex, earnedScore, maxScore);
  };

  const markGameAsCompleted = useCallback(async (gameIndex, gameScore, maxScore) => {
    try {
      const updatedCompletedGames = { ...completedGames };
      updatedCompletedGames[gameIndex] = {
        completed: true,
        score: gameScore,
        maxScore,
      };
      setCompletedGames(updatedCompletedGames);
      await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(updatedCompletedGames));
    } catch (error) {
      // Ignored on purpose
    }
  }, [completedGames, COMPLETED_KEY]);

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
      // Ignored on purpose
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