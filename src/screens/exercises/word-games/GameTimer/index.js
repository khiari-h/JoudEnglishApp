// src/screens/exercises/wordGames/components/GameTimer/index.js
import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

/**
 * Composant pour afficher le temps restant
 * 
 * @param {number} timeLeft - Temps restant en secondes
 */
const GameTimer = ({ timeLeft }) => {
  return (
    <View style={styles.timerContainer}>
      <Text
        style={[styles.timerText, timeLeft <= 10 && styles.timerWarning]}
      >
        Time: {timeLeft}s
      </Text>
    </View>
  );
};

export default GameTimer;