// WordGamesProgress/index.js - VERSION CORRIGÉE AVEC useMemo

import ProgressCard from "../../../../components/ui/ProgressCard";
import { useMemo } from 'react';
import PropTypes from 'prop-types';

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
}) => {
  
  // ✅ MÉMORISER le calcul de progression globale
  const globalProgress = useMemo(() => {
    return totalGames > 0 
      ? Math.round((completedGames / totalGames) * 100)
      : 0;
  }, [completedGames, totalGames]);

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

// ✅ Définition de PropTypes pour la validation des props
WordGamesProgress.propTypes = {
  // 'currentGame' est manquant dans la validation
  currentGame: PropTypes.number,
  // 'totalGames' est manquant dans la validation
  totalGames: PropTypes.number,
  // 'gameTitle' est manquant dans la validation
  gameTitle: PropTypes.string,
  // 'completedGames' est manquant dans la validation
  completedGames: PropTypes.number,
  // 'levelColor' est manquant dans la validation
  levelColor: PropTypes.string,
};

export default WordGamesProgress;