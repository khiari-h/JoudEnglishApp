// WordGamesProgress/index.js - VERSION REFACTORISÉE avec ProgressCard

import React from "react";
import ProgressCard from "../../../../components/ui/ProgressCard";
import { calculateGameTypeProgress } from "../../../../utils/wordGames/wordGamesStats";
import { getWordGamesData } from "../../../../utils/wordGames/wordGamesDataHelper";

/**
 * 📊 WordGamesProgress - Version Refactorisée avec ProgressCard générique
 * Réutilise le composant ProgressCard comme les autres exercices
 * ⚠️ EXPANSION DÉSACTIVÉE - Word Games suit une logique séquentielle (comme Assessment)
 * 
 * @param {number} currentGame - Jeu actuel (1-based)
 * @param {number} totalGames - Nombre total de jeux
 * @param {string} gameTitle - Titre du jeu actuel
 * @param {number} completedGames - Nombre de jeux complétés
 * @param {string} levelColor - Couleur du niveau
 * @param {array} gameResults - Résultats de tous les jeux
 * @param {string} level - Niveau pour récupérer les données
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

  return (
    <ProgressCard
      title="Games Progress"
      subtitle={`${gameTitle} • Game ${currentGame}/${totalGames}`}
      progress={globalProgress}
      completed={completedGames}
      total={totalGames}
      unit="games"
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