// src/screens/exercises/wordGames/WordGamesProgressBar/index.js
import React from "react";
import { View, Text } from "react-native";
import GameTimer from "../components/GameTimer";
import styles from "./style";

/**
 * Barre de progression pour l'exercice de jeux de mots
 * 
 * @param {number} currentIndex - Index du jeu actuel
 * @param {number} totalGames - Nombre total de jeux
 * @param {boolean} showFeedback - Indique si le feedback est affiché (complété)
 * @param {number} timeLeft - Temps restant pour le jeu actuel
 * @param {string} levelColor - Couleur associée au niveau
 */
const WordGamesProgressBar = ({
  currentIndex,
  totalGames,
  showFeedback,
  timeLeft,
  levelColor
}) => {
  // Calculer la progression
  const progressPercentage = ((currentIndex + (showFeedback ? 1 : 0)) / totalGames) * 100;
  
  return (
    <View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%`,
                backgroundColor: levelColor,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1}/{totalGames}
        </Text>
      </View>
      
      {timeLeft > 0 && (
        <GameTimer timeLeft={timeLeft} />
      )}
    </View>
  );
};

export default WordGamesProgressBar;