// src/screens/exercises/word-games/hooks/useWordGames.js - VERSION CORRIGÉE

import { useState, useEffect, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated } from 'react-native';
import { shuffleArray } from '../../../../utils/arrayUtils';

/**
 * 🎯 Hook unifié pour Word Games - VERSION CORRIGÉE
 * Problèmes résolus :
 * - Logique de sélection d'items cassée
 * - Gestion des paires pour matching games
 * - Calcul des scores incorrect
 * - Navigation défaillante
 */
const useWordGames = (wordGamesData = null, level = "A1") => {
  
  // =================== ERROR HANDLING HELPER ===================
  const handleStorageError = (error, operation, fallback = null) => {
    console.warn(`Word games storage error in ${operation}:`, error);
    return fallback;
  };

  // =================== STORAGE KEYS ===================
  const STORAGE_KEY = `wordGames_${level}_position`;
  const COMPLETED_KEY = `word_games_completed_${level}`;
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
  
  // ✅ AJOUTÉ : État pour l'info-bulle des paires incorrectes
  const [showPairFeedback, setShowPairFeedback] = useState(false);
  const [pairFeedbackMessage, setPairFeedbackMessage] = useState('');
  // ✅ SIMPLIFIÉ : Plus besoin de pairFeedbackType, seulement pour les erreurs
  
  // ✅ AJOUTÉ : État pour contrôler l'affichage du bouton "Vérifier"
  const [canShowCheckButton, setCanShowCheckButton] = useState(false);

  const isInitialized = useRef(false);

  // =================== COMPUTED VALUES ===================
  const games = wordGamesData?.games || [];
  const totalGames = games.length;
  const currentGame = games[currentGameIndex];

  // =================== ANIMATIONS ===================
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  // ✅ CORRIGÉ : Démarrer l'animation fadeAnim quand le composant se charge
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
            setCurrentGameIndex(position.currentGameIndex || 0);
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
        }
      } catch (error) {
        handleStorageError(error, 'loadData');
      } finally {
        setLoaded(true);
      }
    };
    loadData();
  }, [level]);

  // ✅ AJOUTÉ : Reset quand niveau change
  useEffect(() => {
    console.log(`🔄 DEBUG useWordGames - Level changed to: ${level}`);
    console.log(`   - Resetting completedGames and positions for new level`);
    
    // Reset de l'état au changement de niveau
    setCompletedGames({});
    setGameResults([]);
    setCurrentGameIndex(0);
    setLastPosition(null);
    setLoaded(false);
    isInitialized.current = false;
  }, [level]);

  // =================== GAME LOGIC ===================
  
  // ✅ EXTRACTED : Gestion de la sélection/désélection d'items
  const toggleItemSelection = useCallback((item, index, currentItems) => {
    const newItems = [...currentItems];
    const existingIndex = newItems.findIndex(selected => 
      selected.item.id === item.id && selected.index === index
    );
    
    if (existingIndex >= 0) {
      newItems.splice(existingIndex, 1);
    } else {
      newItems.push({ item, index });
    }
    
    return newItems;
  }, []);

  // ✅ EXTRACTED : Gestion des paires correctes
  const handleCorrectPair = useCallback((first, second) => {
    console.log('✅ Paire correcte trouvée !');
    
    const newMatchedItems = [...matchedItems, first, second];
    setMatchedItems(newMatchedItems);
    setSelectedItems([]);
    
    if (newMatchedItems.length > 0) {
      setCanShowCheckButton(true);
    }
  }, [matchedItems]);

  // ✅ EXTRACTED : Gestion des paires incorrectes
  const handleIncorrectPair = useCallback(() => {
    console.log('❌ Paire incorrecte !');
    
    setPairFeedbackMessage('❌ Paire incorrecte ! Essayez encore...');
    setShowPairFeedback(true);
    
    setTimeout(() => {
      setSelectedItems([]);
      setShowPairFeedback(false);
    }, 3000);
  }, []);

  // ✅ EXTRACTED : Logique de matching games
  const handleMatchingGame = useCallback((item, index) => {
    const newSelectedItems = toggleItemSelection(item, index, selectedItems);
    setSelectedItems(newSelectedItems);

    if (newSelectedItems.length === 2) {
      const [first, second] = newSelectedItems;
      
      if (first.item.originalPair === second.item.originalPair) {
        handleCorrectPair(first, second);
      } else {
        handleIncorrectPair();
      }
    }
  }, [selectedItems, toggleItemSelection, handleCorrectPair, handleIncorrectPair]);

  // ✅ EXTRACTED : Logique de categorization games
  const handleCategorizationGame = useCallback((item, index) => {
    const newSelectedItems = toggleItemSelection(item, index, selectedItems);
    setSelectedItems(newSelectedItems);
  }, [selectedItems, toggleItemSelection]);

  // ✅ REFACTORED : Fonction principale simplifiée
  const handleSelectItem = useCallback((item, index) => {
    if (showFeedback || !currentGame) return;

    console.log('🔍 DEBUG handleSelectItem:', { item, index, currentGameType: currentGame.type });

    if (currentGame.type === 'matching') {
      handleMatchingGame(item, index);
    } else if (currentGame.type === 'categorization') {
      handleCategorizationGame(item, index);
    }
  }, [showFeedback, currentGame, handleMatchingGame, handleCategorizationGame]);

  // ✅ AJOUTÉ : Helper pour sauvegarder la progression dans le bon format
  const saveCompletedGamesProgress = useCallback(async (newCompletedGames) => {
    try {
      // Sauvegarder dans le format attendu par calculateProgress.js
      const completedGamesData = {};
      Object.keys(newCompletedGames).forEach(gameIndex => {
        if (newCompletedGames[gameIndex]) {
          completedGamesData[gameIndex] = { completed: true };
        }
      });
      
      await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(completedGamesData));
    } catch (error) {
      handleStorageError(error, 'save completed games progress');
    }
  }, [COMPLETED_KEY]);

  // ✅ CORRIGÉ : Vérification des réponses pour categorization games
  const checkAnswer = useCallback(() => {
    if (!currentGame) return;

    if (currentGame.type === 'categorization') {
      // ✅ CORRIGÉ : Logique pour categorization games
      const correctWords = currentGame.categories[currentGame.currentCategory] || [];
      const selectedWords = selectedItems.map(item => item.item.text); // ✅ CORRIGÉ : item.item.text au lieu de item.item
      
      console.log('🔍 DEBUG Categorization:', {
        currentCategory: currentGame.currentCategory,
        correctWords,
        selectedWords,
        selectedItems: selectedItems.map(item => ({ id: item.item.id, text: item.item.text }))
      });
      
      // Vérifier si tous les mots sélectionnés sont corrects
      const allCorrect = selectedWords.every(word => correctWords.includes(word));
      const allIncorrect = selectedWords.every(word => !correctWords.includes(word));
      
      // Score basé sur la précision
      const correctCount = selectedWords.filter(word => correctWords.includes(word)).length;
      const incorrectCount = selectedWords.filter(word => !correctWords.includes(word)).length;
      const totalCorrect = correctWords.length;
      
      console.log('🔍 Score calculation:', {
        correctCount,
        incorrectCount,
        totalCorrect,
        allCorrect,
        allIncorrect
      });
      
      const score = Math.max(0, Math.round((correctCount - incorrectCount) / totalCorrect * currentGame.maxScore));
      
      setIsCorrect(allCorrect && incorrectCount === 0);
      setScore(score);
      setShowFeedback(true);
      
      if (allCorrect && incorrectCount === 0) {
        // ✅ Réponse CORRECTE - Marquer comme complété
        console.log('🎉 Categorization correcte !');
        
        // Sauvegarder le résultat
        const newGameResults = [...gameResults];
        newGameResults[currentGameIndex] = {
          score,
          maxScore: currentGame.maxScore,
          completed: true,
        };
        setGameResults(newGameResults);
        
        // Marquer le jeu comme complété
        const newCompletedGames = { ...completedGames, [currentGameIndex]: true };
        setCompletedGames(newCompletedGames);
        
        // ✅ AJOUTÉ : Sauvegarder immédiatement la progression
        // Sauvegarder la progression dans le bon format
        saveCompletedGamesProgress(newCompletedGames);
        
        // Sauvegarder aussi la position
        saveGameProgress();
        
      } else {
        // ❌ Réponse INCORRECTE - Redémarrer le jeu automatiquement
        console.log('❌ Categorization incorrecte ! Redémarrage du jeu...');
        
        // Reset du jeu après un délai
        setTimeout(() => {
          resetCurrentGame();
          setShowFeedback(false);
          setScore(0);
        }, 3000);
      }
    } else if (currentGame.type === 'matching') {
      // ✅ CORRIGÉ : Contrôle manuel final pour matching games
      console.log('🔍 Vérification manuelle des paires...');
      
      // Vérifier si toutes les paires sont trouvées
      const totalPairs = currentGame.pairs.length;
      const foundPairs = matchedItems.length / 2;
      
      if (foundPairs === totalPairs) {
        // ✅ Toutes les paires sont trouvées et correctes !
        console.log('🎉 Toutes les paires sont correctes !');
        setIsCorrect(true);
        setScore(currentGame.maxScore || 10);
      setShowFeedback(true);
        
        // Sauvegarder le résultat
        const newGameResults = [...gameResults];
        newGameResults[currentGameIndex] = {
          score: currentGame.maxScore || 10,
          maxScore: currentGame.maxScore || 10,
          completed: true,
        };
        setGameResults(newGameResults);
        
        // Marquer le jeu comme complété
        const newCompletedGames = { ...completedGames, [currentGameIndex]: true };
        setCompletedGames(newCompletedGames);
        
        // ✅ AJOUTÉ : Sauvegarder immédiatement la progression
        // Sauvegarder la progression dans le bon format
        saveCompletedGamesProgress(newCompletedGames);
        
        // Sauvegarder aussi la position
        saveGameProgress();
        
      } else {
        // ❌ Pas toutes les paires trouvées - Game over !
        console.log('❌ Game over ! Pas toutes les paires trouvées');
        setIsCorrect(false);
        setScore(0);
      setShowFeedback(true);
        
        // Reset du jeu après un délai
        setTimeout(() => {
          resetCurrentGame();
        }, 3000);
      }
    }
  }, [currentGame, selectedItems, matchedItems, gameResults, currentGameIndex, completedGames, saveCompletedGamesProgress]);

  // =================== NAVIGATION ===================
  
  const handleNext = useCallback(() => {
    if (showFeedback) {
      setShowFeedback(false);
      setSelectedItems([]);
      setMatchedItems([]);
      
      if (currentGameIndex < totalGames - 1) {
        const newGameIndex = currentGameIndex + 1;
        setCurrentGameIndex(newGameIndex);
        
        // ✅ AJOUTÉ : Sauvegarder la position après navigation
        // Sauvegarder la progression dans le bon format
        saveCompletedGamesProgress(completedGames);
      } else {
        setShowResults(true);
      }
    }
  }, [showFeedback, currentGameIndex, totalGames, completedGames, saveCompletedGamesProgress]);

  const handlePrevious = useCallback(() => {
    if (currentGameIndex > 0) {
      const newGameIndex = currentGameIndex - 1;
      setCurrentGameIndex(newGameIndex);
      setShowFeedback(false);
      setSelectedItems([]);
      setMatchedItems([]);
      
              // ✅ AJOUTÉ : Sauvegarder la position après navigation
        // Sauvegarder la progression dans le bon format
        saveCompletedGamesProgress(completedGames);
    }
  }, [currentGameIndex, completedGames, saveCompletedGamesProgress]);

  const resetGames = useCallback(() => {
      setCurrentGameIndex(0);
      setSelectedItems([]);
      setMatchedItems([]);
      setShowFeedback(false);
      setShowResults(false);
      setScore(0);
        setGameResults(Array(games.length).fill({
          score: 0,
          maxScore: 0,
          completed: false,
        }));
    setCompletedGames({});
  }, [games.length]);

  // =================== UTILITIES ===================
  
  const saveGameProgress = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentGameIndex,
        timestamp: Date.now(),
      }));
      
      await AsyncStorage.setItem(SCORES_KEY, JSON.stringify(gameResults));
    } catch (error) {
      handleStorageError(error, 'save game progress');
    }
  }, [currentGameIndex, gameResults, STORAGE_KEY, SCORES_KEY]);

  // ✅ CORRIGÉ : Préparer les options pour le jeu actuel
  useEffect(() => {
    if (!currentGame) return;

    if (currentGame.type === 'matching') {
      // ✅ CORRIGÉ : Créer les bonnes paires avec word et match
      const pairs = currentGame.pairs || [];
      const options = [];
      
      pairs.forEach((pair, pairIndex) => {
        // Ajouter le mot
        options.push({
          id: `word-${pairIndex}`,
          text: pair.word,
          type: 'word',
          originalPair: pairIndex,
          pairId: pairIndex,
        });
        
        // Ajouter la définition/match
        options.push({
          id: `match-${pairIndex}`,
          text: pair.match,
          type: 'match',
          originalPair: pairIndex,
          pairId: pairIndex,
        });
      });
      
      // Mélanger les options
      const shuffled = shuffleArray(options);
      setShuffledOptions(shuffled);
      
    } else if (currentGame.type === 'categorization') {
      // ✅ CORRIGÉ : Transformer les chaînes en objets pour categorization games
      const words = currentGame.words || [];
      const options = words.map((word, index) => ({
        id: `word-${index}`,
        text: word,
        type: 'word',
        originalPair: index,
        pairId: index,
      }));
      
      const shuffled = shuffleArray(options);
      setShuffledOptions(shuffled);
    }
    
    // Réinitialiser l'état du jeu
      setSelectedItems([]);
      setMatchedItems([]);
      setShowFeedback(false);
      setScore(0);
  }, [currentGame]);

  // ✅ AJOUTÉ : Reset du jeu actuel
  const resetCurrentGame = useCallback(() => {
    if (!currentGame) return;
    
    // Réinitialiser l'état du jeu actuel
    setSelectedItems([]);
    setMatchedItems([]);
    setShowFeedback(false);
    setScore(0);
    
    // Remélanger les options
    if (currentGame.type === 'matching') {
      const pairs = currentGame.pairs || [];
      const options = [];
      
      pairs.forEach((pair, pairIndex) => {
        options.push({
          id: `word-${pairIndex}`,
          text: pair.word,
          type: 'word',
          originalPair: pairIndex,
          pairId: pairIndex,
        });
        
        options.push({
          id: `match-${pairIndex}`,
          text: pair.match,
          type: 'match',
          originalPair: pairIndex,
          pairId: pairIndex,
        });
      });
      
      const shuffled = shuffleArray(options);
      setShuffledOptions(shuffled);
    } else if (currentGame.type === 'categorization') {
      // ✅ CORRIGÉ : Transformer les chaînes en objets pour categorization games
      const words = currentGame.words || [];
      const options = words.map((word, index) => ({
        id: `word-${index}`,
        text: word,
        type: 'word',
        originalPair: index,
        pairId: index,
      }));
      
      const shuffled = shuffleArray(options);
      setShuffledOptions(shuffled);
    }
  }, [currentGame]);

  // =================== RETURN VALUES ===================

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
    loaded,
    completedGames,
    lastPosition,
    
    // ✅ AJOUTÉ : États de feedback des paires
    showPairFeedback,
    pairFeedbackMessage,
    
    // ✅ AJOUTÉ : Contrôle du bouton de vérification
    canShowCheckButton,
    
    // Computed
    games,
    totalGames,
    currentGame,
    
    // Animations
    fadeAnim,
    bounceAnim,
    
    // Handlers
    handleSelectItem,
    checkAnswer,
    handleNext,
    handlePrevious,
    resetGames,
    
    // Utils
    saveGameProgress,
    resetCurrentGame,
  };
};

export default useWordGames;