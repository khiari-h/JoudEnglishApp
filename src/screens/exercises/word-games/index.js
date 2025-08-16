// src/screens/exercises/wordGames/index.js - VERSION CORRIGÉE
import { useMemo, useEffect, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import PropTypes from 'prop-types';

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
import useLastActivity from "../../../hooks/useLastActivity";
import { getWordGamesData, getLevelColor } from "../../../utils/wordGames/wordGamesDataHelper";
import createStyles from "./style";

/**
 * 🎯 WordGamesExercise - VERSION CORRIGÉE
 */
const WordGamesExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();

  // Data
  const levelColor = getLevelColor(level);
  const wordGamesData = useMemo(() => getWordGamesData(level), [level]);

  // Hook unifié
  const {
    currentGameIndex,
    selectedItems,
    matchedItems,
    showFeedback,
    isCorrect,
    showResults,
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

  // ✅ CORRECTION : Mémoriser les métadonnées
  const activityMetadata = useMemo(() => ({
    game: currentGameIndex,
    totalGames,
    gameType: currentGame?.type || "matching",
    gameTitle: currentGame?.title || `Jeu ${currentGameIndex + 1}`,
    score: stats?.score || 0
  }), [currentGameIndex, totalGames, currentGame?.type, currentGame?.title, stats?.score]);

  // ✅ CORRECTION : Callback mémorisé pour saveActivity
  const handleSaveActivity = useCallback(() => {
    if (loaded && games.length > 0 && currentGame && !showResults) {
      saveActivity({
        title: "Jeux de mots",
        level,
        type: "wordGames",
        metadata: activityMetadata
      });
    }
  }, [loaded, games.length, currentGame, showResults, level, saveActivity, activityMetadata]);

  // ✅ CORRECTION : useEffect optimisé
  useEffect(() => {
    handleSaveActivity();
  }, [handleSaveActivity]);

  // ✅ AJOUTÉ : Debug pour voir pourquoi le composant affiche un écran blanc
  console.log('🔍 DEBUG WordGamesExercise:', {
    loaded,
    currentGame: !!currentGame,
    gamesLength: games.length,
    currentGameIndex,
    totalGames,
    showResults,
    wordGamesData: !!wordGamesData
  });

  // Handlers
  const handleBackPress = useCallback(() => {
    router.push({
      pathname: "/tabs/exerciseSelection",
      params: { level }
    });
  }, [level]);

  const handleCheckAnswer = useCallback(() => checkAnswer(), [checkAnswer]);

  const handleNextGame = useCallback(() => {
    handleNext();
    // Navigation automatique quand tous les jeux sont terminés
  }, [handleNext]);

  const handlePreviousGame = useCallback(() => handlePrevious(), [handlePrevious]);

  const handleResetGames = useCallback(() => resetGames(), [resetGames]);

  const handleContinue = useCallback(() => navigation.goBack(), [navigation]);

  // Loading state
  if (!loaded || !currentGame) {
    console.log('🔍 DEBUG: Affichage loading state (loaded:', loaded, 'currentGame:', !!currentGame, ')');
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
          <ActivityIndicator testID="activity-indicator" size="large" color={levelColor} />
        </View>
      </Container>
    );
  }

  // Empty games state
  if (games.length === 0) {
    console.log('🔍 DEBUG: Affichage empty state (games.length:', games.length, ')');
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
          <ActivityIndicator testID="activity-indicator" size="large" color={levelColor} />
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

      {/* Progress */}
      <WordGamesProgress
        currentGame={display.currentGameIndex}
        totalGames={totalGames}
        completedGames={stats.completedGamesCount}
        levelColor={levelColor}
      />

      {/* Game Card */}
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

      {/* Navigation */}
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

// ✅ Ajout de la validation des props
WordGamesExercise.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      level: PropTypes.string,
    }),
  }).isRequired,
};