// WordGamesProgress/index.js - VERSION SIMPLIFIÉE ET CORRIGÉE

import { View, Text } from "react-native";
import { useMemo } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from 'prop-types';
import createStyles from "./style";

/**
 * 📊 WordGamesProgress - VERSION SIMPLIFIÉE ET CORRIGÉE
 * ✅ Même approche que SpellingProgress
 * ✅ Calculs simples et directs
 * ✅ Style cohérent avec les autres modules
 * 
 * AFFICHE :
 * - Progress bar visuelle
 * - "X / Y jeux"
 * - Pourcentage
 */
const WordGamesProgress = ({
  currentGame = 1,
  totalGames = 0,
  completedGames = 0,
  levelColor = "#3b82f6",
}) => {
  const styles = createStyles(levelColor);

  // =================== CALCULS SIMPLES ===================
  
  const progressData = useMemo(() => {
    // Si on a des données de jeux complétés, les utiliser
    if (typeof completedGames === 'object' && completedGames !== null) {
      const completedCount = Object.values(completedGames).filter(game => game.completed).length;
      const progress = totalGames > 0 ? Math.round((completedCount / totalGames) * 100) : 0;
      return { completedCount, progress };
    }
    
    // Sinon, utiliser la progression basée sur le jeu actuel
    const progress = totalGames > 0 ? Math.round((currentGame / totalGames) * 100) : 0;
    return { completedCount: currentGame, progress };
  }, [currentGame, totalGames, completedGames]);

  const { completedCount, progress } = progressData;

  // =================== RENDER ===================
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[`${levelColor}08`, `${levelColor}04`, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        
        {/* Header avec titre et stats */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Progression</Text>
          </View>
          <Text style={[styles.stats, { color: levelColor }]}>
            {completedCount}/{totalGames} jeux
          </Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarTrack, { backgroundColor: `${levelColor}20` }]}>
            <View 
              style={[
                styles.progressBarFill,
                { 
                  backgroundColor: levelColor,
                  width: `${progress}%`
                }
              ]}
            />
          </View>
          
          {/* Pourcentage */}
          <Text style={[styles.percentage, { color: levelColor }]}>
            {progress}%
          </Text>
        </View>

      </LinearGradient>
    </View>
  );
};

// ✅ Définition de PropTypes pour la validation des props
WordGamesProgress.propTypes = {
  currentGame: PropTypes.number,
  totalGames: PropTypes.number,
  completedGames: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  levelColor: PropTypes.string,
};

export default WordGamesProgress;