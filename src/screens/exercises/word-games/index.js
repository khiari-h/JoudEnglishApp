// src/screens/exercises/wordGames/index.js
import React, { useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants spécifiques aux jeux de mots
import WordGamesHeader from "./WordGamesHeader";
import WordGamesProgressBar from "./WordGamesBarProgress";
import WordGamesCard from "./WordGamesCard";
import WordGamesActions from "./WordGameActions";
import WordGamesResults from "./WordGamesResults";

// Hooks personnalisés
import useWordGamesState from "./hooks/useWordGamesState";
import useWordGamesProgress from "./hooks/useWordGamesProgress";

// Utilitaires et helpers (version simplifiée)
import {
  getWordGamesData,
  getLevelColor,
} from "../../../utils/wordGames/wordGamesDataHelper.js";

// Styles
import styles from "./style";

/**
 * Composant principal pour les exercices de jeux de mots (Word Games)
 * Version simplifiée - Focus sur matching et categorization uniquement
 */
const WordGamesExercise = ({ route }) => {
  // Hooks de navigation
  const navigation = useNavigation();
  const { level = "A1" } = route.params || {};
  
  // Initialisation des données et couleurs
  const levelColor = getLevelColor(level);
  const wordGamesData = getWordGamesData(level);

  // Utilisation du hook personnalisé pour gérer l'état de l'exercice
  const {
    games,
    currentGameIndex,
    currentGame,
    showFeedback,
    isCorrect,
    showResults,
    score,
    gameResults,
    selectedItems,
    matchedItems,
    shuffledOptions,
    fadeAnim,
    bounceAnim,
    handleSelectItem,
    checkAnswer,
    handleNextGame,
    resetGames,
    setCurrentGameIndex,
  } = useWordGamesState(wordGamesData.games, level);

  // Hook de progression pour le suivi des activités
  const { 
    completedGames,
    lastPosition,
    loaded: progressLoaded,
    saveLastPosition,
    markGameAsCompleted,
    initializeProgress
  } = useWordGamesProgress(level);

  // Initialiser la progression et restaurer la dernière position
  useEffect(() => {
    if (progressLoaded && wordGamesData && wordGamesData.games) {
      initializeProgress(wordGamesData.games);
      
      if (lastPosition && typeof lastPosition.gameIndex === 'number') {
        const validIndex = Math.min(
          lastPosition.gameIndex, 
          wordGamesData.games.length - 1
        );
        if (validIndex >= 0) {
          setCurrentGameIndex(validIndex);
        }
      }
    }
  }, [progressLoaded, wordGamesData, initializeProgress, lastPosition, setCurrentGameIndex]);

  // Sauvegarder la position actuelle
  useEffect(() => {
    if (progressLoaded && currentGameIndex !== undefined) {
      saveLastPosition(currentGameIndex);
    }
  }, [currentGameIndex, progressLoaded, saveLastPosition]);

  // Gérer l'avancement avec sauvegarde de progression
  const handleGameAdvance = () => {
    if (showFeedback && currentGame) {
      const earnedScore = isCorrect ? (currentGame.maxScore || 10) : 0;
      const maxPossibleScore = currentGame.maxScore || 10;
      markGameAsCompleted(currentGameIndex, earnedScore, maxPossibleScore);
    }
    
    handleNextGame();
  };

  // Réinitialisation complète
  const handleResetGames = () => {
    resetGames();
    saveLastPosition(0);
  };

  // État de chargement
  if (!currentGame) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading games...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Aucun jeu disponible
  if (games.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <WordGamesHeader
          level={level}
          levelColor={levelColor}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.emptyGamesContainer}>
          <Text style={styles.emptyGamesText}>
            No word games available for level {level}.
          </Text>
          <TouchableOpacity
            style={[styles.emptyGamesButton, { backgroundColor: levelColor }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.emptyGamesButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Écran des résultats finaux
  if (showResults) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <WordGamesHeader
          level={level}
          levelColor={levelColor}
          onBackPress={() => navigation.goBack()}
        />
        <WordGamesResults
          games={games}
          gameResults={gameResults}
          score={score}
          levelColor={levelColor}
          onPlayAgain={handleResetGames}
          onExit={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  // Rendu principal
  return (
    <SafeAreaView style={styles.safeArea}>
      <WordGamesHeader
        level={level}
        levelColor={levelColor}
        onBackPress={() => navigation.goBack()}
      />

      <WordGamesProgressBar
        currentIndex={currentGameIndex}
        totalGames={games.length}
        showFeedback={showFeedback}
        levelColor={levelColor}
      />

      <WordGamesCard
        currentGame={currentGame}
        selectedItems={selectedItems}
        matchedItems={matchedItems}
        shuffledOptions={shuffledOptions}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        levelColor={levelColor}
        fadeAnim={fadeAnim}
        bounceAnim={bounceAnim}
        onSelectItem={handleSelectItem}
      />

      <WordGamesActions
        currentGame={currentGame}
        showFeedback={showFeedback}
        currentGameIndex={currentGameIndex}
        totalGames={games.length}
        levelColor={levelColor}
        onCheckAnswer={() => checkAnswer()}
        onNextGame={handleGameAdvance}
      />
    </SafeAreaView>
  );
};

export default WordGamesExercise;