// src/screens/exercises/wordGames/hooks/useWordGamesState.js
import { useState, useEffect, useCallback } from 'react';
import useGameAnimation from './useGameAnimation';

/**
 * Hook personnalisé pour gérer l'état des jeux de mots
 * Version simplifiée - Matching et Categorization uniquement
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
  
  // Hook pour les animations
  const { fadeAnim, bounceAnim, animateFeedback, animateBounce } = useGameAnimation();

  // Jeu actuel
  const currentGame = games[currentGameIndex] || null;

  // Initialiser les jeux et les résultats
  useEffect(() => {
    if (initialGames && initialGames.length > 0) {
      setGames(initialGames);
      setGameResults(
        Array(initialGames.length).fill({ score: 0, maxScore: 0, completed: false })
      );
    }
  }, [initialGames]);

  // Configurer le jeu actuel
  useEffect(() => {
    if (games.length > 0 && currentGameIndex < games.length) {
      const game = games[currentGameIndex];

      // Réinitialiser les états pour le jeu actuel
      setSelectedItems([]);
      setMatchedItems([]);
      setShowFeedback(false);
      setIsCorrect(false);

      // Mélanger les options selon le type de jeu
      shuffleGameOptions(game);
    }
  }, [games, currentGameIndex]);

  // Mélanger les options du jeu
  const shuffleGameOptions = (game) => {
    let optionsToShuffle = [];

    if (game.type === "matching") {
      // Pour le matching, mélanger toutes les options (words + matches)
      const allItems = game.pairs.flatMap((pair) => [pair.word, pair.match]);
      optionsToShuffle = allItems.sort(() => Math.random() - 0.5);
    } else if (game.type === "categorization") {
      // Pour la catégorisation, mélanger les mots à classer
      optionsToShuffle = [...game.words].sort(() => Math.random() - 0.5);
    }

    setShuffledOptions(optionsToShuffle);
  };

  // Gérer la sélection d'un item
  const handleSelectItem = useCallback((item, index) => {
    if (showFeedback) return;

    // Animation de rebond au clic
    animateBounce();

    if (currentGame.type === "matching") {
      handleMatchingSelection(item, index);
    } else if (currentGame.type === "categorization") {
      handleCategorizationSelection(item, index);
    }
  }, [currentGame, selectedItems, matchedItems, showFeedback]);

  // Gérer la sélection pour les jeux de matching
  const handleMatchingSelection = (item, index) => {
    let newSelectedItems = [...selectedItems];

    // Pour le matching, maximum 2 items sélectionnés
    if (newSelectedItems.length < 2) {
      // Vérifier que l'item n'est pas déjà matché
      if (matchedItems.includes(item)) return;
      
      newSelectedItems.push({ value: item, index });
      setSelectedItems(newSelectedItems);

      // Si deux items sont sélectionnés, vérifier s'ils forment une paire
      if (newSelectedItems.length === 2) {
        setTimeout(() => checkMatchingPair(newSelectedItems), 300);
      }
    }
  };

  // Gérer la sélection pour les jeux de catégorisation
  const handleCategorizationSelection = (item, index) => {
    let newSelectedItems = [...selectedItems];
    const itemIndex = newSelectedItems.findIndex((i) => i.value === item);

    if (itemIndex !== -1) {
      // Si déjà sélectionné, le retirer
      newSelectedItems.splice(itemIndex, 1);
    } else {
      // Sinon l'ajouter
      newSelectedItems.push({ value: item, index });
    }

    setSelectedItems(newSelectedItems);
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
      animateFeedback(true);

      // Marquer la paire comme trouvée
      const newMatchedItems = [...matchedItems, items[0].value, items[1].value];
      setMatchedItems(newMatchedItems);

      // Calculer et ajouter le score
      const maxPossibleScore = currentGame.maxScore || 10;
      const scorePerPair = Math.floor(maxPossibleScore / currentGame.pairs.length);
      setScore((prev) => prev + scorePerPair);

      // Réinitialiser la sélection
      setSelectedItems([]);

      // Vérifier si toutes les paires sont trouvées
      if (newMatchedItems.length === currentGame.pairs.length * 2) {
        setTimeout(() => handleGameComplete(true), 500);
      }
    } else {
      // Animation pour une paire incorrecte
      animateFeedback(false);

      // Réinitialiser la sélection après un délai
      setTimeout(() => {
        setSelectedItems([]);
      }, 1000);
    }
  };

  // Vérifier la réponse pour categorization
  const checkAnswer = useCallback(() => {
    if (showFeedback || currentGame.type !== "categorization") return;

    const selectedWords = selectedItems.map((item) => item.value);
    const expectedWords = currentGame.categories[currentGame.currentCategory];

    // Vérifier que tous les mots sélectionnés sont dans la catégorie
    // et que tous les mots de la catégorie sont sélectionnés
    const correct =
      selectedWords.length === expectedWords.length &&
      selectedWords.every((word) => expectedWords.includes(word)) &&
      expectedWords.every((word) => selectedWords.includes(word));

    const maxPossibleScore = currentGame.maxScore || 10;
    const earnedScore = correct ? maxPossibleScore : 0;

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
  }, [currentGame, selectedItems, showFeedback]);

  // Gérer la fin d'un jeu (pour matching auto-complete)
  const handleGameComplete = useCallback((isSuccessful) => {
    const earnedScore = isSuccessful ? currentGame.maxScore || 10 : 0;
    const maxPossibleScore = currentGame.maxScore || 10;

    // Mettre à jour les résultats
    updateGameResults(earnedScore, maxPossibleScore);

    // Montrer le feedback
    setIsCorrect(isSuccessful);
    setShowFeedback(true);

    // Animation pour le feedback
    animateFeedback(isSuccessful);
  }, [currentGame]);

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
    setGameResults(
      Array(games.length).fill({ score: 0, maxScore: 0, completed: false })
    );

    // Mélanger les options du premier jeu
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
    shuffledOptions,
    fadeAnim,
    bounceAnim,
    handleSelectItem,
    checkAnswer,
    handleNextGame,
    resetGames,
    setCurrentGameIndex,
  };
};

export default useWordGamesState;