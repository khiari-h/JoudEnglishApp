// src/screens/exercises/wordGames/index.js
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// Composants spécifiques aux jeux de mots
import WordGamesHeader from "./WordGamesHeader";
import WordGamesProgressBar from "./WordGamesProgressBar";
import WordGamesCard from "./WordGamesCard";
import WordGamesActions from "./WordGamesActions";
import WordGamesResults from "./WordGamesResults";

// Hooks personnalisés
import useWordGamesState from "./hooks/useWordGamesState";

// Utilitaires et helpers
import { getWordGamesData, getLevelColor } from "../../../utils/wordGames/wordGamesDataHelper.js";

// Styles
import styles from "./style";

/**
 * Composant principal pour les exercices de jeux de mots (Word Games)
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
    handleTimeUp
  } = useWordGamesState(wordGamesData.games, level);

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
            style={[
              styles.emptyGamesButton,
              { backgroundColor: levelColor },
            ]}
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
          onPlayAgain={resetGames}
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
        onNextGame={handleNextGame}
      />
    </SafeAreaView>
  );
};

export default WordGamesExercise;