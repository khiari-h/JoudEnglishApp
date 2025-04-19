// src/screens/exercises/wordGames/components/GameInstructions/index.js
import React from "react";
import { Text } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher les instructions d'un jeu
 * 
 * @param {string} instructions - Instructions du jeu
 */
const GameInstructions = ({ instructions }) => {
  return (
    <Text style={styles.gameInstructions}>
      {instructions}
    </Text>
  );
};

export default GameInstructions;