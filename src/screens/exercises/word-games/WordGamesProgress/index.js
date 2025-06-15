// WordGamesProgress/index.js - VERSION AVEC LOGS DEBUG

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import { calculateGameTypeProgress } from "../../../../utils/wordGames/wordGamesStats";
import { getWordGamesData } from "../../../../utils/wordGames/wordGamesDataHelper";

/**
 * 📊 WordGamesProgress - Version avec logs debug
 * ✅ Déjà bien structuré (expandable=false)
 * ✅ Juste ajout de logs pour diagnostiquer
 */
const WordGamesProgress = ({
  currentGame = 1,
  totalGames = 0,
  gameTitle = "",
  completedGames = 0,
  levelColor = "#3b82f6",
  gameResults = [],
  level = "A1",
}) => {
  
  // Calculer la progression globale
  const globalProgress = totalGames > 0 
    ? Math.round((completedGames / totalGames) * 100)
    : 0;

  // ✅ DÉTECTION des données pour debug
  const wordGamesData = getWordGamesData(level);

  console.log("🔍 WordGamesProgress Debug:", {
    currentGame,
    totalGames,
    completedGames,
    globalProgress,
    gameResultsLength: gameResults.length,
    hasWordGamesData: !!wordGamesData,
    wordGamesDataKeys: wordGamesData && typeof wordGamesData === 'object' ? Object.keys(wordGamesData) : "not object or null",
    gameTitle
  });

  return (
    <ProgressCard
      title="Progression" // ✅ Titre uniforme
      subtitle={`${gameTitle} • Jeu ${currentGame}/${totalGames}`}
      progress={globalProgress}
      completed={completedGames}
      total={totalGames}
      unit="jeux"
      levelColor={levelColor}
      expandable={false} // ✅ DÉSACTIVÉ pour Word Games - logique séquentielle
      expanded={false}
      onToggleExpand={undefined}
      categoryData={[]} // ✅ Pas de données d'expansion
      onCategoryPress={undefined}
    />
  );
};

export default WordGamesProgress;