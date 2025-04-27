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
import useWordGamesProgress from "./hooks/useWordGamesProgress"; // Nouveau hook de progression

// Utilitaires et helpers
import {
  getWordGamesData,
  getLevelColor,
} from "../../../utils/wordGames/wordGamesDataHelper";

// Styles
import styles from "./style";

/**
 * Composant principal pour les exercices de jeux de mots (Word Games)
 * Version améliorée avec gestion de la progression et sauvegarde de la dernière position
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
    timeLeft,
    timerActive,
    selectedItems,
    matchedItems,
    shuffledOptions,
    fadeAnim,
    bounceAnim,
    handleSelectItem,
    checkAnswer,
    handleNextGame,
    resetGames,
    handleTimeUp,
    setCurrentGameIndex,
  } = useWordGamesState(wordGamesData.games, level);

  // Utilisation du nouveau hook de progression pour le suivi des activités
  const { 
    completedGames,
    lastPosition,
    loaded: progressLoaded,
    saveLastPosition,
    markGameAsCompleted,
    initializeProgress
  } = useWordGamesProgress(level);

  // Initialiser la progression et restaurer la dernière position si disponible
  useEffect(() => {
    if (progressLoaded && wordGamesData && wordGamesData.games) {
      // Initialiser la progression avec les jeux disponibles
      initializeProgress(wordGamesData.games);
      
      // Si une position sauvegardée existe, restaurer à cette position
      if (lastPosition && typeof lastPosition.gameIndex === 'number') {
        // S'assurer que l'index est valide
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

  // Sauvegarder la position actuelle lorsque le jeu change
  useEffect(() => {
    if (progressLoaded && currentGameIndex !== undefined) {
      console.log('Saving position:', currentGameIndex);
      saveLastPosition(currentGameIndex);
    }
  }, [currentGameIndex, progressLoaded, saveLastPosition]);

  // Version améliorée de handleNextGame pour enregistrer la progression
  const handleGameAdvance = () => {
    // Marquer le jeu actuel comme complété si feedback est affiché (jeu terminé)
    if (showFeedback && currentGame) {
      const earnedScore = isCorrect ? (currentGame.maxScore || 10) : 0;
      const maxPossibleScore = currentGame.maxScore || 10;
      markGameAsCompleted(currentGameIndex, earnedScore, maxPossibleScore);
    }
    
    // Utiliser la fonction existante pour passer au jeu suivant
    handleNextGame();
  };

  // Gérer la réinitialisation complète des jeux
  const handleResetGames = () => {
    resetGames();
    saveLastPosition(0); // Réinitialiser la position sauvegardée
  };

  // Si aucun jeu n'est chargé, afficher un écran de chargement
  if (!currentGame) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading games...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Si aucun jeu n'est disponible pour ce niveau
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
            Aucun jeu de mots disponible pour le niveau {level}.
          </Text>
          <TouchableOpacity
            style={[styles.emptyGamesButton, { backgroundColor: levelColor }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.emptyGamesButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Affichage des résultats finaux
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
          onPlayAgain={handleResetGames} // Utiliser la version avec sauvegarde
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
        timeLeft={timeLeft}
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
        onNextGame={handleGameAdvance} // Utiliser la version améliorée
      />
    </SafeAreaView>
  );
};

export default WordGamesExercise;