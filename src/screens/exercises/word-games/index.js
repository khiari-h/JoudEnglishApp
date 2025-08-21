// src/screens/exercises/word-games/index.js - VERSION CORRIGÉE AVEC ProgressCard

import { useMemo, useEffect, useCallback, useState } from "react";
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
import useExerciseBackground from "../../../hooks/useExerciseBackground";
import { getWordGamesData, getLevelColor } from "../../../utils/wordGames/wordGamesDataHelper";
import createStyles from "./style";

/**
 * 🎯 WordGamesExercise - VERSION CORRIGÉE AVEC ProgressCard
 */
const WordGamesExercise = ({ route }) => {
  const navigation = useNavigation();
  const { level = "A1" } = route?.params || {};
  const styles = createStyles();

  // ✅ AJOUTÉ : État pour l'expansion de la barre de progression
  const [progressExpanded, setProgressExpanded] = useState(false);

  // Hook pour sauvegarder l'activité
  const { saveActivity } = useLastActivity();

  // Data
  const levelColor = getLevelColor(level);
  const wordGamesData = useMemo(() => getWordGamesData(level), [level]);
  
  // 🎨 BACKGROUND DYNAMIQUE : Utilise le hook pour un fond coloré
  const { gradientColors } = useExerciseBackground("word-games", levelColor);

  // Hook unifié
  const {
    // State
    currentGameIndex,
    currentGame,
    selectedItems,
    matchedItems,
    showFeedback,
    isCorrect,
    showResults,
    score,
    showPairFeedback,
    pairFeedbackMessage,
    canShowCheckButton,
    loaded,
    
    // Data
    games,
    totalGames,
    completedGames,
    gameResults,
    shuffledOptions,
    
    // Actions
    handleSelectItem,
    checkAnswer,
    handleNext,
    handlePrevious,
    resetGames,
    
    // Animations
    fadeAnim,
    bounceAnim,
  } = useWordGames(wordGamesData, level);

  // ✅ CORRIGÉ : Calculer les valeurs manquantes
  const canGoToPrevious = currentGameIndex > 0;
  const isLastGame = currentGameIndex === totalGames - 1;
  
  const stats = {
    score: gameResults.reduce((sum, result) => sum + (result?.score || 0), 0),
    totalMaxScore: gameResults.reduce((sum, result) => sum + (result?.maxScore || 0), 0),
    completedGamesCount: Object.keys(completedGames).length,
    percentage: totalGames > 0 ? Math.round((Object.keys(completedGames).length / totalGames) * 100) : 0,
  };

  const display = {
    currentGameIndex: currentGameIndex + 1,
    totalGames,
  };

  // ✅ CORRIGÉ : Mémoriser les métadonnées compatibles avec le dashboard
  const activityMetadata = useMemo(() => ({
    word: currentGameIndex,        // ✅ Position actuelle (0-based)
    totalWords: totalGames,        // ✅ Total des jeux
    gameType: currentGame?.type || "matching",
    gameTitle: currentGame?.title || `Jeu ${currentGameIndex + 1}`,
    score: stats?.score || 0,
    // ✅ AJOUTÉ : Indicateur que c'est un jeu, pas un mot
    isGame: true,
    // ✅ AJOUTÉ : Nombre de jeux complétés
    completedGames: Object.keys(completedGames).length
  }), [currentGameIndex, totalGames, currentGame?.type, currentGame?.title, stats?.score, completedGames]);

  // ✅ CORRIGÉ : Callback mémorisé pour saveActivity
  const handleSaveActivity = useCallback(() => {
    if (loaded && games.length > 0 && currentGame && !showResults) {
      saveActivity({
        title: `Jeux de mots - ${currentGame.type === 'matching' ? 'Association' : 'Catégorisation'}`, // ✅ CORRIGÉ : Titre plus descriptif
        level,
        type: "wordGames",
        metadata: activityMetadata
      });
    }
  }, [loaded, games.length, currentGame, showResults, level, saveActivity, activityMetadata]);

  // ✅ CORRIGÉ : useEffect optimisé
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

  // ✅ CORRIGÉ : Navigation de retour
  const handleBackPress = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.back();
    }
  }, [navigation]);

  // ✅ CORRIGÉ : Gestion de la continuation
  const handleContinue = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.back();
    }
  }, [navigation]);

  // Loading state
  if (!loaded || !wordGamesData || games.length === 0) {
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
        gradientColors={gradientColors} // 🎨 BACKGROUND DYNAMIQUE
        statusBarStyle="dark-content"
      >
        <WordGamesResults
          games={games}
          gameResults={gameResults}
          finalScore={stats}
          levelColor={levelColor}
          onPlayAgain={resetGames}
          onContinue={handleContinue}
        />
      </Container>
    );
  }

  return (
    <Container
      safeArea
      safeAreaEdges={CONTAINER_SAFE_EDGES.ALL}
      gradientColors={gradientColors} // 🎨 BACKGROUND DYNAMIQUE
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
        completedGames={completedGames}
        levelColor={levelColor}
        expanded={progressExpanded}
        onToggleExpand={() => setProgressExpanded(!progressExpanded)}
        onGameTypePress={(index) => {
          // ✅ AJOUTÉ : Gestion du clic sur un type de jeu
          console.log('Game type clicked:', index);
        }}
        // ✅ AJOUTÉ : Données des jeux pour calculer la progression par type
        games={games}
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
        showPairFeedback={showPairFeedback}
        pairFeedbackMessage={pairFeedbackMessage}
      />

      {/* Navigation */}
      <WordGamesNavigation
        currentGame={currentGame}
        showFeedback={showFeedback}
        selectedItems={selectedItems}
        isLastGame={isLastGame}
        canGoPrevious={canGoToPrevious}
        levelColor={levelColor}
        onCheckAnswer={checkAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canShowCheckButton={canShowCheckButton}
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