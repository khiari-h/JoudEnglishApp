// utils/wordGames/wordGamesStats.js

/**
 * 📊 Fonctions utilitaires pour les statistiques de Word Games
 * Pattern identique à vocabularyStats.js et assessmentStats.js
 */

// =================== CALCULS DE BASE ===================

/**
 * Calcule le nombre total de jeux
 */
export const calculateTotalGames = (wordGamesData = {}) => {
  const games = wordGamesData.games || [];
  return games.length;
};

/**
 * Calcule le nombre de jeux complétés
 */
export const calculateCompletedGamesCount = (completedGames = {}) =>
  Object.values(completedGames).filter(game => game.completed).length;

/**
 * Calcule le score total obtenu
 */
export const calculateTotalScore = (gameResults = []) =>
  gameResults.reduce((total, result) => total + (result.score || 0), 0);

/**
 * Calcule le score maximum possible
 */
export const calculateMaxPossibleScore = (wordGamesData = {}) => {
  const games = wordGamesData.games || [];
  return games.reduce((total, game) => total + (game.maxScore || 10), 0);
};

// =================== CALCULS DE PROGRESSION ===================

/**
 * Calcule la progression totale (pourcentage de jeux complétés)
 */
export const calculateTotalProgress = (wordGamesData = {}, completedGames = {}) => {
  const totalGames = calculateTotalGames(wordGamesData);
  const completedCount = calculateCompletedGamesCount(completedGames);
  return totalGames > 0 ? Math.min(100, (completedCount / totalGames) * 100) : 0;
};

/**
 * Calcule la progression actuelle (basée sur le jeu en cours)
 */
export const calculateCurrentProgress = (currentGameIndex = 0, totalGames = 0) => {
  return totalGames > 0 ? ((currentGameIndex + 1) / totalGames) * 100 : 0;
};

/**
 * Calcule la progression par type de jeu pour l'expansion ProgressCard
 */
export const calculateGameTypeProgress = (wordGamesData = {}, completedGames = {}) => {
  const games = wordGamesData.games || [];
  
  // Grouper par type de jeu
  const gamesByType = games.reduce((acc, game, index) => {
    const type = game.type || 'unknown';
    if (!acc[type]) {
      acc[type] = { games: [], indices: [] };
    }
    acc[type].games.push(game);
    acc[type].indices.push(index);
    return acc;
  }, {});

  // Calculer la progression par type
  return Object.entries(gamesByType).map(([type, data]) => {
    const totalInType = data.games.length;
    const completedInType = data.indices.filter(index => 
      completedGames[index]?.completed
    ).length;
    const progress = totalInType > 0 ? (completedInType / totalInType) * 100 : 0;

    return {
      title: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize
      totalGames: totalInType,
      completedGames: completedInType,
      progress: Math.round(progress)
    };
  });
};

// =================== CALCULS DE SCORE ===================

/**
 * Calcule le score et pourcentage final
 */
export const calculateFinalScore = (gameResults = []) => {
  const totalScore = calculateTotalScore(gameResults);
  const totalMaxScore = gameResults.reduce((sum, result) => sum + (result.maxScore || 0), 0);
  
  return {
    score: totalScore,
    maxScore: totalMaxScore,
    percentage: totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0
  };
};

/**
 * Détermine le niveau de performance basé sur le pourcentage
 */
