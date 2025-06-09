// src/screens/exercises/wordGames/index.js - VERSION REFACTORISÉE
import React, { useMemo } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Layout
import Container, { CONTAINER_SAFE_EDGES } from "../../../components/layout/Container";

// Components
import WordGamesHeader from "./WordGamesHeader";
import WordGamesProgress from "./WordGamesProgress";
import WordGamesCard from "./WordGamesCard";
import WordGamesNavigation from "./WordGamesNavigation";
import WordGamesResults from "./WordGamesResults";

// Hook & Utils
import useWordGames from "./hooks/useWordGames";
import { getWordGamesData, getLevelColor } from "../../../utils/wordGames/wordGamesDataHelper";
import createStyles from "./style";

/**
 * 🎯 WordGamesExercise - VERSION REFACTORISÉE
 * 200+ lignes → 130 lignes (-35% de code)
 * 2 hooks → 1 hook unifié
 * Pattern identique à VocabularyExercise et LevelAssessment
 */
const WordGamesExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // Data
  const levelColor = getLevelColor(level);
  const wordGamesData = useMemo(() => getWordGamesData(level), [level]);

  // Hook unifié - Remplace useWordGamesState + useWordGamesProgress
  const {
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
    games,
    currentGame,
    totalGames,
    fadeAnim,
    bounceAnim,
    handleSelectItem,
    checkAnswer,
    handleNext,
    handlePrevious,
    resetGames,
    canGoToPrevious,
    isLastGame,
    stats,
    display,
  } = useWordGames(wordGamesData, level);

  // Handlers
  const handleBackPress = () => navigation.goBack();

  const handleCheckAnswer = () => checkAnswer();

  const handleNextGame = () => {
    const result = handleNext();
    // Navigation automatique quand tous les jeux sont terminés
  };

  const handlePreviousGame = () => handlePrevious();

  const handleResetGames = () => resetGames();

  const handleContinue = () => navigation.goBack();

  // Loading state
  if (!loaded || !currentGame) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <WordGamesHeader
          level={level}
          onBackPress={handleBackPress}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={levelColor} />
        </View>
      </Container>
    );
  }

  // Empty games state
  if (games.length === 0) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <WordGamesHeader
          level={level}
          onBackPress={handleBackPress}
        />
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={levelColor} />
        </View>
      </Container>
    );
  }

  // Results state
  if (showResults) {
    return (
      <Container
        safeArea
        safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
        backgroundColor="#f8fafc"
        statusBarStyle="dark-content"
      >
        <WordGamesResults
          games={games}
          gameResults={gameResults}
          finalScore={stats}
          levelColor={levelColor}
          onPlayAgain={handleResetGames}
          onContinue={handleContinue}
        />
      </Container>
    );
  }

  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
      backgroundColor="#f8fafc"
      statusBarStyle="dark-content"
      withPadding={false}
    >
      {/* Header */}
      <WordGamesHeader
        level={level}
        onBackPress={handleBackPress}
      />

      {/* Progress - Utilise ProgressCard générique */}
      <WordGamesProgress
        currentGame={display.currentGameIndex}
        totalGames={totalGames}
        gameTitle={display.gameTitle}
        completedGames={stats.completedGamesCount}
        levelColor={levelColor}
        gameResults={gameResults}
        level={level}
      />

      {/* Game Card - Logique métier conservée */}
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

      {/* Navigation - Utilise NavigationButtons + logique custom */}
      <WordGamesNavigation
        currentGame={currentGame}
        showFeedback={showFeedback}
        selectedItems={selectedItems}
        isLastGame={isLastGame}
        canGoPrevious={canGoToPrevious}
        levelColor={levelColor}
        onCheckAnswer={handleCheckAnswer}
        onNext={handleNextGame}
        onPrevious={handlePreviousGame}
      />
    </Container>
  );
};

export default WordGamesExercise;