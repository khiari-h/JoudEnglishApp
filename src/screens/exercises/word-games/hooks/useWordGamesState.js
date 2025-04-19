// src/screens/exercises/wordGames/hooks/useWordGamesState.js
import { useState, useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';
import useGameTimer from './useGameTimer';
import useGameAnimation from './useGameAnimation';

/**
 * Hook personnalisé pour gérer l'état des jeux de mots
 * 
 * @param {Array} initialGames - Liste des jeux disponibles
 * @param {string} level - Niveau de langue (A1, A2, etc.)
 */
const useWordGamesState = (initialGames = [], level) => {
  // États pour gérer les jeux
  const [games, setGames] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [gameResults, setGameResults] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  
  // Hooks pour le timer et les animations
  const { timeLeft, timerActive, startTimer, stopTimer, resetTimer } = useGameTimer();
  const { fadeAnim, bounceAnim, animateFeedback, animateBounce } = useGameAnimation();

  // Jeu actuel
  const currentGame = games[currentGameIndex] || null;

  // Initialiser les jeux et les résultats
  useEffect(() => {
    if (initialGames && initialGames.length > 0) {
      setGames(initialGames);
      initializeGameResults(initialGames.length);
    }
  }, [initialGames]);

  // Initialiser les résultats des jeux
  const initializeGameResults = (length) => {
    setGameResults(
      Array(length).fill({ score: 0, maxScore: 0, completed: false })
    );
  };

  // Configurer le jeu actuel
  useEffect(() => {
    if (games.length > 0 && currentGameIndex < games.length) {
      const game = games[currentGameIndex];

      // Réinitialiser les états pour le jeu actuel
      setSelectedItems([]);
      setMatchedItems([]);
      setShowFeedback(false);
      setIsCorrect(false);

      // Configurer le timer si nécessaire
      if (game.timeLimit) {
        resetTimer(game.timeLimit);
        startTimer();
      } else {
        resetTimer(0);
        stopTimer();
      }

      // Mélanger les options si nécessaire
      if (
        game.type === "anagram" ||
        game.type === "matching" ||
        game.type === "categorization"
      ) {
        shuffleGameOptions(game);
      }
    }
  }, [games, currentGameIndex]);

  // Gérer le temps écoulé
  useEffect(() => {
    if (timerActive && timeLeft === 0) {
      handleTimeUp();
    }
  }, [timerActive, timeLeft]);

  // Mélanger les options du jeu
  const shuffleGameOptions = (game) => {
    let optionsToShuffle = [];

    if (game.type === "anagram") {
      // Pour les anagrammes, mélanger les lettres
      optionsToShuffle = game.word.split("").sort(() => Math.random() - 0.5);
    } else if (game.type === "matching") {
      // Pour le matching, mélanger les paires
      const allItems = [
        ...game.pairs.flatMap((pair) => [pair.word, pair.match]),
      ];
      optionsToShuffle = allItems.sort(() => Math.random() - 0.5);
    } else if (game.type === "categorization") {
      // Pour la catégorisation, mélanger les mots à classer
      optionsToShuffle = game.words.sort(() => Math.random() - 0.5);
    }

    setShuffledOptions(optionsToShuffle);
  };

  // Gérer la sélection d'un item
  const handleSelectItem = useCallback((item, index) => {
    if (showFeedback) return;

    // Animation de rebond au clic
    animateBounce();

    let newSelectedItems = [...selectedItems];

    if (currentGame.type === "anagram") {
      // Pour les anagrammes, ajouter/supprimer les lettres
      const itemIndex = newSelectedItems.findIndex((i) => i.index === index);

      if (itemIndex !== -1) {
        // Si déjà sélectionné, le retirer
        newSelectedItems.splice(itemIndex, 1);
      } else {
        // Sinon l'ajouter
        newSelectedItems.push({ value: item, index });
      }
    } else if (currentGame.type === "matching") {
      // Pour le matching, sélectionner deux items à la fois
      if (newSelectedItems.length < 2) {
        newSelectedItems.push({ value: item, index });

        // Si deux items sont sélectionnés, vérifier s'ils forment une paire
        if (newSelectedItems.length === 2) {
          checkMatchingPair(newSelectedItems);
          return;
        }
      }
    } else if (currentGame.type === "categorization") {
      // Pour la catégorisation, toggle la sélection
      const itemIndex = newSelectedItems.findIndex((i) => i.value === item);

      if (itemIndex !== -1) {
        newSelectedItems.splice(itemIndex, 1);
      } else {
        newSelectedItems.push({ value: item, index });
      }
    } else if (currentGame.type === "word_search") {
      // Pour la recherche de mots, sélectionner des lettres consécutives
      const itemIndex = newSelectedItems.findIndex((i) => i.index === index);

      if (itemIndex !== -1) {
        // Si déjà sélectionné, retirer tous les suivants
        newSelectedItems = newSelectedItems.slice(0, itemIndex);
      } else if (
        newSelectedItems.length === 0 ||
        isAdjacent(
          newSelectedItems[newSelectedItems.length - 1].index,
          index,
          currentGame.grid[0].length
        )
      ) {
        // Ajouter si adjacent au dernier sélectionné ou si c'est le premier
        newSelectedItems.push({ value: item, index });
      }

      // Vérifier si un mot est formé
      const selectedWord = newSelectedItems.map((item) => item.value).join("");
      if (currentGame.words.includes(selectedWord.toLowerCase())) {
        handleWordFound(selectedWord.toLowerCase());
        return;
      }
    }

    setSelectedItems(newSelectedItems);
  }, [currentGame, selectedItems, showFeedback]);

  // Vérifier si deux indices sont adjacents dans une grille
  const isAdjacent = (index1, index2, gridWidth) => {
    const row1 = Math.floor(index1 / gridWidth);
    const col1 = index1 % gridWidth;
    const row2 = Math.floor(index2 / gridWidth);
    const col2 = index2 % gridWidth;

    return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
  };

  // Gérer un mot trouvé dans la recherche de mots
  const handleWordFound = (word) => {
    // Animation pour un mot trouvé
    animateFeedback();

    // Ajouter aux mots trouvés
    setMatchedItems((prev) => [...prev, word]);
    
    // Réinitialiser la sélection
    setSelectedItems([]);

    // Mettre à jour le score
    const maxPossibleScore = currentGame.maxScore || 10;
    const earnedScore = Math.floor(maxPossibleScore / currentGame.words.length);
    setScore((prev) => prev + earnedScore);

    // Vérifier si tous les mots sont trouvés
    if (matchedItems.length + 1 === currentGame.words.length) {
      handleGameComplete(true);
    }
  };

  // Vérifier une paire dans le jeu de matching
  const checkMatchingPair = (items) => {
    const isPair = currentGame.pairs.some(
      (pair) =>
        (items[0].value === pair.word && items[1].value === pair.match) ||
        (items[0].value === pair.match && items[1].value === pair.word)
    );

    if (isPair) {
      // Animation pour une paire correcte
      animateFeedback();

      // Marquer la paire comme trouvée
      setMatchedItems((prev) => [...prev, items[0].value, items[1].value]);

      // Réinitialiser la sélection
      setTimeout(() => {
        setSelectedItems([]);

        // Si toutes les paires sont trouvées
        if (matchedItems.length + 2 === currentGame.pairs.length * 2) {
          handleGameComplete(true);
        }
      }, 500);
    } else {
      // Animation pour une paire incorrecte
      animateFeedback(false);

      // Réinitialiser la sélection après un court délai
      setTimeout(() => {
        setSelectedItems([]);
      }, 1000);
    }
  };

  // Vérifier la réponse
  const checkAnswer = useCallback((isTimeUp = false) => {
    if (showFeedback) return;

    let correct = false;
    let earnedScore = 0;
    const maxPossibleScore = currentGame.maxScore || 10;

    if (currentGame.type === "anagram") {
      // Pour les anagrammes, vérifier si le mot formé est correct
      const userWord = selectedItems.map((item) => item.value).join("");
      correct = userWord.toLowerCase() === currentGame.word.toLowerCase();
      earnedScore = correct ? maxPossibleScore : 0;
    } else if (currentGame.type === "categorization") {
      // Pour la catégorisation, vérifier si les mots sont dans la bonne catégorie
      const selectedWords = selectedItems.map((item) => item.value);
      const expectedWords = currentGame.categories[currentGame.currentCategory];

      // Vérifier que tous les mots sélectionnés sont dans la catégorie
      // et que tous les mots de la catégorie sont sélectionnés
      correct =
        selectedWords.every((word) => expectedWords.includes(word)) &&
        expectedWords.every((word) => selectedWords.includes(word));

      earnedScore = correct ? maxPossibleScore : 0;
    }

    // Mettre à jour le score
    if (earnedScore > 0) {
      setScore((prevScore) => prevScore + earnedScore);
    }

    // Mettre à jour les résultats
    updateGameResults(earnedScore, maxPossibleScore);

    // Montrer le feedback
    setIsCorrect(correct);
    setShowFeedback(true);

    // Animation pour le feedback
    animateFeedback(correct);

    // Arrêter le timer
    stopTimer();
  }, [currentGame, selectedItems, showFeedback]);

  // Arrêter le timer si le temps est écoulé
  const handleTimeUp = useCallback(() => {
    stopTimer();
    checkAnswer(true);
  }, [checkAnswer]);

  // Mettre à jour les résultats d'un jeu
  const updateGameResults = (score, maxScore) => {
    const newGameResults = [...gameResults];
    newGameResults[currentGameIndex] = {
      score,
      maxScore,
      completed: true,
    };
    setGameResults(newGameResults);
  };

  // Gérer la fin d'un jeu
  const handleGameComplete = useCallback((isSuccessful) => {
    stopTimer();

    const earnedScore = isSuccessful ? currentGame.maxScore || 10 : 0;
    const maxPossibleScore = currentGame.maxScore || 10;

    // Mettre à jour le score
    if (earnedScore > 0) {
      setScore((prevScore) => prevScore + earnedScore);
    }

    // Mettre à jour les résultats
    updateGameResults(earnedScore, maxPossibleScore);

    // Montrer le feedback
    setIsCorrect(isSuccessful);
    setShowFeedback(true);
  }, [currentGame]);

  // Passer au jeu suivant
  const handleNextGame = useCallback(() => {
    if (currentGameIndex < games.length - 1) {
      setCurrentGameIndex(currentGameIndex + 1);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      setShowResults(true);
    }
  }, [currentGameIndex, games.length]);

  // Réinitialiser tous les jeux
  const resetGames = useCallback(() => {
    setCurrentGameIndex(0);
    setSelectedItems([]);
    setMatchedItems([]);
    setShowFeedback(false);
    setIsCorrect(false);
    setShowResults(false);
    setScore(0);
    initializeGameResults(games.length);

    // Si le jeu actuel a un timer, le réinitialiser
    if (games[0] && games[0].timeLimit) {
      resetTimer(games[0].timeLimit);
      startTimer();
    }

    // Mélanger les options du premier jeu si nécessaire
    if (games[0]) {
      shuffleGameOptions(games[0]);
    }
  }, [games]);

  return {
    games,
    currentGameIndex,
    currentGame,
    selectedItems,
    matchedItems,
    showFeedback,
    isCorrect,
    showResults,
    score,
    gameResults,
    timeLeft,
    timerActive,
    shuffledOptions,
    fadeAnim,
    bounceAnim,
    handleSelectItem,
    checkAnswer,
    handleNextGame,
    resetGames,
    handleTimeUp
  };
};

export default useWordGamesState;