export const getPerformanceLevel = (percentage) => {
  if (percentage >= 90) return { 
    level: 'perfect', 
    color: '#059669', 
    message: '🏆 Perfect! Outstanding word skills!',
    description: 'You absolutely nailed it!'
  };
  if (percentage >= 80) return { 
    level: 'excellent', 
    color: '#16a34a', 
    message: '🌟 Excellent! Great word mastery!',
    description: 'You have excellent vocabulary skills!'
  };
  if (percentage >= 70) return { 
    level: 'good', 
    color: '#65a30d', 
    message: '👍 Good job! Solid performance!',
    description: 'Keep up the good work!'
  };
  if (percentage >= 60) return { 
    level: 'fair', 
    color: '#ea580c', 
    message: '👌 Not bad! Room for improvement!',
    description: 'Practice makes perfect!'
  };
  if (percentage >= 40) return { 
    level: 'needs_work', 
    color: '#dc2626', 
    message: '📚 Keep practicing!',
    description: 'Focus on building your vocabulary!'
  };
  return { 
    level: 'poor', 
    color: '#b91c1c', 
    message: '💪 Don\'t give up!',
    description: 'Everyone starts somewhere. Keep going!'
  };
};

/**
 * Calcule les statistiques par type de jeu
 */
export const calculateGameTypeStats = (wordGamesData = {}, gameResults = []) => {
  const games = wordGamesData.games || [];
  
  // Grouper les résultats par type
  const statsByType = {};
  
  games.forEach((game, index) => {
    const type = game.type || 'unknown';
    const result = gameResults[index] || { score: 0, maxScore: 0 };
    
    if (!statsByType[type]) {
      statsByType[type] = {
        type,
        totalScore: 0,
        totalMaxScore: 0,
        gamesCount: 0,
        completedCount: 0
      };
    }
    
    statsByType[type].totalScore += result.score;
    statsByType[type].totalMaxScore += result.maxScore;
    statsByType[type].gamesCount += 1;
    if (result.completed) {
      statsByType[type].completedCount += 1;
    }
  });
  
  // Calculer les pourcentages
  return Object.values(statsByType).map(stat => ({
    ...stat,
    percentage: stat.totalMaxScore > 0 ? (stat.totalScore / stat.totalMaxScore) * 100 : 0,
    completion: stat.gamesCount > 0 ? (stat.completedCount / stat.gamesCount) * 100 : 0
  }));
};

/**
 * Calcule les statistiques complètes pour l'affichage
 */
export const calculateCompleteStats = (wordGamesData = {}, gameResults = [], completedGames = {}, currentGameIndex = 0) => {
  const totalGames = calculateTotalGames(wordGamesData);
  const completedGamesCount = calculateCompletedGamesCount(completedGames);
  const totalProgress = calculateTotalProgress(wordGamesData, completedGames);
  const currentProgress = calculateCurrentProgress(currentGameIndex, totalGames);
  const finalScore = calculateFinalScore(gameResults);
  const performance = getPerformanceLevel(finalScore.percentage);
  const gameTypeProgress = calculateGameTypeProgress(wordGamesData, completedGames);
  const gameTypeStats = calculateGameTypeStats(wordGamesData, gameResults);

  return {
    // Statistiques globales
    totalGames,
    completedGamesCount,
    totalProgress,
    currentProgress,
    
    // Score
    finalScore,
    performance,
    
    // Données par type de jeu
    gameTypeProgress,
    gameTypeStats,
    
    // Ratios
    completionRate: totalGames > 0 ? (completedGamesCount / totalGames) * 100 : 0,
    averageScore: completedGamesCount > 0 ? finalScore.score / completedGamesCount : 0
  };
};

/**
 * Génère un message de feedback basé sur les résultats
 */
export const generateFeedbackMessage = (finalScore, gameTypeStats) => {
  const performance = getPerformanceLevel(finalScore.percentage);
  
  // Message principal basé sur la performance
  let message = `${performance.message}\n\n`;
  
  // Analyse par type de jeu
  if (gameTypeStats.length > 1) {
    const bestType = gameTypeStats.reduce((best, current) => 
      current.percentage > best.percentage ? current : best
    );
    const worstType = gameTypeStats.reduce((worst, current) => 
      current.percentage < worst.percentage ? current : worst
    );
    
    if (bestType.percentage > worstType.percentage + 20) {
      message += `You excel at ${bestType.type} games! `;
      message += `Consider practicing more ${worstType.type} games to improve your overall score.`;
    }
  }
  
  return message.trim();
};