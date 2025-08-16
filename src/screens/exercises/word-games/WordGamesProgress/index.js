// WordGamesProgress/index.js - VERSION STANDARD AVEC ProgressCard

import PropTypes from 'prop-types';
import ProgressCard from "../../../../components/ui/ProgressCard";
import { useMemo } from 'react';

/**
 * 📊 WordGamesProgress - Version Standard avec ProgressCard
 * ✅ Même approche que VocabularyProgress
 * ✅ Utilise le composant ProgressCard standard
 * ✅ Cohérent avec tous les autres modules
 * 
 * AFFICHE :
 * - Progress bar standard
 * - "X / Y jeux"
 * - Pourcentage
 * - Expansion possible par type de jeu
 */
const WordGamesProgress = ({
  currentGame = 1,
  totalGames = 0,
  completedGames = 0,
  levelColor = "#3b82f6",
  expanded = false,
  onToggleExpand,
  onGameTypePress,
  // ✅ AJOUTÉ : Données des jeux pour calculer la progression par type
  games = [],
}) => {
  
  // =================== CALCULS STANDARDS ===================
  
  // ✅ CORRIGÉ : Calculer la progression basée sur les jeux VRAIMENT complétés
  const totalProgress = totalGames > 0 ? Math.round((completedGamesCount / totalGames) * 100) : 0;
  
  // Calculer les jeux complétés
  const completedGamesCount = typeof completedGames === 'object' && completedGames !== null
    ? Object.values(completedGames).filter(game => game.completed).length
    : 0;
  
  // ✅ CORRIGÉ : Calculer les données par type de jeu pour l'expansion
  const gameTypeData = useMemo(() => {
    if (!games || games.length === 0) return [];
    
    // Compter les jeux par type
    const matchingGames = games.filter(game => game.type === 'matching');
    const categorizationGames = games.filter(game => game.type === 'categorization');
    
    // Compter les jeux complétés par type
    const matchingCompleted = matchingGames.filter(game => 
      completedGames[games.indexOf(game)]?.completed
    ).length;
    
    const categorizationCompleted = categorizationGames.filter(game => 
      completedGames[games.indexOf(game)]?.completed
    ).length;
    
    return [
      {
        title: "Association",
        completed: matchingCompleted,
        total: matchingGames.length,
        progress: matchingGames.length > 0 ? Math.round((matchingCompleted / matchingGames.length) * 100) : 0,
      },
      {
        title: "Catégorisation", 
        completed: categorizationCompleted,
        total: categorizationGames.length,
        progress: categorizationGames.length > 0 ? Math.round((categorizationCompleted / categorizationGames.length) * 100) : 0,
      }
    ];
  }, [games, completedGames]);

  return (
    <ProgressCard
      title="Progression"
      progress={totalProgress}
      completed={completedGamesCount}
      total={totalGames}
      unit="jeux"
      levelColor={levelColor}
      expandable
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={gameTypeData}
      onCategoryPress={onGameTypePress}
    />
  );
};

// ✅ PropTypes standards pour la cohérence
WordGamesProgress.propTypes = {
  currentGame: PropTypes.number,
  totalGames: PropTypes.number,
  completedGames: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  levelColor: PropTypes.string,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  onGameTypePress: PropTypes.func,
  // ✅ AJOUTÉ : Données des jeux
  games: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['matching', 'categorization']).isRequired,
    title: PropTypes.string,
  })),
};

export default WordGamesProgress;