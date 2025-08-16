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

  // ✅ AJOUTÉ : Démarrer l'animation fadeAnim quand le composant se charge
  useEffect(() => {
    if (loaded && games.length > 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [loaded, games.length, fadeAnim]);

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
      // ✅ CORRIGÉ : Créer des objets avec la structure attendue par MatchingGame
      const allItems = game.pairs.flatMap((pair, pairIndex) => [
        {
          id: `word-${pairIndex}`,
          text: pair.word,
          type: 'word',
          originalPair: pairIndex
        },
        {
          id: `match-${pairIndex}`,
          text: pair.match,
          type: 'match',
          originalPair: pairIndex
        }
      ]);
      optionsToShuffle = shuffleArray(allItems);
    } else if (game.type === "categorization") {
      // ✅ CORRIGÉ : Créer des objets avec la structure attendue par CategorizationGame
      optionsToShuffle = shuffleArray(game.words.map((word, index) => ({
        id: `word-${index}`,
        text: word,
        type: 'word'
      })));
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

  // ✅ CORRIGÉ : Validation automatique DÉSACTIVÉE pour éviter le "Great job" intempestif
  // L'utilisateur doit maintenant cliquer sur "Check Answer" pour valider
  // useEffect(() => {
  //   if (currentGame?.type === "matching" && selectedItems.length > 0) {
  //     // Validation automatique désactivée - l'utilisateur doit valider manuellement
  //   }
  // }, [selectedItems, currentGame, currentGameIndex, completedGames]);

  // =================== GAME LOGIC ===================
  
  // ✅ AJOUTÉ : Fonction pour vérifier les paires de matching (DÉCLARÉE EN PREMIER)
  const checkMatchingPairs = useCallback(() => {
    if (currentGame?.type !== "matching") return false;
    
    const pairs = currentGame.pairs || [];
    const allPairsFound = pairs.every((pair, pairIndex) => {
      // ✅ CORRIGÉ : VRAIE logique de validation qui vérifie si les paires sont correctement appariées
      const selectedPairItems = selectedItems.filter(selected => 
        selected.item.originalPair === pairIndex
      );
      
      // Une paire est correcte si exactement 2 items sont sélectionnés ET qu'ils correspondent à la paire
      if (selectedPairItems.length !== 2) return false;
      
      const item1 = selectedPairItems[0].item;
      const item2 = selectedPairItems[1].item;
      
      // Vérifier que les deux éléments correspondent exactement à la paire (dans n'importe quel ordre)
      const isCorrectPair = (
        (item1.text === pair.word && item2.text === pair.match) ||
        (item1.text === pair.match && item2.text === pair.word)
      );
      
      return isCorrectPair;
    });
    
    return allPairsFound;
  }, [currentGame, selectedItems]);

  // ✅ AJOUTÉ : Fonction pour vérifier les réponses de catégorisation (DÉCLARÉE EN DEUXIÈME)
  const checkCategorizationAnswer = useCallback(() => {
    if (currentGame?.type !== "categorization") return false;
    
    const currentCategory = currentGame.currentCategory;
    const correctWords = currentGame.categories?.[currentCategory] || [];
    
    // Vérifier si tous les mots sélectionnés appartiennent à la catégorie
    const selectedWords = selectedItems.map(item => item.item);
    const allCorrect = selectedWords.every(word => correctWords.includes(word));
    const noIncorrect = selectedWords.length === selectedWords.filter(word => correctWords.includes(word)).length;
    
    return allCorrect && noIncorrect;
  }, [currentGame, selectedItems]);

  // ✅ AJOUTÉ : Fonction manquante pour gérer la sélection d'items
  const handleSelectItem = useCallback((item, index) => {
    if (showFeedback) return; // Ne pas permettre la sélection pendant le feedback
    
    setSelectedItems(prev => {
      const isAlreadySelected = prev.some(selected => 
        selected.item === item && selected.index === index
      );
      
      if (isAlreadySelected) {
        // Désélectionner l'item
        return prev.filter(selected => 
          !(selected.item === item && selected.index === index)
        );
      } else {
        // Sélectionner l'item
        return [...prev, { item, index }];
      }
    });
  }, [showFeedback]);

  // ✅ CORRIGÉ : Fonction pour vérifier les réponses avec feedback approprié (DÉCLARÉE EN DERNIER)
  const checkAnswer = useCallback(() => {
    if (showFeedback) return; // Ne pas permettre la vérification pendant le feedback
    
    if (currentGame?.type === "matching") {
      // Pour les jeux de matching, vérifier si toutes les paires sont trouvées
      const allPairsFound = checkMatchingPairs();
      setShowFeedback(true);
      setIsCorrect(allPairsFound);
      
      if (allPairsFound) {
        // Marquer le jeu comme complété seulement si c'est correct
        setCompletedGames(prev => ({
          ...prev,
          [currentGameIndex]: { completed: true }
        }));
      }
    } else if (currentGame?.type === "categorization") {
      // Pour les jeux de catégorisation, vérifier la sélection
      const isCorrect = checkCategorizationAnswer();
      setShowFeedback(true);
      setIsCorrect(isCorrect);
      if (isCorrect) {
        setCompletedGames(prev => ({
          ...prev,
          [currentGameIndex]: { completed: true }
        }));
      }
    }
  }, [currentGame, currentGameIndex, showFeedback, completedGames, checkMatchingPairs, checkCategorizationAnswer]);
  
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

    return {
      gameCounter,
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
    handleSelectItem,
    checkAnswer,
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