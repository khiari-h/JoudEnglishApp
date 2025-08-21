// WordGamesProgress/index.js - VERSION AVEC GAMIFICATION

import PropTypes from 'prop-types';
import ProgressCard from "../../../../components/ui/ProgressCard";
import useProgressGamification from "../../../../hooks/useProgressGamification";
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
  
  // Calculer les jeux complétés
  const completedGamesCount = typeof completedGames === 'object' && completedGames !== null
    ? Object.values(completedGames).filter(completed => completed === true).length
    : 0;
  
  // ✅ CORRIGÉ : Calculer la progression basée sur les jeux VRAIMENT complétés
  const totalProgress = totalGames > 0 ? Math.round((completedGamesCount / totalGames) * 100) : 0;
  
  // ✅ CORRIGÉ : Calculer les données par type de jeu pour l'expansion
  const gameTypeData = useMemo(() => {
    if (!games || games.length === 0) return [];
    
    // Compter les jeux par type
    const matchingGames = games.filter(game => game.type === 'matching');
    const categorizationGames = games.filter(game => game.type === 'categorization');
    
    // Compter les jeux complétés par type
    const matchingCompleted = matchingGames.filter((game, index) => 
      completedGames[games.indexOf(game)] === true
    ).length;
    
    const categorizationCompleted = categorizationGames.filter((game, index) => 
      completedGames[games.indexOf(game)] === true
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

  // 🎭 GAMIFICATION : Utilise le hook pour transformer la progression
  const gamification = useProgressGamification({
    progress: totalProgress,
    completed: completedGamesCount,
    total: totalGames,
    type: "word-games"
  });

  return (
    <ProgressCard
      title={gamification.messages.main} // 🎭 Titre dynamique et motivant
      subtitle={gamification.messages.subtitle} // 🎭 Sous-titre dynamique
      progress={totalProgress}
      completed={completedGamesCount}
      total={totalGames}
      unit="jeux"
      levelColor={gamification.colors.primary} // 🎭 Couleur dynamique selon la progression
      expandable
      expanded={expanded}
      onToggleExpand={onToggleExpand}
      categoryData={gameTypeData}
      onCategoryPress={onGameTypePress}
      // 🎭 Props de gamification pour ProgressCard
      gamificationData={gamification}
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