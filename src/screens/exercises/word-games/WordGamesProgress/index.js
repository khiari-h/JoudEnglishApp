// WordGamesProgress/index.js - VERSION CORRIGÉE AVEC useMemo

import ProgressCard from "../../../../components/ui/ProgressCard";
import { useMemo } from 'react';

/**
 * 📊 WordGamesProgress - Version corrigée avec mémorisation
 * ✅ Évite les boucles infinies avec useMemo
 * ✅ Performance optimisée
 */
const WordGamesProgress = ({
  currentGame = 1,
  totalGames = 0,
  gameTitle = "",
  completedGames = 0,
  levelColor = "#3b82f6",
  // gameResults = [], // supprimé car inutilisé
  // level = "A1", // supprimé car inutilisé
}) => {
  
  // ✅ MÉMORISER le calcul de progression globale
  const globalProgress = useMemo(() => {
    return totalGames > 0 
      ? Math.round((completedGames / totalGames) * 100)
      : 0;
  }, [completedGames, totalGames]);

  // ✅ MÉMORISER les données Word Games
  // const wordGamesData = useMemo(() => {
  //   return getWordGamesData(level);
  // }, [level]);

  // ✅ MÉMORISER les données de debug (seulement en dev)
  // const debugData = useMemo(() => {
  //   if (process.env.NODE_ENV !== 'development') return null;
  //   
  //   return {
  //     currentGame,
  //     totalGames,
  //     completedGames,
  //     globalProgress,
  //     gameResultsLength: gameResults.length,
  //     hasWordGamesData: !!wordGamesData,
  //     wordGamesDataKeys: wordGamesData && typeof wordGamesData === 'object' ? Object.keys(wordGamesData) : "not object or null",
  //     gameTitle
  //   };
  // }, [currentGame, totalGames, completedGames, globalProgress, gameResults.length, wordGamesData, gameTitle]);

  // ✅ CORRECTION FINALE : Pas de log dans le render !

  return (
    <ProgressCard
      title="Progression"
      subtitle={`${gameTitle} • Jeu ${currentGame}/${totalGames}`}
      progress={globalProgress}
      completed={completedGames}
      total={totalGames}
      unit="jeux"
      levelColor={levelColor}
      expandable={false}
      expanded={false}
      onToggleExpand={undefined}
      categoryData={[]}
      onCategoryPress={undefined}
    />
  );
};

export default WordGamesProgress;