// src/screens/exercises/wordGames/WordGamesProgressBar/index.js
import React from "react";
import { View } from "react-native";
import ProgressBar from "../../../../components/ui/ProgressBar";
import styles from "./style";

/**
 * Barre de progression pour les exercices de Jeux de Mots
 * Version unifiée utilisant ProgressBar de base
 * 
 * @param {number} progress - Pourcentage de progression (0-100) basé sur jeux complétés
 * @param {number} currentGame - Index du jeu actuel (commençant par 1)
 * @param {number} totalGames - Nombre total de jeux
 * @param {number} completedCount - Nombre de jeux complétés ✅ NOUVEAU
 * @param {string} levelColor - Couleur du niveau actuel
 */
const WordGamesProgressBar = ({
  progress = 0,
  currentGame = 1,
  totalGames = 0,
  completedCount = 0,     // ✅ NOUVEAU pour cohérence
  levelColor = "#5E60CE"
}) => {
  return (
    <View style={styles.container}>
      <ProgressBar
        progress={progress}
        showPercentage={true}
        showValue={true}
        total={totalGames}
        height={6}
        backgroundColor="#e2e8f0"
        fillColor={levelColor}
        borderRadius={3}
        animated={true}
        labelPosition="top"
        valueFormatter={(value, total) => `Game ${currentGame}/${total}`}
        percentageFormatter={(percentage) => `Completed: ${completedCount}/${totalGames} (${percentage}%)`}
        style={styles.progressBar}
      />
    </View>
  );
};

export default WordGamesProgressBar;