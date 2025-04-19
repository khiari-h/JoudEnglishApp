// src/screens/exercises/wordGames/WordGamesActions/index.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./style";

/**
 * Composant pour les boutons d'action en bas de l'écran
 * 
 * @param {Object} currentGame - Jeu actuel
 * @param {boolean} showFeedback - Indique si le feedback est affiché
 * @param {number} currentGameIndex - Index du jeu actuel
 * @param {number} totalGames - Nombre total de jeux
 * @param {string} levelColor - Couleur associée au niveau
 * @param {Function} onCheckAnswer - Fonction appelée pour vérifier la réponse
 * @param {Function} onNextGame - Fonction appelée pour passer au jeu suivant
 */
const WordGamesActions = ({
  currentGame,
  showFeedback,
  currentGameIndex,
  totalGames,
  levelColor,
  onCheckAnswer,
  onNextGame
}) => {
  const isMatchingOrWordSearch = 
    currentGame.type === "matching" || 
    currentGame.type === "word_search";

  return (
    <View style={styles.actionContainer}>
      {!showFeedback ? (
        <TouchableOpacity
          style={[
            styles.actionButton,
            isMatchingOrWordSearch
              ? styles.disabledButton
              : { backgroundColor: levelColor },
          ]}
          onPress={onCheckAnswer}
          disabled={isMatchingOrWordSearch}
        >
          <Text style={styles.actionButtonText}>
            {isMatchingOrWordSearch
              ? "Find all matches"
              : "Check Answer"}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: levelColor },
          ]}
          onPress={onNextGame}
        >
          <Text style={styles.actionButtonText}>
            {currentGameIndex < totalGames - 1
              ? "Next Game"
              : "See Results"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WordGamesActions;